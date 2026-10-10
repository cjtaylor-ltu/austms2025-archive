import PhotoSwipeLightbox from "./photoswipe-lightbox.esm.js";
import PhotoSwipe from "./photoswipe.esm.js";

const lightbox = new PhotoSwipeLightbox({
    gallery: ".photo-carousel .splide__list",
    children: ".photo-link",
    pswpModule: PhotoSwipe,
});

let activeCarousel = null;

document.querySelectorAll(".photo-link").forEach(link => {
    link.addEventListener("click", () => {
        activeCarousel = link.closest(".photo-carousel");
    });
});

lightbox.on("close", () => {
    if (!activeCarousel) return;

    const index = lightbox.pswp.currIndex;
    const groupStart = Math.floor(index / 3) * 3;

    activeCarousel.splide.go(groupStart);
    activeCarousel = null;
});

lightbox.init();
