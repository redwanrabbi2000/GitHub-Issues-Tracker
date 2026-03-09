1. What is the difference between var, let, and const?
Think of these as the evolution of how JavaScript "remembers" things.

var (The Legacy): It is function-scoped. If you declare it inside a loop, it "leaks" outside and is accessible anywhere in the function. It also allows hoisting, meaning you can technically call it before it’s defined without the code crashing (though it returns undefined).

let (The Modern Standard): It is block-scoped. It only lives within the curly braces {} where it was born (like inside an if statement or a for loop). You can update its value, but you can't redeclare it in the same scope.

const (The Immutable): Also block-scoped, but once you assign a value, you cannot change it.

Note: If you use const for an object or array, you can still change the contents (like pushing an item to the array), but you can't point the variable to a brand-new object.

2. What is the spread operator (...)?
The spread operator is like a "deconstructor" for data structures. It takes an array or an object and "spreads" its individual elements into a new context.

In Arrays: const newArray = [...oldArray, 4, 5]; (Combines arrays easily).

In Objects: const newUser = { ...user, age: 25 }; (Copies an object while overwriting or adding specific properties).

In Functions: It allows a function to accept an indefinite number of arguments as an array.



3. What is the difference between map(), filter(), and forEach()?

These are array methods used to iterate over data, but they have different "personalities":

forEach()---->undefined---->Just a loop. It performs an action for every item but doesn't give you anything back.
map()---->A new array---->Transforms every item. If you have 5 items, you get 5 transformed items back.
filter()---->A new array---->Evaluates a condition. It only returns the items that pass a "test" (e.g., numbers > 10).


4. What is an arrow function?
Introduced in ES6, arrow functions provide a shorter syntax for writing functions.

JavaScript
const add = (a, b) => a + b;
Key differences from regular functions:

Implicit Return: If it's a one-liner, you don't need the return keyword or curly braces.

this Binding: Arrow functions don't have their own this context. They inherit this from the surrounding code, which makes them incredibly useful for callbacks and event listeners.


5. What are template literals?
Template literals are strings on steroids. Instead of using single (') or double (") quotes, you use backticks (`).

Interpolation: You can plug variables directly into the string using ${variable} instead of messy string concatenation (no more + " " +).

Multi-line Strings: You can hit "Enter" and create a new line without needing \n.