

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyDFh4duGBn43AmIO-p_1X-PBSZzSLRSZL8",
  authDomain: "demande-stock.firebaseapp.com",
  projectId: "demande-stock",
  storageBucket: "demande-stock.appspot.com",
  messagingSenderId: "659045696524",
  appId: "1:659045696524:web:abab97960f2d831e535a29",
  measurementId: "G-81RS2ZDMEK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

async function uploadImageAndGetURL(file) {
  const storageRef = ref(storage, 'images/' + file.name);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image : ', error);
    return null;
  }
}

const Btndiv = document.getElementById('Btn_Prev')
const BtndiConf = document.getElementById('Btn_Conf')
const radioGroups = ['selectcreation', 'selectcreationqui', 'selectsite'];
const fileInput = document.getElementById('fileInput');
const FormulaireFermer = document.querySelector('.Form-Fermer');
const Formulaire = document.querySelector('.Form-Demande');

const DivPrev = document.querySelector('.pop_up_envoyer')
const CloseBtn = DivPrev.querySelector('.close')

const inputs = Formulaire.querySelectorAll('input[data-intput-id]');
const textarea = document.querySelector('.textarea-textbox');
const error = document.getElementById('error_description');

let selectedRadioValues = {};

Btndiv.addEventListener('click', async function (event) {
  event.preventDefault();

  selectedRadioValues = {};
  var allValid = true;

  if (textarea.value.length === 0 || textarea.value.length < 20) {
    allValid = false;
    error.style.display = "flex";
  } else {
    error.style.display = "none";
  }

  inputs.forEach(element => {
    var valueI = element.value;
    const intputId = element.getAttribute('data-intput-id');
    const errorintput = document.querySelector(`.span_erreur[data-intput-id="${intputId}"]`);


    if (valueI.length === 0) {
      // Il y a une erreur
      allValid = false;
      errorintput.style.display = 'flex';
    } else {
      errorintput.style.display = 'none';
    }
  });

  radioGroups.forEach(groupName => {
    const radioOptions = Formulaire.querySelectorAll(`input[type="radio"][name="${groupName}"]`);

    radioOptions.forEach(radio => {
      if (radio.checked) {
        selectedRadioValues[groupName] = radio.value;
        console.log(selectedRadioValues[groupName])
      }
    });

    // Gestion des erreurs pour chaque groupe radio
    const errorCheckbox = document.querySelector(`.span_erreur[data-intput-id="${groupName}"]`);
    if (!selectedRadioValues[groupName]) {
      allValid = false;
      errorCheckbox.style.display = 'flex';
    } else {
      errorCheckbox.style.display = 'none';
    }
  });

  if (allValid) {

    DivPrev.style.display = "block";
  }
});

BtndiConf.addEventListener("click", async function (event) {
  event.preventDefault();

  const pseudo = document.getElementById('pseduo').value;
  const description = document.getElementById('Description').value;
  const FormulaireValide = document.querySelector('.Form-Envoyer');

  try {
    const timestamp = new Date();
    const imageFiles = fileInput.files; // Récupère les fichiers sélectionnés dans l'input de type file


    if (imageFiles.length > 0) {
      const imageUrls = []; // Stocke les URLs des images téléchargées

      // Télécharge chaque image et récupère les URLs
      for (let i = 0; i < imageFiles.length; i++) {
        const imageUrl = await uploadImageAndGetURL(imageFiles[i]);
        if (imageUrl) {
          imageUrls.push(imageUrl);
        }
      }

      // Envoie les données dans Firestore avec les URLs des images
      const imageDocRef = collection(db, 'demandes');
      await addDoc(imageDocRef, {
        pseudo: pseudo,
        description: description,
        selectedRadioValues,
        timestamp: timestamp,
        imageUrls: imageUrls,
      });
    } else {
      // Aucune image sélectionnée, envoie les autres données sans les URLs des images
      const imageDocRef = collection(db, 'demandes');
      await addDoc(imageDocRef, {
        pseudo: pseudo,
        description: description,
        selectedRadioValues,
        timestamp: timestamp,
      });
    }


    DivPrev.style.display = "none";
    FormulaireValide.style.display = "block";
    Formulaire.style.display = "none";
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande :', error);
  }

})


CloseBtn.onclick = function () {
  DivPrev.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == DivPrev) {
    DivPrev.style.display = "none";
  }
}



async function checkCollectionLimit() {
  try {

    const demandesRef = collection(db, 'demandes');
    const demandesSnapshot = await getDocs(demandesRef);

    if (demandesSnapshot.size >= 5) {
      Formulaire.style.display = "none"
      FormulaireFermer.style.display = "block"
    } else {
      Formulaire.style.display = "block"
      FormulaireFermer.style.display = "none"
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des collections :', error);
  }
}

window.addEventListener('load', () => {
  checkCollectionLimit();
});
