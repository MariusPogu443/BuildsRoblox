// ChargementLoad


window.addEventListener('load', () => {
    document.querySelector('nav').classList.add('Loader')
})


// var donnees = [
//     { libelle: "DusterGN", lien: "https://mega.nz/folder/ceMSlJZT#Jwna3jtf4qqjBPGbHkwzQw" },
//     { libelle: "Résultat 2", lien: "https://lien2.com" },
//     { libelle: "Résultat 3", lien: "https://lien3.com" },
// ];

// var champRecherche = document.getElementById("recherche");
// var zoneResultats = document.getElementById("resultats");
// var zoneResultatsContnaire = document.getElementById("contnaire-resulta");

// function afficherResultats(recherche) {
//     // Réinitialise la zone des résultats
//     zoneResultats.innerHTML = "";
  
//     // Vérifie si la recherche est vide
//     if (recherche.trim() === "") {
//       // Si la recherche est vide, masque la zone des résultats
//       zoneResultatsContnaire.style.display = "none";
//     } else {
//       // Parcourt les données pour trouver des correspondances
//       for (var i = 0; i < donnees.length; i++) {
//         var resultat = donnees[i];
  
//         if (resultat.libelle.toLowerCase().includes(recherche.toLowerCase())) {
//           var lien = document.createElement("a");
//           lien.href = resultat.lien;
//           lien.textContent = resultat.libelle;
  
//           zoneResultats.appendChild(lien);
//           zoneResultats.appendChild(document.createElement("br"));
//         }
//       }
  
//       // Affiche la zone des résultats s'il y a des résultats
//       if (zoneResultats.childElementCount > 0) {
//         zoneResultatsContnaire.style.display = "block";
//       } else {
//         // Masque la zone des résultats si aucun résultat n'est trouvé
//         zoneResultatsContnaire.style.display = "none";
//       }
//     }
//   }

// // Ajoute un gestionnaire d'événements pour la saisie dans le champ de recherche
// champRecherche.addEventListener("input", function () {
//   var recherche = champRecherche.value;
//   afficherResultats(recherche);
// });

// const searchBox = document.querySelector(".contnairSearch");
// const navlinks = document.querySelector(".navlinks-container");
// const resultalinks = document.querySelector(".contnaire-resulta");
// const CloseTextBox = document.getElementById("CloseTextBox");
// const OpenTextBox = document.getElementById("OpenTextBox");

// OpenTextBox.addEventListener("click", function () {
//     // Vérifie si la div est actuellement affichée
//     if (searchBox.style.display === "none" || searchBox.style.display === "") {
//       // Si la div est cachée, affiche-la
//       searchBox.style.display = "flex";
//       CloseTextBox.style.display = "flex";
//       OpenTextBox.style.display = "none";
//       navlinks.style.display = "none";
//       resultalinks.style.display = "none";
//     }
// });

// CloseTextBox.addEventListener("click", function () {
//     // Vérifie si la div est actuellement affichée
//     if (searchBox.style.display === "flex") {
//       // Si la div est cachée, affiche-la
//       searchBox.style.display = "none";
//       CloseTextBox.style.display = "none";
//       OpenTextBox.style.display = "flex";
//       navlinks.style.display = "flex";
//     }
// });


// TranslateGoogle

function googleTranslateElementInit(){
    new google.translate.translateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
};


// Menu deroulant

const hamburgertoggler = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".navlinks-container");

const toggleNav = e => {
    hamburgertoggler.classList.toggle("open")

    const ariaToggle = hamburgertoggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgertoggler.setAttribute("aria-expanded", ariaToggle);

    navLinksContainer.classList.toggle("open");
};
hamburgertoggler.addEventListener("click",
toggleNav);


// Affiche


const SectionOption = document.querySelector(".MenuOption");
const BtnOption = document.querySelector(".ButtonOption");

const ToggleSection = e => {
    SectionOption.classList.add('Close')
};

BtnOption.addEventListener("click",
ToggleSection);

// Nav Bar annimation scroll

document.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const Button = document.querySelector('.button-up');
    if (window.scrollY > 0) {
        nav.classList.add('sticky');
        SectionOption.classList.add('sticky')
        Button.classList.add('Open');
    }else{
        nav.classList.remove('sticky');
        SectionOption.classList.remove('sticky')
        Button.classList.remove('Open');
    }
 
});


// Pagination

const  ulTag = document.querySelector(".ListePage ul")
let totalPages = 2;

function element(totalPages, page){
    let liTag = '';
    let beforePages = page - 1;
    let activrLi;
    let afterPages = page + 1;
    if(page > 1){
        liTag += `<li class="btn prev" onclick="element(totalPages, ${page - 1})"><span><i class="fa-solid fa-angle-left"></i> Préc</span></li>`;
    }

    if(page > 2){
        liTag += `<li class="numb" onclick="element(totalPages, 1)"><span>1</span></li>`;
        if(page > 3){
            liTag += `<li class="dots"><span>...</span></li>`;
        }
    }

    if(page == totalPages){
        beforePages = beforePages - 2;
    }else if(page == totalPages - 1){
        beforePages = beforePages  -1;
    }
    
    if(page == 1){
        afterPages = afterPages + 2;
    }else if(page == 2){
        afterPages = afterPages  + 1;
    }


    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++){
        if (pageLength > totalPages){
            continue;
        }
        if(pageLength == 0){
            pageLength = pageLength +1;
        }
        if(page == pageLength){
            activrLi = "activer";
        }else{
            activrLi = "";
        }
        liTag += `<li class="numb ${activrLi}" onclick="element(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
    }

    if(page < totalPages - 1){
        if(page < totalPages - 2){
            liTag += `<li class="dots"><span>...</span></li>`;
        }
        liTag += `<li class="numb" onclick="element(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
    }

    if(page < totalPages){
        liTag += `<li class="btn next" onclick="element(totalPages, ${page + 1})"><span>Suiv <i class="fa-solid fa-angle-right"></i></span></li>`;
    }
    ulTag.innerHTML = liTag;
};

element(totalPages, 1);

// Search

