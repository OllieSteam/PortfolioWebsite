// Manage the verbose loading style of the pyscript libary.
// Ref https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
/*
 * Action after DOM content for a MutationObserver - mutationList param taken, requires a DOM Query selector (No santisiation on inputs)
 * MutationObserver is a event listener. Runs once when DOM content has fully loaded before CSS.
 * Finds all pyscript tags on the page.
 * Enumuerates through them, then creates and event listener on each.
 * Checking for child changes as this is when the script has finished running to ensure the loading verbose is abstracted from the user.
 * Adds CSS show class to each py-script when the added nodes are created by the pyscript libary.
*/

document.addEventListener("DOMContentLoaded", function(){// Code starting here
    let code = document.querySelectorAll('py-script');

    const callback = (mutationList) => {
        for (const mutation of mutationList) {
          if (mutation.type === 'childList') {
            if(mutation.addedNodes.length >= 1){
                mutation.target.classList.add("show");
            }
          }
        }
    };
    
    const observer = new MutationObserver(callback);// To here is taken from the Ref URL with slight modification.
    for (let i = 0; i < code.length; i++) {
        observer.observe(code[i], {childList: true});
    }
})


