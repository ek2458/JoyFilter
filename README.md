# JoyFilter

사진과 영상 속 얼굴을 기기 안에서 보정하고, 필름 감성 필터를 입히는 편집 도구예요.
로그인이 없고, 사진과 영상은 어디에도 업로드되지 않아요. 얼굴 인식까지 전부 기기에서 돌아가요.

- **웹 버전**: GitHub Pages로 배포돼요. 저장소의 `Settings → Pages` 주소로 접속하면 바로 쓸 수 있어요.
- **iOS 앱**: `ios/` 폴더가 App Store에 낼 수 있는 Xcode 프로젝트예요. 출시 순서는 [docs/APP_STORE.md](docs/APP_STORE.md)에 있어요.

## 기능

| 영역 | 내용 |
| --- | --- |
| 얼굴형 | 작은 얼굴, 얼굴 갸름, V라인 턱, 턱 길이, 눈 크기, 코 슬림, 입술 볼륨, 입꼬리 |
| 피부 | 피부 결 정돈, 화사하게, 혈색, 보정 영역 보기 |
| 필터 | W(웜) C(쿨) B(브라이트) F(필름 그레인) M(모노) 계열 13종, 강도 조절 |
| 조정 | 노출, 대비, 채도, 색온도, 틴트, 하이라이트, 섀도우, 페이드, 선명도, 그레인, 비네팅 |
| 영상 | 재생 중 얼굴 추적, 같은 보정 적용, 소리 포함 MP4/WebM 저장 |
| 언어 | 한국어, English, 日本語. 상단에서 선택하고, 처음에는 기기 언어를 따라가요 |

## 폴더 구성

```
web/                 앱 본체 (정적 파일, 빌드 단계 없음)
  index.html         화면과 보정 엔진 (WebGL 셰이더)
  i18n.js            한국어, 영어, 일본어 문구
  vendor/face-api.js 얼굴 인식 라이브러리 (@vladmandic/face-api 1.7.14, MIT)
  model/             얼굴 인식 모델 가중치
  fonts/             Jua, Fredoka, Poppins (SIL OFL)
  privacy.html       개인정보 처리방침 (App Store 제출용 URL)
  sw.js              웹 버전 오프라인 캐시
ios/                 Capacitor 8 iOS 프로젝트 (Swift Package Manager)
  App/*.lproj/       권한 안내 문구 현지화 (ko, en, ja)
capacitor.config.json
.github/workflows/pages.yml   web/ 폴더를 GitHub Pages에 배포
```

## 로컬에서 실행

```bash
cd web
python3 -m http.server 8080
# http://localhost:8080 접속
```

`file://`로 직접 열면 모델을 불러오지 못하니 꼭 로컬 서버로 여세요.

## iOS 빌드

Mac과 Xcode 16 이상이 필요해요.

```bash
npm install
npm run ios:sync    # web/ 내용을 iOS 프로젝트로 복사
npm run ios:open    # Xcode 열기
```

`web/`을 고칠 때마다 `npm run ios:sync`를 다시 실행하세요.

## 라이선스 고지

- face-api: MIT License, Vladimir Mandic (`web/vendor/face-api.LICENSE`)
- Jua, Fredoka, Poppins: SIL Open Font License 1.1
- Capacitor: MIT License, Ionic

## 문구 추가와 수정

화면의 모든 문구는 `web/i18n.js`에 언어별로 있어요. 같은 키를 세 언어에 모두 넣어야 해요.
iOS 권한 안내 문구는 `ios/App/App/<언어>.lproj/InfoPlist.strings`에 있어요.
