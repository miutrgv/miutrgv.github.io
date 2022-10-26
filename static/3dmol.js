class Viewer {
    constructor(id, element) {
        this.viewer = $3Dmol.createViewer(element, {backgroundColor:'white'});
        this.id = id;
        this.style = {A: 'cartoon'};
        this.specs = {A: {color: 'green'}};
        this.hetatm = [];
        this.chains = [];
        this.sel_chain = 'ALL';
        this.speed = 0.5;
        this.spinning = false;
    }
    setChains(chains) {
        let obj = {};
        // Initializes the molecule chain's style, specs, and visibility.
        for (let i=0; i<chains.length; i++) {
            this.style[chains[i]] = 'cartoon';
            this.specs[chains[i]] = {color: 'green'};
            obj = {chain: chains[i], visible: true};
            this.chains.push(obj);
        }
    }
    setHETATM(hetatm) {
        // Initializes given HETATM.
        let obj = {hetatm: hetatm, visible: true};
        this.viewer.setStyle(hetatm[0], hetatm[1]);
        this.hetatm.push(obj);
    }
    resetHETATM() {
        // Resets all object and array variables.
        for (let i=0; i<this.hetatm.length; i++) {
            this.hetatm.pop();
        }
        for (let i=0; i<this.chains.length; i++) {
            this.chains.pop();
        }
        this.style = {A: 'cartoon'};
        this.sel_chain = 'ALL';
        this.spinning = false;
    }
    hideHETATM(hetatm) {
        // Hides specified HETATM.
        for (let i=0; i<this.hetatm.length; i++) {
            if (this.hetatm[i].hetatm[0].resn == hetatm) {
                if (hetatm == 'HOH')
                    this.viewer.setStyle({resn: hetatm}, {sphere:{hidden:true}});
                else
                    this.viewer.setStyle({resn: hetatm}, {stick:{hidden:true}});
                this.hetatm[i].visible = false;
                this.viewer.render();
                return;
            }
        }
    }
    showHETATM(hetatm) {
        // Shows specified HETATM.
        for (let i=0; i<this.hetatm.length; i++) {
            if (this.hetatm[i].hetatm[0].resn == hetatm) {
                this.viewer.setStyle(this.hetatm[i].hetatm[0], this.hetatm[i].hetatm[1]);
                this.viewer.render();
                this.hetatm[i].visible = true;
                return;
            }
        }
    }
    getViewer() {
        return this.viewer;
    }
    getID() {
        return this.id;
    }
    setStyle(style, spec) {
        let obj = {};
        for (let i=0; i<this.chains.length; i++) {
            // Update the style of ALL chains, if ALL chains selected.
            if (this.sel_chain == 'ALL') {
                if (spec != false) {
                    obj[style] = JSON.parse(spec);
                    obj[style].color = this.specs[this.chains[i].chain].color;
                }
                else
                    obj[style] = {color: this.specs[this.chains[i].chain].color};
                if (this.chains[i].visible)
                    this.viewer.setStyle({chain: this.chains[i].chain}, obj);
                else
                    this.viewer.setStyle({chain: this.chains[i].chain}, {cartoon: {hidden: true}});
                this.style[this.chains[i].chain] = style;
                this.specs[this.chains[i].chain] = obj[style];
            }
            // Updates the style of selected chain ONLY.
            else if (this.sel_chain == this.chains[i].chain) {
                if (spec != false) {
                    obj[style] = JSON.parse(spec);
                    obj[style].color = this.specs[this.sel_chain].color;
                }
                else
                    obj[style] = {color: this.specs[this.sel_chain].color};
                if (this.chains[i].visible)
                    this.viewer.setStyle({chain: this.sel_chain}, obj);
                else
                    this.viewer.setStyle({chain: this.sel_chain}, {cartoon: {hidden: true}});
                this.style[this.sel_chain] = style;
                this.specs[this.sel_chain] = obj[style];
            }
        }
        // Re-style HETATMs after setStyle().
        for (let i=0; i<this.hetatm.length; i++) {
            if (this.hetatm[i].visible)
                this.viewer.setStyle(this.hetatm[i].hetatm[0], this.hetatm[i].hetatm[1]);
            else {
                if (this.hetatm[i].hetatm[0].resn == 'HOH')
                    this.viewer.setStyle(this.hetatm[i].hetatm[0], {sphere:{hidden:true}});
                else
                    this.viewer.setStyle(this.hetatm[i].hetatm[0], {stick:{hidden:true}});
            }
        }
        this.viewer.render();
    }
    setColor(color) {
        for (let i=0; i<this.chains.length; i++) {
            this.specs[this.chains[i].chain].color = color;
            let obj = '{"' + this.style[this.chains[i].chain] + '":' + JSON.stringify(this.specs[this.chains[i].chain]) + '}';
            // Updates the color of ALL chains, if ALL chains selected.
            if (this.sel_chain == 'ALL') {
                if (this.chains[i].visible)
                    this.viewer.setStyle({chain: this.chains[i].chain}, JSON.parse(obj));
                else
                    this.viewer.setStyle({chain: this.chains[i].chain}, {cartoon: {hidden: true}});
            }
            // Updates the color of selected chain ONLY.
            else if (this.sel_chain == this.chains[i].chain) {
                if (this.chains[i].visible)
                    this.viewer.setStyle({chain: this.sel_chain}, JSON.parse(obj));
                else
                    this.viewer.setStyle({chain: this.sel_chain}, {cartoon: {hidden: true}});
            }
        }
        // Re-style HETATMs after setStyle().
        for (let i=0; i<this.hetatm.length; i++) {
            if (this.hetatm[i].visible)
                this.viewer.setStyle(this.hetatm[i].hetatm[0], this.hetatm[i].hetatm[1]);
            else {
                if (this.hetatm[i].hetatm[0].resn == 'HOH')
                    this.viewer.setStyle(this.hetatm[i].hetatm[0], {sphere:{hidden:true}});
                else
                    this.viewer.setStyle(this.hetatm[i].hetatm[0], {stick:{hidden:true}});
            }
        }
        this.viewer.render();
    }
    hideChain() {
        for (let i=0; i<this.chains.length; i++) {
            if (this.sel_chain == 'ALL') {
                this.viewer.setStyle({chain: this.chains[i].chain}, {cartoon: {hidden:true}});
                this.chains[i].visible = false;
            }
            else if (this.sel_chain == this.chains[i].chain) {
                this.viewer.setStyle({chain: this.sel_chain}, {cartoon: {hidden:true}});
                this.chains[i].visible = false;
            }
        }
        // Re-style HETATMs after setStyle().
        for (let i=0; i<this.hetatm.length; i++) {
            if (this.hetatm[i].visible)
                this.viewer.setStyle(this.hetatm[i].hetatm[0], this.hetatm[i].hetatm[1]);
            else {
                if (this.hetatm[i].hetatm[0].resn == 'HOH')
                    this.viewer.setStyle(this.hetatm[i].hetatm[0], {sphere:{hidden:true}});
                else
                    this.viewer.setStyle(this.hetatm[i].hetatm[0], {stick:{hidden:true}});
            }
        }
        this.viewer.render();
    }
    showChain() {
        let obj = {}
        for (let i=0; i<this.chains.length; i++) {
            if (this.sel_chain == 'ALL') {
                if (!this.chains[i].visible) {
                    obj[this.style[this.chains[i].chain]] = this.specs[this.chains[i].chain];
                    this.viewer.setStyle({chain: this.chains[i].chain}, obj);
                }
                this.chains[i].visible = true;
            }
            else if (this.sel_chain == this.chains[i].chain) {
                if (!this.chains[i].visible) {
                    obj[this.style[this.sel_chain]] = this.specs[this.chains[i].chain];
                    this.viewer.setStyle({chain: this.sel_chain}, obj);
                }
                this.chains[i].visible = true;
            }
        }
        // Re-style HETATMs after setStyle().
        for (let i=0; i<this.hetatm.length; i++) {
            if (this.hetatm[i].visible)
                this.viewer.setStyle(this.hetatm[i].hetatm[0], this.hetatm[i].hetatm[1]);
            else {
                if (this.hetatm[i].hetatm[0].resn == 'HOH')
                    this.viewer.setStyle(this.hetatm[i].hetatm[0], {sphere:{hidden:true}});
                else
                    this.viewer.setStyle(this.hetatm[i].hetatm[0], {stick:{hidden:true}});
            }
        }
        this.viewer.render();
    }
    selectedChain(chain) {
        this.sel_chain = chain;
    }
    setSpeed(speed) {
        this.speed = speed;
        if (this.spinning) {
            this.viewer.spin("y", speed);
            this.viewer.render();
        }
    }
    spin() {
        this.viewer.spin("y", this.speed);
        this.viewer.render();
        this.spinning = true;
    }
    stopSpin() {
        this.viewer.spin(false);
        this.viewer.render();
        this.spinning = false;
    }
}


