/*
 * Constrain Function - val, min, max parameters taken
 * val is the value to be constrained. Expected int or bool values
 * min is the minimum bound and max is the maximum bound. Expected int or bool values
 * Function constrains numbers outside of the min or max to the given values.
 * Returns a int or boolian value depending on input. 
*/
function constrain(val, min, max) {
    return Math.min(max, Math.max(min, val));
}
// Simple map function (like P5js)
function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// Background Image Selector
function selectBackgroundImage(backgoundArray){
    backgroundItem = Math.floor(Math.random() * backgoundArray.length);// Random between range of the array length
    return backgoundArray[backgroundItem];
}

// Backgound Image Manipulator
function moveImage(qSelector, mouse, leftConstraint, rightConstraint){
    qSelector.style.setProperty('left',constrain(mouse.clientX,(window.innerWidth/2)-leftConstraint,(window.innerWidth/2)+rightConstraint)+'px')//Apply mouse X
}
// End of Backgound Image Manipulator

// JS Functions
window.onload = () => { // JS Arrow function works the same as normal function with no arguments or function name
    backgound = selectBackgroundImage(backgound)
    for (let i = 1; i < backgound.length; i++) {// Increment from 1 to skip name
        document.getElementById(backgound[i][0]).style.display = "block";
    }
}

document.onmousemove=function(e) {
    if (localStorage.getItem('menuPos') == 1){ // Session Storage used to control when the background is moving.
        for (let i = 1; i < backgound.length; i++) {
            moveImage(document.querySelector('#'+backgound[i][0]),e,backgound[i][1][0],backgound[i][1][1])//For Aircraft (E is mouse passthrough, leftConstraint and right)
        }
    }
}
// End of JS Functions

// Global Variables
var backgound = [
    ['F-35',
    ['f35afterburner', [150, 150]],
    ['f35', [150, 150]],
    ['aim-9x', [80, 80]],
    ['missilesmoke', [80, 80]]],
    ['mq9-reaper',
    ['mq9-reaper', [100, 150]]]
]
