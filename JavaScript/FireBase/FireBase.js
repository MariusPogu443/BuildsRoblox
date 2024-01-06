
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getFirestore, doc, setDoc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyD3zlMoF4RR0BLwTiM4sjDEF8KSQMg-sd8",
  authDomain: "vuesystemes.firebaseapp.com",
  projectId: "vuesystemes",
  storageBucket: "vuesystemes.appspot.com",
  messagingSenderId: "1035689926245",
  appId: "1:1035689926245:web:795671c6a589c4cf60708c",
  measurementId: "G-8385KK8B94"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Recherche Bar

import donnees from '../datasearch.js';

var champRecherche = document.getElementById("recherche");
var zoneResultats = document.getElementById("resultats");
var zoneResultatsContnaire = document.getElementById("contnaire-resulta");
var TextBoxsearchBox = document.querySelector('.search-textbox');

async function ClickSearch(lien, event) {
  console.log("babaa")

  event.preventDefault()

  const imageId = lien.getAttribute('data-image-id');
  const viewCounter = document.querySelector(`.view-counter[data-image-id="${imageId}"]`);

  try {
    const imageDocRef = doc(db, 'MODELS', imageId);

    const imageDocSnap = await getDoc(imageDocRef);

    if (imageDocSnap.exists()) {
      const data = imageDocSnap.data();
      const currentViews = data.views || 0;
      await updateDoc(imageDocRef, { views: currentViews + 1 });
      viewCounter.innerHTML = `<img src="ressource/icons8-downloading-updates-windows-11-outline-70.png">${currentViews + 1}`;
    } else {
      await setDoc(imageDocRef, { views: 1 });
      viewCounter.innerHTML = `<img src="ressource/icons8-downloading-updates-windows-11-outline-70.png">1`;
    }
  } catch (error) {
    console.error('Error updating views:', error);
  }

  window.open(lien.href, '_blank');

};

const liens = document.querySelectorAll(".liencherche");

function afficherResultats(recherche) {
    // Réinitialise la zone des résultats
    zoneResultats.innerHTML = "";
    // Vérifie si la recherche est vide
    if (recherche.trim() === "") {
      // Si la recherche est vide, masque la zone des résultats
      zoneResultatsContnaire.style.display = "none";
      TextBoxsearchBox.style.borderRadius = "10px";
    } else {
      // Parcourt les données pour trouver des correspondances
      for (var i = 0; i < donnees.length; i++) {
        var resultat = donnees[i];
  
        if (resultat.libelle.toLowerCase().includes(recherche.toLowerCase())) {
          var resulatachercher = document.createElement("div");
          var lien = document.createElement("a");
          var icon = document.createElement("i");
          lien.href = resultat.lien;
          lien.textContent = resultat.libelle;
          lien.classList = "liencherche"
          lien.target = "_blank"
          icon.classList = resultat.icon;
          lien.dataset.imageId = resultat.data_image_id;
          lien.addEventListener("click", (e) =>{
            ClickSearch(e.target,e)
          })
          zoneResultats.appendChild(resulatachercher);
          resulatachercher.appendChild(icon)
          resulatachercher.appendChild(lien)
        }
      }
  
      // Affiche la zone des résultats s'il y a des résultats
      if (zoneResultats.childElementCount > 0) {
        zoneResultatsContnaire.style.display = "block";
        TextBoxsearchBox.style.borderRadius = "10px 10px 0 0";
      } else {
        // Masque la zone des résultats si aucun résultat n'est trouvé
        zoneResultatsContnaire.style.display = "none";
        TextBoxsearchBox.style.borderRadius = "10px";
      }
    }
  }

// Ajoute un gestionnaire d'événements pour la saisie dans le champ de recherche
champRecherche.addEventListener("input", function () {
  var recherche = champRecherche.value;
  afficherResultats(recherche);
});



const downloadLinks = document.querySelectorAll('.ButtonT');

downloadLinks.forEach((link) => {
  link.addEventListener('click', async (event) => {
    event.preventDefault(); // Empêche le lien de s'ouvrir immédiatement
    console.log("qsdqsdqsdqsdqsdq")

    const imageId = link.getAttribute('data-image-id');
    const viewCounter = document.querySelector(`.view-counter[data-image-id="${imageId}"]`);

    try {
      const imageDocRef = doc(db, 'MODELS', imageId);

      const imageDocSnap = await getDoc(imageDocRef);

      if (imageDocSnap.exists()) {
        const data = imageDocSnap.data();
        const currentViews = data.views || 0;
        await updateDoc(imageDocRef, { views: currentViews + 1 });
        viewCounter.innerHTML = `<img src="ressource/icons8-downloading-updates-windows-11-outline-70.png">${currentViews + 1}`;
      } else {
        await setDoc(imageDocRef, { views: 1 });
        viewCounter.innerHTML = `<img src="ressource/icons8-downloading-updates-windows-11-outline-70.png">1`;
      }
    } catch (error) {
      console.error('Error updating views:', error);
    }

    // Ouvrez le lien après avoir mis à jour les vues
    window.open(link.href, '_blank');
  });
});

// Lorsque la page est rechargée (actualisée)
window.addEventListener('load', async () => {
  // Récupérez les données de la base de données Firestore pour chaque image
  downloadLinks.forEach(async (link) => {
    const imageId = link.getAttribute('data-image-id');
    const viewCounter = document.querySelector(`.view-counter[data-image-id="${imageId}"]`);

    try {
      const imageDocRef = doc(db, 'MODELS', imageId);
      const imageDocSnap = await getDoc(imageDocRef);

      if (imageDocSnap.exists()) {
        const data = imageDocSnap.data();
        const currentViews = data.views || 0;
        viewCounter.innerHTML = `<img src="ressource/icons8-downloading-updates-windows-11-outline-70.png"> ${currentViews}`;
      }
    } catch (error) {
      console.error('Error retrieving views:', error);
    }
  });
});

