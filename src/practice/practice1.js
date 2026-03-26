// const protectedGoals = () => {
//     const privateGoals = [
//         {name: 'Alice', age: 45, isActive: true, position: 1, level: 45, Done: true},
//         {name: 'Isaac', age: 30, isActive: false, position: 2, level: 43, Done: true},
//         {name: 'Juma', age: 25, isActive: false, position: 5, level: 40, Done: true},
//         {name: 'Jane', age: 18, isActive: true, position: 4, level: 36, Done: true}
//     ];

//     return {
//         add (item) {
//             privateGoals.push(item)

//         },

//         delete (item) {
//             privateGoals.splice(item)
//         },

//         getAll  () {
//             return [...privateGoals]
//         }
//     };
// };

// const myArray = protectedGoals();
// myArray.add('Love');
// myArray.getAll();
// console.log(myArray.getAll())
// const name = false;

// function test () {
//     let name = [2, 4, 5, 6, 43, 32, 5];

// }

// const API = axios.get('http//localhost:500/api')
//   .then(response => console.log(response.data))
//   .catch(error => console.error(error));

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. Correctly locate the current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function readMyFile() {
  try {
    // 2. Build the full path to data.txt
    const filePath = path.join(__dirname, 'data.txt');

    // 3. Read the file with 'utf8' encoding to get a string
    const data = await readFile(filePath, 'utf8');

    // 4. Output the content
    console.log("--- File Content Start ---");
    console.log(data);
    console.log("--- File Content End ---");
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error("Error: 'data.txt' was not found in the practice folder.");
    } else {
      console.error("An unexpected error occurred:", err.message);
    }
} finally {
    // await data ?.close();
    // console.log(data)

  }
}

readMyFile();