// Gets id, title, # of chains from PDB file.
function getDetails(data) {
    let title = "";
    let header = "";
    let pdbid = "";
    let chains = [];
    let hetatm = [];
    let lines = data.split('\n');
    for (var i = 0; i < lines.length; i++) {
        let line = lines[i].split(/[, :;]+/);
        if (line[0] == "HEADER") {
            pdbid = line[line.length-2];
            searched = line[line.length-2];
            line.shift();
            line.pop();
            line.pop();
            line.pop();
            header = line.join(' ');
        }
        else if (line[0] == "TITLE") {
            line.shift();
            title += line.join(' ');
        }
        else if (line[2] == "CHAIN") {
            line.shift();
            line.shift();
            line.shift();
            line.pop();
            if (line.length > 1)
                for (var x=0; x<line.length; x++) {
                    chains.push(line[x]);
                }
            else
                chains.push(line);
        }
        else if (line[0] == "FORMUL") {
            hetatm.push(line[2]);
        }
        else if (line[0] == "END") {
            return {chains: chains, hetatm: hetatm, header: header, title: title, pdbid: pdbid};
        }
    }
}


let colorPalet = ["lightgreen", "lightyellow", "lightblue", "lightpurple", "pink"];

function setViewer(viewer, data, id) {
    $(".clone-" + id).remove();
    let info = getDetails(data); //Gets PDB details: HETATM and Chains.
    let v = viewer.getViewer();
    viewer.resetHETATM();
    v.removeAllModels(); //Remove existing model.
    v.removeAllLabels();
    v.addModel( data, "pdb" ); //Adds new model.
    v.setStyle({}, {cartoon: {color: 'green'}}); //Default style.
    //Style individual HETATMs.
    for (let i=0; i<info.hetatm.length; i++) {
        if (info.hetatm[i] == "HOH") {
            let hetatm = [{resn: info.hetatm[i]},{sphere:{color:'red',radius:0.5}}];
            viewer.setHETATM(hetatm);
        }
        else {
            let hetatm = [{resn: info.hetatm[i]},{stick:{color:colorPalet[i%5],thickness:0.5}}];
            viewer.setHETATM(hetatm);
        }
        let clone = $("#hetatm").clone().removeAttr("id").addClass("clone-" + id);
        clone.children("label").html(info.hetatm[i]);
        clone.children("input").attr("onclick", "check('" + id + "', '" + info.hetatm[i] + "')");
        clone.children("input").attr("id", info.hetatm[i] + "-" + id);
        clone.children("input").prop("hidden",false);
        clone.appendTo("#hetatm-" + id);
    }
    v.zoomTo();
    v.render(); //Display model.
    v.zoom(1.2, 1000);
    viewer.setChains(info.chains);
    for (let i=0; i<info.chains.length; i++) {
        let clone = $("#chain").clone().removeAttr("id").addClass("clone-" + id);
        clone.html(info.chains[i]);
        clone.attr("onclick", "chain('" + id + "', '" + info.chains[i] + "')");
        clone.prop("selected",false);
        clone.appendTo("#chains-" + id);
    }
    $("#title-" + id).html(info.title);
    $("#header-" + id).html(info.header);
    $("#pdbid-" + id).html(info.pdbid);
};


