# 2025 Google Trends 데이터

다운로드: 2026-11-27. 조건: Worldwide / Web Search / All categories / 2025-01-01–2025-12-31, 검색어 비교(Topic 아님).

## 1. 브랜드 비교

`google-trends-brands-2025-original.csv`의 DJI / Insta360. 원본 53주에서 주 시작일이 2025년인 52주를 `brand-interest-weekly-2025.csv`로 정리했습니다. 첫 번째는 52주 평균을 비교하는 브랜드 막대그래프입니다. 원본 주간 값은 다운로드 CSV로 확인할 수 있습니다.

## 2. DJI 대분류 비교

새 비교 요청에서 내려받은 `google-trends-dji-categories-2025-original.csv`를 사용합니다. 이전 Osmo/Mini/Mavic/Ronin/Air 값의 이름만 바꾼 것이 아닙니다.

| 대분류 | 中文 | English | 대표 검색어 |
|---|---|---|---|
| 액션 카메라 | 运动相机 | Action cameras | DJI Osmo Action |
| 핸드헬드 카메라 | 手持相机 | Handheld cameras | DJI Osmo Pocket |
| 드론 | 无人机 | Drones | DJI drone |
| 360도 카메라 | 360度相机 | 360° cameras | DJI Osmo 360 |
| 스마트폰 짐벌 | 手机稳定器 | Phone stabilizers | DJI Osmo Mobile |

`dji-categories-monthly-2025.csv`는 2025년 시작 52주를 주 시작일의 월로 묶어 단순 평균하고 소수 둘째 자리로 반올림한 12행입니다. 일별 가중 월평균은 아닙니다. `dji-category-search-terms.csv`는 표시명과 검색어의 대응표입니다.

**대표 검색어 하나의 검색 관심도이지, 카테고리 전체 검색량·모든 제품의 합계·판매량이 아닙니다.** 단위는 각 비교 요청 안에서 정규화한 0–100 지수이며 두 그래프 수치를 서로 직접 비교하지 않습니다. 0은 Google이 반환한 값으로 판매량 0이라는 뜻이 아닙니다. 출시와 관심 변화의 인과관계를 단정하지 않습니다.

각 원본 53행에서 계산 시 2024-12-29를 제외했습니다. 현재 원본에는 `<1`이나 빈 값이 없습니다. 로더는 잘못된 숫자와 중복 기간을 거부하며 결측을 0으로 만들지 않습니다. 이전 series 파일은 이력용이며 현재 그래프에서는 사용하지 않습니다.

[브랜드 원출처](https://trends.google.com/trends/explore?date=2025-01-01%202025-12-31&q=DJI,Insta360&hl=en)

[대분류 원출처](https://trends.google.com/trends/explore?date=2025-01-01%202025-12-31&q=DJI%20Osmo%20Action,DJI%20Osmo%20Pocket,DJI%20drone,DJI%20Osmo%20360,DJI%20Osmo%20Mobile&hl=en)

[분류 참고: DJI 카메라·짐벌](https://www.dji.com/products/osmo) · [Google Trends 지수 설명](https://support.google.com/trends/answer/4365533)
