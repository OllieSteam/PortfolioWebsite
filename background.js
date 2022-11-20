// Time Check (Manage load time)
console.time('Background Load Time');

// Functions

// Simple constraint function (like P5js)
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
    console.timeEnd('Background Load Time');
    backgound = selectBackgroundImage(backgound)
    for (let i = 1; i < backgound.length; i++) {// Increment from 1 to skip name
        document.getElementById(backgound[i][0]).style.display = "block";
    }
}

document.onmousemove=function(e) {
    for (let i = 1; i < backgound.length; i++) {
        moveImage(document.querySelector('#'+backgound[i][0]),e,backgound[i][1][0],backgound[i][1][1])//For Aircraft (E is mouse passthrough, leftConstraint and right)
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
//   ['mq9-reaper',
//   ['mq9-reaper', [100, 150]]]
]
