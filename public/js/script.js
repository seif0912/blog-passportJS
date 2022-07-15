const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

//////
burger.addEventListener("click", function () {
    burger.classList.toggle("clicked");
    nav.classList.toggle("nav-clicked");
});
//  fix resizing
window.addEventListener("resize", function () {
    const winWidth = window.innerWidth;
    if (winWidth >= 640 && burger.classList.contains("clicked")) {
        burger.classList.remove("clicked");
        nav.classList.remove("nav-clicked");
    }
});

window.addEventListener('scroll', ()=>{
    let nav = document.querySelector('header')
    nav.classList.toggle('sticky', window.scrollY > 0)
})