# Bloom Journey

An exploration into Bloom filters in JavaScript, featuring both in-memory and Redis-backed examples. This project demonstrates how Bloom filters can be used to efficiently check for membership (e.g., username existence) with minimal memory and fast lookups.

## Features

- **In-Memory Bloom Filter**: Use the `bloom-filters` library to create and query a Bloom filter in pure JavaScript.
- **Redis Bloom Filter**: Integrate with Redis using the `@redis/bloom` module for scalable, persistent Bloom filters.
- **Practical Examples**: See how Bloom filters can reduce unnecessary database queries for username checks and similar use cases.

## Project Structure

```
bloom-journey/
├── examples/
│   ├── ex-bloom-in-memory.js    # In-memory Bloom filter demo
│   └── ex-redis-bloom.js        # Redis Bloom filter demo
├── scripts/
│   └── run-redis-bloom-container.sh # Script to run RedisBloom in Docker
├── package.json
└── README.md
```

## Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Run the in-memory example**
   ```sh
   node examples/ex-bloom-in-memory.js
   ```

3. **Run the Redis Bloom example**
   - Make sure you have a Redis server with the RedisBloom module running. You can use the provided script:
     ```sh
     bash scripts/run-redis-bloom-container.sh
     ```
   - Then run:
     ```sh
     node examples/ex-redis-bloom.js
     ```

## Example: In-Memory Bloom Filter

```js
import pkg from 'bloom-filters';
const { BloomFilter } = pkg;

const expectedItems = 1_000_000;
const falsePositiveRate = 0.01;
const userBloomFilter = BloomFilter.create(expectedItems, falsePositiveRate);

userBloomFilter.add('cool_dev_2025');
if (userBloomFilter.has('cool_dev_2025')) {
  console.log('Username might be taken.');
}
```

## Dependencies

- [bloom-filters](https://www.npmjs.com/package/bloom-filters)
- [redis](https://www.npmjs.com/package/redis)
- [@redis/bloom](https://www.npmjs.com/package/@redis/bloom)

## License

MIT