let viewers = []

// Returns 3Dmol viewer.
function getViewer(viewer_id) {
    for (let i=0; i<viewers.length; i++) {
        if (viewer_id == viewers[i].getID())
            return viewers[i];
    }
}


// Gets default PDB to display.
function getPDB(id, searched, errmsg) {
    let pdbUri = 'https://files.rcsb.org/download/' + searched + '.pdb';
    jQuery.ajax( pdbUri, { 
        success: function(data) {
            let viewer = getViewer(id);
            setViewer(viewer, data, id);
            $("#label-" + id).attr("cntrl", "0");
        },
        error: function(hdr, status, err) {
            let v = getViewer(id).getViewer();
            v.removeAllModels();
            v.removeAllLabels();
            v.render();
            $("#label-" + id).attr("cntrl", "0");
            $("#" + errmsg).prop("hidden", false);
        },
    });
}


// HETATMS check-boxes.
function check(viewer_id, hetatm) {
    let viewer = getViewer(viewer_id);
    if ($("#" + hetatm + "-" + viewer_id).is(":checked") == true) {
        viewer.showHETATM(hetatm);
    }
    else {
        viewer.hideHETATM(hetatm);
    }
}


// Selects a specific chain to edit.
function chain(viewer_id, chain) {
    let viewer = getViewer(viewer_id);
    viewer.selectedChain(chain);
}


