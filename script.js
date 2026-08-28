const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeButton");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

function openMenu() {
    sideMenu.classList.add("open");
    overlay.classList.add("visible");
    sideMenu.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    sideMenu.classList.remove("open");
    overlay.classList.remove("visible");
    sideMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".side-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.querySelectorAll(".tabs a").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tabs a").forEach((item) => {
            item.classList.remove("active");
        });

        tab.classList.add("active");
    });
});

const galleryImages = [
    { src: "quiz1-front.jpg", alt: "Quiz 1 front page" },
    { src: "quiz1-back.jpg", alt: "Quiz 1 back page" }
];
const galleryPreview = document.getElementById("galleryPreview");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const galleryClose = document.getElementById("galleryClose");
const galleryBack = document.getElementById("galleryBack");
const galleryNext = document.getElementById("galleryNext");
let currentImage = 0;

function showGalleryImage(index) {
    currentImage = (index + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImage].src;
    lightboxImage.alt = galleryImages[currentImage].alt;
}

function openGallery() {
    showGalleryImage(0);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    galleryClose.focus();
}

function closeGallery() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    galleryPreview.focus();
}

galleryPreview.addEventListener("click", openGallery);
galleryClose.addEventListener("click", closeGallery);
galleryBack.addEventListener("click", () => showGalleryImage(currentImage - 1));
galleryNext.addEventListener("click", () => showGalleryImage(currentImage + 1));
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeGallery();
    }
});
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) {
        return;
    }

    if (event.key === "Escape") {
        closeGallery();
    } else if (event.key === "ArrowLeft") {
        showGalleryImage(currentImage - 1);
    } else if (event.key === "ArrowRight") {
        showGalleryImage(currentImage + 1);
    }
});

const backToTop = document.getElementById("backToTop");
let previousScrollPosition = window.scrollY;

function updateBackToTopVisibility() {
    const currentScrollPosition = window.scrollY;
    const scrollingUp = currentScrollPosition < previousScrollPosition;
    const shouldShow = currentScrollPosition > 0 && scrollingUp;

    backToTop.classList.toggle("visible", shouldShow);
    previousScrollPosition = currentScrollPosition;
}

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
updateBackToTopVisibility();