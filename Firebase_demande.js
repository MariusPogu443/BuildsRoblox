


import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import { getFirestore,collection,doc, setDoc, addDoc} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js';

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
  const btnvalideform = document.querySelector('.Btn-Envoyer');
  const radioGroups = ['selectcreation', 'selectcreationqui', 'selectsite'];

  btnvalideform.addEventListener('click', async function (event) {
    event.preventDefault();

    var allValid = true;
    let selectedRadioValues = {};

    const pseudo = document.getElementById('pseduo').value;
    const description = document.getElementById('Description').value;
    const Formulaire = document.querySelector('.Form-Demande');
    const FormulaireValide = document.querySelector('.Form-Envoyer');

    const inputs = Formulaire.querySelectorAll('input[data-intput-id]');

    inputs.forEach(element => {
        var valueI = element.value;
        const intputId = element.getAttribute('data-intput-id');
        const errorintput = document.querySelector(`.span_erreur[data-intput-id="${intputId}"]`);

        if (valueI.length === 0) {
            // Il y a une erreur
            allValid = false;
            errorintput.style.display = 'flex';
        } else {
            // Pas d'erreur, réinitialiser l'état
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
        try {

            const timestamp = new Date();

            const imageDocRef = collection(db, 'demandes');
            await addDoc(imageDocRef, {
                pseudo: pseudo,
                description: description,
                selectedRadioValues,
                timestamp: timestamp
            });

            FormulaireValide.style.display = "block"
            Formulaire.style.display = "none"

        } catch (error) {
            console.error('Erreur lors de l\'envoi de la demande :', error);
        };
    } 
});


document.getElementById('Description').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { // Vérifie si la touche pressée est "Entrée"
        e.preventDefault(); // Empêche le comportement par défaut (soumission du formulaire, dans la plupart des cas)
        
        // Récupère la position du curseur dans le champ de texte
        var cursorPos = this.selectionStart;
        
        // Récupère le contenu du champ de texte
        var textBefore = this.value.substring(0, cursorPos);
        var textAfter = this.value.substring(cursorPos, this.value.length);
        
        // Ajoute un saut de ligne au bon endroit
        this.value = textBefore + '\n' + textAfter;
        
        // Replace le curseur après le saut de ligne
        this.selectionStart = this.selectionEnd = cursorPos + 1;
    }
});