import redis from '@/db/redis'
import {Ratelimit} from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '1m'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

export default ratelimit;