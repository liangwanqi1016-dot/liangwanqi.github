'use strict';
(() => {
  const form=document.querySelector('.welcome-form');
  const input=document.getElementById('name');
  const selection=document.querySelector('.lab-selection');
  const heading=document.getElementById('welcome-heading');
  const note=document.querySelector('.welcome-note');
  const action=form.querySelector('button [data-welcome]');
  let nickname='';
  const copy={
    ko:{greeting:'님, 반가워요.',ready:'준비됐어요. 아래에서 시작할 실험을 골라 보세요.',rename:'이름 바꾸기',invalid:'이름 또는 닉네임을 입력해 주세요.'},
    zh:{greeting:'，欢迎来到实验室。',ready:'准备好了，选择一个实验开始吧。',rename:'更改名字',invalid:'请输入名字或昵称。'},
    en:{greeting:', welcome to the lab.',ready:'You’re all set. Choose an experiment below.',rename:'Change name',invalid:'Please enter a name or nickname.'}
  };
  function language(){try{return localStorage.getItem('campus.language')||'ko'}catch(_){return document.documentElement.lang||'ko'}}
  function paint(){
    if(!nickname)return;
    const t=copy[language()]||copy.ko;
    const name=document.createElement('span');name.className='visitor-name';name.textContent=nickname;
    const greeting=document.createElement('span');greeting.dataset.welcome='greeting';greeting.textContent=t.greeting;
    heading.replaceChildren(name,greeting);
    note.dataset.welcome='ready';note.textContent=t.ready;
    action.dataset.welcome='rename';action.textContent=t.rename;
  }
  input.addEventListener('input',()=>input.setCustomValidity(''));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const value=input.value.trim();
    if(!value){input.setCustomValidity((copy[language()]||copy.ko).invalid);input.reportValidity();return;}
    nickname=value.slice(0,30);input.value=nickname;
    selection.hidden=false;paint();
    const title=document.getElementById('choose-heading');title.setAttribute('tabindex','-1');title.focus({preventScroll:true});
    selection.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  });
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>queueMicrotask(paint)));
})();
