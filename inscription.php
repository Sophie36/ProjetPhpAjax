<?php
require_once('include/connexion.php');
require_once('include/infoConnexion.php');
require_once('include/executeRequete.php');

$cnx=connexion(UTILISATEUR,MOTDEPASSE,SERVER,BASEDEDONNEES);
if(isset($_SESSION['login'])){
    session_start();//sans cette session le html ne marche pas
    $_SESSION=array();
    session_destroy();
}
if(isset($_POST['valider'])){
   $nom=$_POST['nom'];
   $prenom=$_POST['prenom'];
   $login=$_POST['login'];
   $pw=$_POST['pw'];
   $droite="tk!@";
   $gauche="ar30b%";
   if($login==""||$pw==""){
       echo'Saisissez votre login et votre mot de passe';
   }else{
       $sql="SELECT login FROM utilisateurs WHERE('$login')";
       $idRequete=executeRequete($cnx,$sql);
       if($idRequete->rowCount()==1){
           echo'login existant';
       }else{
           $jeton=hash('ripemd128',"$gauche.$pw.$droite");
           $sql="INSERT INTO utilisateurs VALUES('$prenom','$nom','$login','$jeton')";
           $idRequete=executeRequete($cnx,$sql);
           header('location:index.php');
           
       }
    }
}
?>
<form method="post" action="inscription.php">        
                Nom: <input type="text" name="nom" value="" placeholder="Nom" size="15" maxlength="10"></br>
                </br>
                Prenom: <input type="text" name="prenom" value="" placeholder="Prénom" size="15" maxlength="10"></br>
                </br>
                Login: <input type='text' name='login' value=''size="15" maxlength="10" onBlur="verifUtilisateur(this);"><span id='info'></span></br>
                </br>
                Mot de passe: <input type='password' name='pw' value='' size="15" maxlength="10"></br>
                </br>
                <input type='submit' name='valider' value='Valider'>
</form> 
