const curtain = document.getElementById("curtain");
const ctx = curtain.getContext("2d");
curtain.width = window.innerWidth;
curtain.height = window.innerHeight;

const home = document.getElementById("home");
home.style.marginTop = ( (window.innerHeight * 0.6 ) + 55) + "px";

const title = document.getElementById("main-title-logo");
var tempHeight = window.innerHeight * 0.6;
var tempWidth = window.innerWidth;

if (tempWidth > ((tempHeight / 2) * 3)) {
        title.style.width = ((tempHeight / 2) * 3) + "px";
        title.style.marginTop = (tempHeight / 4) + "px";
}
else {
        title.style.width = tempWidth + "px";
        title.style.marginTop = (tempHeight / 4) + "px";
}

let particleArray;

//get mouse postition
let mouse = {
    x: null,
    y: null,
    radius: (curtain.height/80) * (curtain.width/80),
}

window.addEventListener("mousemove", 
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#383838";
        ctx.fill();
    }
    // check particle position, check mouse position, move the particle,
    // draw the particle
    update() {
        //check if particle is still in curtain
        if(this.x > curtain.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > curtain.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        //check collisiton detection - mouse
        // positon / particle position
        let dx = mouse.x = this.x;
        let dy = mouse.y = this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < curtain.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < curtain.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.x > this.size * 10) {
                this.x -= 10;
            }      
        }
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw()
    }
}

// create particle array
function init() {
    particleArray = [];
    let numberOfParticles = (curtain.height * curtain.width) / 9000;
    for (let i = 0; i < numberOfParticles; i+=1) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * (( (innerHeight) - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = "#383838"

        particleArray.push(new Particle(x , y, directionX, directionY, size, color));
    }
}

// animation loop 
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight );

    for (let i = 0; i < particleArray.length; i+=1) {
        particleArray[i].update();
    }
    connect();
}

// check if particles are close enough to draw a line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) 
            + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            if (distance < (curtain.width/7) * (curtain.height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle="rgba(140, 85,31," + opacityValue + ")";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', 
    function() {
        curtain.width = this.innerWidth;
        curtain.height = this.innerHeight;
        mouse.radius = ((curtain.height / 80) * (curtain.height) / 80);
        init();
    }
);

window.addEventListener("mouseout",
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

init();
animate();
