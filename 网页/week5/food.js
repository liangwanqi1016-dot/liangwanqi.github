const QUESTIONS = [
  { q: "친구가 밥 먹으러 가자고 하면?", a: "3년째 단골집", b: "인스타에서 본 새 식당", sa: "OLD", sb: "NEW" },
  { q: "찌개/전골 먹을 때?", a: "매운 거 없으면 안 돼", b: "담백한 게 좋아", sa: "SPICY", sb: "MILD" },
  { q: "혼밥할 때 보통?", a: "배달 시켜놓고 드라마 보면서 천천히", b: "편의점에서 15분 만에 해결", sa: "SLOW", sb: "FAST" },
  { q: "친구가 한턱 쏜다고 하면?", a: "일주일 전부터 메뉴 정해놓음", b: "가서 분위기 보고 정함", sa: "OLD", sb: "NEW" },
  { q: "카페에서 뭐 마실래?", a: "달달한 밀크티", b: "아메리카노/허브티", sa: "SPICY", sb: "MILD" },
  { q: "주말에 시간 생기면?", a: "집에서 해먹기", b: "동네 탐방하면서 먹으러 다니기", sa: "SLOW", sb: "FAST" },
  { q: "밥 먹을 때 첫 입은?", a: "밥부터 떠먹어야 함", b: "반찬/고기부터 먹음", sa: "OLD", sb: "NEW" },
  { q: "다이어트 중인데 배가 고프면?", a: "일단 먹고 생각하자", b: "참고 물 마심", sa: "SPICY", sb: "MILD" }
];

const RESULTS = {
  OLD_SPICY: { emoji: "🌶️", name: "매운맛 고인물", desc: "매운맛 아니면 밥이 아니야! 새 식당보다는 단골집, 늘 먹던 그 맛이 제일 좋은 타입. 스트레스는 매운 음식으로 푼다!" },
  OLD_MILD:  { emoji: "🍵", name: "담백한 힐링 푸디", desc: "속 편한 게 최고! 늘 가던 집, 익숙한 메뉴, 따뜻한 국물이 있는 곳이 편해. 자극적인 것보다 나를 위한 담백한 한 끼를 추구해요." },
  NEW_SPICY: { emoji: "🔥", name: "찐뉴 트렌드 푸디", desc: "인스타에서 핫하면 일단 가봐야 직성이 풀려! 매운 신상 메뉴, 신상 카페는 놓치지 않아. 오늘도 내 지도에는 새로운 맛집이 가득~" },
  NEW_MILD:  { emoji: "🥗", name: "요즘 감성 건강 푸디", desc: "예쁜 새 식당 좋아하지만 시킨 메뉴는 건강한 걸로! 샐러드, 그릭요거트, 라이트 브런치가 내 스타일. 맛도 좋고 몸도 좋은 게 최고야." }
};

const DRAFT_KEY = "week5.draft";
const HISTORY_KEY = "week5.history";

let currentIndex = 0;
let answers = [];
let nickname = "";

// --- 안전 파싱 ---
function parse(str, fallback) {
  try { return JSON.parse(str); } catch (e) { return fallback; }
}

// --- 초안 (sessionStorage) ---
function saveDraft() {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ nickname, index: currentIndex, answers }));
}
function loadDraft() {
  const raw = sessionStorage.getItem(DRAFT_KEY);
  return raw ? parse(raw, null) : null;
}
function clearDraft() {
  sessionStorage.removeItem(DRAFT_KEY);
}

// --- 기록 (localStorage) ---
function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  const arr = raw ? parse(raw, []) : [];
  return Array.isArray(arr) ? arr : [];
}
function saveHistory(list) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
}
function addHistory(record) {
  const list = loadHistory();
  const now = Date.now();
  if (list.find(r => r.nickname === record.nickname && now - r.time < 30000)) return;
  list.unshift(record);
  if (list.length > 20) list.length = 20;
  saveHistory(list);
}
function deleteHistory(time) {
  saveHistory(loadHistory().filter(r => r.time !== time));
}
function clearAllHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// --- 화면 전환 ---
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// --- 게임 시작 ---
function startGame() {
  const name = document.getElementById("nickname").value.trim();
  if (!name) { alert("닉네임을 입력하세요!"); return; }
  nickname = name;
  currentIndex = 0;
  answers = [];
  saveDraft();
  showQuestion();
}

function resumeDraft() {
  const d = loadDraft();
  if (!d) return;
  nickname = d.nickname || "";
  currentIndex = d.index || 0;
  answers = Array.isArray(d.answers) ? d.answers : [];
  showQuestion();
}

