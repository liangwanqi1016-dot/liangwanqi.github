# 7주차 두 번째 실습 · 관리 화면까지 완성

시작 코드 → 첫 실습 ZIP을 적용한 `week7` 폴더에 이 ZIP의 파일을 **덮어쓰기** 합니다. 서버를 끈 뒤 복사하고, `instance/app.db`는 그대로 두세요. 같은 터미널에서 아래 명령을 실행합니다.

```text
python -m flask --app app init-db
python -m flask --app app run --debug --port 5000
```

`init-db`는 없는 표와 관리 필드를 추가하며 기존 계정과 글을 지우지 않습니다. `SECRET_KEY`는 시작 코드에서 설정한 무작위 값을 계속 사용합니다. 새 터미널이면 다시 설정하세요. 첫 실행이라면 7주차 강의 페이지의 시작 코드 설치부터 진행합니다.

관리자를 만들려면 실습용 계정 `admin7`으로 먼저 가입합니다. 서버 터미널에서 `Ctrl+C`를 누르고 아래처럼 **로컬 터미널**에서 지정한 뒤 서버를 다시 시작합니다. 웹의 회원가입으로 관리자 권한을 선택할 수는 없습니다.

Windows Anaconda Prompt:

```bat
set "WEEK7_ADMIN_USERNAME=admin7"
python -m flask --app app promote-admin
python -m flask --app app run --debug --port 5000
```

macOS Terminal:

```sh
export WEEK7_ADMIN_USERNAME='admin7'
python -m flask --app app promote-admin
python -m flask --app app run --debug --port 5000
```

관리자로 로그인하면 관리 화면에서 게시글 검색, 신고 확인, 글 삭제, 계정 차단·해제를 이용할 수 있습니다. 일반 계정은 `/admin` 접근 시 403입니다.

한 계정은 1분에 글을 최대 3개 작성할 수 있고 같은 글을 두 번 신고할 수 없습니다.

`app.py`의 `BOARD_TITLE`·`BOARD_QUESTION`과 `templates/comments.html`의 문구, `static/style.css`를 바꿔 자신만의 주제로 만드세요. `.gitignore`가 `instance/`를 제외합니다. 실습 DB·`SECRET_KEY`·비밀번호는 Git에 올리지 않습니다. GitHub Pages는 Flask를 실행하지 못합니다.

## 실습 2 · Render 배포와 제출

완성한 `week7` 폴더를 GitHub에 push하고 Render에서 **New → Web Service**로 연결합니다. Root Directory는 `week7`, Build Command는 `pip install -r requirements.txt`, Start Command는 다음과 같습니다.

```sh
python -m flask --app app init-db && python -m flask --app app ensure-admin && gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2
```

Render의 Environment에 `SECRET_KEY`(64자리 무작위 값), `WEEK7_ADMIN_USERNAME`(실습용 관리자 ID), `WEEK7_ADMIN_PASSWORD`(12자 이상 실습용 PW), `APP_HTTPS=1`, `PYTHON_VERSION=3.12.12`를 설정합니다. 관리자 비밀번호는 `python -c "import secrets; print(secrets.token_urlsafe(18))"`로 만들 수 있습니다. 시작 명령의 `ensure-admin`은 빈 DB에 관리자 계정을 만들고, 재시작 때 기존 관리자 비밀번호를 환경변수 값으로 맞춥니다. 같은 아이디의 일반 계정이 이미 있으면 관리자 아이디를 바꿔야 합니다.

배포된 `https://...onrender.com/`에서 관리자 로그인, 검색과 신고 처리 화면을 확인하세요. 무료 서비스의 SQLite 파일은 재시작·재배포 때 초기화될 수 있으므로 장기 보관용이 아닙니다. **사이버캠퍼스 7주차 과제 제출란**에 GitHub 저장소 URL, Render URL, 관리자 ID, 관리자 PW를 적습니다. 관리자 ID·PW는 사이버캠퍼스에만 적고 공개 저장소·README·스크린샷에 넣지 마세요. `SECRET_KEY`와 DB 파일은 제출하지 않습니다.


## 이번 제출의 수정 및 검증
- 주제: 캠퍼스 한 끼 추천. 제목·질문·초대 문구를 변경했으며, 현재 화면은 크림색과 따뜻한 갈색 테마, 한식 수채화 전시 벽을 사용합니다.
- `/health` 상태 확인 경로를 추가했습니다.
- 로컬 자동 검증: 두 계정 가입/로그인, 잘못된 비밀번호와 중복 ID 거부, 공동 글 목록, 남의 글 삭제 403, CSRF 없는 POST 400, HTML 이스케이프, 신고·중복 신고 거부, 일반 계정 admin 403, 관리자 검색·신고 필터·삭제, 차단/해제, 연습 데이터 생성/정리 후 일반 데이터 유지, DB 재초기화 후 글 유지.
- 로컬 사용자 DB는 기존 파일을 유지했습니다. 테스트는 별도 임시 DB를 사용했습니다.
- AI 도움: 수업 제공 완성 예제 적용, 주제 변경, 테스트와 배포 준비.
- Render 서비스: https://campus-meal-week7.onrender.com/

관리자 화면: https://campus-meal-week7.onrender.com/admin (관리자 로그인 필요).
- 관리자 접속: 서비스 URL에서 로그인 → 상단 관리 화면 또는 `/admin`. 관리자 ID/PW는 사이버캠퍼스에만 제출하고 공개 저장소에는 적지 않습니다.


