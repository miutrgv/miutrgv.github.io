var search = {

	"pgra": [0, 1, 2, 3, 5, 7, 9],
	"ra": [4, 6, 8, 10, 21],
	"graduate": [0, 1, 2, 3, 5, 7, 9, 10],
	"undergrad": [4, 6, 8, 21],
	"student": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	"md": [0],
	"rysul": [0],
	"kabir": [0],
	"jose": [1],
	"aguilar": [1],
	"sufian": [2],
	"rafaqut": [2],
	"uriel": [3],
	"gonzalez": [3, 18],
	"andrea": [4],
	"cantu": [4],
	"armando": [5],
	"herrera": [5],
	"kevin": [6],
	"de la garza": [6],
	"homero": [7],
	"benavides": [7],
	"richard": [8],
	"farias": [8],
	"austin": [9],
	"karingada": [9],
	"joselito": [10],
	"guardado": [10],
	"dr": [11, 12, 13, 14, 15, 16, 20],
	"professor": [11, 12, 13, 14, 15, 16],
	"associate": [12, 14, 15],
	"assistant": [16],
	"lecturer": [17, 18, 20],
	"engineer": [19],
	"joanne": [11],
	"rampersad": [11],
	"ammons": [11],
	"emmett": [12],
	"tomai": [12],
	"zhixiang": [13],
	"chen": [13],
	"jungseok": [14],
	"ho": [14],
	"mark": [15],
	"chu": [15],
	"dongchul": [16],
	"kim": [16],
	"carlos": [17],
	"pena": [17],
	"caballero": [17],
	"adolfo": [18],
	"osvaldo": [19],
	"castellanos": [19],
	"erik": [20],
	"enriquez": [20],
	"ramon": [21],
	"hinojosa": [21]
};

$("#search-bar").on("keyup", function() {

	var lower = $(this).val().toLowerCase();
	var words = lower.split(" ");

	words.forEach( word => {
		if ( search[word] != null) {
			$(".member").attr("data-aos", " ");
			$(".member").hide();
			$(".team-name").hide();
			$(".sub-title").hide();
			search[word].forEach( id => {
				var cloned = $("#"+id).clone();
				cloned.attr("class", "member clone");
				cloned.insertBefore("#start");
				cloned.show();
			});
		}
	});

});

$("#search-bar").on("keydown", function() {

	if ( $(this).val().length == 1 || $(this).val().length == 0 ) {
		$(".clone").remove();
		$(".team-name").show();
		$(".member").attr("data-aos", "zoom-in-up");
		$(".member").show();
		$(".sub-title").show();
	}

});
