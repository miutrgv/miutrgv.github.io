/*
    Get HTML elements.
    curtain: Where our particles are going to be loaded into.
    home: Contains the home page content, so news and lab info.
    title: Is the MI@UTRGV logo.
*/
const particle_div = document.getElementById("particles-js");
const home = document.getElementById("home");
const title = document.getElementById("main-title-logo");

// Get window dimensions
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Set the margin of the home div according to the screen height.
home.style.marginTop = ( (windowHeight * 0.6 ) + 55) + "px";
particle_div.style.height = (windowHeight * 0.6) + "px";

if (windowWidth > ((windowHeight * 0.6 / 2) * 3)) {
        title.style.width = ((windowHeight * 0.6 / 2) * 3) + "px";
        title.style.marginTop = (windowHeight * 0.6 / 4) + "px";
}
else {
        title.style.width = windowWidth + "px";
        title.style.marginTop = (windowHeight * 0.6 / 4) + "px";
}

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