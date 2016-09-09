/* Varialbe Globales */
duck = $("#duck");// référence a l'objet duck






/* Détermine si tous les canard (tour) on été joué */
function checkFinJeu() {
	if(nbDuckRestant != 0){
		tourDeJeu();
	} else {
		pageFin();
	}
}

/* tue le canard */
function tuerCanard() {
	score++;// Incrémente le score
	$("#score").html("Score : " + score);// Affiche le nouveau score
	$("audio").get(0).play();


	duck.stop(true, false);// Arrète le déplacement horizontal du canard
	
	// Change les propriété de l'image
	duck.css({
		'width': '62px',
		'height': '90px',
		'background-image': 'url("media/img/duck-dead.gif")',
		'background-position': '-50px -20px',
	});

	// Animation
	duck.animate({
		top: hauteurFenetre,},
		1000, function() {
			checkFinJeu();
	});

}

/* Animation de déplacement de gauche a droite */
function deplacerGaucheDroite(){
	//Initialise les propriétés de départ de l'image du canard
	duck.css({
		'width': '85px',
		'height': '70px',
		'background-image': 'url("media/img/duck-right.gif")',
		'background-position': '-30px -10px',
		'left': '-' + duck.width() + 'px',
		'top': hauteurRandDepart,
		
	});

	// Déplace le canard
	duck.animate({
		left: largeurFenetre,
		top: hauteurRandArrive,},
		vitesseDuck, function() {
			checkFinJeu();
	});
}

/* Animation de déplacement de droite a gauche*/
function deplacerDroiteGauche(){
	//Initialise les propriétés de départ de l'image du canard
	duck.css({
		'width': '100px',
		'height': '70px',
		'background-image': 'url("media/img/duck-left.gif")',
		'background-position': '-15px -10px',
		'left': largeurFenetre,
		'top': hauteurRandDepart,
	});

	// Déplace le canard
	duck.animate({
		left: '-'+duck.width()+'px',
		top: hauteurRandArrive,},
		vitesseDuck, function() {
			checkFinJeu();
	});
}


/* Déplacement du canard */
function tourDeJeu(){
	nbDuckRestant--;// Décrémente le nombre de canard restant

	// Hauteur aléatoire
	hauteurRandDepart = Math.random() * (hauteurFenetre - duck.height() - $("#menu").height());
	hauteurRandArrive = Math.random() * (hauteurFenetre - duck.height() - $("#menu").height());
	// hauteurRandDepart = Math.random() * (hauteurFenetre - duck.height());
	// hauteurRandArrive = Math.random() * (hauteurFenetre - duck.height());
	vitesseDuck -= pasDeLaVitesse;// Décremente la vitesse ( = accélération du canard)

	if(Math.random() <= 0.5){
		deplacerGaucheDroite();
	} else {
		deplacerDroiteGauche();
	}
}

function affichageFenetre($box){
	// met la box avec son message dans la fenetre noir
	$("#fenetre").append($box);
	// CSS
	$("#fenetre").css({
		'background-color': '#000000',
		'display' : 'flex',
		'height': $(window).height(),
	});
}


function pageDemarrage() {

	$txtPresentation = $("<h1>").append("Bienvenue sur <br>Duck Hunt.");

	$InputPlayerName = $("<input>");
	$InputPlayerName.attr('type', 'text');
	$InputPlayerName.attr('placeholder', 'Nom du joueur');
	$InputPlayerName.attr('id', 'player_name');

	$btnDemarrer = $("<button>");
	$btnDemarrer.attr('id', 'nouvelle_partie');
	$btnDemarrer.html("Démarrer");
	$btnDemarrer.on('click', verifieNom);

	$playerForm = $("<div>");
	$playerForm.attr('id', 'player_form');
	$playerForm.append($txtPresentation);
	$playerForm.append($InputPlayerName);
	$playerForm.append("<br>");
	$playerForm.append("<br>");
	$playerForm.append($btnDemarrer);

	var $box = $("#box");
	$box.empty();
	$box.append($txtPresentation);
	$box.append($playerForm);
	affichageFenetre($box);
}

function pageFin() {
	var $go = $("<h1>").append('Game Over !');
	var $textScore = $("<p>").append('Score de ').append(playerName).append(' : ').append(score);
	var $btnNouvellePartie = $("<button>").html("Nouvelle Partie");
	$btnNouvellePartie.on('click',pageDemarrage);
	
	$blocDiv = $("<div>").append($go).append($("<br>")).append($textScore).append("<br>").append($btnNouvellePartie);
	$box = $("#box").empty().append($blocDiv);

	affichageFenetre($box);//Affiche la fenetre
}


function verifieNom() {
	if($("#erreur").length <= 0){
		$("#box>div").append($("<p>"));
		console.log('creer');
	}
	if(!$("#player_name").val()){
		$("#box>div>p").empty().attr('id', 'erreur').html("Erreur : Le nom n'est pas renseigné");
	} else {
		init();
	}
}


/* Initialisation de l'application */
function init(){
	console.log('init');
	$("#fenetre").css({
		'display': 'none',
	});

	//TODO Proposé de changé le nombre de canard
	nbDuck = 3;// Nombre de Canard pour la partie
	nbDuckRestant = nbDuck; // Nombre de canard restant lors de la partie
	largeurFenetre = $(window).width();// Largeur de la fenètre
	hauteurFenetre = $(window).height();// Hauteur de la fenètre
	vitesseDuck = 2000;// Vitesse de déplacement du canard
	pasDeLaVitesse = (2000-1000)/nbDuck;// nombre de ms a ajouté la vitesse a chaque tour : (vitesse lente - vitesse rapide) / nombre de tour
	// TODO
	// Créer une écoute sur btn start
	// Recuperer valeur de l'input
	playerName = $("#player_name").val();
	// playerName = "pierre";//nom du joueur
	// playerName = prompt("Nom du joueur ?");//nom du joueur
	score = 0;//score humain
	$("#score").html("Score : " + score);

	$('html').css('cursor','crosshair');// Change le curseur pour une croix
	
	
	tourDeJeu();// A chaque tour du jeu un canard est lancé
}

/* MAIN - Initialisation du jeu */
pageDemarrage();
duck.on("mousedown", tuerCanard);// Surveille la div du canard (pour le clique pour le tuer)
$("#reset").on('click', pageDemarrage);


