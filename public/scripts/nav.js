const hamburger = document.querySelector(".hamburger");
const navlinks = document.querySelector(".navlinks ul");
const links = document.querySelectorAll(".navlinks  ul li");


hamburger.addEventListener("click",()=>{
    

    document.querySelector("header").classList.toggle("header-class");
    

    navlinks.classList.toggle("open");
    links.forEach(link =>{
        link.classList.toggle("fade");
    })
})
console.log(window.innerWidth);
if(window.innerWidth<850){
    document.querySelector(".adduser-icon").classList.add("change");
    document.querySelector(".change").innerHTML="add user";
}
else{
    document.querySelector(".adduser-icon").classList.remove("change");
    document.querySelector(".adduser-icon").innerHTML="<i class='fas fa-user-plus  nav-icons'></i>";
}
function changeText(){
if(window.innerWidth<850){
    document.querySelector(".adduser-icon").classList.add("change");
    document.querySelector(".change").innerHTML="add user";
}
else{
    document.querySelector(".adduser-icon").classList.remove("change");
    document.querySelector(".adduser-icon").innerHTML="<i class='fas fa-user-plus  nav-icons'></i>";
}
}