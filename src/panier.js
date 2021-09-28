// ________________________________________________________________________________________________________________
// PANIER - VARIABLE
var messageErreur;

console.log("JS PANIER - Ca fonctionne");



// CONTROLE SI FICHIERS LOCALHOST EXISTENT
indexobjet_json = localStorage.getItem("index");
if (indexobjet_json != null) {
    console.log("PANIER - Controle si LocalStorage INDEX existant : OUI");
} else {
    console.log("PANIER - Controle si LocalStorage INDEX existant : NON --> Renvoi en INDEX.HTML");
    window.location.href = "index.html";
}

nbLignePanierobjet_json = localStorage.getItem("Nb_Ligne_Panier");
if (nbLignePanierobjet_json != null) {
    nbLignePanierobjet = JSON.parse(nbLignePanierobjet_json);
    nbLignePanier = nbLignePanierobjet.nbLignePanier;
    console.log("PANIER - Controle si LocalStorage Nb Lignes Panier existant : OUI --> " + nbLignePanier + " lignes");
} else {
    console.log("PANIER - Controle si LocalStorage Nb Lignes Panier existant : NON --> Renvoi en INDEX.HTML");
    window.location.href = "index.html";
}



// PANIER - AFFICHAGE PANIER
totalCommande = 0;
for (let i = 1; i < nbLignePanier + 1; i++) {
    lignePanierobjet_json = localStorage.getItem("lignePanier" + i);
    console.log("PANIER - Téléchargement Ligne Panier n° " + i + " -- En cours");
    if (lignePanierobjet_json != null) {
        lignePanierobjet = JSON.parse(lignePanierobjet_json);
        lignePanier = lignePanierobjet;
        console.log("PANIER - Téléchargement Ligne Panier n° " + i + " -- Téléchargée");
        console.log(lignePanier);


        if (lignePanier.ArticleQuantite > 0) {
            totalLigne = (lignePanier.ArticlePrix / 100) * lignePanier.ArticleQuantite;
            document.getElementById("JS").innerHTML += '<article class="panier-fenetre col-lg-12"><div class="col-lg-3"><img src="' + lignePanier.ArticleImage + '" class="img-responsive" alt="Photo ' + lignePanier.ArticleDescription + '"><div class="form-group hidden"><label for="panier-ref' + i + '" class="control-label col-sm-2">Référence :</label><div class="col-lg-10"><input class="form-control-static" type="text" id="panier-ref' + i + '" name="panier-ref' + i + '" required></p></div></div></div><div class="col-lg-5"><p>Produit : ' + lignePanier.ArticleNom + '</p><p>Couleur : ' + lignePanier.ArticleCouleur + ' </p><div class="panier-fenetre--003"><a onclick="panier_bouton_moins(' + i + ')" class="btn btn-default"> - </a><input id="produit-quantite-' + i + '" type="text" value="' + lignePanier.ArticleQuantite + '" aria-label="Quantité en commande" disabled required></input><a onclick="panier_bouton_plus(' + i + ')" class="btn btn-default"> + </a><br></div></div><div class="col-lg-4 panier-fenetre--002"><p>Prix Unitaire :<input type="text" value="' + lignePanier.ArticlePrix / 100 + '" aria-label="Prix Unitaire" disabled required> €</input></p><p>Prix Total :<input type="text" value="' + totalLigne + '" aria-label="Prix Total" disabled required> €</input></p></div></article>';
            totalLigne = (lignePanier.ArticlePrix / 100) * lignePanier.ArticleQuantite;
            totalCommande = totalCommande + (+totalLigne);
            console.log("Total Ligne : " + totalLigne);
            console.log("Total Commande : " + totalCommande);
        }
    }
}



// PANIER - AFFICHAGE TOTAL COMMANDE
document.getElementById("panier_total").innerText = "Total de la Commande : " + totalCommande + " €";
if (totalCommande == 0) {
    localStorage.removeItem("Nb_Ligne_Panier");
    console.log("PANIER - Suppression LOCALHOST du Nb Lignes Panier - Effectuée");
    for (let i = 1; i < nbLignePanier + 1; i++) {
        lignePanierobjet_json = localStorage.getItem("lignePanier" + i);
        if (lignePanierobjet_json != null) {
            console.log("PANIER - Suppression LOCALHOST Ligne Panier n° " + i + " - Effectuée");
            localStorage.removeItem("lignePanier" + i);
        }
    }
    window.location.href = "index.html";
}



