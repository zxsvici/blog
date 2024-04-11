const mouseEnter = (e, num = -10) => {
    e.currentTarget.style.transform = `translateY(${num}px)`;
}

const mouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
}

export {
    mouseEnter,
    mouseLeave
}