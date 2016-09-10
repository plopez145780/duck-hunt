/* Varialbe Globales */
duck = $("#duck");// référence a l'objet duck

/* ------------------ */

/* crée la fenetre de game over */
function pageFin() {
	// Arrete l'écoute de html, pour le son de tir raté
	$("body").off();
	// Création du contenu de la box
	var $go = $("<h1>").append('Game Over !');
	var $textScore = $("<p>").append('Score de ').append(playerName).append(' : ').append(score);
	var $btnNouvellePartie = $("<button>").html("Nouvelle Partie");
	// Ecoute le bouton
	$btnNouvellePartie.on('click',pageDemarrage);
	// création d'un bloc div pour centrer le contenu dans #box
	$blocDiv = $("<div>").append($go).append($("<br>")).append($textScore).append("<br>").append($btnNouvellePartie);
	// Cible la box, la vide et lui donne son nouveau contenu.
	$box = $("#box").empty().append($blocDiv);
	//Affiche la fenetre
	affichageFenetre($box);
}

/* Détermine si tous les canard (tour) on été joué */
function checkFinJeu() {
	if(nbDuckRestant > 0){
		tourDeJeu();
	} else {
		pageFin();
	}
}

/* tue le canard */
function tuerCanard() {
	toucher = true;
	score++;// Incrémente le score
	$("#score").html("Score : " + score);// Affiche le nouveau score

	$("#tir_reussit").get(0).play();// Joue le son du fusil

	$("#eclaboussure").css({
		'display': 'block',
		'top': parseInt(duck.css('top'))-parseInt(duck.height()),
		'left': duck.css('left'),
	});

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
			$("#eclaboussure").css('display','none');
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
	vitesseDuck -= pasDeLaVitesse;// Décremente la vitesse ( = accélération du canard)
	// random pour le sens de déplacement
	if(Math.random() <= 0.5){
		deplacerGaucheDroite();
	} else {
		deplacerDroiteGauche();
	}
}

/* Initialisation du jeu */
function init(){
	// désactive la fenetre noir pour voir la page du jeu
	$("#fenetre").css('display', 'none');
	// réactive le menu avec l'affichage du score
	$("#menu").css('display', 'initial');

	//TODO Proposer au joueur de changer le nombre de canard
	nbDuck = 10;// Nombre de canard pour la partie
	nbDuckRestant = nbDuck; // Nombre de canard restant lors de la partie
	largeurFenetre = $(window).width();// Largeur de la fenètre
	hauteurFenetre = $(window).height();// Hauteur de la fenètre
	vitesseDuck = 3000;// Vitesse de déplacement du canard
	pasDeLaVitesse = (3000-1500)/nbDuck;// nombre de ms a envelé a la au temps de l'animation a chaque tour (=vitesse canard) : (vitesse lente - vitesse rapide) / nombre de tour
	playerName = $("#player_name").val();
	score = 0;//score humain
	$("#score").html("Score : " + score);//Affiche le score du joueur
	$('html').css('cursor','crosshair');// Change le curseur pour une croix

	tourDeJeu();// Lance 1 canard
}

/* Affiche la fenetre noir avec la box */
function affichageFenetre($box){
	// met la box avec son message dans la fenetre noir
	$("#fenetre").append($box);
	// CSS
	$("#menu").css('display', 'none');
	$("#fenetre").css({
		'background-color': '#000000',
		'display' : 'flex',
		'height': $(window).height(),
	});
}

/* vérifie que les paramètres obligatoire que doit renseigner le joueur soit présent avant de lancer le jeu */
function verifieParametre() {
	// Si le nom n'est pas renseigné
	if(!$("#player_name").val()){
		// vérifie si la balise pour le message d'erreur existe (pour ne pas la recréer si il y a deja le message d'erreur)
		if($("#erreur").length <= 0){
			$("#box>div").append($("<p>").attr('id', 'erreur'));
		}
		$("#erreur").empty().html("Erreur : Le nom n'est pas renseigné").css('color', 'red');
	} 
	// Pas d'erreur : initialiser les variables du jeu pour le lancé
	else {
		init();
	}
}

/* crée la fenètre de démarrage avec un boutton et demandant le nom */
function pageDemarrage() {
	// création du titre
	var $txtPresentation = $("<h1>").append("Bienvenue sur <br>Duck Hunt.");
	// création du champ de texte
	var $InputPlayerName = $("<input>");
	$InputPlayerName.attr('type', 'text');
	$InputPlayerName.attr('placeholder', 'Nom du joueur');
	$InputPlayerName.attr('id', 'player_name');
	// création du bouton
	var $btnDemarrer = $("<button>");
	$btnDemarrer.attr('id', 'demarrage_partie');
	$btnDemarrer.html("Démarrer");
	// ecoute le bouton
	$btnDemarrer.on('click', verifieParametre);
	// création d'un bloc div pour centrer le contenu dans #box
	var $playerForm = $("<div>");
	$playerForm.attr('id', 'player_form');
	// Ajoute les éléments dans le bloc
	$playerForm.append($txtPresentation);
	$playerForm.append($InputPlayerName);
	$playerForm.append("<br>");
	$playerForm.append("<br>");
	$playerForm.append($btnDemarrer);
	// Cible la box, et la vide de tous contenu.
	var $box = $("#box");
	$box.empty();
	// Ajoute son nouveau contenu
	$box.append($txtPresentation);
	$box.append($playerForm);
	// Affiche la fenètre avec la box
	affichageFenetre($box);
}

/* MAIN */
pageDemarrage();
duck.on("mousedown", tuerCanard);// Surveille la div du canard (pour le clique pour le tuer)
$("#reset").on('click', pageFin);
