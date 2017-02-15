//a garder pour à chaque fois que l'on a besoin d AJAX
function verifUtilisateur(login){
    $i=document.getElementById('info');
    alert(toto);
    if(login.value==""){
        $i.innerHTML='';
    }else{
        $i.innerHTML="Le login est pas bon";
    }
    obAjax=new creationObjetXMLHttpRequest();
    args='login='+login.value;
    obAjax.open('POST','controle.php',true);
    obAjax.setRequestHeader("content-type","application/x-www-form-urlencoded");
    obAjax.setRequestHeader("content-length",args.length);
    obAjax.onreadystatechange=traitementResultat;//nom de la fonction
    obAjax.send(args);
}

function creationObjetXMLHttpRequest(){
    try{
        var requete=new XMLHttpRequest();
    }catch(e1){
            try{
                var requete=new ActiveXobject("Msxml2.XMLHTTP");
            }catch(e2){
                try{
                    requete=new ActiveXobject("Microsoft.XMLHTTP");
                }catch(e3){
                    return False;
                }
            }
        }
    return requete;
}
//fin verifUtilisateur()

function traitementResultat(){
    if(this.readyState==4){
        if(this.status==200){
            if(this.responseText!=""){
                $i.innerHTML=this.responseText;
            }
        }
    }
}



