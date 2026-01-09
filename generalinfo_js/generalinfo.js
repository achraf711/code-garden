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

                // -------  VARIABLES IN JS  -------- : 
    // var : (global scope, function scope)
var x = 10;
x = 15;
    // let : (block scope)
let y = 20;
y = 25;
    // const : (block scope, cannot be re-assigned)
const z = 30;
    // z = 35 ; --> This will throw an error.


                // -------  concatenataion IN JS  -------- : 
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

    // Type Operators : (typeof)
console.log(typeof a); // Output: number

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

let exarray = ["ahmed" , "ali" , "mazen" , "omar", 123 , true , undefined , null , [4,5,6] ]
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

// -------  ARRAY DESTRUCTURING  -------- :
let colors = ["Red", "Green", "Blue"];
// Extract values into variables based on position
let [first, second] = colors;
console.log(first);  // Output: Red
console.log(second); // Output: Green
// Skipping elements (using commas)
let [primary, , tertiary] = colors; 
console.log(tertiary); // Output: Blue

    // add and remove elements
exarray.unshift("hicham"); // add hicham to the first index
exarray.shift(); // remove first element and keep it
exarray.push("ziyad"); // add ziyad to the last index
exarray.pop(); // remove last element and keep it
exarray.splice(0,2); // remove two elements(2) starting from 0(0) --> remove : [0]and[1]
exarray.splice(0,2,"yassin","aadil"); // same but add "yassin" and "aadil" from[0]

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
    case value1:   // num no quotes , strings use '' or ""
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
    // var x ; --> golbale variable cause it's hoisted, but use last value of x 
    // let x ; --> local variable cause it's not hoisted
}


    // for...of (tables and iterable objects):
let tableau = [1, 2, 3, 4, 5];
for (let element of tableau) {
console.log(element); // show  elements 1, 2, 3, 4, 5 one by one

    // for...in (for objets) :
let object = {
nom: "Alice",
age: 25,
ville: "Paris"
};
for (let propriete in object) {
console.log(propriete + ": " + object[propriete]);
}
// Affiche :
// nom: Alice
// age: 25
// ville: Paris
}
                    // -------  FUNCTIONS IN JS  -------- :

// 1. "Function Declaration" : (hoisted, can be called before declaration)
function greet(name) {
    console.log("Hello " + name);
}
greet("Achraf"); // Output: Hello Achraf

// 2. "Function Expression" : (not hoisted, assigned to a variable)
const greet2 = function(name) {
    console.log("Hi " + name);
};
greet2("Ali"); // Output: Hi Ali

// 3. "Arrow Function" : (shorter syntax, does not have its own 'this')
const greet3 = (name) => {
    console.log("Hey " + name);
};
greet3("Yassin"); // Output: Hey Yassin

// 4. Function with Return Value :
function add(a, b) {
    return a + b;
}
let result = add(5, 3);
console.log(result); // Output: 8

// 5. Default Parameters :
function multiply(a, b = 2) {
    return a * b;
}
console.log(multiply(4)); // Output: 8  (b defaults to 2)

// 6. Functions with Multiple Parameters :
function totalPrice(price, tax, discount) {
    return price + tax - discount;
}
console.log(totalPrice(100, 5, 10)); // Output: 95

// 7. Immediately Invoked Function Expression (IIFE) :
// Function that runs itself :
(function() {
    console.log("IIFE executed!");
})(); // Output: IIFE executed!

// 8. Scope in Functions : 
function testScope() {
    var x = "var x"; // function scoped
    let y = "let y"; // block scoped
    const z = "const z"; // block scoped
    console.log(x, y, z);
}
testScope(); // Output: var x let y const z

// 9. Nested Functions :
function outer() {
    function inner() {
        console.log("Inner function called!");
    }
    inner();
}
outer(); // Output: Inner function called! -- the function inner cannot be called outside outer (locale)

