// Should go in the draw function, but we can put this in later on as well.
/*



pen.fillStyle = "orange";
pen.arc(200, 200, 50, 0, 2 * Math.PI);
pen.strokeStyle = "white";
pen.stroke();
pen.fill();
*/


function init() {
    // document.addEventListener("click", f);
    // The variables that aren't tagged with either var or let, are global variables
    console.log("In init");
    canvas = document.getElementById("mycanvas");


    // adding some event listeners
    canvas.addEventListener("click", f_canvas);
    document.addEventListener("keydown", f_two);

    W = canvas.width = 600;
    H = canvas.height = 600;
    game_over = false;

    // this canvas object is used to draw some graphics on it via javascript
    // you need one more object to draw graphics!

    pen = canvas.getContext('2d');
    rect = {
        x: 20,
        y: 20,
        w: 50,
        h: 50,
        speed: 10
    }
}

function draw() {
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = "blue";
    pen.fillRect(rect.x, rect.y, rect.w, rect.h);
}

function update() {

    if (rect.x >= W - rect.w || rect.x <= 0)
        rect.speed *= -1;
    rect.x += rect.speed;
}

function gameloop() {
    if (game_over == true)
        clearInterval(f);
    console.log("in gameloop");
    draw();
    update();

}

init();
f = setInterval(gameloop, 100);
// to break this infinite loop, type clearInterval(f) in console!

function f_canvas() {
    console.log("You clicked on the document!");
    // some random functionality
    // game_over = true;
}

function f_two(e) {
    console.log("Pressed keydown", e.key);
}