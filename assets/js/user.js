$(document).ready( function(){

    //Structure 
    class User {
        constructor(pseudo, mail, mdp) {
            this.pseudo = pseudo;
            this.mail = mail;
            this.mdp = mdp;
        }
    }

  //Fonctions
  $.extend(User.prototype, {
        register: function() {

            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("Pseudo", this.pseudo);
                localStorage.setItem("Mail", this.mail);
                localStorage.setItem("Mdp", this.mdp);
                return true;
            } else {
                return false;
            }
            
        },
        login: function() {

              return;
        }
  });





    //Lien de switch login/register
    let btnSwitchLogin = $('#switchLogin');
    let btnSwitchRegister = $('#switchRegister');

    $(btnSwitchLogin).click(function(){
        $(navbar).show();
        $(accueil).hide();
        $(register).hide();
        $(connexion).show();
    });

    $(btnSwitchRegister).click(function(){
        $(navbar).show();
        $(accueil).hide();
        $(connexion).hide();
        $(register).show();
    });




    //Récupération des éléments html
    let btnRegister = $('#btnRegisterSubmit');
    let btnConnexion = $('#btnLoginSubmit');


    //Fonction de register
    $(btnRegister).click(function(){
        let errorText = $('#errorRegister');
        let pseudo = $("#rgtPseudo").val();
        let mail = $("#rgtMail").val();
        let mdp = $("#rgtMdp").val();

        if(pseudo == '' || mail == '' || mdp == ''){
            errorText.html('Veuillez remplir tout les champs.');
        }else{
            if(localStorage.getItem("Pseudo") !== '' || localStorage.getItem("Mail") !== '' || 
            localStorage.getItem("Mdp") !== ''
            ){
                errorText.html('Vous possédez déjà un compte utilisateur.');
            }else{
                let user = new User(pseudo, mail, mdp);

                let validationRegister = user.register();
                if(validationRegister === true){
                    $(navbar).show();
                    $(accueil).hide();
                    $(register).hide();
                    $(interface).hide();
                    $(connexion).show();
                }
            }
        }
    });



    // Fonction de login
    $(btnConnexion).click(function(){
        let errorText = $('#errorLogin');
        let pseudo = $("#lg-pseudo").val();
        let mdp = $("#lg-mdp").val();
        let pseudoCond = localStorage.getItem("Pseudo");
        let mdpCond = localStorage.getItem("Mdp");

        if(pseudo == '' || mdp == ''){
            errorText.html('Veuillez remplir tout les champs.'); 
        }else{
            if(pseudo === pseudoCond && mdp === mdpCond){
                


                $(navbar).remove();
                $(accueil).remove();
                $(register).remove();
                $(connexion).remove();
                $(interface).show();

                //changement du css de index --> interface
                $('link[data-role="index"]').prop('disabled', 'true');
                $('link[data-role="login"]').prop('disabled', 'true');
                $('link[data-role="interface"]').prop('disabled', null);




            }else{
                errorText.html('Identifiant ou mot de passe incorrect.'); 
            }
        }
    });
    

});