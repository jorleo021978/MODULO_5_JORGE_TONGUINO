import axios from 'axios';
import Chance from 'chance';

// Generate random data using Chance
const chance = new Chance();
const name = chance.name();
const email = chance.email();
const birthDate = chance.birthday();
const phone = chance.phone();
const year = chance.year();
const age = chance.age({ type: 'senior' });
const genre = chance.gender();
const character = chance.character();
const randomFloat = chance.floating({ min: 0, max: 100 });
const address= chance.address();

// Print the generated random data
console.log("Generated random data:");
console.log("Name:", name);
console.log("Email:", email);
console.log("Date of birth:", birthDate.toLocaleDateString());
console.log("Phone:", phone);
console.log("Year:", year);
console.log("Age:", age);
console.log("Genre:", genre);
console.log("Character:", character);
console.log("Floating point:", randomFloat);
console.log("address:",address);

// Make a request to the restcountries API to get a random country
const getRandomCountry = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const data = response.data;

    // Select a random country
    const randomCountry = chance.pickone(data);

    // Print the random country
    console.log("\nRandom country:");
    console.log(`Name: ${randomCountry.name.common}`);
    console.log(`Population: ${randomCountry.population}`);
    console.log(`Region: ${randomCountry.region}`);

  } catch (error) {
    console.error("An error happened:", error);
  }
};

// Execute the function to get a random country
getRandomCountry();
