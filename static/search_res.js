var search = {

	"ehive": [0],
	"embedded": [0],
	"system": [0, 5],
	"for": [0],
	"honeybee": [0],
	"hive": [0],
	"monitoring": [0],
	"biomarker": [1],
	"discovery": [1],
	"biological": [1],
	"network": [1],
	"and": [1, 4],
	"drug": [1],
	"design": [1],
	"mad3pg": [2],
	"multi": [2],
	"agent": [2],
	"reinforcement": [2],
	"learning": [2, 5],
	"rlm": [3],
	"adaptive": [3],
	"gradient": [3],
	"descent": [3],
	"optimization": [3],
	"algorithm": [3],
	"atr": [4],
	"sar": [4],
	"object": [4],
	"detection": [4, 5],
	"recognition": [4],
	"using": [4],
	"inverse": [4],
	"synthetic": [4],
	"aperture": [4],
	"radar": [4],
	"deepids": [5],
	"deep": [5],
	"intrusion": [5],
	"dr": [0, 4],
	"kim": [0, 4],
	"joanne": [0],
	"ammons": [0],
	"kai": [0],
	"carlos": [4],
	"caballero": [4],
	"adolfo": [4],
	"gonzalez": [4],
	"osvaldo": [4],
	"castellanos": [4]
};

$("#search-bar").on("keyup", function() {

	var lower = $(this).val().toLowerCase();
	var words = lower.split(" ");

	words.forEach( word => {
		if ( search[word] != null) {
			$(".research-item").attr("data-aos", " ");
			$(".research-item").hide();
			//$(".team-name").hide();
			//$(".sub-title").hide();
			search[word].forEach( id => {
				var cloned = $("#"+id).clone();
				cloned.attr("class", "research-item aos-init aos-animate clone");
				cloned.insertBefore("#start");
				cloned.show();
			});
		}
	});

});

$("#search-bar").on("keydown", function() {

	if ( $(this).val().length == 1 || $(this).val().length == 0 ) {
		$(".clone").remove();
		$(".research-item").show();
		$(".research-item").attr("data-aos", "zoom-in-up");
		//$(".member").show();
		//$(".sub-title").show();
	}

});
