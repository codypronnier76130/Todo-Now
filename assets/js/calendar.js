 

class Calendar{
    
    constructor(domTarget)
    {
        // On récupère l'élément DOM passé en paramètre
        domTarget = domTarget || '.calendar';
        this.domElement = document.querySelector(domTarget);

        // Renvoit une erreur si l'élément n'éxiste pas
        if(!this.domElement) throw "Calendar - L'élément spécifié est introuvable";

        // Liste des mois
        this.monthList = new Array('janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aôut', 'septembre', 'octobre', 'novembre', 'décembre');

        // Liste des jours de la semaine
        this.dayList = new Array('dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');

        // Date actuelle
        this.today = new Date();
        this.today.setHours(0,0,0,0);

        // Mois actuel
        this.currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);

        // On créé le div qui contiendra l'entête de notre calendrier
        let header = document.createElement('div');
        header.classList.add('header');
        this.domElement.appendChild(header);

        // On créé le div qui contiendra les jours de notre calendrier
        this.content = document.createElement('div');
        this.domElement.appendChild(this.content);


        // Bouton "précédent"
        let previousButton = document.createElement('button');
        previousButton.setAttribute('data-action', '-1');
        previousButton.textContent = '\u003c';
        header.appendChild(previousButton);

        // Div qui contiendra le mois/année affiché
        this.monthDiv = document.createElement('div');
        this.monthDiv.classList.add('month');
        header.appendChild(this.monthDiv);

        // Bouton "suivant"
        let nextButton = document.createElement('button');
        nextButton.setAttribute('data-action', '1');
        nextButton.textContent = '\u003e';
        header.appendChild(nextButton);

        // Action des boutons "précédent" et "suivant"
        this.domElement.querySelectorAll('button').forEach(element =>
        {
            element.addEventListener('click', () =>
            {
                this.currentMonth.setMonth(this.currentMonth.getMonth() * 1 + element.getAttribute('data-action') * 1);
                this.loadMonth(this.currentMonth);
            });
        });

        // On charge le mois actuel
        this.loadMonth(this.currentMonth);

        // Liste des tâches
        this.tacheList = []; // initialisation première tache d'exemple.                

    } // fin constructeur

    loadMonth(date)
    {
        // On vide notre calendrier
        this.content.textContent = '';

        // On ajoute le mois/année affiché
        this.monthDiv.textContent = this.monthList[date.getMonth()].toUpperCase() + ' ' + date.getFullYear();

        // Création des cellules contenant le jour de la semaine
        for(let i=0; i<this.dayList.length; i++)
        {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            cell.classList.add('day');
            cell.textContent = this.dayList[i]//.substring(0, 3).toUpperCase();
            this.content.appendChild(cell);
        }

        // Création des cellules vides si nécessaire
        for(let i=0; i<date.getDay(); i++)
        {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            cell.classList.add('empty');
            this.content.appendChild(cell);
        }

        // Nombre de jour dans le mois affiché
        let monthLength = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

        // Création des cellules contenant les jours du mois affiché
        for(let i=1; i<=monthLength; i++)
        {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            $(cell).attr('id','jour-'+i);
            cell.textContent = i;
            this.content.appendChild(cell);

            // Création du td qui contiendra les taches du jour dans le calendrier
            let tache = document.createElement('td');
            $(tache).attr('id','tache-jour-'+i);
            $(tache).attr('class','tache');
            tache.textContent = '+';
            $('#jour-'+ i).append(tache);      

            // Timestamp de la cellule
            let timestamp = new Date(date.getFullYear(), date.getMonth(), i).getTime();

            // Ajoute une classe spéciale pour aujourd'hui
            if(timestamp === this.today.getTime())
            {
                cell.classList.add('today');
            }
        }

        // Création d'une div de visualisation de tâche.
            $('#calendar').append("<div id='visuTache'>");
            $('#calendar').append("<td>");
            $('#calendar').append("<textarea id='titreTache' name='titre' rows='1' cols='20'></textarea>");
            $('#calendar').append("<textarea id='descripTache' name='description' rows='2' cols='40'></textarea>");
            $('#calendar').append("</td>");
            $('#calendar').append("<td>");
            $('#calendar').append("<button id='validTache'>Validation</button>");
            $('#calendar').append("<button id='supTache'>Supprime</button>");
            $('#calendar').append("</td>");
            $('#calendar').append("</div>");
    }

     // CRUD
        // Ajout
        ajoutTache(idCellTache){ 
            let jour = idCellTache.substring(11,idCellTache.length) // jour de la cellule selectionée
            let idTache = this.tacheList.length 

            let tacheContent = {
                idTache : idTache,
                titre : $('#titreTache').val(),
                description : $('#descripTache').val(),
                jour : jour,
                mois : this.monthList[this.currentMonth.getMonth()],
                annee : this.currentMonth.getFullYear()
                }
            this.tacheList.push(tacheContent)                            
            //console.log(this.tacheList[idTache])
        }

        // Visu
        visuTache(idCellTache){                        
            let jour = idCellTache.substring(11,idCellTache.length); // jour de la cellule selectionée
            let mois = this.monthList[this.currentMonth.getMonth()]; // mois de la cellule selectionée
            let annee = this.currentMonth.getFullYear(); // annee de la cellule selectionée
            
            for(let i=0; i<this.tacheList.length; i++){                            
                if(jour == this.tacheList[i].jour && mois == this.tacheList[i].mois && annee == this.tacheList[i].annee){
                    $('#titreTache').val(this.tacheList[i].titre) 
                    $('#descripTache').val(this.tacheList[i].description)   
                    break;  
                }else{
                    $('#titreTache').val("") 
                    $('#descripTache').val("")  
                }                                           
            } 
            //console.log(this.tacheList)
        }

        // Modif
        modifTache(idTache){                
            this.tacheList[idTache].titre = $('#titreTache').val()
            this.tacheList[idTache].description = $('#descripTache').val()              
        }
        
        // Sup
        supTache(idTache){
            this.tacheList.splice(idTache, 1);
            $('#titreTache').val("") 
            $('#descripTache').val("") 
        }
    // fin CRUD    
} // fin class









