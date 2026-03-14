import { useState } from 'react';
import { PiSdkBase } from 'pi-sdk-js';
import { authWithPi, setAuthToken } from '../services/api';

const LoginPage = () => {
  const [status, setStatus] = useState('Idle');

  const login = async () => {
    if (!window.Pi) {
      setStatus('Pi SDK not available. Use Pi Browser.');
      return;
    }

    try {
      setStatus('Authenticating with Pi...');

      // PiSdkBase handles Pi.init + Pi.authenticate internally
      const sdk = new PiSdkBase();
      await sdk.connect();

      const sdkUser = PiSdkBase.user;
      if (!sdkUser) throw new Error('No user after connect');

      const response = await authWithPi({
        uid: sdkUser.uid,
        username: sdkUser.username,
        accessToken: PiSdkBase.accessToken,
      });

      setAuthToken(response.data.token);
      setStatus(`Logged in as ${response.data.user.name}`);
    } catch (error) {
      console.error(error);
      setStatus('Login failed');
    }
  };

  return (
    <main className="container">
      <h2>Pi Login</h2>
      <button className="btn" onClick={login}>
        Login With Pi
      </button>
      <p>{status}</p>
    </main>
  );
};

export default LoginPage;
