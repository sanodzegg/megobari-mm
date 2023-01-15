const swiper = () => {
    const draggableElement = document.querySelector(".innerReviews");

    let startEvent = "";
    let moveEvent = "";
    let endEvent = "";

    const userWithMobile = detectMobile();

    if (userWithMobile) {
        startEvent = "touchstart";
        moveEvent = "touchmove";
        endEvent = "touchend";
    } else {
        startEvent = "mousedown";
        moveEvent = "mousemove";
        endEvent = "mouseup";
    }

    let isDragging = false;
    let offsetX = 0;

    draggableElement.addEventListener(startEvent, (e) => handleMouseDown(e), { passive: true });

    draggableElement.addEventListener(moveEvent, (e) => handleMouseMove(e), { passive: true });

    draggableElement.addEventListener(endEvent, () => handleMouseUp(), { passive: true });

    const handleMouseDown = (e) => {
        isDragging = true;
        offsetX = userWithMobile ? e.touches[0].clientX - draggableElement.offsetLeft : e.clientX - draggableElement.offsetLeft;
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
            draggableElement.classList.add("dragging");
        } else {
            draggableElement.classList.remove("dragging");
            return;
        };

        const x = userWithMobile ? e.touches[0].clientX - offsetX : e.clientX - offsetX;
        if (x > 0) return;

        const exceededLastNode = hasExceeded();

        if (exceededLastNode) {
            draggableElement.style.left = `${exceededLastNode.lastNodePosition}px`;
            isDragging = false;
            return;
        };

        draggableElement.style.left = `${x}px`;

        const draggableRect = draggableElement.getBoundingClientRect();

        setActiveDot(Math.abs(draggableRect.x));
    }

    const handleMouseUp = () => {
        isDragging = false;
    }


    const hasExceeded = () => {
        const slidesWrapper = document.querySelector(".reviewsWrapper");

        const nodes = [...draggableElement.children];
        const lastNode = nodes[nodes.length - 1];
        
        const lastNodeRect = lastNode.getBoundingClientRect();
        const slidesWrapperRect = slidesWrapper.getBoundingClientRect();
        const draggableRect = draggableElement.getBoundingClientRect();
        
        if (lastNodeRect.right - slidesWrapperRect.right <= -10) {
            return { lastNodePosition: draggableRect.left, exceeded: true };
        } else return false;
    }


    
    const setActiveDot = (x) => {
        const dots = document.querySelectorAll(".dot");

        let activeKey;
        let closestValue = Infinity;

        for (let key in dotActiveObject) {
            if (x > dotActiveObject[key]) {
                activeKey = (parseInt(key) + 1).toString();
                break;
            } else if (Math.abs(x - dotActiveObject[key]) < Math.abs(x - closestValue)) {
                activeKey = key;
                closestValue = dotActiveObject[key];
            }
        }

        dots.forEach(e => {
            e.classList.remove("active");
        });

        dots[activeKey].classList.add("active");
    }

    const handleDotNavigation = () => {
        const dotNodes = document.querySelectorAll(".dot");
        dotNodes.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                let scrollValue = null;
                
                scrollValue = dotActiveObject[index - 1] == undefined ? 0 : dotActiveObject[index - 1];

                draggableElement.style.left = `${-scrollValue}px`;

                dotNodes.forEach(e => {
                    e.classList.remove("active");
                });
        
                dotNodes[index].classList.add("active");
            });
        });
    }

    let dotActiveObject = {};

    const initializeSwiperDots = () => {
        const swiperWrapperEl = document.querySelector(".swiperDots");

        const reviewsWrapperWidth = document.querySelector(".innerReviews").offsetWidth;

        const nodes = [...draggableElement.children]
        const lastNodeWidth = nodes[nodes.length - 1].offsetWidth; // need to subtract from full width,
                                                                   // because last review won't count in swiper

        const realWidth = reviewsWrapperWidth - lastNodeWidth;

        const vwSize = window.innerWidth;
        const dots = Math.ceil(realWidth / vwSize);

        for(let i = 0; i < dots; i++) {
            const dotNode = document.createElement("div");
            dotNode.className = "dot";
            if (i === 0) dotNode.classList.add("active");
            swiperWrapperEl.appendChild(dotNode);
        }

        const dotNodes = document.querySelectorAll(".dot");
        const dotLength = dotNodes.length;
                                          
        let init = 0;
        
        for(let i = 0; i < dotLength; i++) {
            const checkPoint = Math.floor(realWidth / dotLength);
            init += checkPoint;
            dotActiveObject[i] = init;
        }

        handleDotNavigation();
    }
    
    initializeSwiperDots();
}

const detectMobile = () => {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

swiper();