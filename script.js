// TranslateGoogle

function googleTranslateElementInit(){
    new google.translate.translateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
};

// ChargementLoad


window.addEventListener('load', () => {
    document.querySelector('nav').classList.add('Loader')
})

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

const SectionOption = document.querySelector(".MenuOption");
const BtnOption = document.querySelector(".ButtonOption");

const ToggleSection = e => {
    SectionOption.classList.add('Close')
};


BtnOption.addEventListener("click",
ToggleSection);

// new ResizeObserver(entries => {
//     if(entries[0].contentRect.width <= 900){
//         navLinksContainer.style.transition = "transform 0.3s ease-out";
//     }else {
//         navLinksContainer.style.transition = "none";
//     }
// }).observe(document.body);

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