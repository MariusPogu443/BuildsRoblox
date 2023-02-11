const hamburgertoggler = document.querySelector(".hamburger")
const navLinksContainer = document.querySelector(".navlinks-container");

const toggleNav = e => {
    hamburgertoggler.classList.toggle("open")

    const ariaToggle = hamburgertoggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgertoggler.setAttribute("aria-expanded", ariaToggle)

    navLinksContainer.classList.toggle("open")
}
hamburgertoggler.addEventListener("click",
toggleNav)

new ResizeObserver(entries => {
    if(entries[0].contentRect.width <= 900){
        navLinksContainer.style.transition = "transform 0.3s ease-out"
    }else {
        navLinksContainer.style.transition = "none"
    }
}).observe(document.body)