// lib/cache.js
import Redis from 'ioredis';

const redis = process.env.NODE_ENV === 'production' 
  ? new Redis(process.env.REDIS_URL)
  : null;

export async function getCache(key) {
  if (!redis) return null;
  try {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function setCache(key, value, ttl = 3600) {
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), 'EX', ttl);
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function invalidateCache(types = ['post', 'page', 'category']) {
  if (!redis) return;
  try {
    const keys = await redis.keys(`wp:${types.join('|')}:*`);
    if (keys.length) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
}