
const scrollBtn = document.querySelector("span.slide-to-top-btn");
const DISTANCE_TO_SCROLL_BTN = 250;

window.addEventListener("scroll", () => {
    const scrolledPoints = window.scrollY;
    if (scrolledPoints > DISTANCE_TO_SCROLL_BTN) {
        scrollBtn.classList.add("toggle-slide-btn")
    } else {
        scrollBtn.classList.remove("toggle-slide-btn")
    }
})

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0
    })
})