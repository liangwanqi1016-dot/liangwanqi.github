const translate = (key, values) => window.CampusUI?.t(key, values) || key;
const form = document.querySelector("#image-form");
const status = document.querySelector("#status");
let originalURL = null;
let resultURL = null;
function clearResult() {
  if (resultURL) URL.revokeObjectURL(resultURL);
  resultURL = null;
  document.querySelector("#result").hidden = true;
  document.querySelector("#result").removeAttribute("src");
  document.querySelector("#download").hidden = true;
  document.querySelector("#download").removeAttribute("href");
  document.querySelector("#timing").textContent = translate("새 결과를 기다립니다.");
}
document.querySelector("#image").addEventListener("change", function () {
  clearResult();
  if (originalURL) URL.revokeObjectURL(originalURL);
  originalURL = null;
  const file = this.files[0];
  const preview = document.querySelector("#original");
  preview.hidden = !file;
  preview.removeAttribute("src");
  if (file) {
    originalURL = URL.createObjectURL(file);
    preview.src = originalURL;
  }
  status.textContent = translate("처리할 방법을 고르고 서버에서 처리를 누르세요.");
});

async function preparePhoto(file) {
  const objectURL = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = objectURL;
    await image.decode();
    if (image.naturalWidth <= 0 || image.naturalHeight <= 0) throw new Error('Empty image');
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
    if (!blob) throw new Error('Image conversion failed');
    return new File([blob], 'campus-photo.jpg', {type:'image/jpeg'});
  } finally { URL.revokeObjectURL(objectURL); }
}

form.addEventListener("submit", async function (event) {
  // 이 버튼은 JavaScript 가로채기 없이 HTML form의 기본 제출을 사용합니다.
  if (event.submitter && event.submitter.id === "native") return;
  event.preventDefault();
  const data = new FormData(form); // 비활성화 전에 입력을 담습니다.
  const controls = document.querySelector("#controls");
  clearResult();
  controls.disabled = true;
  status.textContent = translate("Processing... 서버에서 처리 중입니다.");
  const started = performance.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 150000);
  try {
    const file = data.get('image');
    if (file && file.size) {
      try { data.set('image', await preparePhoto(file)); }
      catch (_) {
        if (!/image\/(jpeg|png|webp)/i.test(file.type)) throw new Error(translate('JPEG, PNG 또는 WebP 사진을 선택해 주세요.'));
      }
    }
    if (form.dataset.api && window.CampusServers) await window.CampusServers.ready(new URL(form.dataset.api).origin);
    const response = await fetch(form.dataset.api || "/api/process", { method: "POST", body: data, signal: controller.signal });
    if (!response.ok) {
      let message = "처리에 실패했습니다. HTTP " + response.status;
      if ((response.headers.get("Content-Type") || "").includes("application/json")) {
        const error = await response.json();
        message = error.error || message;
      }
      throw new Error(message);
    }
    const blob = await response.blob();
    resultURL = URL.createObjectURL(blob);
    document.querySelector("#result").src = resultURL;
    document.querySelector("#result").hidden = false;
    document.querySelector("#download").href = resultURL;
    document.querySelector("#download").hidden = false;
    const roundTrip = performance.now() - started;
    document.querySelector("#timing").textContent =
      translate("알고리즘 {compute} ms · 서버 처리 {server} ms · 왕복 {round} ms", {compute: response.headers.get("X-Compute-Ms"), server: response.headers.get("X-Processing-Ms"), round: roundTrip.toFixed(1)});
    status.textContent = translate("완료 · 결과 크기 {size}", {size: response.headers.get("X-Image-Size")});
  } catch (error) {
    status.textContent = translate("처리하지 못했습니다. {error}", {error: error.message});
  } finally {
    clearTimeout(timeout);
    controls.disabled = false;
  }
});