## 온라인 배포 확인
- Render Free, Python 3.12.12, Root Directory `week7`, Build `pip install -r requirements.txt`.
- Start: `python -m flask --app app init-db && python -m flask --app app ensure-admin && gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2`.
- 환경변수: SECRET_KEY, WEEK7_ADMIN_USERNAME, WEEK7_ADMIN_PASSWORD, APP_HTTPS=1, PYTHON_VERSION=3.12.12. 실제 비밀값은 공개하지 않습니다.
- 현재 관리 화면: 공통 로그인 후 관리자 권한 확인, 내용 검색, 신고 확인, 게시글 삭제와 계정 관리. 연습 데이터 생성·정리 UI는 관리 화면 맨 위 “연습 데이터” 패널에 다시 넣었습니다(2026-11-27).
- 무료 서버는 비활동 시 잠들어 첫 접속이 느릴 수 있으며 재배포·재시작 시 SQLite 데이터가 초기화될 수 있습니다. 시작 명령은 DB 및 관리자 계정을 다시 준비합니다.

![온라인 첫 화면](../../screenshots/week7-live-render.jpg)

![관리자 검색과 연습 데이터](../../screenshots/week7-admin-test-data.jpg)

![연습 데이터 정리 후](../../screenshots/week7-admin-after-cleanup.jpg)


## 디자인 수정 기록 · 2026-11-11

기존 ‘캠퍼스 한 끼 추천’ 주제를 유지하면서 `static/style.css`를 연한 보라색 배경과 짙은 보라색 제목·버튼으로 변경했습니다. 상단 메뉴, 소개 영역, 글쓰기 폼과 글 목록의 너비·여백을 조정하고, 게시글 카드와 신고 폼을 구분했습니다. 650px 이하에서는 메뉴와 관리 버튼 등을 세로로 배치하도록 했습니다.



## 공통 입구와 로그인 · 2026-11-21

홈페이지의 방문자·관리자 입구를 하나의 입구로 합쳤습니다. `/login`에서 같은 폼으로 로그인하며, 서버가 비밀번호 해시와 SQLite의 `is_admin` 값을 확인합니다. 일반 계정은 추천 게시판으로, 관리자 계정은 관리 화면으로 이동합니다. 아이디 문자열이나 브라우저 값으로 권한을 정하지 않습니다.

로그인 화면의 방문자 링크로 계정 없이 글을 읽을 수 있습니다. 글 작성·신고는 로그인 후 이용하고, 관리 기능은 기존처럼 서버에서 관리자 권한을 검사합니다. 예전 `/admin/login` 링크는 공통 로그인 페이지로 연결됩니다. 언어 선택은 홈페이지에서만 표시되며, 이후 페이지는 저장된 언어를 사용합니다.


## 한식 일러스트와 화면 구성 · 2026-11-21

만두, 붕어빵, 호떡, 송편 일러스트를 추가하고 홈페이지·로그인·게시판에 배치했습니다. 모든 새 음식 그림은 투명 배경을 사용합니다. 홈페이지의 공통 입구, 언어 선택과 자동 권한 분기는 유지했습니다. 관리자 화면에는 실제 게시글·신고·계정 관리와 함께 연습 데이터 생성·삭제 패널이 있습니다(2026-11-27 복원). 기존 데이터는 이 UI 변경으로 삭제하지 않습니다.


## 2026-11-27 관리 연습 보완

관리자 /admin에서 연습 계정 2개와 추천 4개를 무작위 생성합니다. 샘플은 비빔밥·김밥·떡볶이·붕어빵 등 캠퍼스 한 끼 주제이며 `[연습]` 표시가 붙습니다. 임의 계정의 비밀번호는 한 번만 표시합니다. 검색·신고 필터·관리자 삭제·계정 차단/해제 후 연습 데이터 정리가 가능합니다. 정리는 `is_test=1` 계정과 그 글·관련 신고만 대상으로 합니다. 서버 권한 검사와 CSRF는 유지했습니다.

임시 DB 테스트: 관리자 생성 성공, 게스트 403, CSRF 없는 POST 400, 2계정/4추천 확인, 정리 뒤 실제 계정/글 보존. 운영 DB에 테스트 데이터를 넣거나 삭제하지 않았습니다. 관리자 로그인 정보는 공개 문서에 기록하지 않습니다.

## 풍부한 연습 추천 · 2026-11-27

한 묶음은 계정 2개·추천 4개입니다. 메뉴 8가지 중 서로 다른 4가지를 뽑고, 식사 상황·추천 이유·팁을 조합합니다. 기존 연습 글과 같은 문장은 피하고 모든 글에 가상 데이터 표시를 붙입니다. 현재 페이지의 한국어·中文·English에 따라 생성하며 언어 값은 서버에서 허용 목록으로 확인합니다. 실제 식당명·확인하지 않은 가격·허위 방문 후기를 만들지 않습니다. 게시글·계정·신고 관리와 연습 데이터 정리 범위는 유지합니다.

생성할 때 가상 신고 1건 포함 여부를 선택할 수 있습니다. 선택하면 두 번째 연습 계정이 첫 번째 계정의 연습 글에 시뮬레이션 신고를 남깁니다. 실제 위반이나 실제 이용자 신고로 표시하지 않습니다. 관리자 신고 필터를 바로 시험할 수 있으며 정리 시 관련 신고도 제거됩니다.
