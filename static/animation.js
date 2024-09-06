const curtain = document.getElementsByClassName("curtain")[0];
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

window.addEventListener('resize', 
    function() {
        curtain.width = this.innerWidth;
        curtain.height = this.innerHeight;
        mouse.radius = ((curtain.height / 80) * (curtain.height) / 80);
        init();
    }
);

particlesJS("particles-js", {
    "particles": {
        "number": {
        "value": 50
        },
        "color": {
        "value": "#383838"
        },
        "opacity": {
        "value": 0.5
        },
        "size": {
        "value": 8,
        "random": true,
        "anim": {
            "enable": true,
            "speed": 6,
            "size_min": 0.1,
            "sync": false
        }
        },
        "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#8c561f",
        "opacity": 0.4,
        "width": 1
        },
        "move": {
        "speed": 2
        }
    },
    "interactivity": {
        "events": {
        "onhover": {
            "enable": true,
            "mode": "grab"
        }
        }
    }
    });