// Custom error types
export class WalletNotFoundError extends Error {
  constructor() {
    super('HashPack wallet not found. Please install HashPack wallet.');
    this.name = 'WalletNotFoundError';
  }
}

export class WalletConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WalletConnectionError';
  }
}