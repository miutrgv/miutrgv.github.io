function showNavbar(page) {

    // Dictionary to determine which link is active.
    var links = {
        home: '',
        research: '',
        people: '',
        public: '',
        sponsors: '',
        about: ''
    }
    links[page] = 'id="current"';

    // Get nav element in page.
    var nav = document.getElementById('mi-navbar');
    nav.classList.add('navbar', 'fixed-top', 'navbar-expand-lg');

    // Create and append navbar icon.
    var img = document.createElement('a');
    img.classList.add('navbar-brand');
    img.setAttribute('href', '/');
    img.innerHTML = '<img id="brand-img" src="https://miutrgv.github.io/images/navbar/nav-logo.svg?01">';
    nav.append(img);

    // Create and append toggle button for phones/small screens.
    var button = document.createElement('button');
    button.classList.add('navbar-toggler');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'collapse');
    button.setAttribute('data-target', '#navbarText');
    button.setAttribute('aria-controls', 'navbarText');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Toggle navigation');
    button.innerHTML = '<span class="navbar-toggler-icon"><img src="https://miutrgv.github.io/images/navbar/reorder.png"/></span>';
    nav.append(button);

    // Create and append navigation links
    var div = document.createElement('div');
    div.classList.add('collapse', 'navbar-collapse');
    div.setAttribute('id', 'navbarText');

    var ul = document.createElement('ul');
    ul.classList.add('navbar-nav', 'mr-auto');
    if (page == "research-topic") {
        ul.innerHTML = '<li id="nav-opt1" class="nav-item"><a class="nav-link" href="../">Home</a></li>';
        ul.innerHTML += '<li id="nav-opt2" class="nav-item"><a id="current" class="nav-link" href="../research.html">Research</a></li>';
        ul.innerHTML += '<li id="nav-opt3" class="nav-item"><a class="nav-link" href="../people.html">People</a></li>';
        ul.innerHTML += '<li id="nav-opt4" class="nav-item"><a class="nav-link" href="../publications.html">Publications</a></li>';
        ul.innerHTML += '<li id="nav-opt5" class="nav-item"><a class="nav-link" href="../sponsors.html">Sponsors</a></li>';
        ul.innerHTML += '<li id="nav-opt6" class="nav-item"><a class="nav-link" href="../about.html">About Us</a></li>';
    }
    else {
        ul.innerHTML = '<li id="nav-opt1" class="nav-item"><a '+links.home+' class="nav-link" href="/">Home</a></li>';
        ul.innerHTML += '<li id="nav-opt2" class="nav-item"><a '+links.research+' class="nav-link" href="research.html">Research</a></li>';
        ul.innerHTML += '<li id="nav-opt3" class="nav-item"><a '+links.people+' class="nav-link" href="people.html">People</a></li>';
        ul.innerHTML += '<li id="nav-opt4" class="nav-item"><a '+links.public+' class="nav-link" href="publications.html">Publications</a></li>';
        ul.innerHTML += '<li id="nav-opt5" class="nav-item"><a '+links.sponsors+' class="nav-link" href="sponsors.html">Sponsors</a></li>';
        ul.innerHTML += '<li id="nav-opt6" class="nav-item"><a '+links.about+' class="nav-link" href="about.html">About Us</a></li>';
    }

    div.append(ul);
    nav.append(div);

    var dir = '';
    if (page == "research-topic") {
        dir = '../';
    }

    // Create and append People dropdown links.
    var opt3 = document.createElement('div');
    opt3.classList.add('drop-down');
    opt3.setAttribute('id', 'people-opt');
    opt3.innerHTML = '<a class="nav-link" href="'+dir+'people.html#research-teams">Research Teams</a>';
    opt3.innerHTML += '<a class="nav-link" href="'+dir+'people.html#collaborators">Collaborators</a>';
    opt3.innerHTML += '<a class="nav-link" href="'+dir+'people.html#faculty">Faculty</a>';
    opt3.innerHTML += '<a class="nav-link" href="'+dir+'people.html#alumni">Alumni</a>';

    document.getElementById('nav-opt3').append(opt3);

    dir = 'research/';
    if (page == "research-topic") {
        dir = '';
    }

    // Create and append Research dropdown links.
    var opt2 = document.createElement('div');
    opt2.classList.add('drop-down');
    opt2.setAttribute('id', 'research-opt');
    opt2.innerHTML = '<a class="nav-link" href="'+dir+'humanoid-locomotion.html">Humanoid Locomotion Simulation</a>';
    opt2.innerHTML += '<a class="nav-link" href="'+dir+'hea-property-prediction.html">HEA Property Prediction</a>';
    opt2.innerHTML += '<a class="nav-link" href="'+dir+'drug-discovery.html">Structural-Based Virtual Screening</a>';
    opt2.innerHTML += '<a class="nav-link" href="'+dir+'bee-monitoring.html">Honey Bee Monitoring</a>';
    opt2.innerHTML += '<a class="nav-link" href="'+dir+'concrete-conductivity.html">Concrete Conductivity Simulation</a>';
    opt2.innerHTML += '<a class="nav-link" href="'+dir+'pose-estimation.html">Pose Estimation</a>';
    opt2.innerHTML += '<a class="nav-link" href="'+dir+'vcore.html">VCORE Emergency Management</a>';
    opt2.innerHTML += '<a class="nav-link" href="'+dir+'salinity-forecast.html">Rio Grande Salinity Forecast</a>';

    document.getElementById('nav-opt2').append(opt2);
}


// ---- What HTML Output of Above showNavbar() Function Looks Like. ----

/*
<nav class="navbar fixed-top navbar-expand-lg ">
    <a class="navbar-brand" href="/">
        <img src="images/navbar/miutrgv_navbar.svg" width="190px;">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"><img src="images/navbar/reorder.png"/></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="research.html" id="current">Research</a>
                <div id="research-opt" class="drop-down">
                    <a class="nav-link" href="research/humanoid-locomotion.html">Humanoid Locomotion Simulation</a>
                    <a class="nav-link" href="research/hea-property-prediction.html">HEA Property Prediction</a>
                    <a class="nav-link" href="research/drug-discovery.html">Structural-Based Virtual Screening</a>
                    <a class="nav-link" href="research/bee-monitoring.html">Honey Bee Monitoring</a>
                    <a class="nav-link" href="research/concrete-conductivity.html">Concrete Conductivity Simulation</a>
                    <a class="nav-link" href="research/pose-estimation.html">Pose Estimation</a>
                </div>
            </li>
            <li class="nav-item">
                <a id="people-link" class="nav-link" href="people.html">People</a>
                <div id="people-opt" class="drop-down">
                    <a class="nav-link" href="people.html#research-teams">Research Teams</a>
                    <a class="nav-link" href="people.html#collaborators">Collaborators</a>
                    <a class="nav-link" href="people.html#faculty">Faculty</a>
                    <a class="nav-link" href="people.html#alumni">Alumni</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="publications.html">Publications</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="sponsors.html">Sponsors</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="about.html">About Us</a>
            </li>
        </ul>
    </div>
</nav>
*/