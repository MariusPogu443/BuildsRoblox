//  Notif

function removeCircle(notification) {
  // Supprime le cercle du LI survolé
  const circle = notification.querySelector('.fa-circle');
  if (circle) {
      circle.style.display = 'none';
      const notificationText = notification.innerText.trim();
    localStorage.setItem(notificationText, 'vue');
  }

  loadNotificationStates();
}

const NotifBtn = document.querySelector(".icon-notif");
const NotifPointIcon = document.getElementById("PointNotif");
const Notifcontnaire = document.querySelector(".contnaire-notif");

if (NotifBtn) {
  NotifBtn.addEventListener("click", function (){
    if (Notifcontnaire.style.display == "none" || Notifcontnaire.style.display == "" ){
      Notifcontnaire.style.display = "flex"
    }else{
      Notifcontnaire.style.display = "none"
    }
      NotifPointIcon.style.display = "none"
  
  });
  
}

function loadNotificationStates() {
  const notifications = document.querySelectorAll('.Notification li');
  let hasUnviewedNotification = false;

  if (notifications){
    notifications.forEach(notification => {
      const notificationText = notification.innerText.trim();
      const isViewed = localStorage.getItem(notificationText);
  
      if (isViewed !== 'vue') {
        // Si la notification n'a pas été vue, affiche le cercle
        const circle = notification.querySelector('.fa-circle');
        if (circle) {
          circle.style.display = 'block';
        }
        hasUnviewedNotification = true; // Met à jour à true si au moins une notification non vue est trouvée
      } else {
        // Si la notification a été vue, cache le cercle
        const circle = notification.querySelector('.fa-circle');
        if (circle) {
          circle.style.display = 'none';
        }
      }
    });
  
    // Affiche ou cache la pastille en fonction des notifications non vues
    const pointNotif = document.getElementById('PointNotif');
    if (pointNotif) {
      if (hasUnviewedNotification) {
        pointNotif.style.visibility = "visible"
      } else {
        pointNotif.style.visibility = "hidden"
      }
    }
  }
}

// Appel de la fonction pour charger les états des notifications au chargement de la page
window.addEventListener('load', loadNotificationStates);

// Nav Bar annimation scroll

const SectionOption = document.querySelector(".MenuOption");

document.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const Button = document.querySelector('.button-up');
    const Titre = document.querySelector('.TitrePage')
    if (window.scrollY > 0) {
        nav.classList.add('sticky');
        Button.classList.add('Open');
        if (Titre){
          Titre.classList.add('sticky');
        };
        if (SectionOption){
          SectionOption.classList.add('sticky')
        };
    }else{
        nav.classList.remove('sticky');
        Button.classList.remove('Open');
        if (Titre){
          Titre.classList.remove('sticky');
        };
        if (SectionOption){
          SectionOption.classList.remove('sticky')
        }
    }
 
});

// ChargementLoad

window.addEventListener('load', () => {
    document.querySelector('.nav').classList.add('Loader')
})

const searchBox = document.querySelector(".contnairSearch");
const navlinks = document.querySelector(".navlinks-container");
const resultalinks = document.querySelector(".contnaire-resulta");
const CloseTextBox = document.getElementById("CloseTextBox");
const OpenTextBox = document.getElementById("OpenTextBox");
var TextBoxsearchBox = document.querySelector('.search-textbox');
const hamburgertoggler = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".navlinks-container");
const TitreSite = document.querySelector(".LogoText");

OpenTextBox.addEventListener("click", function () {
    // Vérifie si la div est actuellement affichée
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      if (window.innerWidth <= 900){
        hamburgertoggler.style.display= "none";
        searchBox.style.display = "flex";
        CloseTextBox.style.display = "flex";
        OpenTextBox.style.display = "none";
        navlinks.style.display = "none";
        resultalinks.style.display = "none";
        TitreSite.style.display = "none";
        TextBoxsearchBox.style.borderRadius = "10px 10px 10px 10px";
      }else{
        // Si la div est cachée, affiche-la
      searchBox.style.display = "flex";
      CloseTextBox.style.display = "flex";
      OpenTextBox.style.display = "none";
      navlinks.style.display = "none";
      resultalinks.style.display = "none";
      TextBoxsearchBox.style.borderRadius = "10px 10px 10px 10px";
      }
    }
});

CloseTextBox.addEventListener("click", function () {
  if (searchBox.style.display === "flex") {
    if (window.innerWidth <= 900){
      hamburgertoggler.style.display= "flex";
      searchBox.style.display = "none";
      CloseTextBox.style.display = "none";
      OpenTextBox.style.display = "flex";
      navlinks.style.display = "flex";
      resultalinks.style.display = "none";
      TitreSite.style.display = "flex";
      TextBoxsearchBox.style.borderRadius = "10px 10px 10px 10px";
    }else{
      // Si la div est cachée, affiche-la
      searchBox.style.display = "none";
      CloseTextBox.style.display = "none";
      OpenTextBox.style.display = "flex";
      navlinks.style.display = "flex";
    }
  }
});

// Menu deroulant

const toggleNav = e => {
    hamburgertoggler.classList.toggle("open")

    const ariaToggle = hamburgertoggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgertoggler.setAttribute("aria-expanded", ariaToggle);

    navLinksContainer.classList.toggle("open");
};
hamburgertoggler.addEventListener("click",
toggleNav);

// Pagination

// const  ulTag = document.querySelector(".ListePage ul")
// let totalPages = 2;

// function element(totalPages, page){
//     let liTag = '';
//     let beforePages = page - 1;
//     let activrLi;
//     let afterPages = page + 1;
//     if(page > 1){
//         liTag += `<li class="btn prev" onclick="element(totalPages, ${page - 1})"><span><i class="fa-solid fa-angle-left"></i> Préc</span></li>`;
//     }

//     if(page > 2){
//         liTag += `<li class="numb" onclick="element(totalPages, 1)"><span>1</span></li>`;
//         if(page > 3){
//             liTag += `<li class="dots"><span>...</span></li>`;
//         }
//     }

//     if(page == totalPages){
//         beforePages = beforePages - 2;
//     }else if(page == totalPages - 1){
//         beforePages = beforePages  -1;
//     }
    
//     if(page == 1){
//         afterPages = afterPages + 2;
//     }else if(page == 2){
//         afterPages = afterPages  + 1;
//     }


//     for (let pageLength = beforePages; pageLength <= afterPages; pageLength++){
//         if (pageLength > totalPages){
//             continue;
//         }
//         if(pageLength == 0){
//             pageLength = pageLength +1;
//         }
//         if(page == pageLength){
//             activrLi = "activer";
//         }else{
//             activrLi = "";
//         }
//         liTag += `<li class="numb ${activrLi}" onclick="element(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
//     }

//     if(page < totalPages - 1){
//         if(page < totalPages - 2){
//             liTag += `<li class="dots"><span>...</span></li>`;
//         }
//         liTag += `<li class="numb" onclick="element(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
//     }

//     if(page < totalPages){
//         liTag += `<li class="btn next" onclick="element(totalPages, ${page + 1})"><span>Suiv <i class="fa-solid fa-angle-right"></i></span></li>`;
//     }
//     ulTag.innerHTML = liTag;
// };

// element(totalPages, 1);

