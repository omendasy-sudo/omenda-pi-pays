/**
 * Pi Token Service
 *
 * Wraps the Stellar SDK for Pi Network (auto-switches testnet / mainnet):
 *  - createTrustline  — Distributor establishes a trustline (registers the token on-chain)
 *  - mintToken        — Issuer sends tokens to Distributor (minting)
 *  - setHomeDomain    — Links your domain to the issuer account so Pi Wallet can verify and list the token
 *  - getBalances      — Returns all balances for a given account
 *
 * Environment variables (server-side only — never expose secret keys client-side):
 *   STELLAR_ISSUER_SECRET      — Issuer wallet secret key
 *   STELLAR_DISTRIBUTOR_SECRET — Distributor wallet secret key
 *   TOKEN_CODE                 — Token code, e.g. "OMENDA"
 *   NEXT_PUBLIC_APP_URL        — Your domain, e.g. "https://omendapipaysglobel.online"
 *   NEXT_PUBLIC_PI_SANDBOX     — "true" for testnet, "false" / unset for mainnet
 */

import * as StellarSDK from "@stellar/stellar-sdk";

const isSandbox = process.env.NEXT_PUBLIC_PI_SANDBOX === "true";
const HORIZON_URL = isSandbox
  ? "https://api.testnet.minepi.com"
  : "https://api.mainnet.minepi.com";
const NETWORK_PASSPHRASE = isSandbox ? "Pi Testnet" : "Pi Network";

function server() {
  return new StellarSDK.Horizon.Server(HORIZON_URL);
}

function getToken(issuerPublicKey: string): StellarSDK.Asset {
  const code = process.env.TOKEN_CODE;
  if (!code) throw new Error("TOKEN_CODE environment variable is not set");
  return new StellarSDK.Asset(code, issuerPublicKey);
}

async function latestBaseFee(s: StellarSDK.Horizon.Server): Promise<string> {
  const res = await s.ledgers().order("desc").limit(1).call();
  return String(res.records[0].base_fee_in_stroops ?? 100);
}

export interface TokenBalances {
  testPi: string;
  token: string | null;
}

// ─── Trustline ───────────────────────────────────────────────────────────────

/**
 * Distributor establishes a trustline for the token.
 * This is the first step — it registers the token on-chain.
 * Call this BEFORE minting.
 */
export async function createTrustline(
  distributorSecret: string,
  issuerPublicKey: string
): Promise<string> {
  const s = server();
  const distributorKeypair = StellarSDK.Keypair.fromSecret(distributorSecret);
  const customToken = getToken(issuerPublicKey);

  const account = await s.loadAccount(distributorKeypair.publicKey());
  const fee = await latestBaseFee(s);

  const tx = new StellarSDK.TransactionBuilder(account, {
    fee,
    networkPassphrase: NETWORK_PASSPHRASE,
    timebounds: await s.fetchTimebounds(90),
  })
    .addOperation(
      StellarSDK.Operation.changeTrust({ asset: customToken, limit: undefined })
    )
    .build();

  tx.sign(distributorKeypair);
  const result = await s.submitTransaction(tx);
  return result.hash;
}

// ─── Minting ─────────────────────────────────────────────────────────────────

/**
 * Issuer mints tokens by sending them to the Distributor account.
 * Requires a trustline to already exist (call createTrustline first).
 */
export async function mintToken(
  issuerSecret: string,
  distributorPublicKey: string,
  amount: string
): Promise<string> {
  const s = server();
  const issuerKeypair = StellarSDK.Keypair.fromSecret(issuerSecret);
  const customToken = getToken(issuerKeypair.publicKey());

  const account = await s.loadAccount(issuerKeypair.publicKey());
  const fee = await latestBaseFee(s);

  const tx = new StellarSDK.TransactionBuilder(account, {
    fee,
    networkPassphrase: NETWORK_PASSPHRASE,
    timebounds: await s.fetchTimebounds(90),
  })
    .addOperation(
      StellarSDK.Operation.payment({
        destination: distributorPublicKey,
        asset: customToken,
        amount,
      })
    )
    .build();

  tx.sign(issuerKeypair);
  const result = await s.submitTransaction(tx);
  return result.hash;
}

// ─── Home Domain ─────────────────────────────────────────────────────────────

/**
 * Links the issuer account to your domain.
 * After this, Pi Server reads /.well-known/pi.toml from your domain to verify
 * and list the token in Pi Wallet.
 */
export async function setHomeDomain(
  issuerSecret: string,
  domain: string
): Promise<string> {
  const s = server();
  const issuerKeypair = StellarSDK.Keypair.fromSecret(issuerSecret);

  // Strip protocol — Stellar homeDomain must be a bare hostname
  const homeDomain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const account = await s.loadAccount(issuerKeypair.publicKey());
  const fee = await latestBaseFee(s);

  const tx = new StellarSDK.TransactionBuilder(account, {
    fee,
    networkPassphrase: NETWORK_PASSPHRASE,
    timebounds: await s.fetchTimebounds(90),
  })
    .addOperation(StellarSDK.Operation.setOptions({ homeDomain }))
    .build();

  tx.sign(issuerKeypair);
  const result = await s.submitTransaction(tx);
  return result.hash;
}

// ─── Balances ─────────────────────────────────────────────────────────────────

/**
 * Returns the Pi and token balances for an account.
 */
export async function getBalances(publicKey: string): Promise<TokenBalances> {
  const s = server();
  const code = process.env.TOKEN_CODE;
  const account = await s.loadAccount(publicKey);

  let testPi = "0";
  let token: string | null = null;

  for (const b of account.balances) {
    if (b.asset_type === "native") {
      testPi = b.balance;
    } else if (
      (b.asset_type === "credit_alphanum4" || b.asset_type === "credit_alphanum12") &&
      b.asset_code === code
    ) {
      token = b.balance;
    }
  }

  return { testPi, token };
}
