import Redis from 'ioredis'

const redis = new Redis('redis://redis:6379')

export default redis