// 10. Example: Calculating Product Price
function product(price, taxes) {
    let finalPrice = price + taxes;
    return finalPrice;
}
let price = product(22, 0.3);
console.log(price + " DH"); // Output: 22.3 DH

                // -------  OBJECTS IN JS  -------- :

// 1. Creating an Object :
let person = {
    name: "Alice",
    age: 25,
    city: "Paris"
};
console.log(person); 
// Output: { name: 'Alice', age: 25, city: 'Paris' }

// 2. Accessing Object Properties :
console.log(person.name);  // Output: Alice
console.log(person["age"]); // Output: 25 , ["age"] --> same as .age

// 3. Adding / Modifying Properties :
person.job = "Engineer"; // add new property
person.age = 26;          // modify existing property
console.log(person);
// Output: { name: 'Alice', age: 26, city: 'Paris', job: 'Engineer' }

// 4. Deleting a Property :
delete person.city;
console.log(person);
// Output: { name: 'Alice', age: 26, job: 'Engineer' }

// 5. Nested Objects :
let student = {
    name: "John",
    marks: {
        math: 90,
        english: 85
    }
};
console.log(student.marks.math); // Output: 90

// object.create() :
let user1 = {
    name: "achraf",
    getName: function() {
        return `hello ${this.name}`; // We use this to refer to the object calling the function
    }
};
let user2 = Object.create(user1); // copy content of user1 in user2
user2.name = "John"; // change the name in user2 but still achraf in user1
console.log(user2.getName());

// 6. Iterating Over an Object :
// for...in loop
for (let key in person) {
    console.log(key + ": " + person[key]);
}
// Output:
// name: Alice
// age: 26
// job: Engineer

// 7. Object Methods :
let car = {
    brand: "Toyota",
    model: "Corolla",
    start: function() {
        console.log(this.brand + " " + this.model + " started!");
    }
};
car.start(); // Output: Toyota Corolla started!

// 8. Object.keys(), Object.values(), Object.entries() :
console.log(Object.keys(person));   // Output: [ 'name', 'age', 'job' ]
console.log(Object.values(person)); // Output: [ 'Alice', 26, 'Engineer' ]

// 9. Object Destructuring :
let {name, age} = person; // distruct the values of keys(name,age) and put it to a new variable(name,age)
console.log(name); // Output: Alice
console.log(age);  // Output: 26

let{name:newName , age:newAge} = person; // distruct with different names 
console.log(newName); // Output: Alice
console.log(newAge);  // Output: 26

// 10. Example: Object in a Function :
function showPerson(p) {
    console.log(`${p.name} is ${p.Age} years old.`);
}
showPerson(person); // Output: Alice is 26 years old.

                 // -------  ADVANCED CONCEPTS JS -------- :
                 
// 1. PROTOTYPES & INHERITANCE :
/* Prototype = another object that an object inherits from
   JS looks for a property:
   1) in the object itself
   2) if not found → in its prototype */

let parent = {
    type: "parent",
    sayHello: function () {
        console.log("Hello from parent");
    }
};
let child = Object.create(parent); // child inherits from parent
child.name = "Child Object";
console.log(child.name);       // Child Object (from child)
console.log(child.type);       // parent (inherited)
child.sayHello();              // Hello from parent

// prototype check
console.log(child.__proto__ === parent); // true

// 2. Object.assign() :
let obj1 = { a: 1 };
let obj2 = { b: 2 };
let merged = Object.assign({}, obj1, obj2); //Use {} to create a safe NEW copy; if you skip it, you accidentally overwrite your ORIGINAL object
console.log(merged); // Output: { a: 1, b: 2 }

// 3.  GETTERS & SETTERS :
/* Getter = read a value
   Setter = write a value
   Used like normal properties (no parentheses) */

