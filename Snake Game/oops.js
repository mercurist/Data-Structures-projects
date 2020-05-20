// js allows you to create objects without defining a class!
/*
<bird>
    <coordinate>
        <x></x>
        <y></y>
    </coordinate>

    <alive></alive>

</bird>

*/

// One way of creating a Java Script object; (JSON Object)
var bird = {
    x: 100,
    y: 20,
    color: "blue",
    eggs: [1, 2, 3, 4],
    fly: function () {
        // this refers to the current instance of the object
        console.log("Bird is flying", this.x, this.y);
        return "Printed"
    }
};

// iterate!
// For loop
for (let i = 0; i < bird.eggs.length; i++) {
    console.log(bird.eggs[i]);
}

bird.eggs = [1, 2, "three", 6, "eight"];

// For each loop
bird.eggs.forEach(function (value, index) {
    console.log(index, value);
});

