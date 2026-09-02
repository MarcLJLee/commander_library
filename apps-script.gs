/**
 * 명장 라이브러리 — 명부 피드 (Google Apps Script 웹앱)
 * 드라이브 폴더 "myeongjang-publish"의 roster-*.json / delta-*.json 을 이름순으로 모두 돌려준다.
 *   roster-*.json : 명부 전체 {snapshot, people:[...]}
 *   delta-*.json  : 그날 반영된 인물만 {snapshot, upserts:[...]}
 * GitHub Action이 이 응답을 받아 저장소의 roster.json에 병합한다.
 *
 * 배포: script.google.com → 새 프로젝트 → 이 코드 붙여넣기 → 배포 → 새 배포 → 유형: 웹 앱
 *       실행 사용자: 나 / 액세스 권한: 모든 사용자 → 배포 → 웹 앱 URL 복사
 */
var FOLDER_ID = '1yEGScBpHq6TsWb7oPPnd_Cpq5Q9YU07O';

function doGet() {
  var folder = DriveApp.getFolderById(FOLDER_ID);
  var it = folder.getFiles(), files = [];
  while (it.hasNext()) {
    var f = it.next(), n = f.getName();
    if (!/^(roster|delta)-.*\.json$/i.test(n)) continue;
    files.push({ name: n, updated: f.getLastUpdated().toISOString(), content: f.getBlob().getDataAsString('UTF-8') });
  }
  files.sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
  var out = JSON.stringify({ generated: new Date().toISOString(), files: files });
  return ContentService.createTextOutput(out).setMimeType(ContentService.MimeType.JSON);
}
