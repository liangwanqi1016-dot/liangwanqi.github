'use strict';
const mapFrame = document.querySelector('#campus-google-map');
if (mapFrame) {
  const places = {
    library: {name:{ko:'중앙도서관',zh:'中央图书馆',en:'Central Library'}, query:'Catholic University of Korea Sacred Heart Campus Central Library', naver:'50BE4dKv'},
    class: {name:{ko:'B333 교실',zh:'B333 教室',en:'Classroom B333'}, query:'Catholic University of Korea Sacred Heart Campus Classroom B333', naver:'5T0Enr98'},
    sports: {name:{ko:'운동장',zh:'运动场',en:'Sports Field'}, query:'Catholic University of Korea Sacred Heart Campus Sports Field', naver:'GjyYHUSp'}
  };
  const L = () => ({'zh-CN':'zh',zh:'zh',en:'en'})[document.documentElement.lang] || 'ko';
  const words = {ko:['지도','Google 검색 지도'], zh:['地图','Google 搜索地图'], en:['map','Google search map']};
  let current = 'library';
  function selectPlace(id) {
    if (!Object.prototype.hasOwnProperty.call(places, id)) id = 'library';
    current = id;
    const place = places[id], lang = L(), name = place.name[lang], w = words[lang];
    document.querySelectorAll('.map-place').forEach(section => { section.hidden = section.id !== `place-${id}`; });
    document.querySelectorAll('[data-place]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.place === id)));
    const encoded = encodeURIComponent(place.query);
    const src = `https://maps.google.com/maps?q=${encoded}&output=embed`;
    if (mapFrame.src !== src) mapFrame.src = src;
    mapFrame.title = `${name} ${w[1]}`;
    document.querySelector('#map-title').textContent = `${name} ${w[0]}`;
    document.querySelector('#naver-link').href = `https://naver.me/${place.naver}`;
    document.querySelector('#google-link').href = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  }
  document.querySelectorAll('[data-place]').forEach(button => button.addEventListener('click', () => {
    history.replaceState(null, '', `#${button.dataset.place}`);
    selectPlace(button.dataset.place);
  }));
  window.addEventListener('hashchange', () => selectPlace(location.hash.slice(1)));
  selectPlace(location.hash.slice(1));
  // 언어를 바꾸면 지도 제목도 다시 씁니다
  new MutationObserver(() => selectPlace(current)).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
}

