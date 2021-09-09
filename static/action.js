
// ---------------------- Bottom Navbar ---------------------------

$("#utrgv-logo").on("click", function() {

	location.href = "https://www.utrgv.edu/en-us/index.php";

});

// ---------------- Home Page ---------------

$(".boxes").on("mouseover", function() {

	$(this).find("h4").css("color", "#F05023");
	$(this).find("p").css("color", "#F05023");
});

$(".boxes").on("mouseleave", function() {

	$(this).find("h4").css("color", "black");
	$(this).find("p").css("color", "#585858");
});


// ---------------- Research Page -------------- 

$(".research-item").on("mouseover", function() {

    $(this).find(".research-img").css("padding", "0");
    $(this).find(".carousel-control-prev").css("background-color", "black");
    $(this).find(".carousel-control-next").css("background-color", "black");
    $(this).find(".research-item-body").css("border-top", "6px solid #F05023");
    $('.carousel').carousel('pause');
});

$(".research-item").on("mouseleave", function() {

    $(this).find(".research-img").css("padding", "10px");
    $(this).find(".carousel-control-prev").css("background-color", "transparent");
    $(this).find(".carousel-control-next").css("background-color", "transparent");
    $(this).find(".research-item-body").css("border-top", "6px solid black");
    $('.carousel').carousel('cycle');
});


//$("#ehive").on("click", function() {
//    window.location.href = "bee.utrgv.edu";
//});

// --------------- People Page --------------------

$(".member").on("mouseover", function() {

    $(this).find("img").css("padding", "0");
    $(this).find(".member-info").css("border-top", "5px solid #F05023");
});

$(".member").on("mouseleave", function() {

    $(this).find("img").css("padding", "10px");
    $(this).find(".member-info").css("border-top", "5px solid black");
});

var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       $("#people-nav").hide();
   } else {
		$("#people-nav").show();
   }
   lastScrollTop = st;
});


// --------------- Publications Page --------------

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

// --------------------------- About Page -----------------------------------

