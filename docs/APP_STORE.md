# JoyFilter iOS 출시 가이드

이 저장소의 `ios/` 폴더는 그대로 App Store에 제출할 수 있게 설정되어 있어요.
로그인, 서버, 분석 도구가 없어서 개인정보 항목은 "데이터를 수집하지 않음"으로 신고하면 돼요.

아래 순서대로 진행하면 처음 출시까지 보통 1~3일 걸려요. 대부분은 Apple 심사 대기 시간이에요.

---

## 0. 준비물

| 항목 | 내용 |
| --- | --- |
| Apple Developer Program | 연간 유료 멤버십. [developer.apple.com/programs](https://developer.apple.com/programs/)에서 가입 |
| Mac | Xcode 16 이상 설치 (App Store에서 무료) |
| Node.js | 22 이상 ([nodejs.org](https://nodejs.org)의 LTS 버전) |
| iPhone | 실기기 테스트용 (권장) |
| 웹 주소 | 개인정보 처리방침 URL. GitHub Pages의 `/privacy.html`을 그대로 써요 |

## 1. 프로젝트 열기

```bash
node -v            # v22 이상인지 확인
git clone https://github.com/ek2458/JoyFilter.git
cd JoyFilter
npm install
npm run ios:sync
npm run ios:open
```

Xcode가 처음 열릴 때 Swift 패키지를 내려받느라 1~2분 걸려요.

## 2. 번들 ID와 서명 설정

번들 ID는 전 세계에서 하나만 쓸 수 있어서, 기본값 `com.joyfilter.app`은 바꾸는 게 안전해요.

1. Xcode 왼쪽에서 **App** 프로젝트 → **App** 타깃 → **Signing & Capabilities**
2. **Team**에서 본인 개발자 계정 선택
3. **Bundle Identifier**를 `com.<회사나 이름>.joyfilter` 형태로 변경
4. 저장소 루트의 `capacitor.config.json`의 `appId`도 같은 값으로 바꾸고 `npm run ios:sync`

## 3. 실기기 테스트 체크리스트

iPhone을 연결하고 ▶︎ 실행 후 아래를 확인하세요.

- [ ] 사진 열기 → 얼굴 인식 → 얼굴형 슬라이더가 자연스럽게 움직임
- [ ] 영상 열기 → 재생 중 얼굴 추적 → 보정이 따라감
- [ ] 사진 저장 → 공유 시트에서 **이미지 저장** → 사진 앱에 저장됨
- [ ] 영상 저장 → 진행률 표시 → 공유 시트에서 **비디오 저장** → 소리 포함 확인
- [ ] 비행기 모드에서도 모든 기능 동작 (모델과 폰트가 앱에 들어 있음)
- [ ] 권한 거부 후에도 앱이 멈추지 않음

## 4. App Store Connect에 앱 만들기

[appstoreconnect.apple.com](https://appstoreconnect.apple.com) → **앱** → **＋ 새로운 앱**

| 항목 | 입력값 |
| --- | --- |
| 플랫폼 | iOS |
| 이름 | JoyFilter (이미 쓰이고 있으면 아래 대안 참고) |
| 기본 언어 | 한국어 |
| 번들 ID | 2단계에서 정한 값 |
| SKU | `joyfilter-ios-1` 같은 아무 고유 문자열 |

### 앱 정보

| 항목 | 입력값 |
| --- | --- |
| 카테고리 | 사진 및 비디오 (보조: 라이프스타일) |
| 개인정보 처리방침 URL | `https://<깃허브아이디>.github.io/joyfilter/privacy.html` |
| 연령 등급 | 모든 질문 "없음" → 4+ |
| 가격 | 무료 |

### 앱 개인정보 보호 (App Privacy)

**"아니요, 이 앱에서 데이터를 수집하지 않습니다"** 를 선택하세요.
JoyFilter는 사진, 영상, 얼굴 정보를 기기 밖으로 보내지 않고 분석이나 광고 SDK도 없어서 이 답이 사실과 맞아요.

### 스토어 문구 (붙여넣기용)

**부제 (30자 이내)**
```
얼굴 보정과 필름 필터, 사진·영상
```

**프로모션 텍스트**
```
로그인 없이, 업로드 없이. 사진과 영상 속 얼굴을 기기 안에서 자연스럽게 보정하세요.
```

**설명**
```
JoyFilter는 사진과 영상 속 얼굴을 자동으로 찾아 자연스럽게 보정하고, 필름 감성 필터를 입혀 주는 편집 도구예요.

얼굴 보정
· 작은 얼굴, 얼굴 갸름, V라인 턱, 턱 길이
· 눈 크기, 코 슬림, 입술 볼륨, 입꼬리
· 한 번에 끝내는 '자연스럽게 자동 보정'

피부 보정
· 윤곽은 살리고 결만 정돈하는 피부 보정
· 화사함과 혈색 조절
· 눈, 눈썹, 입술은 건드리지 않아요

필름 필터
· 웜, 쿨, 브라이트, 필름 그레인, 모노 계열 13가지 필터
· 노출, 대비, 색온도, 그레인, 비네팅까지 세밀한 조정

영상 보정
· 재생하는 동안 얼굴을 따라가며 같은 보정을 적용
· 소리까지 담아 영상으로 저장

개인정보
· 회원가입과 로그인이 없어요
· 사진과 영상은 기기 안에서만 처리되고 어디에도 업로드되지 않아요
· 광고와 추적 도구가 없어요
```

**키워드 (100자 이내, 쉼표로 구분)**
```
보정,얼굴보정,셀카,뷰티,필터,필름,감성,피부,V라인,눈크게,영상보정,사진편집,카메라,필름카메라
```

**이름이 이미 쓰이고 있을 때 대안**
`JoyFilter: 얼굴 보정 & 필름`, `JoyFilter 조이필터`, `JoyFilter Studio`

### 영어, 일본어 스토어 페이지

앱 화면과 권한 안내는 이미 세 언어를 지원해요. App Store Connect의 앱 버전 페이지 오른쪽 위 언어 메뉴에서
**영어(미국)**, **일본어**를 추가하고 아래 문구를 붙여 넣으세요. 언어마다 스크린샷을 따로 올릴 수 있어요. 해당 언어로 바꾼 화면을 찍으면 좋아요.

**English**

- Subtitle: `Face retouch & film filters`
- Promotional text: `No sign-in, no uploads. Retouch faces in photos and videos right on your device.`
- Keywords: `retouch,face,selfie,beauty,filter,film,skin,smooth,slim,vline,eyes,video editor,photo editor,aesthetic`
- Description:
```
JoyFilter finds faces in your photos and videos and retouches them naturally, then adds a film-style look.

Face
· Smaller face, slim face, V-line jaw, chin length
· Eye size, slim nose, lip volume, lifted mouth corners
· One-tap natural auto retouch

Skin
· Smooths skin texture while keeping facial contours
· Brighten and add a rosy glow
· Eyes, brows, and lips are left untouched

Film filters
· 13 filters across warm, cool, bright, film grain, and mono
· Fine control over exposure, contrast, temperature, grain, and vignette

Video
· Tracks faces during playback and applies the same retouch
· Saves your video with sound

Privacy
· No account or sign-in
· Photos and videos are processed only on your device and never uploaded
· No ads or tracking
```

**日本語**

- サブタイトル: `顔補正とフィルムフィルター`
- プロモーションテキスト: `ログインもアップロードも不要。写真や動画の顔を、端末の中で自然に補正。`
- キーワード: `補正,顔補正,自撮り,美顔,フィルター,フィルム,エモい,肌補正,小顔,Vライン,目を大きく,動画編集,写真加工`
- 説明:
```
JoyFilterは写真や動画の顔を自動で見つけて自然に補正し、フィルム風の雰囲気に仕上げる編集ツールです。

顔の補正
・小顔、輪郭スリム、Vライン、あごの長さ
・目の大きさ、鼻スリム、唇のボリューム、口角アップ
・ワンタップの「ナチュラル自動補正」

肌の補正
・輪郭を残したまま肌のキメだけを整えます
・明るさと血色を調整
・目、眉、唇はそのまま

フィルムフィルター
・ウォーム、クール、ブライト、フィルムグレイン、モノクロの13種類
・露出、コントラスト、色温度、グレイン、ビネットまで細かく調整

動画の補正
・再生中に顔を追いかけて同じ補正をかけます
・音声付きで動画を保存

プライバシー
・会員登録もログインもありません
・写真と動画は端末の中だけで処理され、アップロードされません
・広告やトラッキングはありません
```

개인정보 처리방침 페이지도 세 언어를 지원해서 같은 주소를 그대로 쓰면 돼요. 방문자의 언어에 맞춰 열리고, 위쪽에서 바꿀 수 있어요.

### 스크린샷

iPhone 전용으로 설정해 두었기 때문에 iPhone 스크린샷만 필요해요.

- **6.9인치** (1320 × 2868 px) 3~10장. 이 크기를 올리면 작은 화면용은 자동으로 줄여서 써요.
- Xcode 시뮬레이터에서 iPhone 16 Pro Max(또는 최신 Pro Max)를 켜고 `⌘S`로 찍으면 정확한 크기로 저장돼요.
- 추천 구성: ① 첫 화면 ② 얼굴 보정 전후 비교 ③ 피부 보정 ④ 필터 선택 ⑤ 영상 보정

> 직접 찍은 본인 사진이나 사용 허락을 받은 모델 사진만 쓰세요. 연예인 사진은 심사에서 거절돼요.

## 5. 업로드

1. Xcode 상단 기기 선택에서 **Any iOS Device (arm64)** 선택
2. **Product → Archive**
3. Organizer 창에서 **Distribute App → App Store Connect → Upload**
4. 10~30분 뒤 App Store Connect의 **TestFlight** 탭에 빌드가 나타나요
5. 수출 규정 질문은 자동으로 "암호화 사용 안 함"으로 처리돼요 (`ITSAppUsesNonExemptEncryption = false` 설정됨)

새 버전을 올릴 때는 Xcode **General**에서 Version(예: 1.0.1)이나 Build 번호를 올려야 해요.

## 6. 심사 제출

1. App Store Connect → 앱 → **1.0 제출 준비 중**
2. 빌드 선택, 스크린샷, 문구 입력
3. **앱 심사 정보**: 로그인이 없으므로 "로그인 필요" 체크 해제
4. **심사 메모** (붙여넣기용):
   ```
   JoyFilter is an offline photo and video editor. No account is required.
   All face detection and editing runs on-device; no data leaves the phone.
   To test: tap 사진 열기 (Open Photo), choose a portrait, then use the sliders in each tab.
   Save uses the system share sheet ("Save Image" / "Save Video").
   ```
5. **심사에 제출**

## 7. 심사에서 자주 나오는 이슈와 대응

| 지적 | 대응 |
| --- | --- |
| 4.2 최소 기능 (웹사이트를 감싼 앱 같다) | JoyFilter는 모든 기능이 앱 안에서 오프라인으로 동작하고, 기기 사진 보관함과 공유 시트를 쓴다는 점을 답변에 설명하세요. 계속 거절되면 사진 보관함 바로 저장 같은 네이티브 기능을 더 넣을 수 있어요 |
| 5.1.1 권한 설명 부족 | `Info.plist`에 한국어 설명이 들어 있어요. 영어 심사자를 위해 설명을 영어로 바꾸거나 영어 현지화를 추가할 수 있어요 |
| 2.1 앱이 멈춤 | 3단계 체크리스트를 실기기에서 모두 통과했는지 확인하세요. 오래된 기기에서 4K 영상이 느리면 1280px로 줄여서 처리하도록 이미 되어 있어요 |
| 스크린샷에 실존 인물 | 직접 찍은 사진이나 사용 허락을 받은 사진으로 교체 |

## 8. 이후 업데이트

```bash
# web/ 수정 후
npm run ios:sync
# Xcode에서 Version/Build 올리고 다시 Archive → Upload
```

웹 버전은 `main` 브랜치에 push하면 GitHub Actions가 자동으로 다시 배포해요.
