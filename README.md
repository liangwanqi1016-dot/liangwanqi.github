# liangwanqi.github

## 6주차 · Flask 서버 계산 실습

전체 소스와 실행 방법: [week6/README.md](week6/README.md)

### 실습 1 · 이미지 처리
- Flask/OpenCV로 Grayscale, Gaussian Blur, Edge Detection을 처리합니다. 로컬에서 세 방법의 동작을 확인했습니다.
- 수정: 캠퍼스 사진 실험실 제목을 개인화했습니다.
- 요청: POST `/api/process`, FormData의 `image`, `operation`, `kernel`. Flask는 `request.files`와 `request.form`으로 읽습니다.
- 응답: PNG와 `X-Compute-Ms`, `X-Processing-Ms`, `X-Image-Size` 헤더.
- 일반 form은 결과 PNG 문서로 이동하고, fetch는 같은 페이지에서 결과를 갱신합니다.
- Render 주소 / 휴대폰 화면: **배포 후 추가 필요**. GitHub Pages는 Python 서버를 실행하지 않습니다.
- 크기·커널 시간 비교표 / 실행 화면 스크린샷: **추가 필요**. 실제 브라우저 측정 전이므로 왕복 시간을 임의로 기재하지 않았습니다.

### 실습 2 · 서버 TTS
- 사용 상황: 캠퍼스 박물관의 영어 음성 안내.
- 추가 요소: 환영·전시·마무리 안내 문장 선택 버튼 3개.
- 모델: Piper `en_US-lessac-low` (English, en_US).
- 출처: [Piper](https://github.com/OHF-Voice/piper1-gpl), [모델 카드](https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_US/lessac/low/MODEL_CARD).
- 실행: `cd week6`, `python -m pip install -r requirements-tts.txt`, `python -m piper.download_voices en_US-lessac-low --download-dir models`, `python -m flask --app tts_app run --debug --port 5000`.
- 로컬 주소: http://127.0.0.1:5000/tts (별도 배포 없음).
- 요청: POST `/api/tts`, JSON `text`, `length_scale`. Flask의 `request.get_json()`으로 읽고 서버에서 Piper 모델을 실행합니다.
- 응답: `audio/wav`, `X-Processing-Ms`. 브라우저가 Blob을 AudioContext로 디코딩하여 Canvas 파형·길이·파일 크기를 표시합니다.
- 모델 파일 손상 오류를 새 모델 다운로드로 해결하고 실제 WAV 생성 성공을 확인했습니다.

| 테스트 문장 | 길이 배율 | WAV 길이 | 바이트 수 | 서버 시간 |
| --- | --- | --- | --- | --- |
| Hello! Welcome to our campus museum. | 0.8 | 2.37초 | 75820 | 645.5 ms |
| Please enjoy your visit and discover the history of our university. | 0.8 | 3.26초 | 104492 | 46.0 ms |

위 값은 로컬 Flask test client로 측정한 한 차례 결과입니다. 최초 요청에는 모델 로딩 시간이 포함됩니다. 브라우저의 왕복 시간과 다릅니다.
- 파형·생성 시간·음성 길이·크기가 보이는 스크린샷: **추가 필요**.

### AI 활용
- 도움받은 작업: 모델 오류 진단·복구, WAV 응답 확인, 안내 문장 선택 버튼, README 정리와 GitHub 업로드.
- 대표 질문: “TTS 생성 오류를 고치고 수업 요구에 맞게 업로드해 줘.”
- 사용자 확인: 이미지 세 처리 방법과 모델 교체 후 TTS 동작 성공.
- 모델·가상 환경·개인 사진·생성 WAV·캐시는 저장소에서 제외했습니다.

### 제출 전 남은 항목
- 이미지 앱을 Render Web Service로 배포하고 `/health` 및 휴대폰 이미지 처리 확인.
- 실제 크기·커널별 시간표와 이미지·TTS 파형 스크린샷 추가.
- 사이버캠퍼스에 이 GitHub 저장소 URL 제출 (마감은 과제 공지 확인).


## 7주차 - 음식 추천 게시판

학교 근처 음식 추천을 주제로 수업 예제의 제목, 문구와 색을 바꿨습니다.
회원가입, 로그인, 글 작성과 삭제, 신고, 관리자 기능이 있습니다.

- 사이트: https://campus-meal-week7.onrender.com/
- [실행 방법과 확인한 내용](week7/README.md)
- 관리자 로그인 후 위쪽의 관리 화면을 누르면 됩니다.
- 관리자 ID/PW는 과제 제출란에 따로 적습니다.
