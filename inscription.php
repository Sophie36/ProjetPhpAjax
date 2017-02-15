<?php
        
        require_once('include/infoConnexion.php');
        require_once('include/connexion.php');
        require_once('include/executeRequete.php');
        
        $cnx=connexion(UTILISATEUR,MOTDEPASSE,SERVER,BASEDEDONNEES);
        
        $msg = "";
        $login = $nom = $prenom = "";
        $pw="";
        
        echo "<h3>Entrez vos informations d'inscriptions : </h3>";
        
        if(isset($_SESSION['login'])){
            $_SESSION=array();
            session_destroy();
        }
        
        if(isset($_POST['login'])){
            
            $login = $_POST['login'];
            $pw = $_POST['pw'];
            $prenom = $_POST['prenom'];
            $nom  = $_POST['nom'];
            
            if($login == "" || $pw ==""){
                
                $msg = "<h4>Tous les champs doivent être complétés</h4>";
                
            }else {
                
                $sql = "SELECT * FROM utilisateurs WHERE login = '$login'";
                
                $idRequete = executeRequete($cnx, $sql);
                
                if($idRequete->rowCount()==1){
                    
                    $msg = "<h4> Ce login existe déjà</h4> <br>";
                    
                }else{
                    
                    $gauche = "ar30&y%";
                    $droite = "tk!@";
                    $jeton  = hash('ripemd128', "$gauche$pw$droite");
                    
                    $varQuery1  = "INSERT INTO utilisateurs VALUES('$prenom', '$nom', '$login', '$jeton')";
                    $idRequeteIns = executeRequete($cnx,$varQuery1);
                    echo "<h4>Compte créé , <a href='authentification.php'>Identifiez-vous à nouveau</a></h4>";
                    
                }
            }
        }
      
        ?>
        
        
        <div><?php echo $msg; ?></div>

        <form action="inscription.php" method="POST">
                Nom : <input type="text" name="nom" required
                                           value ="<?php echo $nom; ?>"></br>
                Prénom : <input type="text" name="prenom" required
                                           value ="<?php echo $prenom; ?>"></br>

                login : <input type="text" name="login" 
                                     maxlength="16" value ="<?php echo $login; ?>"
                                     onBlur="verifUtilisateur(this)"><span id="info"></span></br>
                Mot de passe : <input type="password" name="pw" required
                                      maxlength="16" value ="<?php echo $pw; ?>"></br>
                <input type="submit" name="go" value="Je m'inscris"><br>
        </form>
        
        
     <script src="js/validation.js"></script>
    
    