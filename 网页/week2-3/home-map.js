"use strict";
const frame = document.querySelector('#home-map-frame');
if (frame) {
 const places = {library:'Central Library',class:'Classroom B333',sports:'Sports Field'};
 document.querySelectorAll('[data-map-place]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-map-place]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const query = 'Catholic University of Korea Sacred Heart Campus ' + places[button.dataset.mapPlace];
  frame.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(query) + '&output=embed';
 }));
}
