'use strict';
(() => {
  const hosts = (document.body.dataset.backends || '').split(',').filter(Boolean);
  const allowed = new Set(['https://campus-image-week6.onrender.com', 'https://campus-tts-week6.onrender.com', 'https://campus-meal-week7.onrender.com']);
  const panel = document.querySelector('.backend-status');
  const label = panel?.querySelector('[data-connection]');
  const retry = panel?.querySelector('[data-retry]');
  const copy = {
    ko: {pending:'서버에 연결 중입니다. 페이지는 먼저 둘러볼 수 있어요.',ready:'서버 연결 완료 · 시작할 수 있어요.',failed:'연결이 지연되고 있어요. 네트워크를 확인하고 다시 시도해 주세요.',retry:'다시 연결',waiting:'서버를 준비 중입니다. 연결되면 바로 이동해요.',direct:'서버에서 직접 열기'},
    zh: {pending:'正在连接服务器，可以先浏览页面。',ready:'服务器已连接，可以开始使用。',failed:'连接暂未完成，请检查网络后重试。',retry:'重新连接',waiting:'正在等待服务器，连接成功后会自动进入。',direct:'直接打开服务器'},
    en: {pending:'Connecting to the server. You can explore the page now.',ready:'Server connected. Ready to begin.',failed:'Connection is taking longer. Check your network and retry.',retry:'Reconnect',waiting:'Preparing the server. Your page will open when connected.',direct:'Open server directly'}
  };
  const tasks = new Map();
  let state = 'pending', waiting = false;
  function language(){try{return localStorage.getItem('campus.language') || 'ko'}catch(_){return document.documentElement.lang || 'ko'}}
  function paint(){const t=copy[language()] || copy.ko;if(label)label.textContent=t[waiting?'waiting':state];if(panel)panel.dataset.state=state;if(retry){retry.hidden=state!=='failed';retry.textContent=t.retry}document.querySelectorAll('[data-server-direct]').forEach(a=>a.textContent=t.direct)}
  async function connect(host) {
    if(!allowed.has(host))throw new Error('Unknown server');
    // A bounded startup check, not a keep-alive loop. No cookies or account data cross origins.
    for(let attempt=0;attempt<4;attempt++){
      const control=new AbortController(),timer=setTimeout(()=>control.abort(),20000);
      try{const r=await fetch(host+'/health',{cache:'no-store',credentials:'omit',signal:control.signal});if(r.ok && (await r.json()).status==='ok')return;}catch(_){}finally{clearTimeout(timer)}
      if(attempt<3)await new Promise(resolve=>setTimeout(resolve,1500));
    }
    throw new Error('Server unavailable');
  }
  function ready(host){if(!tasks.has(host))tasks.set(host,connect(host));return tasks.get(host)}
  async function start(){state='pending';paint();try{await Promise.all(hosts.map(ready));state='ready'}catch(_){state='failed'}paint()}
  window.CampusServers={ready};
  retry?.addEventListener('click',()=>{tasks.clear();start()});
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>queueMicrotask(paint)));
  document.querySelectorAll('a[data-server-link]').forEach(link=>link.addEventListener('click',async event=>{
    if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
    event.preventDefault();if(waiting)return;
    const target=new URL(link.href);waiting=true;paint();
    try{await ready(target.origin);const lang=language();if(copy[lang])target.searchParams.set('lang',lang);location.assign(target.href)}catch(_){state='failed';waiting=false;paint();if(!panel.querySelector('[data-server-direct]')){const fallback=document.createElement('a');fallback.dataset.serverDirect='';target.searchParams.set('lang',language());fallback.href=target.href;panel.append(' ',fallback);paint()}}
  }));
  start();
})();
