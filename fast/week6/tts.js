const translate = (key, values) => window.CampusUI?.t(key, values) || key;
let audioURL = null;
let decodedAudio = null;
const form = document.querySelector("#tts-form");
const controls = document.querySelector("#tts-controls");
const status = document.querySelector("#tts-status");
const result = document.querySelector("#tts-result");
const canvas = document.querySelector("#waveform");
const audio = document.querySelector("#audio");
const download = document.querySelector("#wav-download");

function drawWaveform(buffer) {
  const pixelRatio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
  const height = Math.round(240 * pixelRatio);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const samples = buffer.getChannelData(0);
  const middle = height / 2;
  const step = Math.max(1, Math.ceil(samples.length / width));

  ctx.fillStyle = "#f3eadb";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#d9cbb6";
  ctx.beginPath();
  ctx.moveTo(0, middle);
  ctx.lineTo(width, middle);
  ctx.stroke();
  ctx.strokeStyle = "#79503b";
  ctx.lineWidth = Math.max(1, pixelRatio);
  ctx.beginPath();
  for (let x = 0; x < width; x++) {
    let minimum = 1;
    let maximum = -1;
    const end = Math.min(samples.length, (x + 1) * step);
    for (let i = x * step; i < end; i++) {
      minimum = Math.min(minimum, samples[i]);
      maximum = Math.max(maximum, samples[i]);
    }
    if (end <= x * step) break;
    ctx.moveTo(x, middle - maximum * middle * 0.9);
    ctx.lineTo(x, middle - minimum * middle * 0.9);
  }
  ctx.stroke();
}

window.addEventListener("resize", () => {
  if (decodedAudio) drawWaveform(decodedAudio);
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const data = {
    text: document.querySelector("#text").value,
    length_scale: Number(document.querySelector("#length-scale").value)
  };
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  audio.hidden = true;
  download.hidden = true;
  result.hidden = true;
  decodedAudio = null;
  if (audioURL) URL.revokeObjectURL(audioURL);
  audioURL = null;
  controls.disabled = true;
  status.textContent = translate("Processing... 서버가 WAV를 생성하고 있습니다.");

  let context = null;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) { context = new AudioContextClass(); context.resume().catch(() => {}); }
  } catch (_) {}
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 180000);
  try {
    if (form.dataset.api && window.CampusServers) await window.CampusServers.ready(new URL(form.dataset.api).origin);
    const response = await fetch(form.dataset.api || "/api/tts", {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      let message = "HTTP " + response.status;
      if ((response.headers.get("Content-Type") || "").includes("application/json")) {
        const error = await response.json();
        message = error.error || message;
      }
      throw new Error(message);
    }
    if (!(response.headers.get("Content-Type") || "").includes("audio/wav")) {
      throw new Error("서버가 WAV 대신 다른 응답을 보냈습니다.");
    }
    const blob = await response.blob();
    // First expose the real WAV. Waveform support must not block listening.
    audioURL = URL.createObjectURL(blob);
    audio.src = audioURL;
    audio.hidden = false;
    download.href = audioURL;
    download.hidden = false;
    document.querySelector('#tts-time').textContent = (response.headers.get('X-Processing-Ms') || '—') + ' ms';
    document.querySelector('#tts-size').textContent = (blob.size / 1024).toFixed(1) + ' KiB';
    result.hidden = false;
    try {
      if (!context) throw new Error('Audio decoding unavailable');
      const buffer = await Promise.race([
        context.decodeAudioData(await blob.arrayBuffer()),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Waveform timeout')), 8000))
      ]);
      decodedAudio = buffer;
      canvas.hidden = false;
      document.querySelector('#tts-duration').textContent = buffer.duration.toFixed(2) + ' s';
      drawWaveform(buffer);
      status.textContent = translate('완료 · WAV를 받아 파형을 그렸습니다.');
    } catch (_) {
      canvas.hidden = true;
      document.querySelector('#tts-duration').textContent = '—';
      status.textContent = translate('음성이 준비되었습니다. 재생하거나 다운로드하세요.');
    }
  } catch (error) {
    result.hidden = true;
    decodedAudio = null;
    status.textContent = translate("음성을 확인하지 못했습니다. {error}", {error: error.message});
  } finally {
    clearTimeout(timeout);
    if (context) context.close().catch(() => {});
    controls.disabled = false;
  }
});
