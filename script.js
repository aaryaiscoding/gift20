const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 300;

const character = {
    x: 50,
    y: 200,
    width: 20,
    height: 20,
    speed: 5
};

function drawCharacter() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter();
    requestAnimationFrame(update);
}
function drawStar(ctx, x, y, radius, spikes, color) {
    let rot = (Math.PI / 2) * 3;
    let step = Math.PI / spikes;
    let outerRadius = radius;
    let innerRadius = radius / 2;
    
    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
        let xOuter = x + Math.cos(rot) * outerRadius;
        let yOuter = y + Math.sin(rot) * outerRadius;
        ctx.lineTo(xOuter, yOuter);
        rot += step;

        let xInner = x + Math.cos(rot) * innerRadius;
        let yInner = y + Math.sin(rot) * innerRadius;
        ctx.lineTo(xInner, yInner);
        rot += step;
    }

    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCharacter() {
    drawStar(ctx, character.x, character.y, 15, 5, "yellow");
}


document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") character.x += character.speed;
    if (event.key === "ArrowLeft") character.x -= character.speed;
    if (event.key === "ArrowUp") character.y -= character.speed;
    if (event.key === "ArrowDown") character.y += character.speed;
});

document.getElementById("startButton").addEventListener("click", function() {
    alert("🎂 Happy Birthday, Caitlin!!!");
    document.getElementById("bgMusic").play();
    update();
});

// 🔥 Konami Code Easter Egg (Up, Up, Down, Down, Left, Right, Left, Right, B, A)
let konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let pressedKeys = [];

document.addEventListener("keydown", function(event) {
    pressedKeys.push(event.key);
    if (pressedKeys.toString().includes(konamiCode.toString())) {
        document.getElementById("hiddenMessage").style.display = "block";
        alert("🔥 You found the hidden birthday message!");
        pressedKeys = [];
    }
});
