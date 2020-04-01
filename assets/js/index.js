
$(document).ready( function(){

    // Récupération de chaque section de la page
    let navbar = $('#navbar');
    let accueil = $('#accueil');
    let connexion = $('#connexion');

    // Affichage au démarrage du site
    $(navbar).show();
    $(accueil).show();
    $(connexion).hide();


    //Boutons de login et register
    let btnlogin = $('#btn-login');
    let btnregister = $('#btn-register');

    btnlogin.click(function(){

        $(accueil).hide();
        $(connexion).show();

    });


});