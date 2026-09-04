# 상태 문서

최종 갱신: 2026-09-04

## 지금 살아 있는 주소

| 대상 | 주소 | 상태 |
|---|---|---|
| GitHub Pages | https://marcljlee.github.io/commander_library/ | 배포됨 |
| 명부 (Pages) | https://marcljlee.github.io/commander_library/roster.json | 200 |
| 명부 (jsDelivr, npm 경로) | https://cdn.jsdelivr.net/npm/commander-library@latest/roster.json | 미발행 |
| Claude 공개 아티펙트 | https://claude.ai/public/artifacts/51130626-2dc8-48b9-967f-f2ee576bcd0e | 사용 중 |
| 명부 피드 (Apps Script) | 미배포 | 미배포 |

## 명부를 어디서 읽는가

페이지는 열린 위치에 따라 경로를 나눈다.

- `*.github.io` 에서 열리면: 상대경로 `roster.json`
- 그 밖(Claude 아티펙트 등)에서 열리면: `https://cdn.jsdelivr.net/npm/commander-library@latest/roster.json`

npm 경로를 쓰는 이유: 아티펙트의 CSP 허용 목록이 `cdn.jsdelivr.net/npm/` 만 통과시킨다.
같은 jsDelivr라도 `/gh/` 경로는 차단된다. 저장소 안에 `/gh/` 주소가 다시 등장하면
아티펙트에서 "원격 명부 연결 실패"로 떨어지므로 되돌리지 말 것.

## 갱신 흐름

```
공개 아티펙트에서 산정 -> 등록 요청(구글 폼)
  -> 매일 00:00 UTC 예약 작업: 검증 -> 정본 명부 -> roster.json 발행(드라이브)
  -> 00:30 UTC sync-roster 액션: 피드 수신 -> roster.json 병합 커밋
     -> 변경 있으면 npm version patch -> npm publish -> jsDelivr purge
  -> 페이지(Pages / 아티펙트)가 열릴 때 최신 roster.json을 읽음
```

## 남은 작업

1. **Apps Script 웹앱 배포**: script.google.com 에서 `apps-script.gs` 붙여넣기,
   실행 사용자 "나" / 액세스 "모든 사용자" 로 배포. 웹앱 URL 확보.
2. **저장소 변수**: `gh variable set ROSTER_FEED_URL -R MarcLJLee/commander_library --body "<웹앱 URL>"`
3. **npm 최초 발행**: 이 저장소 루트에서 `npm login` 후 `npm publish`.
   패키지명 `commander-library` 는 2026-09-04 기준 npm에 비어 있음.
4. **저장소 시크릿**: `gh secret set NPM_TOKEN -R MarcLJLee/commander_library`
   (npm Automation 토큰. 없으면 액션이 커밋만 하고 발행은 경고 남기고 건너뛴다.)
5. **index.html 최신본 반영**: 저장소의 `index.html` 은 아직 `/gh/` 를 쓰던 빌드다.
   npm 경로로 고친 최신 빌드로 교체해야 한다.

## 오늘 확인된 것

- 명부 인원은 45명 (`roster.json` 의 `count` 와 `people` 길이 일치).
- 아티펙트 카드는 게시한 파일 경로에 묶인다. 같은 경로로 다시 게시해야 같은 주소로 갱신된다.
  경로를 바꾸면 새 아티펙트가 생긴다.
- `npm pack` 결과에는 `files` 지정과 무관하게 `README.md` 가 항상 포함된다.
  실제 배포물은 `roster.json`, `package.json`, `README.md` 3개.
