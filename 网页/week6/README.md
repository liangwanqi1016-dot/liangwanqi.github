# 6주차 실행 예제

Python 3.12 환경을 사용합니다. 전체 수업 설명은 강의 사이트의 6주차 자료에 있습니다.

## 이미지 실험실

```sh
python -m pip install -r requirements.txt
python -m flask --app app run --debug --port 5000
```

브라우저에서 http://127.0.0.1:5000 을 엽니다. VS Code Live Server로 HTML을 열지 않습니다.
샘플 이미지는 `static/sample.png`입니다. 사진은 JPEG/PNG/WebP를 지원합니다. fetch 제출은 브라우저에서 디코딩 가능한 큰 사진을 긴 변 1600px로 줄이고, 일반 form 제출도 같은 준비 과정을 거친 뒤 브라우저의 실제 form POST로 PNG 문서를 엽니다. 서버에는 기존 5 MiB·800만 픽셀 제한을 유지합니다.

## 서버 TTS

이미지 서버를 Ctrl+C로 종료한 뒤 실행합니다.

```sh
python -m pip install -r requirements-tts.txt
python -m piper.download_voices en_US-lessac-low --download-dir models
python -m flask --app tts_app run --debug --port 5000
```

http://127.0.0.1:5000/tts 를 엽니다. 기본 모델은 영어용입니다.
영어 문장을 보내면 서버가 WAV를 만들고 브라우저가 파형, 서버 생성 시간, 음성 길이와 파일 크기를 표시합니다.
실습실에 스피커가 없어도 파형으로 결과를 확인할 수 있습니다. 재생과 다운로드는 선택 기능입니다.
수업 필수 TTS 검사는 로컬 실행입니다. 이 프로젝트는 휴대폰 시연을 위해 기존 Render TTS 주소도 추가 제공하며, 로컬 실행 절차를 그대로 유지합니다.
모델은 직접 내려받으며 이 배포 파일에는 포함하지 않습니다.
엔진과 음성 모델의 이용 조건은 각 프로젝트에서 확인합니다.

- Piper: https://github.com/OHF-Voice/piper1-gpl
- 모델 카드: https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_US/lessac/low/MODEL_CARD

## Render 이미지 앱 설정

학생 저장소의 `week6` 폴더에 이 파일들을 둡니다.
Root Directory: `week6`
Build Command: `pip install -r requirements.txt`
Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 120`
Python은 3.12 계열을 지정합니다. 수업 자료의 배포 절차를 확인하세요.

이 앱은 업로드 이미지와 생성한 결과를 영구 저장하지 않습니다.
Flask 페이지는 같은 출처로 API를 호출합니다. GitHub Pages의 빠른 화면은 지정한 Pages 출처에만 허용된 공개 처리 API와 /health를 사용합니다. 관리자·세션 API를 다른 출처에 공개하지 않습니다.


## 디자인 수정 기록 · 2026-11-11

기존 기능을 유지하면서 `static/style.css`의 색상과 배치를 조정했습니다. 미색 배경과 따뜻한 갈색 버튼을 사용하고, 제목 영역·입력 폼·원본 및 결과 이미지·시간 정보를 구역별로 구분했습니다. 넓은 화면에서는 원본과 결과를 나란히 배치하고, 700px 이하에서는 한 열로 정리했습니다. 음성 페이지의 입력창과 결과 수치에도 같은 스타일을 적용했습니다.



## 실제 배포와 재검증 · 2026-11-27

- 빠른 입구: https://liangwanqi1016-dot.github.io/liangwanqi.github/lab/ (닉네임 입력 후 두 실험실 선택)
- Render 이미지 앱: https://campus-image-week6.onrender.com/image
- 추가 온라인 TTS: https://campus-tts-week6.onrender.com/tts
- 실제 저장소의 소스는 `网页/week6`입니다. Render Root Directory는 비워 두고 build는 `pip install -r "网页/week6/requirements.txt"`, start는 `gunicorn --chdir "网页/week6" app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 120`입니다.
- 테스트 이미지: 자동 생성한 단색 JPEG 256×256/1024×1024, blur kernel 3/31. 흑백·엣지·블러는 PNG 200 응답을 확인했습니다. 실제 알고리즘 시간, 서버 시간, 클라이언트 왕복 시간은 [측정 CSV](evidence/render-image-timings.csv)에 저장했습니다.
- form은 결과 PNG로 문서를 이동하고 fetch는 원본·결과·시간을 현재 문서에 표시합니다. 업로드는 FormData, TTS는 JSON, 반환은 PNG/WAV입니다. 실제 필터·합성은 Python 서버가 실행합니다.
- 무료 서버는 쉬는 뒤 첫 접속이 느릴 수 있습니다. GitHub Pages의 화면은 먼저 표시하며 서버 연결 상태를 안내합니다. 모델 최초 로딩과 합성 계산 시간은 별도로 필요합니다.

## 모바일 일반 form 수정 · 2026-11-27

두 버튼 모두 업로드 전에 사진을 긴 변 1600px로 준비합니다. 일반 form은 FormDataEvent(구형 브라우저는 DataTransfer)로 준비한 파일을 실어 실제 문서 POST를 합니다. 필드를 다시 활성화한 뒤 직렬화하여 빠지는 값이 없도록 했습니다. fetch 방식과 달리 현재 탭이 PNG 응답으로 이동합니다. 원본 파일은 기기에서 변경하거나 서버에 영구 보관하지 않습니다.
