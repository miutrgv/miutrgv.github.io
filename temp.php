<?php

	include '../phpfiles/newscred.php';

        $req = "SELECT * FROM News";
        $result = $conn->query($req);
        class Article {
        	public $title;
                public $body;
		public $date;
        }
        $news = array();
        $i = 0;
        while ( $row = $result->fetch_assoc() ) {
        	$news[$i] = new Article();
                $news[$i]->title = $row['title'];
                $news[$i]->body = $row['body'];
		$news[$i]->date = $row['date'];
                $i++;
        }

?>

<!DOCTYPE html>
<html>
<head>
	<title>Home</title>
	<link rel="icon" href="images/navbar/miutrgv_logo.ico" type="image/x-icon">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link rel="stylesheet" href="static/stylesheet.css?123">
        <link rel="stylesheet" href="static/navbar.css?123">

	<style>
		#home {margin-top: 200px;}
		#news {margin-top: 120px;}
		.article-title h5 {font-size: 24px;}
		.article-body textarea {width: 100%;}
		.home-info {width: 70rem; padding-top: 35rem; transition: 0.8s;}
		#home-carousel {width: 75rem; height: 55rem; padding: 0; display: inline-block; margin-top: -90px;}
		@media only screen and (max-width: 1500px) {
			#home-carousel {width: 55rem; height: 40rem;}
			.home-info {width: 50rem; padding-top: 25rem;}
		}
		#main-title {padding: 0; margin: 0;}
		#main-title-logo {padding: 0 25px; width: 250px; height: 250px; display: inline-block;}
	</style>
</head>
    <body>

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
                <a class="nav-link" href="index.html" id="current">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="research.html">Research</a>
              </li>
              <li class="nav-item">
                <a id="people-link" class="nav-link" href="people.html">People</a>
                <div id="drop-down">
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

        <canvas id="curtain"></canvas>
        <div id="main-title">
	<div id="main-title-logo">
          <img src="images/home/miutrgv_home.svg"/>
          <div class="line"></div>
        </div>
	</div>

        <div id="home">

          <div id="news">
                <div id="news-title">
                        <h4>News</h4>
                </div>
                <div id="news-articles">
		<?php
			for($i = 0; $i < count($news); $i++) {
                        	echo '<div class="article">';
                                	echo '<div class="article-title">';
                                        	echo '<h5>', $news[$i]->title ,'</h5>';
                                	echo '</div>';
                                	echo '<div class="article-body">';
                                        	echo '<textarea rows="8" readonly>', $news[$i]->body ,'</textarea>';
                                	echo '</div>';
                                	echo '<div class="article-date">';
                                        	echo '<p>', $news[$i]->date ,'</p>';
                                	echo '</div>';
                        	echo '</div>';
			}
		?>
		</div>
	  </div>

	<div style="text-align: center; width: 100%; padding-top: 125px;">

                <div id="news-title">
                        <h4>Research Topics</h4>
                </div>

          <div id="home-carousel">

            <div id="ml-home-info" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
		<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
		<li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
              </ol>
              <div class="carousel-inner">

                <div class="carousel-item active">
                  <div class="home-info">
                    <div class="home-left">
                      <img src="images/home/robot.jpg" />
                    </div>
                    <div class="home-right home-text">
                      <h4>Machine Learning</h4>
                      <p>Machine learning is the scientific study of algorithms and statistical models that computer systems use to perform a specific.</p>
		      <button onclick="window.location.href = 'https://en.wikipedia.org/wiki/Machine_learning';">Learn More</button>
                    </div>
                  </div>
                </div>

                <div class="carousel-item">
                  <div class="home-info">
                    <div class="home-left home-text">
                      <h4>Bioinfomatics</h4>
                      <p>Bioinformatics is an interdisciplinary field that develops methods and software tools for understanding biological data. As an interdisciplinary field of science.</p>
                      <button onclick="window.location.href = 'https://en.wikipedia.org/wiki/Bioinformatics';">Learn More</button>
		    </div>
                    <div class="home-right">
                      <img src="images/home/dna.jpg" />
                    </div>
                  </div>
                </div>

                <div class="carousel-item">
                  <div class="home-info">
                    <div class="home-left">
                      <img src="images/home/cyber-security.jpg" />
                    </div>
                    <div class="home-right home-text">
                      <h4>Cyber Security</h4>
                      <p>Cyber Security is the protection of computer systems and networks from the theft of or damage to their hardware, software, or electronic data, as well as from the disruption or misdirection of the services they provide.</p>
                      <button onclick="window.location.href = 'https://en.wikipedia.org/wiki/Computer_security';">Learn More</button>
                    </div>
                  </div>
                </div>

                <div class="carousel-item">
                  <div class="home-info">
                    <div class="home-left home-text">
                      <h4>Robotics</h4>
                      <p>Robotics deals with the design, construction, operation, and use of robots, as well as computer systems for their control, sensory feedback, and information processing.</p>
                      <button onclick="window.location.href = 'https://en.wikipedia.org/wiki/Robotics';">Learn More</button>
                    </div>
                    <div class="home-right">
                      <img src="images/home/robotics.jpeg" />
                    </div>
                  </div>
                </div>

              </div>
              <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>

          </div>
	</div>

          <div class="info">

            <div class="links">
              <h4> <abbr title="attribute">Links</abbr> </h4>
              <ul>
                  <li><a href="index.html">Home</a></li>
                  <li><a href="people.html">People</a></li>
                  <li><a href="research.html">Research</a></li>
                  <li><a href="publications.html">Publications</a></li>
                  <li><a href="sponsors.html">Sponsors</a></li>
                  <li><a href="about.html">About Us</a></li>
              </ul>
            </div>
  
            <div class="location-map">
              <h4> <abbr title="attribute">Location</abbr> </h4>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14306.349603668754!2d-98.174096!3d26.3074725!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2cdc1bf01639f10c!2sUniversity%20of%20Texas%20Rio%20Grande%20Valley!5e0!3m2!1sen!2sus!4v1582001880791!5m2!1sen!2sus" width="100%" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
              <p><a href="https://www.utrgv.edu/en-us/">University of Texas - Rio Grande Valley</a>, Edinburg TX 78539</p>
              <p><a href="https://www.utrgv.edu/csci/index.htm">College of Engineering and Computer Science</a></p>
            </div>
  
            <div class="nav-contact-us">
              <h4> <abbr title="attribute">Contact Us</abbr> </h4>
              <img id="utrgv-logo" src="images/navbar/utrgv-logo2.jpg">
              <p>MI@UTRGV</p>
              <p>EIEAB 2.210</p>
              <p>Email: <a href="mailto:csci@utrgv.edu" target="_top">csci@utrgv.edu</a></p>    
              <p>Phone: 956-665-2320</p>           
            </div>
  
        </div>

        </div>


        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script type="text/javascript" src="static/temp.js?1234"></script>
        <script type="text/javascript" src="static/action.js"></script>

    </body>
</html>
