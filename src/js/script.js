// SCROLL SECTION

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


// REVIEWS SLIDER

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
    }
  },

  on: {
    slideChange: updateExtendedClasses,
    init: updateExtendedClasses,
  }
});

// function to add prev-2 and next-2
function updateExtendedClasses(swiper) {

    swiper.slides.forEach(slide => {
    slide.classList.remove(
      'prev-2',
      'next-2'
    );
  });

  const prev = swiper.slides[swiper.activeIndex - 1];
  const prev2 = swiper.slides[swiper.activeIndex - 2];

  if (prev2) prev2.classList.add('prev-2');

  const next = swiper.slides[swiper.activeIndex + 1];
  const next2 = swiper.slides[swiper.activeIndex + 2];

  if (next2) next2.classList.add('next-2');
}


// CUSTOM DROP DOWN LIST


document.addEventListener('DOMContentLoaded', () => {
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
  optionsList.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      const text = option.textContent;
      const value = option.dataset.value;

      triggerBtn.querySelector("span").textContent = text;
      hiddenInput.value = value;

      triggerBtn.setAttribute("aria-expanded", "false");
      customSelect.classList.remove("open");
    });

    // Keyboard selection
    option.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        option.click();
      }
    });
  });

  // Close on clicking outside
  document.addEventListener("click", e => {
    if (!customSelect.contains(e.target)) {
      triggerBtn.setAttribute("aria-expanded", "false");
      customSelect.classList.remove("open");
    }
  });

  // Close on ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      triggerBtn.setAttribute("aria-expanded", "false");
      customSelect.classList.remove("open");
    }
  });
});
