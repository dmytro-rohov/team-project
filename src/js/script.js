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


// ---- COUNTERS ----
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

document.addEventListener('DOMContentLoaded', () => {
  // dots removed; main slider handled above
});

  // ---- PRODUCTS SLIDER ----
  document.addEventListener('DOMContentLoaded', () => {
    const productsData = [
      {
        index: '01',
        title: 'Private Sea Access',
        desc: 'Step from your terrace directly onto the shoreline – no crowds, no noise. Just you and the sea, creating an unparalleled sense of calm and privacy.',
        image: 'assets/img/img01.png'
      },
      {
        index: '02',
        title: 'Panoramic Glass Walls',
        desc: 'Floor-to-ceiling windows open the room to the horizon, filling it with natural light and creating a seamless connection with nature.',
        image: 'assets/img/img02.png'
      },
      {
        index: '03',
        title: 'High-End Materials',
        desc: 'Natural, durable materials chosen for warmth, longevity, and timeless luxury. Every detail exudes quality and sophistication.',
        image: 'assets/img/img03.png'
      },
      {
        index: '04',
        title: '24/7 Security & Concierge',
        desc: 'Discreet, professional service that keeps your day smooth and secure. Round-the-clock support ensures your comfort and peace of mind.',
        image: 'assets/img/img04.png'
      },
      {
        index: '05',
        title: 'Smart-Home System',
        desc: 'Control lighting, climate, and security directly from your phone. Smart-home technology makes everyday life effortless and personalized.',
        image: 'assets/img/img05.png'
      },
      {
        index: '06',
        title: 'Low-Density Living',
        desc: 'Few residents, more privacy. Space to breathe, relax, and enjoy your home in peace and quiet.',
        image: 'assets/img/img06.png'
      }
    ];

    const activeImage = document.querySelector('.products-active-image');
    const activeIndex = document.querySelector('.products-active-index');
    const activeTitle = document.querySelector('.products-active-title');
    const activeDesc = document.querySelector('.products-active-desc');
    const thumbsContainer = document.getElementById('products-thumbs');
    const prevBtn = document.querySelector('.products-prev');
    const nextBtn = document.querySelector('.products-next');

    if (!activeImage || !thumbsContainer || !prevBtn || !nextBtn) return;

    let currentProduct = 0;

    function renderThumbs() {
      thumbsContainer.innerHTML = '';
      for (let offset = 1; offset < productsData.length; offset += 1) {
        const idx = (currentProduct + offset) % productsData.length;
        const item = productsData[idx];

        const thumb = document.createElement('div');
        thumb.className = 'product-thumb';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.className = 'product-thumb-image';

        const meta = document.createElement('div');
        meta.className = 'product-thumb-meta';

        const number = document.createElement('h4');
        number.className = 'product-thumb-index';
        number.textContent = item.index;

        const title = document.createElement('div');
        title.className = 'product-thumb-title';
        title.textContent = item.title;

        meta.appendChild(number);
        meta.appendChild(title);

        thumb.appendChild(img);
        thumb.appendChild(meta);

        thumb.addEventListener('click', () => updateProduct(idx));
        thumbsContainer.appendChild(thumb);
      }
    }

    function updateProduct(targetIndex) {
      currentProduct = (targetIndex + productsData.length) % productsData.length;
      const item = productsData[currentProduct];

      activeImage.src = item.image;
      activeImage.alt = item.title;
      activeIndex.textContent = item.index;
      activeTitle.textContent = item.title;
      activeDesc.textContent = item.desc;

      renderThumbs();
    }

    prevBtn.addEventListener('click', () => updateProduct(currentProduct - 1));
    nextBtn.addEventListener('click', () => updateProduct(currentProduct + 1));

    renderThumbs();
    updateProduct(0);
  });