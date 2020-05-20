let arr = ["apple", "papaya", "mango", "jackfruit", "banana"];
console.log(arr);

for (let i = 0; i < 10; i++) {
    console.log(arr[i]);
}

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

arr.push("Strawberry");
console.log(arr);
console.log(arr.pop());
console.log(arr);

console.log(arr.indexOf("mango"));

function identify() {
    if (arr[0] == "apple") {
        console.log("Is it a bird? Is it a plane? It's an apple!")
    }
    else
        console.log("It's just a ", arr[0]);
}

