var search = {
	"biswas": [0, 2, 3, 6, 8, 9, 12, 13, 14],
	"kim": [-1],
	"kang": [0, 2, 3, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 19, 21, 23],
	"gao": [0, 2, 3, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
	"pena": [1, 29],
	"caballero": [1, 29],
	"cantu": [1],
	"rodriguez": [1],
	"gonzalez": [1],
	"castellanos": [1],
	"strait": [1],
	"son": [1],
	"yang": [2, 3, 22, 24, 25, 26, 27],
	"wang": [2, 3, 16, 22, 24, 25, 26],
	"xiang": [4],
	"lian": [4],
	"liu": [5, 6, 7, 9, 12, 13, 15, 16, 18, 19, 20],
	"park": [6, 13],
	"zarayeneh": [7],
	"ko": [7],
	"oh": [7],
	"suh": [7],
	"ajam": [10],
	"hossain": [10],
	"tasnim": [10],
	"castanuela": [10],
	"ramos": [10],
	"choi": [10],
	"hill": [11],
	"steven": [11],
	"ding": [14],
	"zhang": [14, 25],
	"wu": [14, 25],
	"li": [19],
	"lee": [28],
	"basu": [28],
	"das": [28]
}

$("#search-bar").on("keyup", function() {

	var lower = $(this).val().toLowerCase();
	var words = lower.split(" ");

	words.forEach( word => {
		if ( search[word] != null) {
			$(".articles").hide();
			search[word].forEach( id => {
				if (id == -1) {
					$(".articles").show();
				}
				else {
					$("#"+id).show();
				}
			});
		}
	});

});

$("#search-bar").on("keydown", function() {

	if ( $(this).val().length == 1 ) {
		$(".articles").show();
	}

});

$("#sort-articles").on("click", function() {
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
