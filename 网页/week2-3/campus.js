'use strict';
// Filters enhance the page: all stories remain visible when JavaScript is unavailable.
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#filter-status').textContent = `장소 ${count}곳 표시`;
}));
const mapFrame = document.querySelector('#campus-google-map');
if (mapFrame) {
  const places = {
    library: {name:'중앙도서관', query:'Catholic University of Korea Sacred Heart Campus Central Library', naver:'50BE4dKv'},
    class: {name:'B333 교실', query:'Catholic University of Korea Sacred Heart Campus Classroom B333', naver:'5T0Enr98'},
    sports: {name:'운동장', query:'Catholic University of Korea Sacred Heart Campus Sports Field', naver:'GjyYHUSp'}
  };
  function selectPlace(id) {
    if (!Object.prototype.hasOwnProperty.call(places, id)) id = 'library';
    const place = places[id];
    document.querySelectorAll('.map-place').forEach(section => { section.hidden = section.id !== `place-${id}`; });
    document.querySelectorAll('[data-place]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.place === id)));
    const encoded = encodeURIComponent(place.query);
    mapFrame.src = `https://maps.google.com/maps?q=${encoded}&output=embed`;
    mapFrame.title = `${place.name} Google 검색 지도`;
    document.querySelector('#map-title').textContent = `${place.name} 지도`;
    document.querySelector('#naver-link').href = `https://naver.me/${place.naver}`;
    document.querySelector('#google-link').href = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  }
  document.querySelectorAll('[data-place]').forEach(button => button.addEventListener('click', () => {
    history.replaceState(null, '', `#${button.dataset.place}`);
    selectPlace(button.dataset.place);
  }));
  window.addEventListener('hashchange', () => selectPlace(location.hash.slice(1)));
  selectPlace(location.hash.slice(1));
}

