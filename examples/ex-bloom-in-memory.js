import pkg from 'bloom-filters';
const { BloomFilter } = pkg;

// Let's set up our filter for 1 million items with a 1% false positive rate
// (The library will use the math we learned to configure itself!)
const expectedItems = 1_000_000;
const falsePositiveRate = 0.01;

const userBloomFilter = BloomFilter.create(expectedItems, falsePositiveRate);

// Now, let's add some existing usernames to our filter
const existingUsernames = ['cool_dev_2025', 'code_ninja', 'brainstormer'];
existingUsernames.forEach(username => {
  userBloomFilter.add(username);
});

// A new user signs up with the name 'cool_dev_2025'
const newUserA = 'cool_dev_2025';

// Let's check if the username is taken before hitting the database!
if (userBloomFilter.has(newUserA)) {
  console.log(`Username '${newUserA}' might be taken. We should check the database.`);
  // This is where our code would make the database query as a final confirmation.
}

// Another user signs up with the name 'the_next_elon_musk'
const newUserB = 'the_next_elon_musk';

if (userBloomFilter.has(newUserB)) {
  console.log(`Username '${newUserB}' might be taken.`);
} else {
  // The filter is certain this username doesn't exist!
  console.log(`Username '${newUserB}' is definitely available!`);
  // No need for a database call here! We can proceed with registration immediately.
}

// Output:
// Username 'cool_dev_2025' might be taken. We should check the database.
// Username 'the_next_elon_musk' is definitely available!