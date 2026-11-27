# 2025 Google Trends CSV

- 수집: 2026-11-27. Google Trends의 CSV 다운로드 버튼으로 받은 원본 2개를 그대로 보관했습니다.
- 조건: Worldwide, Web Search, All categories, 2025-01-01–2025-12-31, 검색어(Topic 아님).
- 브랜드: DJI / Insta360. 제품군: DJI Osmo / DJI Mini / DJI Mavic / DJI Ronin / DJI Air. 5개 주요 검색어이며 DJI 전 제품 목록이 아닙니다.
- 지표: 각 비교 요청 안에서 정규화된 검색 관심도 0–100. 검색 건수·판매량·매출·시장점유율이 아닙니다. 두 원본은 별도로 정규화되므로 두 그래프의 값끼리 직접 비교하지 않습니다.
- 전처리: 원본의 안내 2줄을 제외하고, 주 시작일이 2025년인 52행만 사용했습니다. 2024-12-29 행은 보관하되 계산에서 제외했습니다. 브랜드 그래프는 52주 원값의 시간 추이(본문에서 52주 단순 평균도 계산), 제품군 그래프는 주 시작일의 월별 단순 평균(소수 둘째 자리 반올림)입니다. 일별 가중 월평균이 아닙니다.
- 원본에는 <1 또는 결측이 없습니다. 다른 자료를 넣을 때 빈 값을 0으로 채우지 않도록 로더에서 검사합니다. CSV 표와 그래프는 같은 행에서 생성합니다.
- 검색어가 포함하는 제품 범위, 언어, 지역 및 표본 추출 때문에 관심도 전체를 대표하지 않습니다. 제품 출시가 원인이라고 단정하지 않습니다. 데이터는 재조회 시 달라질 수 있습니다.

[브랜드 원출처](https://trends.google.com/trends/explore?date=2025-01-01%202025-12-31&q=DJI,Insta360&hl=en)

[제품군 원출처](https://trends.google.com/trends/explore?date=2025-01-01%202025-12-31&q=DJI%20Osmo,DJI%20Mini,DJI%20Mavic,DJI%20Ronin,DJI%20Air&hl=en)

[Google Trends 데이터 해석](https://support.google.com/trends/answer/4365533)
