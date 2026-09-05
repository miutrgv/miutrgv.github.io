// Populates the research page from data/research.json.
// To add a project, append an entry to that file -- no HTML changes needed.
//
// Each entry supports:
//   id          unique anchor id used by the search bar
//   title       project name shown in the heading
//   image       thumbnail path or URL
//   overview    short blurb shown before the "Read More" link
//   readMore    page with the full write-up
//   projectLink optional live-demo URL, renders the orange button
//   members     list of { name, profile, image }
//   hidden      set to true to keep an entry without showing it

var RESEARCH_DATA = "data/research.json";

// Scripts that bind to .research-item elements, so they only run once the
// projects below have been added to the page.
var RESEARCH_DEPENDENTS = ["static/action.js?04", "static/search_res.js?01"];

function escapeHtml(value) {
	return String(value == null ? "" : value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function buildMembers(members) {
	if (!members || members.length === 0) {
		return "";
	}

	var html = '<div class="collaborator">\n<p><strong>Members:</strong></p>\n';

	members.forEach(function(member) {
		html += '<a href="' + escapeHtml(member.profile) + '">' +
			'<img src="' + escapeHtml(member.image) + '" title="' + escapeHtml(member.name) + '"/>' +
			'</a>\n';
	});

	return html + "</div>\n";
}

function buildResearchItem(project) {
	var overview = '<p>' + escapeHtml(project.overview) +
		' <a href="' + escapeHtml(project.readMore) + '"><strong class="ref-link">Read More</strong></a></p>\n';

	if (project.projectLink) {
		overview += '<br>\n<a class="ref-link-button" href="' + escapeHtml(project.projectLink) + '">View Project</a>\n';
	}

	return '<div id="' + escapeHtml(project.id) + '" data-aos="zoom-in-up" class="research-item">\n' +
		'<img class="research-img" src="' + escapeHtml(project.image) + '" />\n' +
		'<div class="research-item-body">\n' +
		'<h5>' + escapeHtml(project.title) + '</h5>\n' +
		'<div class="overview">\n' + overview + '</div>\n' +
		buildMembers(project.members) +
		'</div>\n</div>\n';
}

// Loads the given scripts one after another so their original order is kept.
function loadScripts(sources) {
	var next = sources.shift();

	if (!next) {
		return;
	}

	var script = document.createElement("script");
	script.src = next;
	script.onload = function() { loadScripts(sources); };
	script.onerror = function() { loadScripts(sources); };
	document.body.appendChild(script);
}

function showResearch() {
	fetch(RESEARCH_DATA)
		.then(function(response) {
			if (!response.ok) {
				throw new Error("Could not load " + RESEARCH_DATA + " (" + response.status + ")");
			}
			return response.json();
		})
		.then(function(projects) {
			var html = "";

			projects.forEach(function(project) {
				if (!project.hidden) {
					html += buildResearchItem(project);
				}
			});

			document.getElementById("start").insertAdjacentHTML("afterend", html);

			// The cards were added after AOS scanned the page.
			if (window.AOS) {
				AOS.refreshHard();
			}
		})
		.catch(function(error) {
			console.error(error);
		})
		.then(function() {
			loadScripts(RESEARCH_DEPENDENTS.slice());
		});
}

showResearch();
