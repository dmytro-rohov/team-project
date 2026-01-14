document.addEventListener("DOMContentLoaded", () => {

  // TODO: active class on menu

//   window.onscroll = function showHeader() {
//     let nav = document.querySelector('.hero-nav');
//     if (window.pageYOffset>100) {
//       nav.classList.add('--active');
//     } else {
//       nav.classList.remove('--active');
//     }
//  }
  const body = document.body;
  const nav = document.querySelector('.hero-nav');

  let lastScrollY = window.pageYOffset;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > 0) {
      nav.classList.add("--active");
    } else {
       nav.classList.remove('--active');
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      nav.classList.add("nav-hidden");
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  });

  // TODO: PRELOADER

  // scrolling block
  const preloader = document.getElementById("preloader");
  document.body.classList.add("no-scroll");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide"); 
      document.body.classList.remove("no-scroll"); 
    }, 1500)
  })

  // TODO: SCROLL SECTION
  const section = document.querySelector(".portfolio-section");
  const items = [...document.querySelectorAll(".portfolio-section__item")];

  function handleScrollAnimation() {
    const rect = section.getBoundingClientRect();
    const totalHeight = window.innerHeight * items.length;

    // scroll progress 0-1
    const progress = Math.min(
      Math.max((window.innerHeight - rect.top) / totalHeight, 0),
      1
    );

    const segment = 1 / items.length;

    items.forEach((item, iteration) => {
      item.style.transformOrigin = "bottom center";

      const start = iteration * segment;
      const end = (iteration + 1) * segment;

      let scaleValue = 1;
      let opacityValue = 1;
      let translateYValue = 0;

      // first item always fullscreen
      if (iteration === 0) {
        item.style.opacity = 1;
        item.style.transform = `translateY(0px) scale(1)`;
        item.style.zIndex = 1;
        return;
      }

      // animation range
      if (progress >= start && progress <= end) {
        const local = (progress - start) / segment;

        // scale
        scaleValue = 0.5 + local * 0.5;

        // slide from bottom
        translateYValue = (1 - local) * window.innerHeight * 0.5;

        opacityValue = 1;
        item.style.zIndex = 10 + iteration;
      } else if (progress > end) {
        // full screen, no movement
        scaleValue = 1;
        translateYValue = 0;
        opacityValue = 1;
        item.style.zIndex = iteration;
      } else {
        // not yet visible
        scaleValue = 0.5;
        translateYValue = window.innerHeight * 0.5;
        opacityValue = 0;
        item.style.zIndex = iteration;
      }

      item.style.opacity = opacityValue;
      item.style.transform = `translateY(${translateYValue}px) scale(${scaleValue})`;
    });
  }

  window.addEventListener("scroll", handleScrollAnimation);

  // TODO: REVIEWS SLIDER
  const reviewsSlider = new Swiper(".reviews-section__slider", {
    slidesPerView: 5,
    spaceBetween: 80,
    centeredSlides: true,
    loop: true,

    navigation: {
      nextEl: ".reviews-section__arrow--next",
      prevEl: ".reviews-section__arrow--prev",
    },

    breakpoints: {
      1200: {
        slidesPerView: 5,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 80,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 60,
      },
      0: {
        slidesPerView: 1.3,
        spaceBetween: 30,
      },
    },

    on: {
      slideChange: updateExtendedClasses,
      init: updateExtendedClasses,
    },
  });

  //  function to add prev-2 and next-2
  function updateExtendedClasses(swiper) {
    swiper.slides.forEach((slide) => {
      slide.classList.remove("prev-2", "next-2");
    });

    const prev = swiper.slides[swiper.activeIndex - 1];
    const prev2 = swiper.slides[swiper.activeIndex - 2];

    if (prev2) prev2.classList.add("prev-2");

    const next = swiper.slides[swiper.activeIndex + 1];
    const next2 = swiper.slides[swiper.activeIndex + 2];

    if (next2) next2.classList.add("next-2");
  }


  // checking method thoe slider is swiping
  let isDragging = false;

  reviewsSlider.on("touchStart", () => {
    isDragging = false;
  });

  reviewsSlider.on("touchMove", () => {
    isDragging = true;
  });

  document.querySelectorAll(".reviews-slider-slide__img").forEach(img => {
    img.addEventListener("click", (e) => {
      if (isDragging) return;
      const slide = img.closest(".reviews-slider-slide");
      if (slide.classList.contains('swiper-slide-active')) {
        openPopup(img.src);
      }
    });
  });

  // // function to open center slide image in lightbox
  // function openPopup(src) {
  //   const popup = document.createElement("div");
  //   popup.classList.add("image-popup");
  //   popup.innerHTML = `
  //     <div class="image-popup__overlay"></div>
  //     <div class="image-popup__content">
  //       <img src="${src}" alt="Preview">
  //       <button class="image-popup__close">×</button>
  //     </div>`;
  //     document.body.appendChild(popup);
  //     document.body.classList.add("no-scroll")

  //     popup.querySelector(".image-popup__close").addEventListener("click", () => {
  //       popup.remove();
  //       document.body.classList.remove("no-scroll");
  //     });

  //     popup.querySelector(".image-popup__overlay").addEventListener("click", () =>{
  //       popup.remove();
  //       document.body.classList.remove("no-scroll");

  //     });
  // }


  // CUSTOM DROP DOWN LIST
  const customSelect = document.querySelector(".custom-select");
  const triggerBtn = document.querySelector(".custom-select__trigger");
  const optionsList = document.querySelector(".custom-select__options");
  const hiddenInput = document.querySelector(".hidden-input");

  // Toggle open/close
  triggerBtn.addEventListener("click", () => {
    const expanded = triggerBtn.getAttribute("aria-expanded") === "true";
    triggerBtn.setAttribute("aria-expanded", !expanded);
    customSelect.classList.toggle("open");
  });

  // Choose option
  optionsList.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      const text = option.textContent;
      const value = option.dataset.value;

      triggerBtn.querySelector("span").textContent = text;
      hiddenInput.value = value;

      triggerBtn.setAttribute("aria-expanded", "false");
      customSelect.classList.remove("open");
    });

    // Keyboard selection
    option.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        option.click();
      }
    });
  });

  // Close on clicking outside
  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      triggerBtn.setAttribute("aria-expanded", "false");
      customSelect.classList.remove("open");
    }
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      triggerBtn.setAttribute("aria-expanded", "false");
      customSelect.classList.remove("open");
    }
  });

  // TODO: about-us SLIDER

  const slides = document.querySelectorAll(".slide");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  const slideCount = slides.length;
  const sliderBarFill = document.querySelector('.slider-bar-fill');
  let i = 0;

  function showSlide(n) {
  slides.forEach(s => s.classList.remove("active"));
  slides[n].classList.add("active");
  if (sliderBarFill && slideCount > 0) {
    const progress = ((n + 1) / slideCount) * 100;
    sliderBarFill.style.width = `${progress}%`;
  }
  }

  next.addEventListener("click", () => {
  i = (i + 1) % slides.length;
  showSlide(i);
  });

  prev.addEventListener("click", () => {
  i = (i - 1 + slides.length) % slides.length;
  showSlide(i);
  });

  // init progress
  if (sliderBarFill && slideCount > 0) {
  sliderBarFill.style.width = `${(1 / slideCount) * 100}%`;
  }

  // TODO: COUNTERS 
  const counters = document.querySelectorAll(".counter-number");

  function startCounters() {
  counters.forEach(counter => {
  const target = +counter.dataset.target;
  let count = 0;
  const speed = target / 100;

  const update = () => {
    count += speed;
    if (count < target) {
      counter.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };
  update();
  });
  }

  let started = false;
  window.addEventListener("scroll", () => {
  const section = document.querySelector(".aboutus-section");
  const top = section.getBoundingClientRect().top;

  if (top < window.innerHeight - 100 && !started) {
  startCounters();
  started = true;
  }
  });

  // TODO: products(offer) slider

  const offerSlider = new Swiper(".products-grid", {
    slidesPerView: 4,
    loop: true,
    allowTouchMove: false,
    spaceBetween: 20,

    navigation: {
      nextEl: ".products-next",
      prevEl: ".products-prev",
    },

    breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1370: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },

    on: {
      init(swiper) {
        updateActiveSlide(swiper);
      },
      slideChangeTransitionStart(swiper) {
        updateActiveSlide(swiper);
      }
    }
  });

  function updateActiveSlide(swiper) {
    swiper.slides.forEach(slide => slide.classList.remove('--active'));

    const firstVisibleIndex = swiper.activeIndex;
    const activeSlide = swiper.slides[firstVisibleIndex];
    if (activeSlide) activeSlide.classList.add('--active');
  }

  // TODO: burger menu
  const burger = document.querySelector('.burger');
  const burgerWrapper = document.querySelector('.burger-wrapper');

  burger.addEventListener('click', e => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !expanded);
    burger.classList.toggle('open');
    burgerWrapper.classList.toggle('open');
    body.classList.toggle('no-scroll');
  });

  burgerWrapper.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burgerWrapper.classList.remove('open');
      body.classList.remove('no-scroll');
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.burger-wrapper') && !e.target.closest('.burger')) {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burgerWrapper.classList.remove('open');
      body.classList.remove('no-scroll');
    }
  });

});


