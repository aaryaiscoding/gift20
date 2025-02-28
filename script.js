document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 300;

    const character = {
        x: 50,
        y: 200,
        speed: 5
    };

    const startButton = document.getElementById("startButton");
    const bgMusic = document.getElementById("bgMusic");
    let showCake = false;
    let fallingStars = [];

    // 🎮 Start Button - Plays Music & Starts Game
    startButton.addEventListener("click", function() {
        console.log("Start button clicked!");
        showMessage("🎂 Happy Birthday, Caitlin!!! Press OK to start the game! 🚀");
        bgMusic.play();
        showCake = true;
        update();
    });

    // ⭐️ Function to Draw a Star
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

    // 🎂 Function to Show Message Box
    function showMessage(text) {
        document.getElementById("messageText").innerText = text;
        document.getElementById("messageBox").style.display = "block";
    }

    // ❌ Close Message Box
    document.getElementById("closeMessage").addEventListener("click", function() {
        document.getElementById("messageBox").style.display = "none";
    });

    // 🎮 Game Update Loop
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCharacter();
        requestAnimationFrame(update);
    }
});
