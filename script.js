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

new ResizeObserver(entries => {
    if(entries[0].contentRect.width <= 900){
        navLinksContainer.style.transition = "transform 0.3s ease-out";
    }else {
        navLinksContainer.style.transition = "none";
    }
}).observe(document.body);



document.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('sticky');
    }else{
        nav.classList.remove('sticky');
    }
 
});

// like

const likeButtons = document.querySelectorAll('.like');

const initialLikes = JSON.parse(localStorage.getItem('likes') || '{}');

likeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('color')
        if(btn.classList.contains('color')){
            const likeCounter = btn.nextElementSibling;
            const count = parseInt(likeCounter.textContent);
            likeCounter.innerText = `${count + 1}`;
            const id = btn.dataset.id;
            initialLikes[id] = count + 1;
        }else{
            const likeCounter = btn.nextElementSibling;
            const count = parseInt(likeCounter.textContent);
            likeCounter.innerText = `${count - 1}`;
            const id = btn.dataset.id;
            initialLikes[id] = count - 1;
        }
        localStorage.setItem('likes', JSON.stringify(initialLikes));
    });
});

(() => {
    Object.keys(initialLikes).forEach((key) => {
        const likeCounter = document.querySelector(
            `.like-counter[data-id="${key}"]`
        );
        likeCounter.innerText = initialLikes[key];
    });
})();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ8-2M8C4nDCgE1kpo-s1lvmIHljzeCn0",
  authDomain: "downloadcount-d3f96.firebaseapp.com",
  projectId: "downloadcount-d3f96",
  storageBucket: "downloadcount-d3f96.appspot.com",
  messagingSenderId: "125919828610",
  appId: "1:125919828610:web:63dd84eb783b83eea0f29b",
  measurementId: "G-Y8RE4FVM56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const database = firebase.database();

function incrementDL() {
    DL += 1;
    
    if (DL >= 5) {
      btn_DL.classList.add("display_none");
    }
  
    // Sauvegarde dans la base de données Firebase
    database.ref('downloadCount').set(DL);
  };

  const TelButtons = document.querySelectorAll('.downloadCl');

    TelButtons.forEach((btn) => {
        btn.addEventListener("click", incrementDL);
  });

