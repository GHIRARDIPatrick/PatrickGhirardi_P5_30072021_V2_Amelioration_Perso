// ________________________________________________________________________________________________________________
// INDEX - AFFICHAGE DES OURSONS EN LISTE
var messageErreur;
var famille = "";

console.log("JS INDEX - Ca fonctionne");


// FAMILLE - Récupération 
familleobjet_json = localStorage.getItem("famille");
if (familleobjet_json != null) {
    console.log("PRODUIT - Controle si LocalStorage FAMILLE existant : OUI");
    x = JSON.parse(familleobjet_json);
    famille = x.famille;
} else {
    console.log("PRODUIT - Controle si LocalStorage FAMILLE existant : NON --> Renvoi en INDEX.HTML");
}
console.log("Famille déja sélectionnée : " + famille);


// FAMILLE - MEMORISATION SELECTION
function selectionFamille(x) {
    console.log("Sélection Famille : " + x);
    if (x == "ourson") { famille = "teddies" };
    if (x == "photo") { famille = "cameras" };
    if (x == "meuble") { famille = "furnitures" };

    var familleobjet = {
        famille: famille
    };
    var familleobjet_json = JSON.stringify(familleobjet);
    localStorage.setItem("famille", familleobjet_json);
};




// PRODUITS - AFFICHAGE PRODUITS de la FAMILLE
if (famille != null) { myFetchFamille() }

async function myFetchFamille() {
    try {
        console.log(adresseURL + "/api/" + famille);
        let response = await fetch(adresseURL + "/api/" + famille);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }

        function(resultat);
        console.log("INDEX - Lecture des résultats du GET");
        var produitNombre = resultat.length;
        produit = resultat;
        console.log("INDEX - Lecture résultat " + resulstat);
        console.log("INDEX - Nb Articles téléchargés : " + produitNombre)

        for (let i = 0; i < produitNombre; i++) {
            document.getElementById("JS").innerHTML += '<a onclick="myFunction(' + i + ')" href="produit.html" class="col-lg-4"><article><img src="' + produit[i].imageUrl + '" alt="Photo ' + produit[i].description + '"><h2 id>' + produit[i].name + '</h2><p>Prix : ' + produit[i].price / 100 + ' euros</p><span class="hidden">' + produit[i]._id + '</span></article></a>';

            // document.getElementById("JS").innerHTML += '<a onclick="myFunction()" href="produit.html" class="col-lg-4"><article><img src="' + produit[i].imageUrl + '" alt="Photo ' + produit[i].description + '"><h2 id>' + produit[i].name + '</h2><p>Prix : ' + produit[i].price / 100 + ' euros</p><div class="form-group hidden"><label for="index-ref" class="control-label col-sm-2">Référence :</label><div class="col-lg-10"><input class="form-control-static" type="text" id="index-ref" name="index-ref" value="' + produit[i]._id + '" required></p></div></div></article></a>';
        }

    } catch (e) {
        // Une erreur est survenue
        console.log("INDEX - Erreur dans le GET");
        console.log(e);

        messageErreur("ERREUR CONNEXION SERVER|Veuillez retenter la connexion dans quelques minutes... Merci.");

    }
}



// fetch(adresseURL + "/api/" + famille)
//     .then(function(res) {
//         if (res.ok) {
//             console.log("INDEX - Connexion Server GET : res.ok ");
//             return res.json();
//         }
//     })
//     .then(function(resultat) {
//         console.log("INDEX - Lecture des résultats du GET");
//         var produitNombre = resultat.length;
//         produit = resultat;
//         console.log("INDEX - Lecture résultat " + resultat);
//         console.log("INDEX - Nb Articles téléchargés : " + produitNombre)

//         for (let i = 0; i < produitNombre; i++) {
//             document.getElementById("JS").innerHTML += '<a onclick="myFunction(' + i + ')" href="produit.html" class="col-lg-4"><article><img src="' + produit[i].imageUrl + '" alt="Photo ' + produit[i].description + '"><h2 id>' + produit[i].name + '</h2><p>Prix : ' + produit[i].price / 100 + ' euros</p><span class="hidden">' + produit[i]._id + '</span></article></a>';

//             // document.getElementById("JS").innerHTML += '<a onclick="myFunction()" href="produit.html" class="col-lg-4"><article><img src="' + produit[i].imageUrl + '" alt="Photo ' + produit[i].description + '"><h2 id>' + produit[i].name + '</h2><p>Prix : ' + produit[i].price / 100 + ' euros</p><div class="form-group hidden"><label for="index-ref" class="control-label col-sm-2">Référence :</label><div class="col-lg-10"><input class="form-control-static" type="text" id="index-ref" name="index-ref" value="' + produit[i]._id + '" required></p></div></div></article></a>';
//         }
//     })
//     .catch(function(err) {
//         // Une erreur est survenue
//         console.log("INDEX - Erreur dans le GET");
//         messageErreur("ERREUR CONNEXION SERVER|Veuillez retenter la connexion dans quelques minutes... Merci.");
//     });



// INDEX - MEMORISATION DES DONNEES SELECTIONNEES
function myFunction(x) {
    console.log(x);
    console.log(produit[x].name);

    var indexobjet = {
        IndexID: produit[x]._id,
        IndexNom: produit[x].name,
        IndexCouleur: produit[x].colors,
        indexDescrption: produit[x].description,
        IndexPrix: produit[x].price
    };
    var indexobjet_json = JSON.stringify(indexobjet);
    localStorage.setItem("index", indexobjet_json);
};


// INDEX - FENETRE MESSAGE ERREUR
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