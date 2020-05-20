// Not related to java in any way
let a = 10;
console.log(a);

let b = [1, 2, 3, 4, 5];
console.log(b);
console.log("Hello world");

c = 20;     // this makes it a global variable.

var d = 30;     // this creates variables that have function scope.
let e = 50;     // this creates variables that have block scope.

function fun() {
    let a = 5;
    if (a == 5) {
        let b = 10;
        // var b = 10;
        console.log("Inside", b);
    }
    console.log("Outside", b);
}

fun();

// Function Hoisting

square_root(255);
// this doesn't work because function is defined after it is called!
// sqrt_n(10);

// functions defined like this are taken to the top before running the code.
function square_root(n) {
    console.log("In first sqrt function", Math.sqrt(n));
    return "Hello";
}

// Uncaught TypeError: sqrt_n is not a function
// Function expressions like these are not hoisted
var sqrt_n = function (m) {
    console.log("In second sqrt function", Math.sqrt(m))
    return "Hi there";
}

square_root(255);
sqrt_n(10);

var canvas = document.getElementsByTagName("canvas");
console.log(canvas);
// console.log(canvas.clientWidth);

var canvas_two = document.getElementById("mycanvas");
console.log(canvas_two);