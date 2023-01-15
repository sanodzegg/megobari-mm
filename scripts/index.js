const initFAQ = () => {
    const collapse = document.querySelectorAll(".collapseFAQ");

    collapse.forEach((el, i) => {
        el.addEventListener("click", () => {
            const questionWrappers = document.querySelectorAll(".questionWrapper");
        
            questionWrappers.forEach(el => {
                el.classList.remove("active");
            });
            
            questionWrappers[i].classList.add("active");
        });
    });
}

initFAQ();

const initNavbar = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = [...document.querySelector(".navlist").children]; // HTMLCollection --> Array

    navLinks.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();

            navLinks.forEach(e => {
                e.firstChild.classList.remove("active");
            });
    
            const anchor = el.firstChild;
            anchor.classList.add("active");
    
            const y = sections[i].offsetTop;
            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        });
    });
}

initNavbar();