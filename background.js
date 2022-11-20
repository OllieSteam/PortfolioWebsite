// Functions

// Background Image Selector
function selectBackgroundImage(backgoundArray){
    backgroundItem = Math.floor(Math.random() * backgoundArray.length);
    backgroundItem = backgoundArray[backgroundItem];
    return backgroundItem
}

// Backgound Image Manipulator
function moveImageX(qSelector,mouse, imageForX, leftConstraint, rightConstraint){
    if (mouse.clientX <= imageForX){ //Left Mouse Movement Control
        if((mouse.clientX >= imageForX-leftConstraint)){
            qSelector.style.setProperty('left',mouse.clientX+'px')//Apply mouse X to Left CSS
        }else{
            qSelector.style.setProperty('left',imageForX-leftConstraint+'px') //Apply largest safe constraint as Mouse X is outside of the movement constraints
        }
    }else if (mouse.clientX > imageForX){ //Right Mouse Movement Control
        if (mouse.clientX <= imageForX+rightConstraint){
            qSelector.style.setProperty('left',mouse.clientX+'px')//Apply mouse X to left CSS but on the right hand side
        }else{
            qSelector.style.setProperty('left',imageForX+rightConstraint+'px')
        }
    }
}

function moveImageY(qSelector, mouse, imageFromTop, topConstraint, bottomConstraint){
    if(mouse.clientY < imageFromTop){ //Top Mouse Movement Control
        if(mouse.clientY >= imageFromTop-topConstraint){
            qSelector.style.setProperty('top',mouse.clientY+'px') //Apply mouse Y to top CSS
        }else{
            qSelector.style.setProperty('top',imageFromTop-topConstraint+'px') //Apply largest safe constraint as Mouse Y is outside of the movement constraints
        }
    }else{
        if(mouse.clientY < imageFromTop+topConstraint){ // Bottom Mouse Movement Control
            qSelector.style.setProperty('top',mouse.clientY+'px') //Apply mouse Y to top CSS but for the bottom (due to large Y value)
        }else{
            qSelector.style.setProperty('top',imageFromTop+bottomConstraint+'px')
        }
    }
}
// End of Backgound Image Manipulator

// JS Functions
window.onload = () => { // JS Arrow function works the same as normal function with no arguments or function name
    console.info('loaded')
    backgound = selectBackgroundImage(backgound)
    for (let i = 1; i < backgound.length; i++) {// Increment from 1 to skip name
        document.getElementById(backgound[i][0]).style.display = "block";
        
    }
}

document.onmousemove=function(e) {
    imageForX = (window.innerWidth/2)//Get Image general location on the page, also used for reactivity
    imageFromTop = (window.innerHeight/2)//Top Side
    for (let i = 1; i < backgound.length; i++) {
        moveImageX(document.querySelector('#'+backgound[i][0]),e,imageForX,backgound[i][1][0],backgound[i][1][1])//For Aircraft (E is mouse passthrough, leftConstraint and right)
        moveImageY(document.querySelector('#'+backgound[i][0]),e,imageFromTop,backgound[i][1][2],backgound[i][1][3])//For Background (for topConstraint and bottomConstraint)
    }
}
// End of JS Functions

// Global Variables
var backgound = [
    ['F-35',
    ['f35afterburner', [100, 150, 0, 0]],
    ['f35', [100, 150, 0, 0]], //Name, Left Constraint, Right Constraint, Top Constraint, Bottom Constraint
    ['aim-9x', [80, 80, 50, 50]],
    ['missilesmoke', [78, 78, 50, 50]]],
//   ['mq9-reaper',
//   ['mq9-reaper', [100, 150, 80, 30]]]
]