// instance du calendrier
$( document ).ready(function() {
    let calendar = new Calendar('#calendar');
    let idCellTache;

    // Action clic sur cellule calendrier 
    $('.cell').click(function(e){
        e.preventDefault()
        let idCell = this.getAttribute('id');
        console.log("cellule selectionnée : " + idCell);
        // Mise en surbriance de la cellule selectionnée

    })  

    // Action clic sur la tache d'une cellule du calendrier
    $('.tache').click(function(e){ 
        e.preventDefault()
        idCellTache = this.getAttribute('id');                    
        calendar.visuTache(idCellTache) // Affichage des infos concernant la tâche
    }) 
    
    // Action clic sur la validation de tache (ajout modif)
    $('#validTache').click(function(){ 
        let jour = idCellTache.substring(11,idCellTache.length); // jour de la cellule selectionée
        let mois = calendar.monthList[calendar.currentMonth.getMonth()]; // mois de la cellule selectionée
        let annee = calendar.currentMonth.getFullYear(); // annee de la cellule selectionée
        let id;

        for(let i = 0; i<calendar.tacheList.length; i++){
            if(jour == calendar.tacheList[i].jour && mois == calendar.tacheList[i].mois && annee == calendar.tacheList[i].annee){
                id = i  
                break;                        
            }                                           
        }   
        
        if(calendar.tacheList[id]){
            //console.log("tache existante !")
            calendar.modifTache(id)
        }else{
            //console.log("tache inexistante !")
            calendar.ajoutTache(idCellTache)
        }   
        
        $('#' + idCellTache).html($('#titreTache').val())  // affichage du titre de la tache dans la cellule selectionnée                                     
    })   

    // Action clic sur la suppression de tache
    $('#supTache').click(function(){ 
        let jour = idCellTache.substring(11,idCellTache.length); // jour de la cellule selectionée
        let mois = calendar.monthList[calendar.currentMonth.getMonth()]; // mois de la cellule selectionée
        let annee = calendar.currentMonth.getFullYear(); // annee de la cellule selectionée
        let id;

        for(let i = 0; i<calendar.tacheList.length; i++){
            if(jour == calendar.tacheList[i].jour && mois == calendar.tacheList[i].mois && annee == calendar.tacheList[i].annee){
                id = i                                                     
            }                                           
        }   

        if(id){
            calendar.supTache(id)
            $('#' + idCellTache).html('+')  // effacement du titre de la tache dans la cellule selectionnée  
        }                    
    })
}) 



