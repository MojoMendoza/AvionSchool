// strings
let firstName = "Jihoon";
let lastName = 'Lee';
let middleName = `Jr.`;
console.log(firstName, lastName, middleName);
// template literals
console.log(`Full name: ${firstName} ${lastName} ${middleName}`);

// numbers
let a = 10;
let b = 20;
let c = a + b;
console.log(c);

let d = 5.5;
console.log(c + d);

// boolean

let isStudent = false;
let employee = true;

if(isStudent){
    console.log("Person is a student");
}

if(employee){
    console.log("Person is employee");
}

// Arrays
//                       0         1         2      3
const studentNames = ["Victor", "Amanda", "John", "Dom"];
let information = ["Kyla", 25, true];
let grades = [85, 90, 100, 89, 93];

console.log(`Number of Students: ${studentNames.length}`);
console.log(information.length);
console.log(grades.length);

// Accessing elements through index
console.log(studentNames[0]); // prints Victor
console.log(grades[2]); // 100
console.log(studentNames[4]); // undefined

// Reassignment of value in an aray
studentNames[0] = "Jose";
// studentNames = 5; // this will cause an error
studentNames[4] = "Victor"; // 5th element
studentNames[6] = "Jane"; // there will be 1 empty element in the array
console.log(studentNames);

const emptyArray = [];
console.log(emptyArray);

// objects 

// properties - variables inside an object
// key: value
// let model = "Lenovo"
const laptop = {
    model: "Lenovo",
    price: 40000,
    memory: "1 TB",
    ram: "8 GB",
    inStock: true,
    storesAvailable: ["SM Manila", "Robinsons Manila", "Greenhills"],
    // object methods
    // functions - reusable code
    // functionName: function
    sayModel: function() {
        // "this" keyword
        // "this.model" pertains to the key inside laptop
        // "this" is only accessible inside the object
        console.log(`${this.model} is the laptop model`);
    },
}

console.log(laptop);

// Accessing elements
// dot notation
console.log(laptop.inStock);
console.log(laptop.model);
// we call functions this way
laptop.sayModel();

// bracket notation
let laptopProperty = "storesAvailable";
// accessing a property
console.log(laptop["inStock"]);
// dynamic accessing of elements
console.log(`Laptop property: ${laptop[laptopProperty]}`);

laptopProperty = "model";
console.log(`Laptop property: ${laptop[laptopProperty]}`);