"use strict";
// 통계 페이지의 한국어 · 中文 · English 문구
const I18N = {
  ko: {
    pageTitle: "한국 관광지 입장객 통계 · 캠퍼스 다이어리",
    brand: "캠퍼스 다이어리", navMap: "장소 탐험", navGame: "미니게임", navHome: "과제 모음",
    h1: "숫자로 보는 한국 관광지",
    lead: "한국 유학 생활 중 가 보고 싶은 관광지 6곳에 사람들이 언제, 얼마나 찾아가는지 공개 통계로 살펴봅니다.",
    mSource: "출처", mTarget: "대상", mPeriod: "기간", mUnit: "단위",
    sourceName: "문화체육관광부·한국문화관광연구원, 관광지식정보시스템 「주요관광지점 입장객 통계」",
    sourceDate: "(자료 갱신일 2026-08-18, 2026-11-27 조회)",
    targetText: "경복궁, 창덕궁(서울) · 불국사(경북) · 에버랜드(경기) · 남이섬유원지(강원) · 성산일출봉(제주)",
    periodText: "연도별 2019–2025년, 월별 2025년 1–12월",
    unitText: "입장객 수(명), 내국인·외국인·합계",
    download: "내려받기", csvSize: "(342행, 7열)",
    tabYear: "① 연도별 변화", tabMonth: "② 2025년 월별 변화",
    yTitle: "관광지별 연간 입장객 수 (2019–2025)",
    yQ: "질문: 코로나19 이전과 비교해 관광지마다 입장객이 얼마나 회복되었을까?",
    mTitle: "관광지별 월별 입장객 수 (2025년)",
    mQ: "질문: 같은 해 안에서 관광지는 어느 달에 가장 붐빌까?",
    group: "구분", gTotal: "합계", gDom: "내국인", gFor: "외국인",
    tagFact: "사실", tagInterp: "해석",
    y1: "(합계 기준) 6곳 모두 2020년에 입장객이 크게 줄었습니다. 예를 들어 경복궁은 2019년 약 535만 명에서 2020년 약 102만 명으로 줄었습니다. 경복궁은 2025년 약 689만 명으로 2019년보다 많아졌고, 같은 기간 외국인 입장객도 약 147만 명에서 약 278만 명으로 늘었습니다.",
    y2: "반면 에버랜드는 2023년 약 588만 명에서 2025년 약 473만 명으로 줄었고, 성산일출봉도 2025년 약 89만 명으로 2019년(약 171만 명)의 절반 정도입니다.",
    y3: "궁궐처럼 외국인 방문이 많은 곳은 회복이 빨랐던 것으로 보이지만, 이 자료에는 방문 이유가 없어 원인은 추측입니다. 또한 6곳만 고른 자료라 한국 관광 전체 흐름으로 일반화할 수는 없습니다.",
    m1: "(합계 기준) 경복궁(약 105만 명), 에버랜드(약 71만 명), 성산일출봉 등은 10월에 가장 많았고, 4–5월에도 높았습니다. 창덕궁과 불국사는 10–11월이 가장 많았습니다.",
    m2: "남이섬유원지는 다른 곳과 달리 11–12월(각 약 27만 명)이 가장 많았고, 서울의 두 궁궐은 7–8월에 크게 줄었습니다.",
    m3: "봄·가을의 좋은 날씨와 단풍, 여름 더위가 영향을 준 것으로 추측되지만 날씨 자료와 비교한 것은 아닙니다. 2025년 한 해만 보았기 때문에 매년 같은 패턴인지는 알 수 없습니다.",
    fBack: "← 장소 탐험으로", fGame: "미니게임으로 →", fNote: "웹 프로그래밍 4주차 실습 2 · 공개 데이터 시각화",
    place_경복궁: "경복궁", place_창덕궁: "창덕궁", place_불국사: "불국사", place_에버랜드: "에버랜드", place_남이섬유원지: "남이섬유원지", place_성산일출봉: "성산일출봉",
    xYear: "연도", xMonth: "2025년 월", yAxis: "입장객 수 (만 명)",
    tick: v => (v / 10000).toLocaleString("ko-KR"),
    yearLabel: y => y + "년", monthLabel: m => m + "월",
    people: "명", noData: "자료 없음",
    errLib: "라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.",
    errFormat: "CSV 형식이 올바르지 않습니다. 필요한 열: ",
    errEmpty: "CSV에 데이터가 없습니다.",
    errLoad: "CSV 파일을 불러오지 못했습니다: "
  },
  zh: {
    pageTitle: "韩国景点入场人数统计 · 校园日记",
    brand: "校园日记", navMap: "地点探索", navGame: "小游戏", navHome: "作业总入口",
    h1: "用数字看韩国景点",
    lead: "用公开统计数据，看看我在韩国留学期间想去的 6 个景点，大家都在什么时候去、去了多少人。",
    mSource: "出处", mTarget: "对象", mPeriod: "期间", mUnit: "单位",
    sourceName: "文化体育观光部·韩国文化观光研究院，观光知识信息系统「主要观光地点入场客统计」",
    sourceDate: "（数据更新日 2026-08-18，2026-11-27 查询）",
    targetText: "景福宫、昌德宫（首尔）· 佛国寺（庆尚北道）· 爱宝乐园（京畿道）· 南怡岛（江原道）· 城山日出峰（济州）",
    periodText: "年度 2019–2025 年，月度 2025 年 1–12 月",
    unitText: "入场人数（人），内国人·外国人·合计",
    download: "下载", csvSize: "（342 行，7 列）",
    tabYear: "① 年度变化", tabMonth: "② 2025 年月度变化",
    yTitle: "各景点年度入场人数（2019–2025）",
    yQ: "问题：和新冠疫情前相比，各景点的游客恢复了多少？",
    mTitle: "各景点月度入场人数（2025 年）",
    mQ: "问题：一年之中，景点在哪个月最拥挤？",
    group: "区分", gTotal: "合计", gDom: "内国人", gFor: "外国人",
    tagFact: "事实", tagInterp: "解读",
    y1: "（按合计）6 个景点在 2020 年入场人数都大幅减少。例如景福宫从 2019 年约 535 万人降到 2020 年约 102 万人。景福宫 2025 年约 689 万人，已超过 2019 年；同期外国游客也从约 147 万人增加到约 278 万人。",
    y2: "相反，爱宝乐园从 2023 年约 588 万人减少到 2025 年约 473 万人；城山日出峰 2025 年约 89 万人，只有 2019 年（约 171 万人）的一半左右。",
    y3: "像宫殿这样外国游客多的地方，恢复似乎更快；但数据里没有游客来访的原因，所以原因只是推测。而且只选了 6 个景点，不能代表整个韩国旅游的趋势。",
    m1: "（按合计）景福宫（约 105 万人）、爱宝乐园（约 71 万人）、城山日出峰等在 10 月人最多，4–5 月也很多。昌德宫和佛国寺在 10–11 月最多。",
    m2: "南怡岛和其他景点不同，11–12 月（各约 27 万人）最多；首尔的两座宫殿在 7–8 月明显减少。",
    m3: "推测是受春秋好天气、红叶和夏季炎热的影响，但并没有和天气数据做比较。而且只看了 2025 年一年，不知道是否每年都是这样。",
    fBack: "← 返回地点探索", fGame: "去小游戏 →", fNote: "网页编程第 4 周实习 2 · 公开数据可视化",
    place_경복궁: "景福宫", place_창덕궁: "昌德宫", place_불국사: "佛国寺", place_에버랜드: "爱宝乐园", place_남이섬유원지: "南怡岛", place_성산일출봉: "城山日出峰",
    xYear: "年份", xMonth: "2025 年月份", yAxis: "入场人数（万人）",
    tick: v => (v / 10000).toLocaleString("zh-CN"),
    yearLabel: y => y + "年", monthLabel: m => m + "月",
    people: "人", noData: "无数据",
    errLib: "无法加载图表库，请检查网络连接。",
    errFormat: "CSV 格式不正确。需要的列：",
    errEmpty: "CSV 中没有数据。",
    errLoad: "无法读取 CSV 文件："
  },
  en: {
    pageTitle: "Korean Tourist Attraction Visitors · Campus Diary",
    brand: "Campus Diary", navMap: "Explore places", navGame: "Mini game", navHome: "Assignments",
    h1: "Korean attractions in numbers",
    lead: "Using public statistics, see when and how many people visit six attractions I want to see while studying in Korea.",
    mSource: "Source", mTarget: "Places", mPeriod: "Period", mUnit: "Unit",
    sourceName: "Ministry of Culture, Sports and Tourism · Korea Culture & Tourism Institute, Tourism Knowledge Information System “Visitors to Major Tourist Attractions”",
    sourceDate: "(data updated 2026-08-18, retrieved 2026-11-27)",
    targetText: "Gyeongbokgung, Changdeokgung (Seoul) · Bulguksa (Gyeongbuk) · Everland (Gyeonggi) · Nami Island (Gangwon) · Seongsan Ilchulbong (Jeju)",
    periodText: "Yearly 2019–2025, monthly Jan–Dec 2025",
    unitText: "Visitors (people): Korean, foreign, total",
    download: "download", csvSize: "(342 rows, 7 columns)",
    tabYear: "① Yearly change", tabMonth: "② Monthly change in 2025",
    yTitle: "Yearly visitors by attraction (2019–2025)",
    yQ: "Question: How far has each attraction recovered compared with before COVID-19?",
    mTitle: "Monthly visitors by attraction (2025)",
    mQ: "Question: In which month of the year is each attraction busiest?",
    group: "Group", gTotal: "Total", gDom: "Korean", gFor: "Foreign",
    tagFact: "Fact", tagInterp: "Interpretation",
    y1: "(Total) All six attractions dropped sharply in 2020. Gyeongbokgung, for example, fell from about 5.35 million visitors in 2019 to about 1.02 million in 2020. In 2025 it reached about 6.89 million, more than in 2019, and its foreign visitors grew from about 1.47 million to about 2.78 million.",
    y2: "Everland, on the other hand, fell from about 5.88 million in 2023 to about 4.73 million in 2025, and Seongsan Ilchulbong had about 0.89 million in 2025, roughly half of 2019 (about 1.71 million).",
    y3: "Places with many foreign visitors, like the palaces, seem to have recovered faster, but the data has no reasons for visits, so the cause is a guess. With only six places, this cannot be generalized to all tourism in Korea.",
    m1: "(Total) Gyeongbokgung (about 1.05 million), Everland (about 0.71 million) and Seongsan Ilchulbong peaked in October and were also high in April–May. Changdeokgung and Bulguksa peaked in October–November.",
    m2: "Unlike the others, Nami Island peaked in November–December (about 0.27 million each), and the two Seoul palaces dropped noticeably in July–August.",
    m3: "Good spring and autumn weather, autumn leaves and summer heat may explain this, but it was not compared with weather data. Only 2025 was examined, so we cannot tell whether the pattern repeats every year.",
    fBack: "← Back to places", fGame: "To the mini game →", fNote: "Web Programming Week 4 Lab 2 · Public data visualization",
    place_경복궁: "Gyeongbokgung", place_창덕궁: "Changdeokgung", place_불국사: "Bulguksa", place_에버랜드: "Everland", place_남이섬유원지: "Nami Island", place_성산일출봉: "Seongsan Ilchulbong",
    xYear: "Year", xMonth: "Month (2025)", yAxis: "Visitors (millions)",
    tick: v => (v / 1000000).toLocaleString("en-US"),
    yearLabel: y => y, monthLabel: m => ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m - 1],
    people: " people", noData: "No data",
    errLib: "Could not load the libraries. Please check your internet connection.",
    errFormat: "The CSV format is not valid. Required columns: ",
    errEmpty: "The CSV has no data.",
    errLoad: "Could not load the CSV file: "
  }
};


