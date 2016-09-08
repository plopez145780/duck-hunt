/* Varialbe Globales */
duck = $("#duck");// référence a l'objet duck

/* Détermine si tous les canard (tour) on été joué */
function checkFinJeu() {
	if(nbDuckRestant != 0){
		tourDeJeu();
	} else {
		//TODO Changer par un texte dans la fenètre
		alert("Game Over ! Score de " + playerName + " : " + score);
	}
}

/* tue le canard */
function tuerCanard() {
	score++;// Incrémente le score
	$("#score").html("Score : " + score);// Affiche le nouveau score
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
	
	vitesseDuck -= pasDeLaVitesse;// Décremente la vitesse ( = accélération du canard)

	if(Math.random() <= 0.5){
		deplacerGaucheDroite();
	} else {
		deplacerDroiteGauche();
	}
}

/* Initialisation de l'application */
	function init(){
	//TODO Proposé de changé le nombre de canard
	nbDuck = 10;// Nombre de Canard pour la partie
	nbDuckRestant = nbDuck; // Nombre de canard restant lors de la partie
	largeurFenetre = $(window).width();// Largeur de la fenètre
	hauteurFenetre = $(window).height();// Hauteur de la fenètre
	vitesseDuck = 2000;// Vitesse de déplacement du canard
	pasDeLaVitesse = (2000-1000)/nbDuck;// nombre de ms a ajouté la vitesse a chaque tour : (vitesse lente - vitesse rapide) / nombre de tour
	// TODO
	// Créer une écoute sur btn start
	// Recuperer valeur de l'input
	playerName = "pierre";//nom du joueur
	// playerName = prompt("Nom du joueur ?");//nom du joueur
	score = 0;//score humain
	$("#score").html("Score : " + score);

	$('html').css('cursor','crosshair');// Change le curseur pour une croix
	
	
	tourDeJeu();// A chaque tour du jeu un canard est lancé
}

/* MAIN - Initialisation du jeu */
duck.on("mousedown", tuerCanard);// Surveille la div du canard (pour le clique pour le tuer)
$("#nouvelle_partie").on('click', init);


