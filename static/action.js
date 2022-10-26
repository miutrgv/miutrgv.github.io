// ---------------- Top Navbar --------------

// Show dropdown links for People.
$("#nav-opt3").on("mouseover", function() {
    document.getElementById('people-opt').style.height = '185px';
});
$("#nav-opt3").on("mouseleave", function() {
    document.getElementById('people-opt').style.height = '0px';
});

// Show dropdown links for Research.
$("#nav-opt2").on("mouseover", function() {
    document.getElementById('research-opt').style.height = '355px';
});
$("#nav-opt2").on("mouseleave", function() {
    document.getElementById('research-opt').style.height = '0px';
});

//
$(".navbar-toggler").on("click", function() {
	document.getElementById("mi-navbar").style.height = 'auto';
});


// ---------------- Bottom Navbar -----------

// Redirect to UTRGV home page.
$("#utrgv-logo").on("click", function() {

	location.href = "https://www.utrgv.edu/en-us/index.php";

});


// --------------- People Page --------------------

// Zooms in picture and changes border color to orange.
$(".member").on("mouseover", function() {

    $(this).find("img").css("padding", "0");
    $(this).find(".member-info").css("border-top", "5px solid #F05023");
});
$(".member").on("mouseleave", function() {

    $(this).find("img").css("padding", "10px");
    $(this).find(".member-info").css("border-top", "5px solid black");
});


// --------------- People Page --------------------

// Zooms in picture and changes border color to orange.
$(".research-item").on("mouseover", function() {

    $(this).find("img").css("padding", "0");
    $(this).find(".research-item-body").css("border-top", "5px solid #F05023");
});
$(".research-item").on("mouseleave", function() {

    $(this).find("img").css("padding", "10px");
    $(this).find(".research-item-body").css("border-top", "5px solid black");
});


// --------------- Publications Page --------------

// Sorts publications alphabetically according to the article's title.
$("#sort-button").on("click", async function() {
	event.preventDefault();

	let titles = [];

	$(".articles").each( function() {
		titles.push($(this));
	});

	titles.sort(function(a, b) {
		if (a.find("h5").text() < b.find("h5").text()) {
			return -1;
		}
		else {
			return 1;
		}
	});

	$(".articles").hide();

	$.each(titles, function() {
		$(this).show()
		$(this).insertBefore("#start");
	});

});