// --- 문제 표시 ---
function showQuestion() {
  show("screen-quiz");
  const q = QUESTIONS[currentIndex];
  document.getElementById("q-count").textContent = `${currentIndex + 1}번째 문제 / 총 ${QUESTIONS.length}문항`;
  document.getElementById("q-progress").style.width = (currentIndex / QUESTIONS.length * 100) + "%";
  document.getElementById("q-text").textContent = q.q;
  document.getElementById("choice-a").textContent = "A. " + q.a;
  document.getElementById("choice-b").textContent = "B. " + q.b;
}

function choose(c) {
  const q = QUESTIONS[currentIndex];
  answers.push(c === "A" ? q.sa : q.sb);
  currentIndex++;
  saveDraft();
  if (currentIndex >= QUESTIONS.length) finish();
  else showQuestion();
}

// --- 결과 계산 ---
function calcResult() {
  const s = { OLD:0, NEW:0, SPICY:0, MILD:0 };
  answers.forEach(k => { s[k]++; });
  const oldSide = s.OLD >= s.NEW ? "OLD" : "NEW";
  const spicySide = s.SPICY >= s.MILD ? "SPICY" : "MILD";
  return RESULTS[oldSide + "_" + spicySide];
}

function finish() {
  const r = calcResult();
  const now = Date.now();
  addHistory({ nickname, result: r.name, emoji: r.emoji, time: now });

  document.getElementById("r-emoji").textContent = r.emoji;
  document.getElementById("r-name").textContent = r.name;
  document.getElementById("r-desc").textContent = r.desc;

  clearDraft();
  show("screen-result");
}

function restart() {
  clearDraft();
  document.getElementById("nickname").value = "";
  renderHome();
  show("screen-start");
}
function goHome() {
  clearDraft();
  renderHome();
  show("screen-start");
}

// --- 홈 화면 ---
function renderHome() {
  // 초안 배너
  const banner = document.getElementById("draft-banner");
  const d = loadDraft();
  if (d && d.nickname && d.index > 0) {
    banner.className = "draft-banner";
    banner.innerHTML = "";
    const msg = document.createElement("div");
    msg.textContent = `💡 진행 중인 게임: ${d.nickname}님, ${d.index}번째 문제까지 품`;
    banner.appendChild(msg);

    const btn1 = document.createElement("button");
    btn1.textContent = "이어서 하기";
    btn1.onclick = resumeDraft;
    banner.appendChild(btn1);

    const btn2 = document.createElement("button");
    btn2.className = "danger";
    btn2.textContent = "초안 삭제";
    btn2.onclick = () => {
      if (confirm("초안을 삭제할까요?")) { clearDraft(); renderHome(); }
    };
    banner.appendChild(btn2);
  } else {
    banner.className = "";
    banner.innerHTML = "";
  }

  // 기록 목록
  const list = loadHistory();
  const box = document.getElementById("history-list");
  box.innerHTML = "";

  if (list.length === 0) {
    box.innerHTML = '<div class="empty-msg">아직 기록이 없어요. 첫 게임을 시작해보세요!</div>';
  } else {
    list.forEach(item => {
      const row = document.createElement("div");
      row.className = "history-item";
      const meta = document.createElement("div");
      meta.className = "history-meta";
      const nameDiv = document.createElement("div");
      nameDiv.textContent = `${item.emoji} ${item.nickname} · ${item.result}`;
      const timeDiv = document.createElement("div");
      timeDiv.className = "time";
      timeDiv.textContent = new Date(item.time).toLocaleString("ko-KR");
      meta.appendChild(nameDiv);
      meta.appendChild(timeDiv);

      const del = document.createElement("button");
      del.className = "danger small";
      del.textContent = "삭제";
      del.onclick = () => {
        if (confirm("이 기록을 삭제할까요?")) { deleteHistory(item.time); renderHome(); }
      };

      row.appendChild(meta);
      row.appendChild(del);
      box.appendChild(row);
    });
  }

  // 전체 삭제
  const footer = document.getElementById("history-footer");
  footer.innerHTML = "";
  if (list.length > 0) {
    const clearBtn = document.createElement("button");
    clearBtn.className = "danger";
    clearBtn.textContent = "전체 기록 삭제";
    clearBtn.onclick = () => {
      if (confirm("모든 기록을 삭제할까요?")) { clearAllHistory(); renderHome(); }
    };
    footer.appendChild(clearBtn);
  }
}

// 초기 렌더링
renderHome();
