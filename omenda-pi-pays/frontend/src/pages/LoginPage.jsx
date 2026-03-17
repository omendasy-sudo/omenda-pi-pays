import { useEffect, useState } from 'react';
import { PiSdkBase } from 'pi-sdk-js';
import { authWithPi, setAuthToken } from '../services/api';
import { initPiSdk, isPiBrowser } from '../services/pi';

const LoginPage = () => {
  const [status, setStatus] = useState('Idle');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPiBrowser()) {
      setStatus('Open this page inside Pi Browser to use Pi login.');
      return;
    }

    initPiSdk()
      .then(() => setStatus('Pi Browser detected. Ready to connect.'))
      .catch((error) => {
        console.error(error);
        setStatus(error.message || 'Pi SDK failed to load.');
      });
  }, []);

  const login = async () => {
    if (loading) {
      return;
    }

    if (!isPiBrowser()) {
      setStatus('Pi SDK not available. Use Pi Browser.');
      return;
    }

    try {
      setLoading(true);
      setStatus('Authenticating with Pi...');
      await initPiSdk();

      const sdk = new PiSdkBase();
      await sdk.connect();

      const sdkUser = PiSdkBase.user;
      const accessToken = PiSdkBase.accessToken;
      if (!sdkUser || !accessToken) throw new Error('No Pi user returned after connect');

      const response = await authWithPi({
        uid: sdkUser.uid,
        username: sdkUser.username,
        accessToken,
      });

      setAuthToken(response.data.token);
      window.localStorage.setItem('omenda_auth_token', response.data.token);
      setStatus(`Logged in as ${response.data.user.name}`);
    } catch (error) {
      console.error(error);
      setStatus(error?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h2>Pi Login</h2>
      <button className="btn" onClick={login} disabled={loading}>
        {loading ? 'Connecting...' : 'Login With Pi'}
      </button>
      <p>{status}</p>
    </main>
  );
};

export default LoginPage;