Object.assign(I18N.ko,{"pageTitle": "2025 영상 브랜드 검색 관심도 · 캠퍼스 다이어리", "h1": "데이터로 보는 DJI와 Insta360", "lead": "2025년 브랜드 비교와 DJI 주요 제품군 추이를 Google Trends CSV로 살펴봅니다. 검색 관심도이며 판매량이 아닙니다.", "sourceName": "Google Trends · Worldwide · Web Search · All categories", "sourceDate": "(2026-11-27 CSV 다운로드)", "targetText": "검색어 DJI / Insta360, DJI Osmo / Mini / Mavic / Ronin / Air (Topic 아님)", "periodText": "2025-01-01–2025-12-31 · 주 시작일이 2025년인 52주 사용", "unitText": "검색 관심도 지수 0–100. 두 비교 요청은 별도로 정규화됩니다.", "csvSize": "(원본 53행, 집계 시 2024-12-29 제외)", "tabYear": "① 브랜드 검색 관심도", "tabMonth": "② 제품군 월별 관심도", "yTitle": "DJI · Insta360 주간 검색 관심도 (2025)", "yQ": "질문: 같은 기간에 어떤 브랜드 검색어가 더 많은 관심을 받았을까?", "mTitle": "DJI 주요 5개 제품군의 월별 검색 관심도 (2025)", "mQ": "질문: 주요 제품군의 검색 관심도는 월별로 어떻게 달라질까?", "group": "표시할 항목", "gTotal": "전체", "xYear": "주 시작일 (2025)", "xMonth": "2025년 월", "yAxis": "검색 관심도 지수 (0–100)", "fNote": "웹 프로그래밍 4주차 · 실제 공개 CSV 시각화 · 검색 관심도 ≠ 판매량"});
Object.assign(I18N.zh,{"pageTitle": "2025影像品牌搜索热度 · 校园日记", "h1": "用数据看DJI与Insta360", "lead": "读取Google Trends CSV，比较2025年品牌与DJI主要系列的搜索趋势。这里是搜索热度，不是销量。", "sourceName": "Google Trends · 全球 · 网页搜索 · 所有类别", "sourceDate": "（2026-11-27下载原始CSV）", "targetText": "搜索词DJI／Insta360，以及DJI Osmo／Mini／Mavic／Ronin／Air（不是主题）", "periodText": "2025-01-01–2025-12-31 · 使用周起始日在2025年的52周", "unitText": "相对搜索热度指数0–100；两组查询分别归一化，不能跨图直接比较。", "csvSize": "（原始各53行，计算时排除2024-12-29）", "tabYear": "① 品牌搜索热度", "tabMonth": "② 系列月度趋势", "yTitle": "DJI与Insta360周搜索热度（2025年）", "yQ": "问题：同一时间段内，哪个品牌的搜索词更受关注？", "mTitle": "DJI五个主要系列月度搜索热度（2025年）", "mQ": "问题：主要系列的搜索热度如何随月份变化？", "group": "显示项目", "gTotal": "全部", "xYear": "周起始日（2025年）", "xMonth": "2025年月份", "yAxis": "搜索热度指数（0–100）", "fNote": "网页编程第四周 · 真实公开CSV可视化 · 搜索热度≠销量"});
Object.assign(I18N.en,{"pageTitle": "2025 Imaging Search Interest · Campus Diary", "h1": "DJI and Insta360 in data", "lead": "Compare brand search interest and major DJI product families using Google Trends CSV files for 2025. Search interest is not sales.", "sourceName": "Google Trends · Worldwide · Web Search · All categories", "sourceDate": "(CSV downloaded 2026-11-27)", "targetText": "Search terms DJI / Insta360; DJI Osmo / Mini / Mavic / Ronin / Air (not Topics)", "periodText": "2025-01-01–2025-12-31 · 52 weeks whose start date is in 2025", "unitText": "Relative search interest index 0–100. The two comparison queries are normalized separately.", "csvSize": "(53 original rows each; 2024-12-29 excluded from calculations)", "tabYear": "① Brand search interest", "tabMonth": "② Monthly family trends", "yTitle": "DJI and Insta360 weekly search interest (2025)", "yQ": "Question: Which brand search term drew more interest in the same period?", "mTitle": "Monthly search interest in five major DJI families (2025)", "mQ": "Question: How did interest in the main product families change by month?", "group": "Show", "gTotal": "All", "xYear": "Week start (2025)", "xMonth": "Month (2025)", "yAxis": "Search interest index (0–100)", "fNote": "Week 4 · Real public CSV visualization · Search interest is not sales"});
for(const lang of ['ko','zh','en']){I18N[lang].tick=v=>Number(v).toLocaleString(lang==='zh'?'zh-CN':lang==='ko'?'ko-KR':'en-US');I18N[lang].people='';}

