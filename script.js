document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 300;

    const character = {
        x: 50,
        y: 150,
        speed: 5
    };

    const startButton = document.getElementById("startButton");
    const bgMusic = document.getElementById("bgMusic");
    let showCake = false;
    let fallingStars = [];

    const cakePosition = { x: 170, y: 120 };

    // ⭐️ Start Button - Plays Music & Shows Cake
    startButton.addEventListener("click", function() {
        console.log("Start button clicked!");
        showMessage("🎂 Happy Birthday, Caitlin!!! Press OK to start the game! 🚀");
        bgMusic.play();
        showCake = true;
        update(); // ✅ Start the update loop
    });

    // 🎮 Arrow Key Movement (Now Works!)
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowRight") character.x += character.speed;
        if (event.key === "ArrowLeft") character.x -= character.speed;
        if (event.key === "ArrowUp") character.y -= character.speed;
        if (event.key === "ArrowDown") character.y += character.speed;

        update(); // ✅ Redraws after movement
    });

    // ⭐️ Function to Draw a Star Shape (Character)
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

    // ⭐️ Function to Draw the Character
    function drawCharacter() {
        drawStar(ctx, character.x, character.y, 15, 5, "yellow");
    }

    // 🍰 Function to Draw Cake
    function drawCake() {
        const pixelSize = 10;
        const cakePixels = [
            { x: 2, y: 0, color: "pink" }, { x: 3, y: 0, color: "pink" }, { x: 4, y: 0, color: "pink" },
            { x: 1, y: 1, color: "saddlebrown" }, { x: 2, y: 1, color: "sandybrown" }, { x: 3, y: 1, color: "sandybrown" },
            { x: 4, y: 1, color: "sandybrown" }, { x: 5, y: 1, color: "saddlebrown" },
            { x: 0, y: 2, color: "saddlebrown" }, { x: 1, y: 2, color: "peru" }, { x: 2, y: 2, color: "sandybrown" },
            { x: 3, y: 2, color: "sandybrown" }, { x: 4, y: 2, color: "sandybrown" }, { x: 5, y: 2, color: "peru" },
            { x: 6, y: 2, color: "saddlebrown" },
            { x: 3, y: -1, color: "red" }, { x: 3, y: -2, color: "yellow" }
        ];

        cakePixels.forEach(pixel => {
            ctx.fillStyle = pixel.color;
            ctx.fillRect(cakePosition.x + pixel.x * pixelSize, cakePosition.y + pixel.y * pixelSize, pixelSize, pixelSize);
        });
    }

    // 🎂 Show Message Box
    function showMessage(text) {
        document.getElementById("messageText").innerText = text;
        document.getElementById("messageBox").style.display = "block";
    }

    // ❌ Close Message Box
    document.getElementById("closeMessage").addEventListener("click", function() {
        document.getElementById("messageBox").style.display = "none";
    });

    // 🎮 Game Update Loop (Now includes Cake!)
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (showCake) drawCake(); // ✅ Now the cake appears
        drawCharacter();
        requestAnimationFrame(update);
    }

    update(); // ✅ Draws the star immediately on page load
});
