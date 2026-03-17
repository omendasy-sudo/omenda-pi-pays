/* ------------------------------------------------------------------ */
/*  Pi Network JavaScript SDK — TypeScript Declarations               */
/*  Based on official SDK docs: https://sdk.minepi.com                */
/* ------------------------------------------------------------------ */

declare global {
  type PiScope = "username" | "payments" | "wallet_address";

  interface PiAuthResult {
    accessToken: string;
    user: {
      uid: string;
      username: string;
    };
  }

  interface PiPaymentData {
    amount: number;
    memo: string;
    metadata: Record<string, unknown>;
  }

  interface PiPaymentDto {
    identifier: string;
    user_uid: string;
    amount: number;
    memo: string;
    metadata: Record<string, unknown>;
    from_address: string;
    to_address: string;
    direction: "user_to_app" | "app_to_user";
    created_at: string;
    network: string;
    status: {
      developer_approved: boolean;
      transaction_verified: boolean;
      developer_completed: boolean;
      cancelled: boolean;
      user_cancelled: boolean;
    };
    transaction: {
      txid: string;
      verified: boolean;
      _link: string;
    } | null;
  }

  interface PiPaymentCallbacks {
    onReadyForServerApproval: (paymentId: string) => void;
    onReadyForServerCompletion: (paymentId: string, txid: string) => void;
    onCancel: (paymentId: string) => void;
    onError: (error: Error, payment?: PiPaymentDto) => void;
  }

  interface PiAdReady {
    ready: boolean;
  }

  interface PiAds {
    requestAd: (adType: "interstitial" | "rewarded") => Promise<void>;
    isAdReady: (adType: "interstitial" | "rewarded") => Promise<PiAdReady>;
    showAd: (adType: "interstitial" | "rewarded") => Promise<void>;
  }

  type PiNativeFeature =
    | "inline_media"
    | "request_permission"
    | "ad_network";

  interface PiSdk {
    init: (config: { version: string; sandbox?: boolean }) => void;
    authenticate: (
      scopes: PiScope[],
      onIncompletePaymentFound?: (payment: PiPaymentDto) => void
    ) => Promise<PiAuthResult>;
    createPayment: (
      paymentData: PiPaymentData,
      callbacks: PiPaymentCallbacks
    ) => void;
    openShareDialog: (title: string, message: string) => void;
    openConversation: (conversationId: string) => void;
    copyText: (text: string) => void;
    openUrlInSystemBrowser: (url: string) => Promise<void>;
    nativeFeaturesList: () => Promise<PiNativeFeature[]>;
    requestPermission: (permission: string) => Promise<void>;
    scanQrCode: () => Promise<string | null>;
    Ads: PiAds;
  }

  interface Window {
    Pi: PiSdk;
  }
}

export {};
