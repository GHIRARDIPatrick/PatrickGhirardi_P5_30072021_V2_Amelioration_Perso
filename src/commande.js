// ________________________________________________________________________________________________________________
// COMMANDE - Variables
var messageErreur;
listeLignePanierID = [];

console.log("JS COMMANDE - Ca fonctionne");



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



// PANIER - TELECHARGEMENT DONNEES 
totalCommande = 0;
for (let i = 1; i < nbLignePanier + 1; i++) {
    lignePanierobjet_json = localStorage.getItem("lignePanier" + i);
    console.log("PANIER - Téléchargement Ligne Panier n° " + i + " -- En cours");
    if (lignePanierobjet_json != null) {
        lignePanierobjet = JSON.parse(lignePanierobjet_json);
        lignePanier = lignePanierobjet;
        console.log("PANIER - Téléchargement Ligne Panier n° " + i + " -- Téléchargée");
        console.log(lignePanier);
        totalLigne = (lignePanier.ArticlePrix / 100) * lignePanier.ArticleQuantite;
        totalCommande = totalCommande + (+totalLigne);
        console.log("Total Ligne : " + totalLigne);
        console.log("Total Commande : " + totalCommande);
        if (lignePanier.ArticleQuantite != 0) {
            listeLignePanierID.push(lignePanier.ArticleID);
        }
    }
};


// COMMANDE - CONTROLE TOTAL COMMANDE
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



// CONTACT - TELECHARGEMENT DONNEES 
contactobjet_json = localStorage.getItem("contact");
if (contactobjet_json != null) {
    contactobjet = JSON.parse(contactobjet_json);
    contact = contactobjet;
    console.log("CONTACT - Téléchargement LocalStorage : OUI ");

    var contact = {
        firstName: contact.ContactPrenom,
        lastName: contact.ContactNom,
        address: contact.ContactAdresse,
        city: contact.ContactCpostal + " " + contact.ContactVille,
        email: contact.ContactEmail,
    };


    essai = { 'contact': contact, 'products': listeLignePanierID };
    console.log(essai);


    // POST COMMANDE
    fetch(adresseURL + "/api/teddies/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'contact': contact, 'products': listeLignePanierID }),
        })
        .then(function(res) {
            if (res.ok) {
                console.log("POST -> RES.JSON : OK");
                return res.json();
            }
        })
        .then(function(value) {
            // AFFICHAGE COMMANDE VALIDATION
            console.log("N° de Commande : " + value.orderId);
            document.getElementById("Commande-Numero").innerText = "n° " + value.orderId;
            document.getElementById("Commande-Total").innerText = "Le montant de votre commande est de " + totalCommande + " euros ";

            // SUPPRESSION LOCALHOST - COMMANDE EN COURS sauf CONTACT
            localStorage.removeItem("index");
            console.log("COMMANDE - Suppression LOCALHOST de l'index - Effectuée");
            localStorage.removeItem("Nb_Ligne_Panier");
            console.log("COMMANDE - Suppression LOCALHOST du Nb Ligne Panier - Effectuée");
            for (let i = 1; i < nbLignePanier + 1; i++) {
                lignePanierobjet_json = localStorage.getItem("lignePanier" + i);
                if (lignePanierobjet_json != null) {
                    console.log("COMMANDE - Suppression LOCALHOST Ligne Panier n° " + i + " - Effectuée");
                    localStorage.removeItem("lignePanier" + i);
                }
            }
        })
        .catch(function(err) {
            // Une erreur est survenue
            console.log("INDEX - Erreur dans le GET");
            messageErreur("ERREUR CONNEXION SERVER|Veuillez retenter la connexion dans quelques minutes... Merci.");
        });

} else {
    console.log("COMMANDE - pas de contact téléchargé + Non envoi données au SERVEUR");
    window.location.href = "index.html";
};