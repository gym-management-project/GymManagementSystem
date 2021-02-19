var date = new Date();
document.querySelector(".current-year").innerHTML=date.getFullYear();
const hamburger = document.querySelector(".hamburger");
const navlinks = document.querySelector(".navlinks ul");
const links = document.querySelectorAll(".navlinks  ul li");
const contribute = document.querySelector(".contribute");
const homeCirc = document.querySelector(".home-circle");
const homePage = document.querySelector(".homePage").style;
const home = document.querySelector(".home");
const aboutCirc = document.querySelector(".about-circle");
const aboutPage = document.querySelector(".aboutPage").style;
const about = document.querySelector(".about");
const contactCirc = document.querySelector(".contact-circle");
const contactPage = document.querySelector(".contactPage").style;
const contact = document.querySelector(".contact");
function showHome(){
    homePage.display="block";
    aboutPage.display="none";
    contactPage.display="none";
    homeCirc.style.background="white";
    aboutCirc.style.background="none";
    contactCirc.style.background="none";
}
function showAbout(){
    homePage.display="none";
    aboutPage.display="flex";
    contactPage.display="none";
    homeCirc.style.background="none";
    aboutCirc.style.background="white";
    contactCirc.style.background="none";
}
function showContact(){
    homePage.display="none";
    aboutPage.display="none";
    contactPage.display="block";
    homeCirc.style.background="none";
    aboutCirc.style.background="none";
    contactCirc.style.background="white";
}
home.addEventListener("click",()=>{
    showHome();
})
homeCirc.addEventListener("click",()=>{
    showHome();
})
about.addEventListener("click",()=>{
    showAbout();
})
aboutCirc.addEventListener("click",()=>{
    showAbout();
})
contact.addEventListener("click",()=>{
    showContact();
})
contactCirc.addEventListener("click",()=>{
    showContact();
})
hamburger.addEventListener("click",()=>{
document.querySelector("header").style.transition ="all 3s";
document.querySelector(".navlinks").classList.toggle("navlinks-add");
navlinks.classList.toggle("open");
links.forEach(link =>{
    link.classList.toggle("fade");
});});
