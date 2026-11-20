"use strict";
const campusMap = document.querySelector('#home-campus-map');
if (campusMap) {
 const address=' 경기도 부천시 지봉로 43';
 const places={
  library:{query:'가톨릭대학교 성심교정 베리타스관 중앙도서관',naver:'19253945'},
  class:{query:'가톨릭대학교 성심교정 학생미래인재관',naver:'19254812'},
  sports:{query:'가톨릭대학교 성심교정 대운동장',naver:'19254489'}
 };
 // Marker positions follow the campus reference image. B333 points to the B building area.
 function selectPlace(id) {
  if(!Object.prototype.hasOwnProperty.call(places,id)) id='library';
  const place=places[id];
  document.querySelectorAll('[data-map-place],[data-map-marker]').forEach(button=>{
   button.setAttribute('aria-pressed',String((button.dataset.mapPlace||button.dataset.mapMarker)===id));
  });
  campusMap.dataset.selected=id;
  document.querySelector('#map-naver').href='https://map.naver.com/p/entry/place/'+place.naver;
  document.querySelector('#map-google').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(place.query+address);
  try {localStorage.setItem('campus.mapPlace',id);}catch(_){}
 }
 document.querySelectorAll('[data-map-place],[data-map-marker]').forEach(button=>button.addEventListener('click',()=>selectPlace(button.dataset.mapPlace||button.dataset.mapMarker)));
 let saved='library';try{saved=localStorage.getItem('campus.mapPlace')||'library';}catch(_){}
 selectPlace(saved);
}
