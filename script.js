'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Insert cookie message
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved functionality. <button class="btn btn--close-cokie">Got it!</button>';
message.style.backgroundColor = '#37383d';
message.style.width = '108%';

setTimeout(() => {
  header.prepend(message);
  message.style.height =
    Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';
  const cookieButton = document.getElementsByClassName('btn--close-cokie');
  cookieButton[0].addEventListener('click', function () {
    message.remove();
  });
}, 1000);

// Scrolling
btnScrollTo.addEventListener('click', function (e) {
  // const s1Coords = section1.getBoundingClientRect();
  // window.scrollTo(s1Coords.left + window.pageXOffse, s1Coords.y + window.pageYOffset); //current position + the current scroll
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffse,
  //   top: s1Coords.y + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegation
// 1. Add event listener to common parent element
// 2. Detemine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
// Event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;
  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  // Active tab
  clicked.classList.add('operations__tab--active');
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navbar
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // a height that will be applied outside of target element (observer object wont change, visual will)
});
headerObserver.observe(header);

// Reveal sections
const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  entries.forEach(entry => {

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});


// Lazy loading image
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {

    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,         // Viewport reference
  threshold: 0,       // Visibility threshold
  rootMargin: '200px' // Margin around the root
});

imgTargets.forEach(el => imgObserver.observe(el));

// SLIDES
let curSlide = 0;
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const maxSlides = slides.length;

const createDots = function () {
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend', 
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  });
}
createDots();
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);
activateDot(0);
// Next slide
const nextSlide = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}
btnRight.addEventListener('click', nextSlide);

// Previous slide
const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}
btnLeft.addEventListener('click', previousSlide);

// Slide arrows
document.addEventListener('keydown', function (e) {
  if (e.code === 'ArrowRight') nextSlide(curSlide);
  if (e.code === 'ArrowLeft') previousSlide(curSlide);
  activateDot(curSlide);
});

// Slide dots
dotContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = Number(e.target.dataset.slide);
    goToSlide(slide);
    activateDot(slide);
  }
})
// INTERSCTIONOBSERER
// this callback will be called each time our target element(section1) is intercecting the root element at the threshold we define
// const obsCallback = function (entries, observer) {
//   // entries is an array of threshold entries
//   entries.forEach(entrie => {
//     console.log(entrie);
//   });
// };
// const obsOptions = {
//   root: null, // so the root element is actually the viewport
//   threshold: [0, 0.2], // how much the element we defined(section1) iσ intersepting the root property we defined(viewport).
//                        // In other words when the callback function (obsCallback) will be called.
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
