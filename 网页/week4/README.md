# 4주차 · CSV 시각화

### 실습 2 · Google Trends 공개 CSV 시각화 (2026-11-27 수정)

- 주소: https://liangwanqi1016-dot.github.io/liangwanqi.github/stats/
- 기존 최신 화면의 **꺾은선 그래프 2개, 탭, 필터, 배치와 세 언어**를 유지하고 관심 있는 영상 브랜드 데이터로 교체했습니다.
- 데이터 ①: `DJI`와 `Insta360`, Worldwide / Web Search / All categories / 2025-01-01–2025-12-31. 주 시작일이 2025년인 52주를 첫 그래프에서 비교합니다. 평균 지수는 DJI 74.69, Insta360 11.79이고 DJI 최고 주는 2025-11-23(100)입니다.
- 데이터 ② (대분류로 변경): 액션 카메라 / 핸드헬드 카메라 / 드론 / 360도 카메라 / 스마트폰 짐벌. 대표 검색어는 각각 `DJI Osmo Action`, `DJI Osmo Pocket`, `DJI drone`, `DJI Osmo 360`, `DJI Osmo Mobile`입니다. 같은 비교 요청에서 새 원본을 내려받아 주 시작일의 월별 평균을 계산했습니다. 원래 Osmo/Mini/Mavic/Ronin/Air 수치의 이름만 바꾼 것이 아닙니다.
- CSV는 페이지에서 Papa Parse로 실제 읽습니다. `stats/data/brand-interest-weekly-2025.csv`, `stats/data/dji-categories-monthly-2025.csv`와 원본 2개, 출처·정리 방법 `stats/data/README.md`를 함께 제공합니다. 같은 자료를 `网页/week4/data/`에도 보관합니다.
- 두 원본은 53주이며 2024-12-29 행을 계산에서 제외했습니다. 월평균은 일별 가중 평균이 아닙니다. 빈 값·잘못된 숫자·중복 기간을 검증하고 누락을 0으로 바꾸지 않습니다. 잘못된 파일은 오류를 안내합니다.
- **지수 0–100은 검색 관심도이며 검색 건수·사람 수·판매량·매출·시장점유율이 아닙니다.** 두 CSV는 별도 비교 요청에서 각각 정규화되어 서로 직접 비교하지 않습니다. 각 대분류는 대표 검색어 하나로 측정하며, 카테고리 전체 검색량·모든 모델의 합계나 DJI 전 제품을 대표하지 않습니다. 출시가 변화의 원인이라는 주장은 하지 않습니다.
- [브랜드 원출처](https://trends.google.com/trends/explore?date=2025-01-01%202025-12-31&q=DJI,Insta360&hl=en)
- [제품군 원출처](https://trends.google.com/trends/explore?date=2025-01-01%202025-12-31&q=DJI%20Osmo%20Action,DJI%20Osmo%20Pocket,DJI%20drone,DJI%20Osmo%20360,DJI%20Osmo%20Mobile&hl=en)
- 라이브러리와 라이선스 파일은 기존 `vendor/`를 유지합니다. 원본 데이터에 이용자 개인 정보는 포함하지 않습니다.


기존 지도와 Canvas 게임은 유지했습니다. 차트는 최신 버전의 두 꺾은선 형태를 그대로 사용합니다.
