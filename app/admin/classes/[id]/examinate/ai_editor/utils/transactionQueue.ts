/**
 * Transaction Queue Utility
 * Ensures API calls are executed sequentially to prevent race conditions
 */
class TransactionQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;

  /**
   * Add a transaction to the queue
   * @param transaction Function that returns a Promise
   * @returns Promise that resolves when the transaction completes
   */
  async enqueue<T>(transaction: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await transaction();
          resolve(result);
          return result;
        } catch (error) {
          reject(error);
          throw error;
        }
      });

      this.process();
    });
  }

  /**
   * Process the queue sequentially
   */
  private async process() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const transaction = this.queue.shift();
      if (transaction) {
        try {
          await transaction();
        } catch (error) {
          // Error is already handled in the transaction
          console.error("Transaction error:", error);
        }
      }
    }

    this.processing = false;
  }

  /**
   * Clear the queue (useful for cleanup)
   */
  clear() {
    this.queue = [];
  }

  /**
   * Get the current queue length
   */
  get length() {
    return this.queue.length;
  }

  /**
   * Check if queue is processing
   */
  get isProcessing() {
    return this.processing;
  }
}

// Create a singleton instance for the entire app
export const transactionQueue = new TransactionQueue();
