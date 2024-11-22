/////////////// Search Publication //////////////////////
let articles = document.getElementsByClassName("articles");
let names = [];
let ids = [];
for (let i = 0; i < articles.length; i++) {
	ids.push(articles[i].getAttribute("id"));
	let h5s = articles[i].getElementsByTagName("h5");
	if (h5s.length > 0)
		names.push(h5s[0].innerHTML.toLowerCase());
}

$("#search-bar").on("keyup", function() {

	if ($(this).val().length > 0) {
		let lower = $(this).val().toLowerCase();
		$(".articles").hide();

		for (let j = 0; j < names.length; j++) {
			if (names[j].includes(lower)) {
				let cloned = $("#"+ids[j]).clone();
				cloned.attr("class", "articles clone");
				cloned.insertBefore("#start");
				cloned.show();
			}
		}
	}
});

$("#search-bar").on("keydown", function() {

	if ( $(this).val().length == 1 || $(this).val().length == 0 ) {
		$(".clone").remove();
		$(".articles").show();
	}
});

///////////////////// Sort Publications ////////////////////////

$("#sort-articles").on("click", function() {
	event.preventDefault();

	let titles = [];

	$(".articles").each( function() {
		titles.push($(this));
	});

	titles.sort(function(a, b) {
		if (a.find("h5").text().toLowerCase() < b.find("h5").text().toLowerCase()) {
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
