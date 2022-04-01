@@include('_menu-icon.js');

let bgi = document.querySelector(".js__bgi img").getAttribute("src");
document.querySelector(".js__bgi").setAttribute("style", "background-image: url(" + bgi + ")");
document.querySelector(".js__bgi img").setAttribute("style", "width:0");