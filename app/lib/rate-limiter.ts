interface RateLimitInfo {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitInfo>;
  private readonly limit: number;
  private readonly windowMs: number;

  constructor(limit: number = 5, windowMs: number = 600000) {
    this.requests = new Map();
    this.limit = limit;
    this.windowMs = windowMs;
  }

  isRateLimited(key: string): { limited: boolean; remaining: number } {
    const now = Date.now();
    const info = this.requests.get(key);

    if (!info) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { limited: false, remaining: this.limit - 1 };
    }

    if (now > info.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { limited: false, remaining: this.limit - 1 };
    }

    if (info.count >= this.limit) {
      return { limited: true, remaining: 0 };
    }

    info.count += 1;
    this.requests.set(key, info);
    return { limited: false, remaining: this.limit - info.count };
  }
}

// Create a singleton instance
export const rateLimiter = new RateLimiter(); 