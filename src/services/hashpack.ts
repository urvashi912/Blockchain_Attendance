import { HashPackWallet } from '../types/hedera';
import { HEDERA_CONFIG } from '../config/hedera';
import { WalletNotFoundError, WalletConnectionError } from '../utils/errors';

export class HashPackService {
  private static instance: HashPackService;
  private initialized = false;

  private constructor() {}

  static getInstance(): HashPackService {
    if (!HashPackService.instance) {
      HashPackService.instance = new HashPackService();
    }
    return HashPackService.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    
    let attempts = 0;
    while (!window.hashpack && attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      attempts++;
    }
    
    this.initialized = true;
  }

  getWallet(): HashPackWallet | undefined {
    return window.hashpack;
  }

  isInstalled(): boolean {
    return !!window.hashpack;
  }

  getInstallUrl(): string {
    return 'https://www.hashpack.app/download';
  }

  async connect(): Promise<string> {
    await this.init();
    
    if (!this.isInstalled()) {
      throw new WalletNotFoundError();
    }

    const wallet = this.getWallet();
    if (!wallet) {
      throw new WalletConnectionError('Failed to initialize HashPack wallet');
    }

    try {
      const response = await wallet.connect();
      
      if (!response?.accountIds?.length) {
        throw new WalletConnectionError('No Hedera account found in wallet');
      }

      if (response.network !== HEDERA_CONFIG.network) {
        throw new WalletConnectionError(`Please switch to ${HEDERA_CONFIG.network} network`);
      }

      return response.accountIds[0];
    } catch (error) {
      if (error instanceof WalletNotFoundError || error instanceof WalletConnectionError) {
        throw error;
      }
      throw new WalletConnectionError('Failed to connect to HashPack wallet');
    }
  }
}

// Export a singleton instance
export const hashPackService = HashPackService.getInstance();