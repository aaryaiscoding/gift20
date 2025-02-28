const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 300;

const character = {
    x: 50,
    y: 200,
    speed: 5
};

// ⭐️ Falling Stars Array
let fallingStars = [];

// 🎨 Function to Draw a Star
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

// 🚀 Function to Draw the Character
function drawCharacter() {
    drawStar(ctx, character.x, character.y, 15, 5, "yellow");
}

// 🍰 Function to Draw the Cake
let showCake = false;
const cakePosition = { x: 170, y: 120 }; // Position for cake

function drawCake() {
    if (!showCake) return;

    const pixelSize = 10;
    const cakePixels = [
        { x: 2, y: 0, color: "pink" }, { x: 3, y: 0, color: "pink" }, { x: 4, y: 0, color: "pink" },
        { x: 1, y: 1, color: "saddlebrown" }, { x: 2, y: 1, color: "sandybrown" }, { x: 3, y: 1, color: "sandybrown" },
        { x: 4, y: 1, color: "sandybrown" }, { x: 5, y: 1, color: "saddlebrown" },
        { x: 0, y: 2, color: "saddlebrown" }, { x: 1, y: 2, color: "peru" }, { x: 2, y: 2, color: "sandybrown" },
        { x: 3, y: 2, color: "sandybrown" }, { x: 4, y: 2, color: "sandybrown" }, { x: 5, y: 2, color: "peru" },
        { x: 6, y: 2, color: "saddlebrown" },
        { x: 3, y: -1, color: "red" }, { x: 3, y: -2, color: "yellow" } // Candle
    ];

    cakePixels.forEach(pixel => {
        ctx.fillStyle = pixel.color;
        ctx.fillRect(cakePosition.x + pixel.x * pixelSize, cakePosition.y + pixel.y * pixelSize, pixelSize, pixelSize);
    });
}

// ✨ Function to Draw Falling Stars
function drawFallingStars() {
    fallingStars.forEach((star, index) => {
        drawStar(ctx, star.x, star.y, 5, 5, "white");
        star.y += star.speed; // Move star downward

        // Remove stars that go off-screen
        if (star.y > canvas.height) {
            fallingStars.splice(index, 1);
        }
    });
}

// 🎮 Game Update Loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCake();
    drawCharacter();
    drawFallingStars();
    checkCollision();
    requestAnimationFrame(update);
}

// 🎯 Arrow Key Movement
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") character.x += character.speed;
    if (event.key === "ArrowLeft") character.x -= character.speed;
    if (event.key === "ArrowUp") character.y -= character.speed;
    if (event.key === "ArrowDown") character.y += character.speed;
});

// 🎂 Show Message Box Function
function showMessage(text) {
    document.getElementById("messageText").innerText = text;
    document.getElementById("messageBox").style.display = "block";
}

// ❌ Close Message Box
document.getElementById("closeMessage").addEventListener("click", function() {
    document.getElementById("messageBox").style.display = "none";
});

// 🔥 Collision Detection - Show Retro Message!
function checkCollision() {
    let starSize = 15;
    let cakeSize = 70; // Approximate size of cake

    if (
        character.x < cakePosition.x + cakeSize &&
        character.x + starSize > cakePosition.x &&
        character.y < cakePosition.y + cakeSize &&
        character.y + starSize > cakePosition.y
    ) {
        document.getElementById("hiddenMessage").style.display = "block";
        showMessage("🎁 HAPPY 20TH BIRTHDAY!!! I LOVE YOU!!! 🎉");
        showCake = false; // Hide the cake after collision

        // 🌟 Start Falling Stars!
        for (let i = 0; i < 20; i++) {
            fallingStars.push({
                x: Math.random() * canvas.width, // Random X position
                y: Math.random() * -50, // Start above screen
                speed: Math.random() * 3 + 1 // Random falling speed
            });
        }
    }
}

// 🎵 Start Button - Plays Music & Shows Cake
document.getElementById("startButton").addEventListener("click", function() {
    showMessage("🎂 Happy Birthday, Caitlin!!! Press OK to start the game! 🚀");
    document.getElementById("bgMusic").play();
    showCake = true;
    update();
});

// 🏁 Initialize Game
update();
