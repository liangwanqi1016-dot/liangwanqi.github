"use strict";
const copy = {"ko": {"brand": "캠퍼스 다이어리", "skip": "본문으로 건너뛰기", "back": "홈으로 돌아가기", "sample": "예시 데이터", "heading": "숫자로 보는 캠퍼스", "caption": "캠퍼스의 일상을 다른 시선으로", "sectionTitle": "캠퍼스 기록 살펴보기", "barTab": "장소별 비교", "lineTab": "월별 변화", "barHeading": "장소별 월 방문 수 비교", "barDescription": "세 장소의 방문 수를 한눈에 비교해 보세요.", "barReading": "예시에서는 중앙도서관이 420명으로 가장 높고, 운동장 280명, B333 교실 190명 순입니다.", "values": "데이터 값 보기", "location": "장소", "visitors": "방문 수", "library": "중앙도서관", "classroom": "B333 교실", "sports": "운동장", "lineHeading": "1년 동안의 월별 방문 추이", "lineDescription": "월별 수치가 어떻게 달라지는지 살펴보세요.", "lineReading": "3월과 9월에 방문이 집중되며, 각각 4200명과 4000명으로 두 차례의 높은 수치를 보입니다.", "month": "월", "fallback": "차트를 표시할 수 없습니다. 데이터 표에서 값을 확인할 수 있습니다.", "footer": "나의 캠퍼스 기록", "title": "캠퍼스 통계 · 캠퍼스 다이어리", "language": "언어 선택", "chartSelect": "통계 차트 선택", "art": "붉은 벽돌 건물과 나무를 그린 캠퍼스 일러스트", "lineAlt": "1월부터 12월까지의 예시 방문 인원 변화", "introLead": "도서관, 교실, 운동장.", "introBody": "익숙한 장소의 방문 수를 비교하고, 월별 변화도 함께 살펴봅니다.", "lineVisitors": "인원 수", "dataPeople": "인원 수"}, "zh": {"brand": "校园日记", "skip": "跳到正文", "back": "返回首页", "sample": "示例数据", "heading": "用数字看校园", "caption": "换个角度，看看校园日常", "sectionTitle": "看看校园记录", "barTab": "地点比较", "lineTab": "月度变化", "barHeading": "各地点月访问数量对比", "barDescription": "直观比较三个校园地点的访问数量。", "barReading": "示例中，中央图书馆最高，为420；其次是运动场280，最后是B333教室190。", "values": "查看数据", "location": "地点", "visitors": "访问数量", "library": "中央图书馆", "classroom": "B333教室", "sports": "运动场", "lineHeading": "全年各月访问趋势", "lineDescription": "观察一年中各月数值的变化。", "lineReading": "访问集中在3月和9月，分别为4200人和4000人，形成两个高峰。", "month": "月份", "fallback": "图表暂时无法显示，可以展开数据表查看数值。", "footer": "我的校园记录", "title": "校园统计 · 校园日记", "language": "选择语言", "chartSelect": "选择统计图表", "art": "红砖建筑与树木的校园插图", "lineAlt": "1月至12月示例访问人数变化", "introLead": "图书馆、教室与运动场。", "introBody": "比较熟悉地点的访问数量，也看看每个月的变化。", "lineVisitors": "数据人数", "dataPeople": "数据人数"}, "en": {"brand": "Campus Diary", "skip": "Skip to content", "back": "Back to home", "sample": "Sample data", "heading": "Campus in numbers", "caption": "Another view of everyday campus life", "sectionTitle": "Explore the campus records", "barTab": "Compare places", "lineTab": "Monthly trend", "barHeading": "Monthly visits by location", "barDescription": "Compare visits across three campus places.", "barReading": "In this example, the Central Library is highest at 420 visits, followed by the Sports Field at 280 and Classroom B333 at 190.", "values": "View data", "location": "Location", "visitors": "Visits", "library": "Central Library", "classroom": "Classroom B333", "sports": "Sports Field", "lineHeading": "Monthly visits across the year", "lineDescription": "See how the values change from month to month.", "lineReading": "Visits peak in March and September, at 4200 and 4000 people respectively.", "month": "Month", "fallback": "The charts could not be displayed. Expand the data tables to view the values.", "footer": "My campus journal", "title": "Campus Statistics · Campus Diary", "language": "Choose language", "chartSelect": "Choose a chart", "art": "Campus illustration of red-brick buildings and trees", "lineAlt": "Sample monthly visitor counts from January through December", "introLead": "The library, classroom, and sports field.", "introBody": "Compare visits to familiar places and explore how the numbers change each month.", "lineVisitors": "People count", "dataPeople": "People count"}};
const monthly=[1200,1450,4200,2900,3100,2700,1600,1300,4000,3000,2400,1800];
const englishMonths=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const supported=['ko','zh','en'];
let language='ko',barChart,lineChart;
const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectTab(tab,focus=false){
 tabs.forEach(button=>{const selected=button===tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;document.getElementById(button.dataset.tab).hidden=!selected;});
 if(focus)tab.focus();
 const chart=tab.dataset.tab==='chart1'?barChart:lineChart;
 if(chart) requestAnimationFrame(()=>chart.resize());
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectTab(tab));
 tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectTab(tabs[next],true);}});
});
function placeLabels(){const t=copy[language];return language==='en'?[['Central','Library'],['Sports','Field'],['Classroom','B333']]:[t.library,t.sports,t.classroom];}
function months(){return language==='en'?englishMonths:monthly.map((_,i)=>String(i+1)+(language==='zh'?'月':'월'));}
function setLanguage(value){
 language=supported.includes(value)?value:'ko';const t=copy[language];
 document.documentElement.lang=language==='zh'?'zh-CN':language;document.title=t.title;
 document.querySelectorAll('[data-text]').forEach(element=>{element.textContent=t[element.dataset.text];});
 document.querySelector('.language-switch').setAttribute('aria-label',t.language);document.querySelector('[role="tablist"]').setAttribute('aria-label',t.chartSelect);
 document.querySelector('#campus-art').alt=t.art;
 document.querySelector('#barChart').setAttribute('aria-label',`${t.library}: 420; ${t.sports}: 280; ${t.classroom}: 190`);
 document.querySelector('#lineChart').setAttribute('aria-label',t.lineAlt+': '+monthly.join(', '));
 document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
 const body=document.querySelector('#monthly-values');body.replaceChildren();months().forEach((month,index)=>{const row=document.createElement('tr');const label=document.createElement('th');label.scope='row';label.textContent=month;const cell=document.createElement('td');cell.textContent=String(monthly[index]);row.append(label,cell);body.append(row);});
 if(barChart){barChart.data.labels=placeLabels();barChart.data.datasets[0].label=t.visitors;barChart.options.scales.y.title.text=t.visitors;barChart.update('none');}
 if(lineChart){lineChart.data.labels=months();lineChart.data.datasets[0].label=t.lineVisitors;lineChart.options.scales.y.title.text=t.lineVisitors;lineChart.update('none');}
 try{localStorage.setItem('campus.language',language);}catch(_){}
 const url=new URL(location.href);url.searchParams.set('lang',language);url.searchParams.set('v','20261120g');history.replaceState(null,'',url);
}
let saved;try{saved=localStorage.getItem('campus.language');}catch(_){}
const requested=new URLSearchParams(location.search).get('lang');setLanguage(supported.includes(requested)?requested:supported.includes(saved)?saved:'ko');
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
if(typeof Chart==='function'){
 Chart.defaults.color='#6d6155';Chart.defaults.borderColor='#e5dac9';Chart.defaults.font.family='system-ui, -apple-system, sans-serif';Chart.defaults.font.size=13;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function options(unit=copy[language].visitors,precision=0){return {responsive:true,maintainAspectRatio:false,animation:reduced?false:{duration:350},plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{maxRotation:0,autoSkip:true}},y:{beginAtZero:true,title:{display:true,text:unit},ticks:{precision}}}};}
 const barOptions=options();barOptions.scales.x.ticks={autoSkip:false,maxRotation:0,font:{size:12}};
 const t=copy[language];barChart=new Chart(document.querySelector('#barChart'),{type:'bar',data:{labels:placeLabels(),datasets:[{label:t.visitors,data:[420,280,190],backgroundColor:['#9b7957','#79503b','#9aa58b'],borderRadius:5,maxBarThickness:85,borderWidth:0}]},options:barOptions});
 lineChart=new Chart(document.querySelector('#lineChart'),{type:'line',data:{labels:months(),datasets:[{label:t.lineVisitors,data:monthly,borderColor:'#79503b',backgroundColor:'rgba(155,121,87,.13)',pointBackgroundColor:'#79503b',pointRadius:4,pointHoverRadius:6,fill:true,tension:.3}]},options:options(t.lineVisitors,0)});
}else{document.querySelector('#chart-fallback').hidden=false;document.querySelectorAll('details').forEach(element=>{element.open=true;});}
