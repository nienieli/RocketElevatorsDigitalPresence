// after the page load, hide thise ids
$(document).ready(function () {
    $("#quote_resApt, #quote_resBsm, #quote_resFlr, #quote_comBss, #quote_comPar, #quote_comLif, #quote_corTen, #quote_corFlr, #quote_hybAct").hide();
});


var building_type;
var radBtn;

// when you click on the button, show this input and give building_type this id

$("#residential").on("click", function () {
    $("#quote_resApt, #quote_resBsm, #quote_resFlr").show();
    $("#quote_comBss, #quote_comPar,#quote_comLif, #quote_corTen, #quote_corFlr, #quote_hybAct").hide();
    building_type = "residential";
});


$("#commercial").on("click", function () {
    $("#quote_comBss, #quote_resFlr, #quote_resBsm, #quote_comPar, #quote_comLif").show();
    $("#quote_resApt, #quote_corTen, #quote_hybAct, #quote_corFlr").hide();
    building_type = "commercial";
});

$("#corporate").on("click", function () {
    $("#quote_corTen, #quote_resFlr, #quote_resBsm, #quote_comPar, #quote_corFlr").show();
    $("#quote_resApt, #quote_comBss, #quote_comLif, #quote_hybAct").hide();
    building_type = "corporate";
});

$("#hybrid").on("click", function () {
    $("#quote_comPar, #quote_comBss, #quote_resBsm, #quote_resFlr, #quote_hybAct, #quote_corFlr").show();
    $("#quote_resApt, #quote_comLif, #quote_corTen").hide();
    building_type = "hybrid";
});


$("#standPrice").on("click", function () {
    radBtn = "standPrice";
});
$("#premPrice").on("click", function () {
    radBtn = "premPrice";
});

$("#excePrice").on("click", function () {
    radBtn = "excePrice";
});


// put all the variable global

var prixTot;
var resApt;
var resBsm;
var comBss;
var comPar;
var comLif;
var corTen;
var corFlr;
var corpHyb;
var hybAct;
var nbAsc;
var nbAscTot;
var occTot;


// put the input value into a variable

function colVar() {
    resApt = parseInt(document.getElementById("apt").value);
    resBsm = parseInt(document.getElementById("bsm").value);
    resFlr = parseInt(document.getElementById("flr").value);
    comBss = parseInt(document.getElementById("bss").value);
    comPar = parseInt(document.getElementById("par").value);
    comLif = parseInt(document.getElementById("lif").value);
    corTen = parseInt(document.getElementById("ten").value);
    corFlr = parseInt(document.getElementById("cflr").value);
    hybAct = parseInt(document.getElementById("act").value);
};

// detect each keys on key up

$(".calcultotl :input").on("change keyup", function () {
    colVar();
})

//calculation of the price including the  type of building and 3 types of fees 

function callPrice() {
    if (building_type === "residential") {
        var moyLogEta = resApt / resFlr;
        nbAscTot = (Math.ceil(moyLogEta / 6)) * Math.ceil((resFlr + resBsm) / 20);
    } else if (building_type === "commercial") {
        nbAscTot = comLif;
    } else {
        occTot = (resBsm + resFlr) * corFlr
        nbAscMoyParCol = Math.ceil(Math.ceil(occTot / 1000) / Math.ceil((resBsm + resFlr) / 20));
        nbAscTot = nbAscMoyParCol * (Math.ceil((resBsm + resFlr) / 20));
    }

    if (radBtn === "standPrice") {
        var prixStand = 7565 * nbAscTot;
        prixTot = (prixStand * 1.1).toFixed(2);
    } else if (radBtn === "premPrice") {
        var prixPrem = 12345 * nbAscTot;
        prixTot = (prixPrem * 1.13).toFixed(2);
    } else {
        var prixExc = 15400 * nbAscTot;
        prixTot = (prixExc * 1.16).toFixed(2);
    }

    document.getElementById("totalele").innerHTML = nbAscTot;
    document.getElementById("totalfin").innerHTML = prixTot;
}