// Selects speed for 3D Model spin.
function speed(id, speed) {
    let viewer = getViewer(id);
    viewer.setSpeed(speed);
}


// Show or hide main chains.
function chainDisplay(viewer_id) {
    let viewer = getViewer(viewer_id);
    if ($("#display" + "-" + viewer_id).is(":checked") == true) {
        viewer.showChain();
    }
    else {
        viewer.hideChain();
    }
}


// Set Default 3D Model Display
let searched = "4OR0";
element = $('#protein-01');
let viewer = new Viewer("protein-01", element);
viewers.push(viewer);
getPDB("protein-01", searched, "");


// // Initalize bottom 3D Displays
// element = $('#protein-02');
// viewer = new Viewer("protein-02", element);
// viewers.push(viewer);

// element = $('#protein-03');
// viewer = new Viewer("protein-03", element);
// viewers.push(viewer);

// element = $('#protein-04');
// viewer = new Viewer("protein-04", element);
// viewers.push(viewer);

// element = $('#protein-05');
// viewer = new Viewer("protein-05", element);
// viewers.push(viewer);


// Style buttons.
$(".style-btn").on('click', function() {
    let value = $(this).attr("value"); //Gets style case #.
    let viewer_id = $(this).closest("div").attr("3dview"); //Gets viewer id. typeStyle
    let cntrl = parseInt($(this).attr("cntrl")); //Gets control to hide or show labels.
    let viewer = getViewer(viewer_id);
    //Add selected style features.
    function style(viewer, value, element) {
        let v = viewer.getViewer();
        switch(value) {
            case '0': viewer.setStyle('line', false); break;
            case '1': viewer.setStyle('cross', false); break;
            case '2': viewer.setStyle('stick', false); break;
            case '3': viewer.setStyle('cartoon', false); break;
            case '4': viewer.setStyle('cartoon', '{"style": "trace", "color": "green"}'); break;
            case '5':
                let radius = element.html().split(' ')[1];
                viewer.setStyle('sphere', '{"radius": ' + radius + ', "color": "green"}');
                break;
            case '6':
                viewer.setColor(element.html());
                break;
            case '7':
                if (cntrl == 0) {
                    v.addResLabels({hetflag:false}, {font: 'Arial', fontColor:'black', fontSize: '12', showBackground:false, screenOffset: {x:0,y:0}});
                    element.attr("cntrl", "1");
                }
                else {
                    v.removeAllLabels();
                    element.attr("cntrl", "0");
                }
                break;
        }
    }
    style(viewer, value, $(this));
});


