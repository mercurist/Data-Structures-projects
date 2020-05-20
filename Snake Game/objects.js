var apple = {

    "taste": "sweet",
    "color": "red"
};

// Not hoisted either!
// var pineapple = new fruitClass("sour", "yellow");
// Class keyword ECMAScript 2015

// class Declaration
class fruitClass {
    constructor(taste, color) {
        this.taste = taste;
        this.color = color;
    }
}

// Class expression
let fruitExpression = class {
    constructor(taste, color) {
        this.taste = taste;
        this.color = color;
    }
}

function fruit(taste, color) {
    this.taste = taste;
    this.color = color;
}


// new keyword
let mango = new fruit("sweet", "yellow");
let orange = new fruit("sour", "orange");
var pineapple = new fruitClass("sour", "yellow");



console.log(mango);
console.log(orange);
console.log(pineapple);
var kiwi = new fruitExpression("sour", "green");
console.log(kiwi);

// Both class declaration and class expressions are not hoisted.