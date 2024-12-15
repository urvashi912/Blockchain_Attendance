import { Client } from "@hashgraph/sdk";
import { HEDERA_CONFIG } from '../config/hedera';
import { WalletNotFoundError, WalletConnectionError } from './errors';

// Initialize Hedera client
export const client = Client.forTestnet();

export const connectWallet = async (): Promise<string> => {
  try {
    // Check if HashPack wallet is installed
    if (typeof window.hashpack === 'undefined') {
      throw new WalletNotFoundError();
    }
    
    // Attempt to connect to the wallet
    const response = await window.hashpack.connect();
    
    // Validate the response
    if (!response.accountIds?.length) {
      throw new WalletConnectionError('No account found in wallet');
    }

    // Return the first account ID
    return response.accountIds[0];
  } catch (error) {
    if (error instanceof WalletNotFoundError || error instanceof WalletConnectionError) {
      throw error;
    }
    throw new WalletConnectionError('Failed to connect to wallet');
  }
};