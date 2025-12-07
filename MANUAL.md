# GILab Homepage 관리 메뉴얼

## 파일 구조
```
GILabHomepage/
├── client/
│   └── public/
│       └── data/
│           ├── members.json      ← 멤버 정보
│           ├── publications.json ← 논문 정보
│           ├── news.json         ← 뉴스 정보
│           ├── research-areas.json ← 연구 분야
│           ├── lab-info.json     ← 연구실 정보
│           └── images/           ← 이미지 폴더
└── docs/                         ← 빌드 결과물 (직접 수정 X)
```

---

## 1. 멤버 추가/수정/삭제

### 파일 위치
`client/public/data/members.json`

### 구조
```json
{
  "masters": [...],    // 석사과정
  "bachelors": [...],  // 학부연구생
  "phd": [...],        // 박사과정
  "other": [...]       // 기타
}
```

### 멤버 추가 예시
```json
{
  "id": "고유ID-아무거나-입력",
  "name": "홍길동",
  "email": "hong@o.cnu.ac.kr",
  "imageUrl": "/GILabHomepage/data/images/hong_photo.jpg",
  "homepage": "https://github.com/hong",
  "degree": "masters",
  "joinedAt": "Mar. 2025 ~ Current",
  "status": "current",
  "bio": ""
}
```

### 필드 설명
| 필드 | 설명 | 예시 |
|------|------|------|
| `id` | 고유 식별자 (아무 문자열) | `"member-hong-2025"` |
| `name` | 이름 | `"홍길동"` |
| `email` | 이메일 | `"hong@o.cnu.ac.kr"` |
| `imageUrl` | 프로필 사진 경로 | `"/GILabHomepage/data/images/파일명.jpg"` |
| `homepage` | GitHub 등 개인 페이지 | `"https://github.com/hong"` |
| `degree` | 학위과정 | `"masters"`, `"bachelors"`, `"phd"`, `"other"` |
| `joinedAt` | 재학 기간 | `"Mar. 2025 ~ Current"` |
| `status` | 상태 | `"current"`, `"Naver Internship"` 등 |
| `bio` | 소개글 (선택) | `""` |

### 멤버 삭제
해당 멤버의 `{ ... }` 블록 전체를 삭제합니다.

---

## 2. 논문 추가/수정/삭제

### 파일 위치
`client/public/data/publications.json`

### 논문 추가 예시
```json
{
  "id": "pub-2025-emnlp-001",
  "title": "Your Paper Title Here",
  "authors": "Author1, Author2, Author3",
  "venue": "EMNLP 2025",
  "year": 2025,
  "abstract": "논문 초록...",
  "pdfUrl": "https://arxiv.org/pdf/xxxx.pdf",
  "codeUrl": "https://github.com/your-repo",
  "imageUrl": "/GILabHomepage/data/images/paper_figure.png",
  "tags": ["NLP", "LLM"],
  "isPublished": true
}
```

### 필드 설명
| 필드 | 설명 | 필수 |
|------|------|------|
| `id` | 고유 식별자 | O |
| `title` | 논문 제목 | O |
| `authors` | 저자 목록 | O |
| `venue` | 학회/저널명 | O |
| `year` | 출판 연도 | O |
| `abstract` | 초록 | X |
| `pdfUrl` | PDF 링크 | X |
| `codeUrl` | 코드 링크 | X |
| `imageUrl` | 논문 대표 이미지 | X |
| `tags` | 태그 배열 | X |
| `isPublished` | 공개 여부 | O |

---

## 3. 뉴스 추가/수정/삭제

### 파일 위치
`client/public/data/news.json`

### 뉴스 추가 예시
```json
{
  "id": "news-2025-12-01",
  "title": "[2025.12] 새로운 소식 제목",
  "content": "<p>HTML 형식의 상세 내용</p>",
  "summary": "",
  "imageUrl": "/GILabHomepage/data/images/news_image.png",
  "publishedAt": "2025-12-07T10:00:00",
  "isPublished": true
}
```

### 필드 설명
| 필드 | 설명 |
|------|------|
| `id` | 고유 식별자 |
| `title` | 뉴스 제목 (날짜 포함 권장) |
| `content` | HTML 형식 상세 내용 |
| `summary` | 요약 (선택) |
| `imageUrl` | 뉴스 이미지 |
| `publishedAt` | 게시일 (ISO 형식) |
| `isPublished` | 공개 여부 |

---

## 4. 이미지 추가 방법

### 이미지 저장 위치
```
client/public/data/images/
```

### 이미지 파일명 규칙
- 영문, 숫자, 언더스코어(_) 사용 권장
- 공백, 한글 사용 금지
- 예시: `hong_profile.jpg`, `paper_emnlp2025.png`

### 이미지 경로 작성법
```
/GILabHomepage/data/images/파일명.확장자
```

**올바른 예시:**
```json
"imageUrl": "/GILabHomepage/data/images/hong_profile.jpg"
```

**잘못된 예시:**
```json
"imageUrl": "/data/images/hong_profile.jpg"  // GILabHomepage 누락
"imageUrl": "images/hong_profile.jpg"        // 절대경로 아님
```

---

## 5. 변경사항 적용 (배포)

### 순서

1. **JSON 파일 수정** (위 내용 참고)

2. **이미지 추가** (필요시)
   ```
   client/public/data/images/ 폴더에 이미지 복사
   ```

3. **빌드 실행**
   ```bash
   cd client
   npm run build
   ```

4. **GitHub에 푸시**
   ```bash
   git add .
   git commit -m "멤버 추가"
   git push
   ```

5. **배포 확인**
   - 1~2분 후 https://cnunlp2023.github.io/GILabHomepage/ 에서 확인

---

## 6. 주의사항

### JSON 문법
- 마지막 항목 뒤에 쉼표(,) 없음
- 문자열은 반드시 큰따옴표(`"`) 사용

**올바른 예시:**
```json
[
  { "name": "홍길동" },
  { "name": "김철수" }   ← 마지막은 쉼표 없음
]
```

**잘못된 예시:**
```json
[
  { "name": "홍길동" },
  { "name": "김철수" },  ← 에러! 마지막 쉼표
]
```

### JSON 검증
수정 후 https://jsonlint.com/ 에서 문법 확인 권장

### node_modules 주의
`client/node_modules/` 폴더는 절대 GitHub에 푸시하지 마세요!

---

## 7. 연구 분야 수정

### 파일 위치
`client/public/data/research-areas.json`

### 예시
```json
{
  "id": "area-llm-red-team",
  "name": "LLM Red team",
  "description": "Jailbreaking, Train data extraction, etc",
  "parentId": null,
  "imageUrl": "",
  "order": 0,
  "isActive": true
}
```

---

## 8. 연구실 정보 수정

### 파일 위치
`client/public/data/lab-info.json`

교수님 정보, 연구실 위치, 연락처 등을 수정할 수 있습니다.

---

## 빠른 참조

| 작업 | 파일 |
|------|------|
| 멤버 추가/삭제 | `client/public/data/members.json` |
| 논문 추가/삭제 | `client/public/data/publications.json` |
| 뉴스 추가/삭제 | `client/public/data/news.json` |
| 연구분야 수정 | `client/public/data/research-areas.json` |
| 연구실 정보 | `client/public/data/lab-info.json` |
| 이미지 추가 | `client/public/data/images/` |
