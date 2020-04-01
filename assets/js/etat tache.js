
// Fenetre état
$('body').append("<div id ='etatTache'></div>");
$('#etatTache').append("<td>");
$('#etatTache').append("<label>Test état des taches</label>");
$('#etatTache').append("<div><input type='radio' id='aFaire' name='etat' value='aFaire' checked><label for='aFaire'>à faire</label></div>");
$('#etatTache').append("<div><input type='radio' id='enCours' name='etat' value='enCours'><label for='enCours'>en cours</label></div>");
$('#etatTache').append("<div><input type='radio' id='terminee' name='etat' value='terminee'><label for='terminee'>terminée</label></div>");
$('#etatTache').append("</td>");
$('#etatTache').append("<label id='labAvancement'>Avancement: % </label>");
$('#etatTache').append("<input id='inAvancement' type='number' value='0' min=0 max=100>");
$('#etatTache').append("<div id='avancementTache'></div>");

// initialisation
var etat = $('input[name=etat]:checked').val()

// Barre de % d'avancement
var avancementTache = 0 // pourcentage
$('#inAvancement').val(avancementTache)
$('#avancementTache').append("<progress id='barAvancement' max='100' value='" + avancementTache +"'></progress>");


// selection de l'état
$("input[type=radio][name=etat]").change(function() {
    etat = $(this).val()
    
    switch (etat){
        case "aFaire" : 
            avancementTache = 0
            $('#inAvancement').val(avancementTache)
            $("#barAvancement").val(avancementTache)
            break;

        case "enCours" : 
            if(avancementTache == 0 || avancementTache == 100){
                avancementTache = 1
                $('#inAvancement').val(avancementTache)
                $("#barAvancement").val(avancementTache)
            } 
            break;        

        case "terminee" : 
            avancementTache = 100
            $('#inAvancement').val(avancementTache)
            $("#barAvancement").val(avancementTache)
            break;        

        default :
            break;
    }
});

// Ajustement de la barre de progression
$("#inAvancement").change(function() {
    avancementTache = $(this).val()

    if(avancementTache >= 100){
        avancementTache = 100        
        etat = "terminee"             
        console.log(">=100")
    }else{
        if(avancementTache <= 0){
            avancementTache = 0            
            etat = "aFaire"              
            console.log("<=0")
        }else{    
            etat = "enCours"                 
            console.log("0<>100")
        }
    }
    
    $("#" + etat).prop('checked', 'checked');
    $("#barAvancement").val(avancementTache)                    
});                  






