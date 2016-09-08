/* Variables Globales */
// référence a l'objet duck
var duck = $("#duck");
// Nombre de canard restant lors de la partie
var nbDuck = 10;
// Largeur de la fenètre
var largeurFenetre = $(window).width();
// Hauteur de la fenètre
var hauteurFenetre = $(window).height();

function relanceCanard() {
	if(nbDuck != 0){
		console.log(nbDuck);
		deplacerCanard();
	}
	else {
		duck.stop(true, false);
	}
}
/*  */
function tuerCanard() {
	console.log('pan !');
	// Arrète le déplacement horizontal
	duck.stop(true, false);
	
	// Change l'image
	duck.css({
		'background-image': 'url("media/img/duck-dead.gif")',
	});

	// Animation
	duck.animate({
		top: hauteurFenetre,},
		1000, function() {
			console.log('mort');
			relanceCanard();
	});

}

/* Déplacement du canard de gauche a droite */
function deplacerCanard(){
	// Décrémente le nombre de canard restant
	nbDuck--;

	// Point de départ a hauteur aléatoire
	var hauteurRand = Math.random() * (hauteurFenetre - duck.height());
	
	//Initialise les propriétés de départ de l'image du canard
	duck.css({
		'left': '-50px',
		'top': hauteurRand,
		'background-image': 'url("media/img/duck-right.gif")',
		'width': '130px',
		'height': '104px',
	});

	console.log(hauteurRand);

	// Déplace le canard
	duck.animate({
		left: largeurFenetre,},
		5000, function() {
			console.log('passé');
			relanceCanard();
	});
}

/* Initialisation de l'application */
function init(){
	// Change le curseur
	$('html').css('cursor','crosshair');

	// Surveille la div du canard (pour le clique pour le tué)
	duck.on("mousedown", tuerCanard);
	
	//Lance le canard
	deplacerCanard();
}

/* MAIN - Initialisation du jeu */
init();