// PANIER - GESTION DES QUANTITES MOINS
function panier_bouton_moins(x) {
    console.log(x);
    produitQuantite = document.getElementById("produit-quantite-" + x);

    if (produitQuantite.value <= 1) {
        produitQuantite.value = 0;
        document.getElementById("produit-quantite-" + x).innerText = produitQuantite.value + ' ';

    } else {

        document.getElementById("produit-quantite-" + x).innerText = (--produitQuantite.value) + '';
    }

    // PANIER - MAJ LocalHost
    lignePanierobjet_json = localStorage.getItem("lignePanier" + x);
    console.log("PANIER - Téléchargement Ligne Panier n° " + x + " -- En cours");
    lignePanierobjet = JSON.parse(lignePanierobjet_json);
    lignePanier = lignePanierobjet;
    console.log("PANIER - Téléchargement Ligne Panier n° " + x + " -- Téléchargée");
    console.log(lignePanier);

    var articleobjet = {
        ArticleID: lignePanier.ArticleID,
        ArticleNom: lignePanier.ArticleNom,
        ArticleImage: lignePanier.ArticleImage,
        ArticleCouleur: lignePanier.ArticleCouleur,
        ArticleDescription: lignePanier.ArticleDescription,
        ArticlePrix: lignePanier.ArticlePrix,
        ArticleQuantite: produitQuantite.value,
    };
    var articleobjet_json = JSON.stringify(articleobjet);
    localStorage.setItem("lignePanier" + x, articleobjet_json);
    console.log("PRODUIT - MAJ LocalStorage - " + x + "  ligne Panier effectué");

    window.location.href = "panier.html";
}



// PANIER - GESTION DES QUANTITES PLUS
function panier_bouton_plus(x) {
    console.log(x);
    produitQuantite = document.getElementById("produit-quantite-" + x);
    document.getElementById("produit-quantite-" + x).innerText = (++produitQuantite.value) + '';

    // PANIER - MAJ LocalHost
    lignePanierobjet_json = localStorage.getItem("lignePanier" + x);
    console.log("PANIER - Téléchargement Ligne Panier n° " + x + " -- En cours");
    lignePanierobjet = JSON.parse(lignePanierobjet_json);
    lignePanier = lignePanierobjet;
    console.log("PANIER - Téléchargement Ligne Panier n° " + x + " -- Téléchargée");
    console.log(lignePanier);

    var articleobjet = {
        ArticleID: lignePanier.ArticleID,
        ArticleNom: lignePanier.ArticleNom,
        ArticleImage: lignePanier.ArticleImage,
        ArticleCouleur: lignePanier.ArticleCouleur,
        ArticleDescription: lignePanier.ArticleDescription,
        ArticlePrix: lignePanier.ArticlePrix,
        ArticleQuantite: produitQuantite.value,
    };
    var articleobjet_json = JSON.stringify(articleobjet);
    localStorage.setItem("lignePanier" + x, articleobjet_json);
    console.log("PRODUIT - MAJ LocalStorage - " + x + "  ligne Panier effectué");

    window.location.href = "panier.html";
}



// PANIER - AFFICHAGE CONTACT DEJA SAISIE si existant
contactobjet_json = localStorage.getItem("contact");
if (contactobjet_json != null) {
    contactobjet = JSON.parse(contactobjet_json);
    contact = contactobjet;
    console.log("CONTACT - Téléchargement LocalStorage : OUI ");

    document.getElementById("panier-prenom").value = contact.ContactPrenom;
    document.getElementById("panier-nom").value = contact.ContactNom;
    document.getElementById("panier-adresse").value = contact.ContactAdresse;
    document.getElementById("panier-cpostal").value = contact.ContactCpostal;
    document.getElementById("panier-ville").innerHTML += '<option value="' + contact.ContactVille + '">' + contact.ContactVille + '</option>'
    document.getElementById("panier-email").value = contact.ContactEmail;

    // CONTACT - Coloriage Erreur ou Ok
    document.getElementById("panier-validation").disabled = false;

    controlecoordonnees("panier-prenom");
    controlecoordonnees("panier-nom");
    controlecoordonnees("panier-adresse");
    controlecoordonnees("panier-cpostal");
    controlecoordonnees("panier-ville");
    controlecoordonnees("panier-email");

}

function controlecoordonnees(nomId) {
    var code = document.getElementById(nomId).value;
    if (nomId == "panier-prenom") { coderegex = /^([a-zA-Z -]+)$/ };
    if (nomId == "panier-nom") { coderegex = /^([a-zA-Z -]+)$/ };
    if (nomId == "panier-adresse") { coderegex = /^([a-zA-Z0-9 -]+)$/ };
    if (nomId == "panier-cpostal") { coderegex = /^([0-9]+)$/ };
    if (nomId == "panier-ville") { coderegex = "" };
    if (nomId == "panier-email") { coderegex = /\S+@\S+\.\S+/ };
    if (!code.match(coderegex)) {
        document.getElementById(nomId).style.backgroundColor = 'salmon';
        document.getElementById("panier-validation").disabled = true;
    } else {
        document.getElementById(nomId).style.backgroundColor = 'chartreuse';
    }
}