let user = {
    firstName: "Achraf",
    lastName: "Rezki",

    // getter
    get fullName() {
        return this.firstName + " " + this.lastName;
    },
    // setter
    set fullName(value) {
        let parts = value.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};

// getter usage (read)
console.log(user.fullName); // Achraf Rezki

// setter usage (write)
user.fullName = "John Doe";
console.log(user.firstName); // John
console.log(user.lastName);  // Doe

//4. Object.freeze() & Object.seal() :
/* Object.freeze()
   no modify , no add , no delete */

let frozenObj = {
    language: "JavaScript"
};
Object.freeze(frozenObj);
frozenObj.language = "Python"; // ignored
delete frozenObj.language;     // ignored
console.log(frozenObj); // { language: "JavaScript" }

/* Object.seal()
   modify existing values , can't add new properties , can't delete properties */

let sealedObj = {
    framework: "React",
    version: 18
};
Object.seal(sealedObj);
sealedObj.version = 19;     // allowed
sealedObj.author = "Meta"; // ignored
delete sealedObj.framework;// ignored
console.log(sealedObj); // { framework: "React", version: 19 }

                        // -------  THE DOCUMENT OBJECT MODEL (DOM)  -------- :

// 1. WHAT IS THE DOM? :
/* The DOM is a tree structure representation of your HTML document.
   Every part of the page (tags, text, attributes) is a "Node".  */
// Types of Nodes :
// - Element Node (e.g., <div>, <p>) 
// - Text Node (The text inside elements) 
// - Attribute Node (e.g., class="box") 
// - Comment Node

// 2. SELECTING ELEMENTS (Accessing the DOM) :

    // A. By ID (Selects a single element) 
let header = document.getElementById("header");
    // B. By Class Name (Selects a collection) 
let items = document.getElementsByClassName("list-item"); // add [index] if theres a lot of element in same class 
    // C. By Tag Name (Selects all elements of a type) 
let paragraphs = document.getElementsByTagName("p"); // Note: This returns a "NodeList" (like an array). 
    // D. querySelector (Selects the FIRST match using CSS syntax) 
let menu = document.querySelector(".menu"); // class . || id # || tageName h1,p...  
    // E. querySelectorAll (Selects ALL matches using CSS syntax) 
let allLinks = document.querySelectorAll("a");

// 3. ELEMENT PROPERTIES & MODIFICATION :

let element = document.getElementById("content");
    // A. innerHTML (Reads/Writes HTML content) 
element.innerHTML = "<p>New HTML content</p>"; 
    // B. textContent (Reads/Writes plain text - Safer) 
element.textContent = "Just plain text"; 
    // C. ID & ClassName Properties 
element.id = "newId";
element.className = "my-class"; // Replaces all current classes

// 4. CHANGING STYLES (CSS via JS) : 

let box = document.getElementById("box");
    // Use camelCase for CSS properties (e.g., background-color -> backgroundColor)
box.style.color = "blue";            // 
box.style.fontSize = "24px";         // 
box.style.backgroundColor = "yellow";// 

// 5. ATTRIBUTES & CLASSES METHODS :

let img = document.getElementById("myImage");
    // A. Attributes 
img.setAttribute("src", "image.jpg"); // Set an attribute 
let src = img.getAttribute("src");    // Get an attribute value
    // B. ClassList (Better way to handle classes) 
element.classList.add("highlight");    // Adds a class 
element.classList.remove("active"); // Removes a class (Common practice)

// 6. DOM MANIPULATION (Adding/Removing Nodes) :

    // A. Create a new element
let newDiv = document.createElement("div");
newDiv.textContent = "I am new here!";
    // B. Append (Add to the end of a parent)
document.body.appendChild(newDiv); 
    // C. Insert Before (Add before a specific sibling) 
parentNode.insertBefore(newNode, referenceNode);
    // D. Remove (Delete a child)
parentNode.removeChild(childNode);
    // E. Replace (Swap two elements) 
parentNode.replaceChild(newNode, oldNode);
