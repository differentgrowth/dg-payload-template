/**
 * Retry utility with exponential backoff for async operations.
 * Useful for handling transient failures in database or API calls.
 */

export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  maxAttempts?: number;
  /** Initial delay in milliseconds (default: 1000) */
  initialDelay?: number;
  /** Maximum delay in milliseconds (default: 10000) */
  maxDelay?: number;
  /** Multiplier for exponential backoff (default: 2) */
  backoffMultiplier?: number;
  /** Function to determine if error is retryable (default: all errors) */
  isRetryable?: (error: unknown) => boolean;
  /** Callback for logging retry attempts */
  onRetry?: (attempt: number, error: unknown, delay: number) => void;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10_000,
  backoffMultiplier: 2,
  isRetryable: () => true,
  onRetry: () => {
    // Default no-op callback
  },
};

/**
 * Executes an async function with retry logic and exponential backoff.
 *
 * @example
 * ```ts
 * const result = await withRetry(
 *   () => fetchDataFromApi(),
 *   {
 *     maxAttempts: 3,
 *     onRetry: (attempt, error) => console.log(`Retry ${attempt}:`, error)
 *   }
 * );
 * ```
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: unknown;
  let delay = opts.initialDelay;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry
      if (attempt >= opts.maxAttempts || !opts.isRetryable(error)) {
        throw error;
      }

      // Log the retry attempt
      opts.onRetry(attempt, error, delay);

      // Wait before retrying
      await sleep(delay);

      // Calculate next delay with exponential backoff
      delay = Math.min(delay * opts.backoffMultiplier, opts.maxDelay);
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError;
}

/**
 * Helper to sleep for a given number of milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Predefined retry strategies for common use cases.
 */
export const retryStrategies = {
  /** Quick retry for transient failures (3 attempts, 500ms start) */
  quick: {
    maxAttempts: 3,
    initialDelay: 500,
    maxDelay: 2000,
  },
  /** Standard retry for API calls (3 attempts, 1s start) */
  standard: {
    maxAttempts: 3,
    initialDelay: 1000,
    maxDelay: 10_000,
  },
  /** Aggressive retry for critical operations (5 attempts, 1s start) */
  aggressive: {
    maxAttempts: 5,
    initialDelay: 1000,
    maxDelay: 30_000,
  },
} as const satisfies Record<string, RetryOptions>;

/**
 * Check if an error is likely a transient network or database error.
 */
export function isTransientError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    const transientPatterns = [
      "econnreset",
      "econnrefused",
      "etimedout",
      "enotfound",
      "network",
      "timeout",
      "connection",
      "socket",
      "unavailable",
      "too many connections",
      "deadlock",
    ];
    return transientPatterns.some((pattern) => message.includes(pattern));
  }
  return false;
}
