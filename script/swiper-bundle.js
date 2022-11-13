var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 55,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    350: {
      slidesPerView: 2,
    },
    550: {
      slidesPerView: 3,
    },
    650: {
      slidesPerView: 3,
    },
    850: {
      slidesPerView: 4,
    },
    1050: {
      slidesPerView: 5,
    },
  },
});