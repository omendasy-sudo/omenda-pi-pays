import { PiSdkBase } from 'pi-sdk-js';
import { initPiSdk, isPiBrowser } from '../services/pi';

export default function PiCheckout({ order, onOrderComplete }) {
  const pay = async () => {
    if (!isPiBrowser()) {
      window.alert('Open this app in Pi Browser to make payments.');
      return;
    }

    const paymentData = {
      amount: order.amount,
      memo: 'China B2B trade order',
      metadata: { orderId: order.id },
    };

    await initPiSdk();

    // PiSdkBase auto-posts to /pi_payment/approve, /pi_payment/complete, etc.
    const sdk = new PiSdkBase();

    const origComplete = PiSdkBase.onReadyForServerCompletion.bind(PiSdkBase);
    PiSdkBase.onReadyForServerCompletion = async (paymentId, txid) => {
      await origComplete(paymentId, txid);
      onOrderComplete?.({ id: order.id, txid });
      PiSdkBase.onReadyForServerCompletion = origComplete;
    };

    if (!PiSdkBase.connected) {
      sdk.onConnection = () => sdk.createPayment(paymentData);
      await sdk.connect();
    } else {
      sdk.createPayment(paymentData);
    }
  };

  return <button onClick={pay}>Pay Supplier in Pi</button>;
}
