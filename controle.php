<?php
require_once('include/connexion.php');
require_once('include/infoConnexion.php');
require_once('include/executeRequete.php');

$cnx=connexion(UTILISATEUR,MOTDEPASSE,SERVER,BASEDEDONNEES);

if(isset($_POST['login'])){
    $login=$_POST['login'];
    $sql="SELECT login FROM utilisateurs WHERE login=?";
    $idRequete=executeRequete($cnx,$sql,array($login));
    if($idRequete->rowcount()==1){
        echo "<span class='no'>&nbsp;&#x2718;</span> Ce login existe déjà.";
    }else{
        echo"<span class='yes'>&nbsp;&#x2714;</span> Ce login est disponible.";
    }
}

