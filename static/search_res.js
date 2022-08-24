var people = document.getElementsByClassName("research-item");
var names = [];
var ids = [];
for (var i = 0; i < people.length; i++) {
	ids.push(people[i].getAttribute("id"));
	var h5s = people[i].getElementsByClassName("research-item-body")[0].getElementsByTagName("h5");
	// if (h5s.length > 0)
	names.push(h5s[0].innerHTML.toLowerCase());
	// else
	// 	names.push(people[i].getElementsByClassName("member-info")[0].getElementsByTagName("h7")[0].innerHTML.toLowerCase());
}

$("#search-bar").on("keyup", function() {

	if ($(this).val().length > 0) {
		var lower = $(this).val().toLowerCase();
		$(".research-item").attr("data-aos", " ");
		$(".research-item").hide();
		// $(".sub-title").hide();
		// $(".member-classification").hide();

		for (var j = 0; j < names.length; j++) {
			if (lower == names[j].substring(0, lower.length)) {
				var cloned = $("#"+ids[j]).clone();
				cloned.attr("class", "research-item clone");
				cloned.insertBefore("#start");
				cloned.show();
			}
		}
	}
});

$("#search-bar").on("keydown", function() {

	if ( $(this).val().length == 1 || $(this).val().length == 0 ) {
		$(".clone").remove();
		$(".research-item").attr("data-aos", "zoom-in-up");
		$(".research-item").show();
		// $(".sub-title").show();
		// $(".member-classification").show();
	}

});
