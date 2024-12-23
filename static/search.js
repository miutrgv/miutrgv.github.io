let people = document.getElementsByClassName("member");
let names = [];
let ids = [];
for (let i = 0; i < people.length; i++) {
	ids.push(people[i].getAttribute("id"));
	let h5s = people[i].getElementsByClassName("member-info")[0].getElementsByTagName("h5");
	if (h5s.length > 0)
		names.push(h5s[0].innerHTML.toLowerCase());
	else
		names.push(people[i].getElementsByClassName("member-info")[0].getElementsByTagName("h7")[0].innerHTML.toLowerCase());
}

$("#search-bar").on("keyup", function() {

	if ($(this).val().length > 0) {
		let lower = $(this).val().toLowerCase();
		$(".member").attr("data-aos", " ");
		$(".member").hide();
		$(".sub-title").hide();
		$(".member-classification").hide();

		for (let j = 0; j < names.length; j++) {
			if (names[j].includes(lower)) {
				let cloned = $("#"+ids[j]).clone();
				cloned.attr("class", "member clone");
				cloned.insertBefore("#start");
				cloned.show();
			}
		}
	}
});

$("#search-bar").on("keydown", function() {

	if ( $(this).val().length == 1 || $(this).val().length == 0 ) {
		$(".clone").remove();
		$(".member").attr("data-aos", "zoom-in-up");
		$(".member").show();
		$(".sub-title").show();
		$(".member-classification").show();
	}

});
