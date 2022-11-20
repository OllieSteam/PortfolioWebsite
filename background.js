// Functions

// Backgound Image Manipulator
function moveImageX(qSelector,mouse, imageFromRight, imageFromLeft, leftConstraint, rightConstraint){
    if (mouse.clientX <= imageFromRight){ //Left Mouse Movement Control
        if((mouse.clientX >= imageFromLeft-leftConstraint)){
            qSelector.style.setProperty('left',mouse.clientX+'px')//Apply mouse X to Left CSS
        }else{
            qSelector.style.setProperty('left',imageFromLeft-leftConstraint+'px') //Apply largest safe constraint as Mouse X is outside of the movement constraints
        }
    }else if (mouse.clientX > imageFromRight){ //Right Mouse Movement Control
        if (mouse.clientX <= imageFromRight+rightConstraint){
            qSelector.style.setProperty('left',mouse.clientX+'px')//Apply mouse X to left CSS but on the right hand side
        }else{
            qSelector.style.setProperty('left',imageFromRight+rightConstraint+'px')
        }
    }
}

function moveImageY(qSelector, mouse, imageFromTop, topConstraint){
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
            qSelector.style.setProperty('top',imageFromTop+topConstraint+'px')
        }
    }
}
// End of Backgound Image Manipulator

// JS Functions
window.onload=function() {
    console.log('loaded')
    document.getElementById('f35').style.display = "block";
    document.getElementById('aim-9x').style.display = "block";
}

document.onmousemove=function(e) {
    imageFromRight = (window.innerWidth/2)//Get Image general location on the page, also used for reactivity
    imageFromLeft = (window.innerWidth-imageFromRight)//Left side
    imageFromTop = (window.innerHeight/2)//Top Side
    moveImageX(document.querySelector('#f35'),e,imageFromRight,imageFromLeft,100,80)//For F35 Aircraft (E is mouse passthrough, 100 is leftConstraint and 80 is right)
    moveImageY(document.querySelector('#f35'),e,imageFromTop,40)//For F35 Aircraft (40 is for topConstraint)

    moveImageX(document.querySelector('#aim-9x'),e,imageFromRight,imageFromLeft,80,80)
    moveImageY(document.querySelector('#aim-9x'),e,imageFromTop,50)
}
// End of JS Functions

// Global Variables