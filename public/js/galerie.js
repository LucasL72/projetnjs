/*======== Modal afficher photo ======================*/
document.querySelectorAll("img[data-modal]").forEach((img) => {
    var content = document.createElement("div"); //background
    content.className = "modals-content";
    content.appendChild(new Image()).src = img.src; //modal image
    img.insertAdjacentElement("afterend", content); //insert invisible content after image
    img.addEventListener("click", () => { //show modal on click
        content.style.opacity = "1";
        content.style.zIndex = "100";
        document.documentElement.style.overflow = "hidden"; //prevent scrolling while modal is shown
    });
    content.addEventListener("click", () => { //hide modal
        content.style.opacity = "";
        content.style.zIndex = "";
        document.documentElement.style.overflow = "";
    });
});