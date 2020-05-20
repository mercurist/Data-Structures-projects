function init() {

    // create an image for food!
    score = 0;
    trophy_image = new Image();
    trophy_image.src = "assets/trophy.png";
    food_image = new Image();
    food_image.src = "assets/apple.png";

    game_over = false;
    canvas = document.getElementById("mycanvas");
    W = H = canvas.width = canvas.height = 600;
    // cs = 25;
    cs = 30;

    pen = canvas.getContext('2d');

    snake = {
        init_length: 4,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (var i = this.init_length; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },

        updateSnake: function () {
            // console.log("updating snake");

            // check if snake has eaten food
            if (this.cells[0].x == food.x && this.cells[0].y == food.y) {
                score++;
                console.log("food eaten!");
                food = getRandomFood();
            }
            else
                this.cells.pop();


            head_x = this.cells[0].x;
            head_y = this.cells[0].y;

            // for now, we just want the snake to go in the right direction.
            if (snake.direction == "right") {
                this.cells.unshift({ x: head_x + 1, y: head_y });
            }

            else if (snake.direction == "left") {
                this.cells.unshift({ x: head_x - 1, y: head_y });
            }

            else if (snake.direction == "up") {
                this.cells.unshift({ x: head_x, y: head_y - 1 });
            }

            else if (snake.direction == "down") {
                this.cells.unshift({ x: head_x, y: head_y + 1 });
            }

            var last_x = Math.round(W / cs);
            var last_y = Math.round(H / cs);

            if (this.cells[0].y < 0 || this.cells[0].x < 0) {
                game_over = true;
            }

            if (this.cells[0].x >= last_x || this.cells[0].y >= last_y) {
                game_over = true;
            }

        }
    };

    snake.createSnake();
    // add Event listeners that'll listen to the inputs

    function keyPressed(ev) {
        // console.log("A key was pressed!", ev.key);

        // snake direction can't be directly opposite of the current direction
        if (ev.key == "ArrowRight" && snake.direction != "left") {
            snake.direction = "right";
        }
        else if (ev.key == "ArrowLeft" && snake.direction != "right") {
            snake.direction = "left";
        }
        else if (ev.key == "ArrowDown" && snake.direction != "up") {
            snake.direction = "down";
        }
        else if (ev.key == "ArrowUp" && snake.direction != "down") {
            snake.direction = "up";
        }

        console.log(snake.direction);
    }

    document.addEventListener("keydown", keyPressed);
    food = getRandomFood();

}

function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();

    // either we can write
    // food.draw(); 
    // or
    pen.fillStyle = food.color;
    // pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.drawImage(food_image, food.x * cs, food.y * cs, cs, cs);
    pen.drawImage(trophy_image, 20, 20, cs * 1.5, cs * 1.5);
    pen.fillStyle = "orange";
    pen.font = "40px roboto";
    pen.fillText(score, 60, 60);
}

function update() {
    snake.updateSnake();
}

function gameloop() {
    if (game_over == true) {
        alert("Mission failed! We'll get them next time. SCORE =" + score);
        clearInterval(f);
        return;
    }
    draw();
    update();

}


function getRandomFood() {
    foodX = Math.round(Math.random() * (W - cs) / cs);
    foodY = Math.round(Math.random() * (H - cs) / cs);

    food = {
        x: foodX,
        y: foodY,
        color: "red"
    };
    return food;
}


init();
f = setInterval(gameloop, 150);

// for more reactivity
// f = setInterval(gameloop, 10);