Object.assign(I18N.ko,{"targetText": "브랜드: DJI / Insta360. 대분류 대표 검색어: 액션=DJI Osmo Action, 핸드헬드=DJI Osmo Pocket, 드론=DJI drone, 360도=DJI Osmo 360, 스마트폰 짐벌=DJI Osmo Mobile.", "mTitle": "DJI 대분류별 월간 검색 관심도 (2025)", "mQ": "질문: 액션·핸드헬드·드론·360도 카메라·스마트폰 짐벌의 대표 검색어는 월별로 어떻게 달라질까?", "tabMonth": "② 대분류 월별 관심도"});
Object.assign(I18N.zh,{"targetText": "品牌：DJI／Insta360。大类代表词：运动相机=DJI Osmo Action；手持相机=DJI Osmo Pocket；无人机=DJI drone；360度相机=DJI Osmo 360；手机稳定器=DJI Osmo Mobile。", "mTitle": "DJI各大类月度搜索热度（2025年）", "mQ": "问题：运动相机、手持相机、无人机、360度相机和手机稳定器的代表搜索热度如何变化？", "tabMonth": "② 大类月度趋势"});
Object.assign(I18N.en,{"targetText": "Brands: DJI / Insta360. Category proxy terms: Action=DJI Osmo Action, Handheld=DJI Osmo Pocket, Drones=DJI drone, 360°=DJI Osmo 360, Phone stabilizers=DJI Osmo Mobile.", "mTitle": "Monthly search interest by DJI category (2025)", "mQ": "Question: How do representative search terms for action, handheld, drones, 360° cameras and phone stabilizers change by month?", "tabMonth": "② Monthly category trends"});
Object.assign(I18N.ko,{lead:'2025년 브랜드 비교와 DJI 대분류별 검색 관심도를 Google Trends CSV로 살펴봅니다. 판매량이 아닙니다.'});
Object.assign(I18N.zh,{lead:'读取Google Trends CSV，比较2025年品牌与DJI产品大类的代表搜索热度。这不是销量。'});
Object.assign(I18N.en,{lead:'Compare brands and representative search interest by DJI product category using Google Trends CSV files for 2025. These are not sales figures.'});

Object.assign(I18N.ko,{yTitle:'DJI · Insta360 연평균 검색 관심도 (2025)',yQ:'2025년 주간 지수 52개의 평균을 브랜드별 막대로 비교합니다.',brandLabel:'브랜드'});
Object.assign(I18N.zh,{yTitle:'DJI与Insta360全年平均搜索热度（2025年）',yQ:'将2025年52周热度指数的平均值，以品牌柱状图对比。',brandLabel:'品牌'});
Object.assign(I18N.en,{yTitle:'Annual average search interest: DJI vs Insta360 (2025)',yQ:'Compare each brand’s mean across 52 weekly interest indices in a bar chart.',brandLabel:'Brand'});
