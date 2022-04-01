document.querySelector(".menu__icon").onclick = function(){
    document.querySelector(".menu__icon").classList.toggle("active");
    document.querySelector("body").classList.toggle("lock");
};