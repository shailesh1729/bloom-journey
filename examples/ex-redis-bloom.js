import { createClient } from 'redis';
import '@redis/bloom'; // Patch the client with .bf commands

// Connect to our Redis instance
const client = createClient();
await client.connect();

const FILTER_NAME = 'user_bloom_filter';
const expectedItems = 1_000_000;
const falsePositiveRate = 0.01;

// Reserve the filter on the Redis server
try {
  await client.bf.reserve(FILTER_NAME, falsePositiveRate, expectedItems);
  console.log('Bloom filter reserved successfully!');
} catch (e) {
  // If the filter already exists, we'll get an error, which is fine!
  console.log('Bloom filter already exists, skipping reservation.');
}

async function checkUsername(username) {
  // The 'bf.exists' command checks the filter
  const mightExist = await client.bf.exists(FILTER_NAME, username);
  if (mightExist) {
    console.log(`Username '${username}' might be taken. Checking the database...`);
    // This is where we'd hit our main database for a final check
    // For this example, we'll just return true.
    return true;
  } else {
    console.log(`Username '${username}' is definitely available!`);
    return false;
  }
}

async function addUsername(username) {
  // The 'bf.add' command adds the username to the filter
  await client.bf.add(FILTER_NAME, username);
  console.log(`Username '${username}' added to the filter.`);
}

// Example usage
await addUsername('code_ninja');
const resultA = await checkUsername('code_ninja'); // Should be true
const resultB = await checkUsername('the_next_elon_musk'); // Should be false
console.log({ resultA, resultB });

// Clean up
await client.quit();
