// Type definitions for Hedera wallet
export interface HashPackWallet {
  connect(): Promise<{
    accountIds: string[];
    network: string;
    topic: string;
  }>;
  disconnect(): Promise<void>;
  sign(transaction: any): Promise<any>;
}

declare global {
  interface Window {
    hashpack?: HashPackWallet;
  }
}