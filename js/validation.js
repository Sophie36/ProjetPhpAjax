//alert("test accès");

function verifUtilisateur(login){
    //alert("test accès fonction");
    //vérification de la disponibilité de l'utilisateur
    
    //Création d'un objet manipulant l'élément : <span id="info"></span>
   $i = document.getElementById('info');
   
    // Si la zone de saisie Login est vide la zone <span id="info"></span>
    // l'est également !
    if(login.value ==''){
        $i.innerHTML = '';
        return;
    }
    
    // Construire une requête ajax permettant la vérification de l'existance
    // éventuelle du login

    // Création d'un objet sur XMLHttpRequest 
    obAjax = new creationObjetXMLHttpRequest();
    
    // args prend un Couple clé/ valeur a envoyer au serveur
    // exemple : args = "nom=Defrance&prenom=Jean-Marie";
    args = "login=" + login.value;
    
    // Méthode open permet de régler l'objet de manière à effectuer
    // une requête post à verifUtilisateur.php
    obAjax.open("POST","verifUtilisateur.php", true );
    // En méthode POST, il faut indiquer le type des données envoyées par
    // le biais de la méthode setRequestHeader qui affectera le type
    // correspondant à l’en-tête Content-Type avant d’envoyer la requête
    // A la soumission d'un formulaire traditionnel le navigateur se charge
    // d’affecter automatiquement ces valeurs
    obAjax.setRequestHeader("content-type","application/x-www-form-urlencoded");
    obAjax.setRequestHeader("content-length",args.length);
    //obAjax.setRequestHeader("connexion","close");
    
    // le mode asynchrone nécessite l’utilisation d’une fonction de rappel.
    // Ainsi, la fonction désignée comme fonction de rappel sera appelée à chaque changement 
    // de la propriété readyState.
    // La propriété onreadystatechange accepte le nom de la fonction qui traite
    // le résultat en provenance du script php
    obAjax.onreadystatechange = traitementResultat;
    
    //send() méthode permettant d'envoyer la requête'
    obAjax.send(args);
    
 }
 
   // Signification des différents états de traitement d’une requête asynchrone
   // (accessible grâce à la propriété « readyState »)  
   //  - Valeur 0 : L’objet n’a pas encore été initialisé et donc la méthode
   //       open() n’a pas encore été appelée.
   //  - Valeur 1 : L’objet a été initialisé mais la requête n’a pas encore
   //       été envoyée à l’aide de la méthode send().
   //  - Valeur 2 : La requête a été envoyée à l’aide de la méthode send().
   //  - Valeur 3 : La réponse est en cours de réception.
   //  - Valeur 4 : La réponse du serveur est complètement réceptionnée.
   //        Les données sont disponibles dans la propriété responseText
   //        (s’il s’agit de données texte) ou dans
   //         responseXML (s’il s’agit de données XML).

    
  function traitementResultat(){
        
        if(this.readyState == 4){
             
            if(this.status ==200){ //Principaux codes de statut HTTP. 404/Not Found : Document non trouvé (Erreur client) ou 503/Service Unavailable : Service non disponible (Erreur serveur)
               
                if(this.responseText != null){
                   
                    $i.innerHTML = this.responseText;
                }
                
            }

        }
        
    }
 
//XMLHttpRequest est une classe JavaScript permet d’exécuter des requêtes HTTP
//du navigateur vers le serveur d’une manière asynchrone (réponse différée sans blocage
//de l’application client) sans avoir à recharger la page HTML comme c’est le cas lors
//d’une requête HTTP traditionnelle.    
function creationObjetXMLHttpRequest(){
   
    try{
        //utilisation du constructeur XMLHttpRequest()
        var requete = new XMLHttpRequest();
        }catch(e1) {
            
            try{ 
             //utilisation du constructeur ActiveXObject()  IE 6 et suivants
            requete = new ActiveXObject("Msxml2.XMLHTTP"); 
     
                }catch(e2) {
                     
                     try{ 
                    //utilisation du constructeur ActiveXObject()  IE 5     
                    requete = new ActiveXObject("Microsoft.XMLHTTP"); 

                        } catch(e3){
                            
                             return false;
                        } 
                }
        }
        
    return requete;
}

