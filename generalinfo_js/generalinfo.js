                // -------  DATA TYPES IN JS  --------: 
       // Primitive Data Types :
      // Number :
let num = 42; 
let floatNum = 3.14; 
    // String :
let str = "Hello, World!";
    // Boolean :
let isTrue = true;
let isFalse = false;
    // Undefined :
let undef;
    // Null :
let nullVar = null;

                // -------  VARIABLES IN JS  --------: 
    // var : (global scope, function scope)
var x = 10;
x = 15;
    // let : (block scope)
let y = 20;
y = 25;
    // const : (block scope, cannot be re-assigned)
const z = 30;
    // z = 35; // This will throw an error


                // -------  concatenataion IN JS  --------: 
let firstName = "Fang";
let lastName = "Yuan";
console.log(firstName + " " + lastName); // Output: John Doe
console.log(`Hello, ${firstName} ${lastName}!`); // Output: Hello, Fang Yuan!

                // -------  OPERATORS IN JS  --------:
    // Arithmetic Operators : ( +, -, *, /, %, **)
let a = 10;
let b = 3;
console.log(a + b); // Output: 13
console.log(a - b); // Output: 7
console.log(a * b); // Output: 30
console.log(a / b); // Output: 3.3333
console.log(a % b); // Output: 1
console.log(a ** b); // Output: 1000

    // Assignment Operators : (=, +=, -=, *=, /=)
let c = 5;
c += 2;
console.log(c); // Output: 7

    // Comparison Operators : (==, ===, !=, !==, >, <, >=, <=)
console.log(a == b); // Output: false 
console.log(a === b); // Output: false (=== true if value and type are the same)
console.log(a !== b); // Output: true (!== true if value or type are different)
console.log(a > b); // Output: true 
console.log(a <= b); // Output: false

    // Logical Operators : (&&, ||, !)
// (&& = and , || = or  , ! = not)
console.log(a > 5 && b < 5); // Output: true (|| = or , && = and , ! = not)
console.log(a < 5 || b < 5); // Output: true
console.log(!(a > b)); // Output: false

    // Ternary Operator : (condition ? expr1 : expr2)
let age = 18;
let canVote = (age >= 18) ? "Yes" : "No";
console.log(canVote); // Output: Yes

    // Type Operators : (typeof, instanceof)
console.log(typeof a); // Output: number
console.log(firstName instanceof String); // Output: false
console.log(firstName instanceof Object); // Output: false

    // Bitwise Operators : (&, |, ^, ~, <<, >>, >>>)
let m = 5; // 0101 in binary
let n = 3; // 0011 in binary
console.log(m & n); // Output: 1 (0001 in binary)
console.log(m | n); // Output: 7 (0111 in binary)
console.log(m ^ n); // Output: 6 (0110 in binary)
console.log(~m);    // Output: -6 (inverts bits)
console.log(m << 1); // Output: 10 (1010 in binary)
console.log(m >> 1); // Output: 2 (0010 in binary)
console.log(m >>> 1); // Output: 2 (0010 in binary)

    // String Operators : (+, +=)
let str1 = "Hello, ";
let str2 = "World!";
let str3 = str1 + str2;
console.log(str3); // Output: Hello, World!
str1 += "Everyone!";
console.log(str1); // Output: Hello, Everyone!

    // Unary Operators : (+, -, ++, --)
let p = 10;
console.log(+p); // Output: 10    // +p converts to number
console.log(-p); // Output: -10   // -p negates the value
p++; // p++ use the value then increment ,but ++p increment then use the value
console.log(p); // Output: 11
p--;
console.log(p); // Output: 10
let v = 5;
console.log(v++); // prints 5 
console.log(v);   // prints 6
let u = 5;
console.log(++u); // prints 6
console.log(u);   // prints 6

                // -------  COMMENTS IN JS  -------- :
// This is a single-line comment
/* This is a multi-line comment
    It can span multiple lines */
 
                // -------  STRING IN JS  -------- :
let message = "Hello, JavaScript!";
console.log(message); // Output: Hello, JavaScript!
console.log(message.repeat(2)); // Output: Hello, JavaScript!Hello, JavaScript!
console.log(message.length); // Output: 18
console.log(message.toUpperCase()); // Output: HELLO, JAVASCRIPT!
console.log(message.toLowerCase()); // Output: hello, javascript!
console.log(message.indexOf("J")); // Output: 7 -- the position of the occurance
console.log(message.slice(0, 5)); // Output: Hello
console.log(message.replace("JavaScript", "World")); // Output: Hello, World!
console.log(message.split(", ")); // Output: [ 'Hello', 'JavaScript!' ] 
console.log(message.charAt(0)); // Output: H
console.log(message.includes("Hello")); // Output: true
console.log(message.startsWith("Hello")); // Output: true
console.log(message.endsWith("!")); // Output: true
console.log(message.trim()); // Output: Hello, JavaScript!
console.log(message.concat(" Welcome!")); // Output: Hello, JavaScript! Welcome!
 
                // -------  ARRAY IN JS  -------- :

let exarray = ["ahmed" , "ali" , " mazen" , "omar", 123 , true , undefined , null , [4,5,6] ]
console.log(exarray); // output: ["ahmed" , "ali" , " mazen" , "omar", 123 , true , undefined , null , [4,5,6] ]
console.log(exarray[0]); // output: ahmed
console.log(exarray.length); // output: 9
console.log(exarray[exarray.length-1]); // output: [4,5,6]  (the last element is the array)
exarray[0] = "achraf";
console.log(exarray); // output: ["achraf" , "ali" , " mazen" , "omar", 123 , true , undefined , null , [4,5,6] ]

    // nested array
let objects = [1,2,3,[7,8,9]];
console.log(objects[3]); // output : [7,8,9]
console.log(objects[3][2]); // output : 9

    // add and remove elements
exarray.push("ziyad");// add ziyad to the last index
exarray.unshift("hicham");// add hicham to the first index
exarray.shift();// remove first element and keep it
exarray.pop();// remove last element and keep it
exarray.splice(0,2);// remove two elements(2) starting from 0(0) ([0]and[1])
exarray.splice(0,2,"yassin","aadil");// same but add "yassin" and "aadil" from[0]

                // -------  conditional statement IN JS  -------- :
    // methode 1 :
if (condition) {
 // Code to execute if condition is true
} else if (anotherCondition) {
 // Code to execute if anotherCondition is true
} else {
 // Code to execute if none of the conditions are true
}

    // methode 2 :
switch (expression) {
    case value1:
        // Code to execute for value1
        break;
    case value2:
        // Code to execute for value2
        break;
    default:
        // Code to execute if no case matches
}
    // methode 3 :
foo = (y==4)?"y is 4" : "y is not 4";

                // -------  loops IN JS  -------- : 
    // while :
while (condition) {
    // Code à exécuter tant que la condition est vraie
}

    // do... while : : 
do {
    // Code à exécuter
} while (condition);

    // for :
for (initialisation; condition; itération) {
    // Code à exécuter à chaque itération
}

    // for...of (tables and iterable objects ):
let tableau = [1, 2, 3, 4, 5];
for (let element of tableau) {
console.log(element); // Affiche les éléments 1, 2, 3, 4, 5

    // for...in (pour les objets) :
let objet = {
nom: "Alice",
age: 25,
ville: "Paris"
};
for (let propriete in objet) {
console.log(propriete + ": " + objet[propriete]);
}
// Affiche :
// nom: Alice
// age: 25
// ville: Paris
}
                    // -------  fonctions IN JS  -------- :
