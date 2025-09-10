'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
message.innerHTML = 'We use cookied for improved functionality. <button class="btn btn--close-cokie">Got it!</button>';
message.style.backgroundColor = '#37383d';
message.style.width = '105%';

setTimeout(() => {
  header.prepend(message);
  message.style.height = Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';
  const cookieButton = document.getElementsByClassName('btn--close-cokie');
  cookieButton[0].addEventListener('click', function () {
    message.remove();
  });
}, 1000);

btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect();
  // window.scrollTo(s1Coords.left + window.pageXOffse, s1Coords.y + window.pageYOffset); //current position + the current scroll
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffse,
  //   top: s1Coords.y + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});