// CONTACT - CONTROLE FORMULAIRE
document.getElementById("panier-prenom").addEventListener("input", function() {
    controleSaisieCoordonnees("panier-prenom");
});
document.getElementById("panier-nom").addEventListener("input", function() {
    controleSaisieCoordonnees("panier-nom");
});
document.getElementById("panier-adresse").addEventListener("input", function() {
    controleSaisieCoordonnees("panier-adresse");
});
document.getElementById("panier-cpostal").addEventListener("input", function() {
    controleSaisieCoordonnees("panier-cpostal");
    code = document.getElementById("panier-cpostal").value;
    if (code.length == 5) {
        fetch("https://apicarto.ign.fr/api/codes-postaux/communes/" + code)
            .then(function(res) {
                if (res.ok) {
                    console.log("CPOSTAL - Connexion Server GET : res.ok ");
                    return res.json();
                }
            })
            .then(function(resultat) {
                console.log("CPOSTAL - Lecture des résultats du GET" + resultat[0].codePostal);
                document.getElementById("panier-ville").innerHTML = "";
                if (resultat.length == 1) {
                    code = resultat[0].nomCommune;
                    document.getElementById("panier-ville").innerHTML += '<option value="' + code.toUpperCase() + '">' + code.toUpperCase() + '</option>'
                    document.getElementById("panier-ville").style.backgroundColor = 'chartreuse';
                    document.getElementById("panier-validation").disabled = false;
                    contact_maj();
                } else {
                    document.getElementById("panier-ville").innerHTML = '<option value="">--Choisissez votre ville--</option>'
                    for (let t = 0; t < resultat.length; t++) {
                        code = resultat[t].nomCommune;
                        document.getElementById("panier-ville").innerHTML += '<option value="' + code.toUpperCase() + '">' + code.toUpperCase() + '</option>'
                    }
                }




            })
            .catch(function(err) {
                // Une erreur est survenue
                document.getElementById("panier-cpostal").style.backgroundColor = 'salmon';
                document.getElementById("panier-validation").disabled = true;
                document.getElementById("panier-cpostal").value = 0;
                document.getElementById("panier-ville").value = "";
                contact_maj();
                console.log("CPOSTAL - Erreur dans le GET");
                messageErreur("Ce code postal n'existe pas. Merci de corriger SVP");
            });

    }

});
document.getElementById("panier-ville").addEventListener("input", function() {
    controleSaisieCoordonnees("panier-ville");
});
document.getElementById("panier-email").addEventListener("input", function() {
    controleSaisieCoordonnees("panier-email");
});

function controleSaisieCoordonnees(nomId) {
    var code = document.getElementById(nomId).value;
    if (nomId == "panier-prenom") { coderegex = /^([a-zA-Z -]+)$/ };
    if (nomId == "panier-nom") { coderegex = /^([a-zA-Z -]+)$/ };
    if (nomId == "panier-adresse") { coderegex = /^([a-zA-Z0-9 -]+)$/ };
    if (nomId == "panier-cpostal") { coderegex = /^([0-9]+)$/ };
    if (nomId == "panier-ville") { coderegex = /^([a-zA-Z -]+)$/ };
    if (nomId == "panier-email") { coderegex = /\S+@\S+\.\S+/ };
    if (!code.match(coderegex)) {
        document.getElementById(nomId).style.backgroundColor = 'salmon';
        document.getElementById("panier-validation").disabled = true;

        if (nomId == "panier-prenom") { messageErreur("Uniquement des lettres, ainsi que ESPACE et TIRET") };
        if (nomId == "panier-nom") { messageErreur("Uniquement des lettres, ainsi que ESPACE et TIRET") };
        if (nomId == "panier-adresse") { messageErreur("Uniquement des chiffres et des lettres, ainsi que ESPACE et TIRET") };
        if (nomId == "panier-cpostal") { messageErreur("Uniquement des chiffres") };
        if (nomId == "panier-ville") { messageErreur("Uniquement des lettres, ainsi que ESPACE et TIRET") };

    } else {
        document.getElementById(nomId).style.backgroundColor = 'chartreuse';
        document.getElementById("panier-validation").disabled = false;
        contact_maj();
    }
}


function contact_maj() {
    var contactobjet = {
        ContactPrenom: document.getElementById("panier-prenom").value,
        ContactNom: document.getElementById("panier-nom").value,
        ContactAdresse: document.getElementById("panier-adresse").value,
        ContactCpostal: document.getElementById("panier-cpostal").value,
        ContactVille: document.getElementById("panier-ville").value,
        ContactEmail: document.getElementById("panier-email").value,
    };
    var contactobjet_json = JSON.stringify(contactobjet);
    localStorage.setItem("contact", contactobjet_json);
    console.log("CONTACT - MAJ LocalStorage effectué");
}




// PANIER - FENETRE MESSAGE ERREUR FORMULAIRE
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function messageErreur(messErr) {
    modal.style.display = "block";
    document.getElementById("panier-message").innerText = messErr;
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}