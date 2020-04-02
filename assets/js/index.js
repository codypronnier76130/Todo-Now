
$(document).ready( function(){

    // Récupération de chaque section de la page
    let navbar = $('#navbar');
    let accueil = $('#accueil');
    let connexion = $('#connexion');
    let register = $('#register');
    let interface = $('#interface');

    // Affichage au démarrage du site
    $(navbar).show();
    $(accueil).show();
    $(connexion).hide();
    $(register).hide();
    $(interface).hide();
    $('link[data-role="index"]').prop('disabled', null);
    $('link[data-role="login"]').prop('disabled', null);
    $('link[data-role="interface"]').prop('disabled', 'true');




    //Boutons de login, register, et bouton d'accueil
    let btnhome = $(navbar).find('.navbar-brand');
    let btnlogin = $('#btn-login');
    let btnregister = $('#btn-register');
    let navbarcollapse = $(navbar).find('.navbar-collapse')

    btnhome.click(function(){
        $(accueil).show();
        $(connexion).hide();
        $(register).hide();





        $(navbarcollapse).removeClass('collapse');
        $(navbarcollapse).removeClass('show');
        $(navbarcollapse).addClass('collapsing');
        $(navbarcollapse).addClass('hide');
    })


    btnlogin.click(function(){

        $(accueil).hide();
        $(register).hide();
        $(connexion).show();




        $(navbarcollapse).removeClass('collapse');
        $(navbarcollapse).removeClass('show');
        $(navbarcollapse).addClass('collapsing');
        $(navbarcollapse).addClass('hide');

    });

    btnregister.click(function(){

        $(accueil).hide();
        $(connexion).hide();
        $(register).show();



        
        $(navbarcollapse).removeClass('collapse');
        $(navbarcollapse).removeClass('show');
        $(navbarcollapse).addClass('collapsing');
        $(navbarcollapse).addClass('hide');
    });











});


