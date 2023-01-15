/*
 * Constrain Function - val, min, max parameters taken.
 * Val is the value to be constrained. Expected int or bool values.
 * Min is the minimum bound and max is the maximum bound. Expected int or bool values.
 * Function constrains numbers outside of the min or max to the given values.
 * Returns a int or boolian value depending on input. 
*/
function constrain(val, min, max) {
    return Math.min(max, Math.max(min, val));
}
/*
 * Map Function - value, low1, high1, low2, high2 parameters taken.
 * Value is the value to be mapped. Expected int or bool values.
 * Low and high are the minimum and maximum numbers to map the value to, for X and Y plane. Expected int or bool values.
 * Function maps numbers to the given values.
 * Returns a int or boolian value depending on input. 
*/
function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
/*
 * selectBackgroundImage Function - Backgound Array parameters taken.
 * Backgroundarray is an array of images that could be used and decides what one to use. Expected array.
 * Function randomly selects a group of images from the array length.
 * Returns the selected array item as an array. 
*/
function selectBackgroundImage(backgoundArray){
    backgroundItem = Math.floor(Math.random() * backgoundArray.length);// Random between range of the array length
    return backgoundArray[backgroundItem];
}
/*
 * moveImage Function - Query Selector, mouse, Left Constraint, Right Constraint parameters taken.
 * Query Selector is the DOM location of the background. Mouse is the user mouse object. Left and Right Constraint is the two integers provided by the selectBackgroundImage function.
 * Function moves the images on screen constrained to the width of the screen and the cursor moving.
 * No items returned.
*/
function moveImage(qSelector, mouse, leftConstraint, rightConstraint){
    qSelector.style.setProperty('left',constrain(mouse.clientX,(window.innerWidth/2)-leftConstraint,(window.innerWidth/2)+rightConstraint)+'px')//Apply mouse X
}
/*
 * onLoad Function - No parameters taken.
 * Function unhides the selected background images and applies the 'block' display CSS style.
 * No items returned.
*/
window.onload = () => {
    backgound = selectBackgroundImage(backgound)
    for (let i = 1; i < backgound.length; i++) {// Increment from 1 to skip name
        document.getElementById(backgound[i][0]).style.display = "block";
    }
}
/*
 * onmousemove Function - E (magic variable) parameters taken.
 * E is a magic variable supplied by the onmousemove fuction.
 * Function checks to see if the menu is in the open position if not the images displayed are moved by the move image function
 * No items returned.
*/
document.onmousemove=function(e) {
    if (localStorage.getItem('menuPos') == 1){ // Session Storage used to control when the background is moving.
        for (let i = 1; i < backgound.length; i++) {
            moveImage(document.querySelector('#'+backgound[i][0]),e,backgound[i][1][0],backgound[i][1][1])//For Aircraft (E is mouse passthrough, leftConstraint and right)
        }
    }
}
// End of JS Functions

// Global Variables
/* Background Array
 * [0] and [1] are the top level items used to select what image is going to be loaded
 * [0][:] and [1][:] are the images, text is the ID supplied in the DOM.
 * [0][:][:] and [1][:][:] are the constrains given to each image due to different sizes, constrains will be different.
*/
var backgound = [
    ['F-35',
    ['f35afterburner', [150, 150]],
    ['f35', [150, 150]],
    ['aim-9x', [80, 80]],
    ['missilesmoke', [80, 80]]],
    ['mq9-reaper',
    ['mq9-reaper', [100, 150]],
    ['hellfire', [50, 80]],
    ['hellfire-missilesmoke', [40, 70]]]
]
