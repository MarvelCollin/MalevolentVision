
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: canvas.width / 2, y: canvas.height / 2, width: 50, height: 50, speed: 0.5 };
let boxes = [
    { x: 200, y: 200, width: 100, height: 100 },
    { x: 400, y: 150, width: 150, height: 150 },
];
let flashlight = {
    angle: Math.PI / 4,
    radius: 400, 
    rotation: 0
};

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBoxes() {
    ctx.fillStyle = 'grey';
    boxes.forEach(box => {
        ctx.fillRect(box.x, box.y, box.width, box.height);
    });
}

function isPointInBox(x, y) {
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
            return true;
        }
    }
    return false;
}

function drawFlashlight() {
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    
    let steps = 50;
    for (let i = -flashlight.angle; i < flashlight.angle; i += flashlight.angle * 2 / steps) {
        let angle = flashlight.rotation + i;
        let x = centerX;
        let y = centerY;
        let blocked = false;

        for (let r = 0; r < flashlight.radius; r += 5) {
            let nextX = centerX + r * Math.cos(angle);
            let nextY = centerY + r * Math.sin(angle);

            if (isPointInBox(nextX, nextY)) {
                blocked = true;
                x = nextX;
                y = nextY;
                break;
            }

            x = nextX;
            y = nextY;
        }

        ctx.lineTo(x, y);
    }
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    movePlayer();
    drawBoxes();
    drawPlayer();
    drawFlashlight();
    requestAnimationFrame(drawScene);
}

function updateFlashlightRotation(e) {
    const dx = e.clientX - (player.x + player.width / 2);
    const dy = e.clientY - (player.y + player.height / 2);
    flashlight.rotation = Math.atan2(dy, dx);
    drawScene();
}

window.addEventListener('mousemove', updateFlashlightRotation);

let keys = {};

function movePlayer() {
    if (keys['w']) player.y -= player.speed;
    if (keys['a']) player.x -= player.speed;
    if (keys['s']) player.y += player.speed;
    if (keys['d']) player.x += player.speed;
    console.log(player.speed);
}

window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

drawScene();