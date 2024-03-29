// MOUSE

if (matchMedia('(pointer:fine)').matches) {
    // Device has a mouse
  
    //Create cursor divs
  
    // Create the cursorGroup div
    var cursorGroupScript = document.createElement('div');
    cursorGroupScript.classList.add('cursorGroup');

    // Create the cursorCircle0 div
    var cursorCircle0Script = document.createElement('div');
    cursorCircle0Script.classList.add('cursorCircle', 'cursorCircle0');

    // Append cursorCircle0 to cursorGroup
    cursorGroupScript.appendChild(cursorCircle0Script);

    // Create 20 cursorCircleS divs and append them to cursorGroup
    for (var i = 1; i <= 80; i++) {
    var cursorCircleScript = document.createElement('div');
    cursorCircleScript.classList.add('cursorCircle');
    cursorGroupScript.appendChild(cursorCircleScript);
    }
    
    // Get the body element
    var body = document.body;

    // Insert cursorGroup as the first child of the body
    body.insertBefore(cursorGroupScript, body.firstChild);

    // Animate mouse
    var cursorSize = 24;
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".cursorCircle");

    circles.forEach(function (cursorCircle) {
        cursorCircle.x = 0;
        cursorCircle.y = 0;
    });

    window.addEventListener("mousemove", function(e){
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach(function (cursorCircle, index) {
            cursorCircle.style.left = x - (cursorSize / 2) + "px";
            cursorCircle.style.top = y - (cursorSize / 2) + "px";
            cursorCircle.style.setProperty('--cursorSize', cursorSize + "px");
    
            cursorCircle.x = x;
            cursorCircle.y = y;
    
            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.075;
            y += (nextCircle.y - y) * 0.075;
        });

        requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
};



// LENIS Smooth Scroll

const lenis = new Lenis({
duration: 1,
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
})
/*
lenis.on('scroll', (e) => {
console.log(e)
})
*/
function raf(time) {
lenis.raf(time)
requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


// SPLIT TYPE

//ADD SPLITME TO ALL TEXT

// Select all h1, h2, h3, h4, h5, h6, and p elements
var elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, ol, ul, li");

// Add the class "splitMe" to each selected element
elements.forEach(function(element) {
    element.classList.add("splitMe");
});

// This would be a reference to the container element that contains split text
const containerElement = document.body;
// the SplitType instance
const text = new SplitType('.splitMe', { types: 'lines, words', tagName: 'span' });
// stores the previous width of the container element
let previousContainerWidth = null;

// An event handler that will be called when the container element is resized.
function handleResize(entries) {
    const { contentRect } = entries[0];
    let width = Math.floor(contentRect.width);

    // only proceed if:
    // 1. previousContainerWidth has been set. This avoids calling the split
    //    method when the resizeObserver is triggered on the initial render
    // 2. the width of the container element has changed.
    if (previousContainerWidth !== null && previousContainerWidth !== width) {
        // Call the split method to re-split the text. This will reposition
        // the text based on the new container size.
        text.split();

        // Wrap the animation in a function to execute after a small delay
        setTimeout(animateText, 1);
    }
    previousContainerWidth = width;
}

// Use a Promise to ensure that the split is complete before setting up the ResizeObserver
function setupResizeObserver() {
    return new Promise(resolve => {
        // This example uses lodash#debounce so the split method only gets called once
        // after the resizing is complete.x
        const resizeObserver = new ResizeObserver(_.debounce(entries => {
            handleResize(entries);
            resolve(); // Resolve the Promise once the ResizeObserver is set up
        }, 100));
        resizeObserver.observe(containerElement);
    });
}


// TEXT ANIMATION

function animateText() {

    const containers = gsap.utils.toArray('h1, h2, h3, h4, h5, h6, p, ol, ul, li');

    containers.forEach(container => {
        const words = container.querySelectorAll('.word');

        gsap.to(words, {
            y: 0,
            stagger: 0.025,
            delay: 0.001,
            duration: 0.7,
            ease: "power4.out",
            scrollTrigger: {
                markers: false,
                trigger: container,
                start: 'top 95%',
                end: 'bottom 5%',
                toggleActions: 'play reverse play reverse',
            }
        });
    });
}

setupResizeObserver().then(() => {
    animateText();
});