const init = () => {
    console.log(true);
}

init();

const initFAQ = () => {
    const collapse = document.querySelectorAll(".collapseFAQ");
    collapse.forEach((el, i) => {
        el.addEventListener("click", () => handleQuestionWrappers(i));
    });

    const handleQuestionWrappers = (index) => {
        const questionWrappers = document.querySelectorAll(".questionWrapper");
        
        questionWrappers.forEach(el => {
            el.classList.remove("active");
        });
        questionWrappers[index].classList.add("active");
    }
}

initFAQ();