// Spin check-boxes.
$(".spin").on('click', function() {
    let viewer_id = $(this).closest("div").attr("3dview");
    let viewer = getViewer(viewer_id);

    function spin(viewer, element) {
        if (element.is(":checked") == true) {
            viewer.spin();
    }
        else {
            viewer.stopSpin();
        }
    }
    spin(viewer, $(this));
});


// // Download current PDB.
// $("#download-pdb").on('click', function() {
//     window.location.replace("https://files.rcsb.org/download/" + searched + ".pdb");   
// });


// // Gets selected PDB from table.
// $(".pdb").on('click', function() {
//     $(".pdb-error").prop("hidden", true);
//     let value = $(this).attr("value");
//     getPDB("protein-01", value, "");
// });


// // When enter key is pressed. Activates search button.
// $(".pdbid").on('keyup', function (e) {
//     if (e.key === 'Enter' || e.keyCode === 13) {
//         $(this).siblings(".search").click();
//     }
// });


// // Search button. Gets searched for PDB.
// $(".search").on('click', function() {
//     $(".pdb-error").prop("hidden", true);
//     $(".pdb-error").siblings(".pdb-file-nm").prop("hidden", true);
//     let value = $(this).siblings("input").val().replace(/\s/g, '').toUpperCase();
//     let viewer_id = $(this).attr("3dview");
//     let errmsg =  $(this).attr("err");

//     getPDB(viewer_id, value, errmsg);
// });


// // Upload button. Activates file input.
// $(".opt").on('click', function() {
//     let target = $(this).attr("3dview");
//     $("#file-" + target).click();
// });


// // Uploads PDB file to show in 3Dmol Viewer.
// $(".pdb-upload").change(function() {
//     let val = $(this).val();
//     let id = $(this).attr("id");
//     $(this).siblings(".pdb-file-nm").removeAttr("hidden");
//     let name = val.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
//     if (name.length > 15)
//         $(this).siblings(".pdb-file-nm").html(name.substr(0, 3) + "..." + name.substr(name.length - 6, name.length - 1));
//     else
//         $(this).siblings(".pdb-file-nm").html(name);
//     let files = document.getElementById(id).files;

//     if (files.length == 0) return;

//     const file = files[0];
//     let viewer_id = id.substr(5, id.length - 1);
//     let viewer = getViewer(viewer_id);

//     function readPDB(file, viewer, viewer_id) {
//         let reader = new FileReader();
//         reader.onload = (e) => {
//             const file = e.target.result;
//             const lines = file.split(/\r\n|\n/);
//             setViewer(viewer, lines.join('\n'), viewer_id);
//         };
//         reader.onerror = (e) => alert(e.target.error.name);
//         reader.readAsText(file);
//     }
//     readPDB(file, viewer, viewer_id);

// });


// // Controls Sidebar open and close function.
// let cntrl = 0;
// $("#sidebar-btn").on("click", function() {
//     if (cntrl == 0) {
//         $(this).css({"margin-right": "-100px", "background-image": "linear-gradient(#04488a, #033d75)"});
//         $(this).html("Open");
//         $("#sidebar").css("margin-left", "-320px");
//         $("#dashboard").css("padding-left", "60px");
//         cntrl++;
//     }
//     else {
//         $(this).css({"margin-right": "0px", "background-image": "none"});
//         $(this).html("Close");
//         $("#sidebar").css("margin-left", "0px");
//         $("#dashboard").css("padding-left", "320px");
//         cntrl = 0;
//     }
// });


// let current_clones = 1;
// $("#container-02").hide();
// $("#container-03").hide();
// $("#container-04").hide();

// // Clone containers to view side by side.
// function displays(clones) {
//     if (clones == current_clones)
//         return;
//     else if (clones > current_clones) {
//         for (let i=current_clones+1; i <= clones; i++) {
//             $("#container-0" + i).show();
//         }
//         current_clones = clones;
//     }
//     else {
//         for (let i=current_clones; i > clones; i--) {
//            $("#container-0"+i).hide();
//         }
//         current_clones = clones;
//     }
// }