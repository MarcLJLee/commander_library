# 명장 라이브러리 · Commander Library

페이지: https://marcljlee.github.io/commander_library/  ·  Claude 페이지(산정): https://claude.ai/public/artifacts/51130626-2dc8-48b9-967f-f2ee576bcd0e

동서양 4천 년의 장수들을 하나의 척도(1~1000, 평범한 성인 40, 인류 정점 100)로 매긴 명부입니다.
눈금자 · 명부 · 대조 · 생애 곡선 · 동시대 연표를 담은 단일 HTML 페이지이며, 설치나 로그인 없이 열립니다.

- `index.html` — 페이지 (GitHub Pages로 배포). 열릴 때 `roster.json`을 읽어 최신 명부를 표시합니다.
- `roster.json` — 명부. 매일 `sync-roster` 액션이 관리자 쪽 피드에서 받아와 갱신합니다.
- 인물 추가(능력치 산정)는 Claude를 사용하므로 Claude 사용자용 페이지에서 제공됩니다.
  페이지의 **＋ 인물 추가** 버튼이 안내 후 그쪽으로 연결합니다.

## 갱신 흐름

```
공개 페이지(Claude)에서 산정 → 등록 요청(구글 폼)
  → 매일 00:00 UTC 예약 작업: 검증 → 정본 명부 반영 → roster.json 발행(드라이브)
  → 00:30 UTC sync-roster 액션: 피드에서 받아 커밋 → jsDelivr 캐시 갱신
  → 페이지(이 저장소의 Pages · Claude 아티펙트)가 열릴 때 최신 roster.json을 읽음
```

## 척도

| 값 | 의미 |
|---|---|
| 40 | 평범한 성인 |
| 55 | 훈련된 직업 군인 |
| 70 · 85 · 100 | 축별 기준 인물 (예: 무용 70 사자심왕 리처드, 85 관우, 100 항우) |

축은 무용(VAL) · 통솔(CMD) · 전술(TAC) · 전략(OPS) · 지력(INT) · 정략(POL) · 인망(CHA) · 기교(TEC) 여덟 개입니다.
값은 절대 평가가 아니라 기준 인물과 명부의 인접 인물 사이에서의 상대 배치이며, 전부 AI가 같은 판정 규약으로 산정합니다.
