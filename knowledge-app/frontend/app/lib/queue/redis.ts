import { Redis } from 'ioredis';

let redis: Redis | null = null;

export function getRedisConnection(): Redis {
  if (!redis) {
    const redisUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL;

    if (!redisUrl) {
      throw new Error('❌ REDIS_URL not found in .env.local');
    }

    console.log('🔗 Connecting to Redis...');

    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      }
    });

    redis.on('error', (err) => {
      console.error('❌ Redis Error:', err.message);
    });

    redis.on('connect', () => {
      console.log('✅ Redis Connected Successfully');
    });

    redis.on('ready', () => {
      console.log('✅ Redis Ready');
    });
  }

  return redis;
}