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

// like

const likeButtons = document.querySelectorAll('.like');

const initialLikes = JSON.parse(sessionStorage.getItem('likes') || '{}');

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
        sessionStorage.setItem('likes', JSON.stringify(initialLikes));
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