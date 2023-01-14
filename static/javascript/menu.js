// Menu Manager
localStorage.setItem('menuPos',1);//Session Storage to track if the menu is up or down.

/*
 * Menu Function - No @Params taken
 * Function is only active when Navbar icon is clicked.
 * Function checks status of Navbar icon and Menu text then applies the oppsitie to it. Open to closed and vise versa.
 * Local storage uses global variable menuPos to track the position of the menu.
*/

document.menu=function(){
    let navbar = document.getElementsByClassName('navIcon')
    let content = document.getElementById('menu-content')
    if (navbar[0].classList.contains('active')){
        navbar[0].classList.remove('active')
        content.classList.remove("open")
        localStorage.setItem('menuPos',1);
    }else{
        navbar[0].classList.add('active')
        content.classList.add("open")
        localStorage.setItem('menuPos',0);
    }
}

/*
 * Action after DOM content Load Function - No @Params taken
 * Function is only runs once. Runs once when DOM content has fully loaded before CSS.
 * Reads all items in the navbar list.
 * Converts them into href links based on the names in the list.
 * Each item is sanitiesed to avoid spaces and capital letters.
*/

document.addEventListener("DOMContentLoaded", function(){
    let pages = document.querySelectorAll('nav a');
    let location = window.location.pathname.replace(/^\/?|\/?$/g, "")
    for (let i = 0; i < pages.length; i++) {
        if (location == 0 || pages[i].innerHTML.toLowerCase() == 'home'){
            pages[i].href = '/index.html'
        }else{
            pages[i].href = '/'+pages[i].innerHTML.replace(" ", "_").toLowerCase()+'.html'
        }
    }
});