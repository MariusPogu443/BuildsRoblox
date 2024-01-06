import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAM1ywLOowFqTVueP2E0QhY0xkw77UkRkI",
  authDomain: "react-auth-10601.firebaseapp.com",
  projectId: "react-auth-10601",
  storageBucket: "react-auth-10601.appspot.com",
  messagingSenderId: "310257603639",
  appId: "1:310257603639:web:ca12da43394b4f7b491bb2"
};

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const db = getFirestore(app);


if (document.querySelector('.Form-Demande.Inscription')){
    const Btn_Inscription = document.getElementById('Inscription_Btn');
const Form_Inscription = document.querySelector('.Form-Demande.Inscription');
const Intput = Form_Inscription.querySelectorAll('input[data-intput-id]');

async function checkExistingUser(email) {
    try {
        const userRecord = await getAuth(Auth).getUserByEmail(email);
        // Si l'utilisateur est trouvé, cela signifie que l'adresse e-mail est déjà utilisée
        return true;
    } catch (error) {
        // Si une erreur survient, l'utilisateur n'existe pas ou une autre erreur est survenue
        return false;
    }
};

Btn_Inscription.addEventListener('click', async function (event) {
    event.preventDefault();

    var AllValid = true;

    Intput.forEach(element => {
        var ValueI = element.value;
        const intputId = element.getAttribute('data-intput-id');
        const errorintput = Form_Inscription.querySelector(`.span_erreur[data-intput-id="${intputId}"]`);

        if (ValueI.length === 0 ){
            AllValid = false;
            errorintput.style.display = "flex";
        }else{
            errorintput.style.display = "none";
        }


        if (intputId === "PasswordVerify") {
            const password = document.getElementById('Password').value;
            if (ValueI !== password) {
                AllValid = false;
                const passwordError = Form_Inscription.querySelector('.span_erreur[data-intput-id="PasswordVerify"]');
                passwordError.innerHTML = `
                    <span class="fleche-haut">
                        <i class="fa-sharp fa-solid fa-caret-up"></i>
                    </span>
                    Les mots de passe ne correspondent pas
                `;
                passwordError.style.display = "flex";
            }
            // Si les mots de passe correspondent, le message d'erreur reste masqué
        }
    })

    const emailValue = document.getElementById('Email').value;
    const emailExists = await checkExistingUser(emailValue);

    if (emailExists) {
        AllValid = false;
        const emailError = Form_Inscription.querySelector('.span_erreur[data-intput-id="Email"]');
        emailError.innerHTML = `
            <span class="fleche-haut">
                <i class="fa-sharp fa-solid fa-caret-up"></i>
            </span>
            Cette adresse e-mail est déjà utilisée
        `;
        emailError.style.display = "flex";
    }

    // Si tous les champs sont valides et que l'e-mail n'est pas déjà utilisé, continue avec la création du compte utilisateur
    if (AllValid) {
        const email = document.getElementById('Email').value;
        const password = document.getElementById('Password').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
            const user = userCredential.user;

                const profilDocRef = doc(db, 'Users', user.uid);

                const intputpseudo = document.getElementById('Pseudo');
                const pseudo = intputpseudo.value

                await setDoc(profilDocRef, { 
                    pseudo: pseudo 
                });

                window.location.href = "../index.html";
            // Redirection vers une page de confirmation ou autre action ici
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                AllValid = false;
                const emailError = Form_Inscription.querySelector('.span_erreur[data-intput-id="Email"]');
                emailError.innerHTML = `
                <span class="fleche-haut">
                    <i class="fa-sharp fa-solid fa-caret-up"></i>
                </span>
                Cette adresse e-mail est déjà utilisée
                `;
                emailError.style.display = "flex";
            } else {
                const emailError = Form_Inscription.querySelector('.span_erreur[data-intput-id="Email"]');
                emailError.style.display = "none";
            }
        }
    }

})
}

if (document.querySelector('.Connexion')){
    const Btn_Connexion = document.getElementById('Connection_Btn');
    const Form_Connexion = document.querySelector('.Connexion');
    const InputC = Form_Connexion.querySelectorAll('input[data-intput-id]');

    Btn_Connexion.addEventListener('click', async function (event) {
        event.preventDefault()

        var AllValid = true;

        InputC.forEach(element => {
            var ValueI = element.value;
            const intputId = element.getAttribute('data-intput-id');
            const errorintput = Form_Connexion.querySelector(`.span_erreur[data-intput-id="${intputId}"]`);

            if (ValueI.length === 0 ){
                AllValid = false;
                errorintput.style.display = "flex";
            }else{
                errorintput.style.display = "none";
            }
        });


        if (AllValid) {
            const email = document.getElementById('Email_Connexion').value;
            const password = document.getElementById('Password_Connexion').value;
    
            try {
                await signInWithEmailAndPassword(Auth, email, password);
                window.location.href = "../index.html";
                
            } catch (error) {
                if (error.code === "auth/invalid-email") {
                    AllValid = false;
                    const emailError = Form_Connexion.querySelector('.span_erreur[data-intput-id="Email"]');
                    emailError.innerHTML = `
                        <span class="fleche-haut">
                            <i class="fa-sharp fa-solid fa-caret-up"></i>
                        </span>
                        Adresse e-mail inconnue. Vérifiez l’orthographe.
                    `;
                emailError.style.display = "flex";
                } else if ( error.code === "auth/too-many-requests" ) {
                    AllValid = false;
                    const Error = document.getElementById('error_login')
                    Error.innerText = "Adresse e-mail ou mot de passe incorrect. Veuillez réessayer."
                    Error.style.display = "flex";
                } else if ( error.code === "auth/invalid-login-credentials"  ){
                    AllValid = false;
                    const Error = document.getElementById('error_login')
                    Error.innerText = "Adresse e-mail ou mot de passe incorrect. Veuillez réessayer."
                    Error.style.display = "flex";
                }else {
                    console.error("Erreur lors de la connexion :", error.code, error.message);
                    // Gestion des autres erreurs lors de la connexion de l'utilisateur
                    // Affichage d'un message d'erreur approprié ou redirection vers une page de connexion
                }
            }
        };
    })
}


Auth.onAuthStateChanged(() =>{
    console.log('sdqsdqsdqsdqsd')
})