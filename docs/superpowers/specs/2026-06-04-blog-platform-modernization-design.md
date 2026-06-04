# 블로그 플랫폼 최신화 설계 (2026-06-04)

## 배경

`huns.me`는 Jekyll 4.3 + `chesterhow/tale` remote theme 기반의 정적 블로그다.
다음 문제들이 누적되어 있다.

- GA 추적 코드가 UA(Universal Analytics) 시절 ID로 박혀 있다. UA는 2023-07에 측정 중단됐다.
- `_includes/head.html`이 `{% seo %}`, `{% feed_meta %}`를 호출하지만 `_config.yml` plugins에는 해당 gem이 등록돼 있지 않다. 사실상 빈 호출.
- `_layouts/default.html`이 `lang="en"`인데 한글 블로그다.
- WebFont.load 후 `<body>`의 `hidden` 클래스를 제거하는 패턴. 폰트 로드 실패 시 본문이 영영 표시되지 않는다.
- 배포 방식이 `publish.sh`에서 `git branch -D main` + `git filter-branch --subdirectory-filter _site/` + `git push --all -f`로 매번 main을 재생성해 force push한다. _site가 git에 추적되는 원인이기도 하다.
- chesterhow/tale 테마는 다크모드, 코드블록 복사, 모바일 가독성 등 현대적인 정비가 없다.

## 결정 사항

- Jekyll은 유지한다.
- 테마 느낌(미니멀)은 유지하고 내부만 정비한다.
- 단계별로 커밋을 분리하되 PR은 나누지 않는다. 한 흐름으로 끝까지 완수한다.
- 애널리틱스는 GA4로 전환한다.
- 배포는 GitHub Actions로 자동화한다.

## 단계

### Stage 1 — 위생 + 배포 현대화

- `.gitignore`에 `_site/`, `vendor/`, `.bundle/`, `.jekyll-cache/`, `.sass-cache/` 추가.
- `Gemfile.lock`은 `.gitignore`에서 빼고 의도적으로 추적해 재현 가능한 빌드를 보장한다.
- git에서 `_site/`, `vendor/` 추적 해제.
- `publish.sh` 삭제.
- `.github/workflows/deploy.yml` 추가: main push → Jekyll 빌드 → GitHub Pages 배포.

### Stage 2 — SEO + GA4

- Gemfile, `_config.yml`에 `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed` 추가.
- `_config.yml`에 `lang: ko`, `timezone: Asia/Seoul`, `twitter`, `social`, `logo`, `tagline` 등 SEO 메타 보강.
- `_layouts/default.html`의 `lang="en"`을 `{{ site.lang }}`로.
- `_includes/analytics.html`을 GA4 `gtag` 패턴으로 교체. ID는 `site.google_analytics`에서 읽도록.
- 본문 첫 단락 자동 description 추출 가능하면 사용.

### Stage 3 — 성능

- WebFont.load 제거 → `<link rel="preconnect">` + `<link rel="stylesheet" href="...&display=swap">`로 교체.
- `<body class="hidden">` 제거. 폰트 미로드 상태에서도 본문은 보여야 한다.
- GitHub Actions에 Ruby gem 캐시 설정.

### Stage 4 — 디자인/UX

- `_sass/`에 라이트/다크 토큰(CSS variables)을 정의하고 기존 색상 하드코딩을 토큰 참조로 교체.
- `prefers-color-scheme`로 시스템 설정을 따라가게 하고, 본문 우상단(또는 navigation)에 다크/라이트 토글을 추가해 사용자가 강제로 바꿀 수 있게 한다. 선택은 `localStorage`에 저장.
- 코드 블록에 복사 버튼 추가(짧은 vanilla JS).
- 본문 타이포(한글 line-height, 가독 폭), 모바일 패딩 미세 조정.

## 제외 (YAGNI)

- 테마 자체 교체.
- 다른 정적 사이트 생성기로 마이그레이션.
- 신규 댓글 시스템(utterances는 그대로).
- 검색 기능, 태그/카테고리 페이지(현재 글 수 기준 불필요).
