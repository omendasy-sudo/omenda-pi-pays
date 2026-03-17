/* ------------------------------------------------------------------ */
/*  Pi Network JavaScript SDK — TypeScript Declarations               */
/*  Based on official SDK docs: https://sdk.minepi.com                */
/* ------------------------------------------------------------------ */

declare global {
  type PiScope = "username" | "payments" | "wallet_address";

  type Direction = "user_to_app" | "app_to_user";

  type AppNetwork = "Pi Network" | "Pi Testnet";

  type AdType = "interstitial" | "rewarded";

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
    direction: Direction;
    created_at: string;
    network: AppNetwork;
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

  type ShowAdResponse =
    | {
        type: "interstitial";
        result: "AD_CLOSED" | "AD_DISPLAY_ERROR" | "AD_NETWORK_ERROR" | "AD_NOT_AVAILABLE";
      }
    | {
        type: "rewarded";
        result: "AD_REWARDED" | "AD_CLOSED" | "AD_DISPLAY_ERROR" | "AD_NETWORK_ERROR" | "AD_NOT_AVAILABLE" | "ADS_NOT_SUPPORTED" | "USER_UNAUTHENTICATED";
        adId?: string;
      };

  interface IsAdReadyResponse {
    type: AdType;
    ready: boolean;
  }

  interface RequestAdResponse {
    type: AdType;
    result: "AD_LOADED" | "AD_FAILED_TO_LOAD" | "AD_NOT_AVAILABLE";
  }

  interface PiAds {
    requestAd: (adType: AdType) => Promise<RequestAdResponse>;
    isAdReady: (adType: AdType) => Promise<IsAdReadyResponse>;
    showAd: (adType: AdType) => Promise<ShowAdResponse>;
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
