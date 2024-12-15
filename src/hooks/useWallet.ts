import { useState, useCallback } from 'react';
import { hashPackService } from '../services/hashpack';
import { WalletNotFoundError } from '../utils/errors';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (!hashPackService.isInstalled()) {
        window.open(hashPackService.getInstallUrl(), '_blank');
        throw new WalletNotFoundError();
      }

      const address = await hashPackService.connect();
      setWalletAddress(address);
      return address;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(message);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    walletAddress,
    isConnecting,
    error,
    connect,
    isWalletInstalled: hashPackService.isInstalled(),
    installUrl: hashPackService.getInstallUrl()
  };
};