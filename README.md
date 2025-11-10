
🏫 SM-Connect
상명대학교 전용 커뮤니티 플랫폼 (H2 기반 버전)
React + Spring Boot + H2 Database로 구성된 교내 커뮤니티 웹서비스

📘 프로젝트 개요
SM-Connect는 상명대학교 학생들이 자유롭게 정보를 공유하고 소통할 수 있도록 만든 전용 커뮤니티입니다.
‘스누라이프(SNUlife)’나 ‘고파스’처럼 학교별 독립 커뮤니티의 필요성을 기반으로 기획되었습니다.

🧩 주요 기술 스택
구분	사용 기술
Frontend	React, Vite, TailwindCSS
Backend	Spring Boot (v3.x), JPA, Maven
Database	H2 (in-memory)
Auth	BCrypt 기반 회원가입 및 로그인
Tools	IntelliJ IDEA, VSCode, GitHub, Postman

🖥️ 주요 기능

🔐 회원가입 / 로그인
BCrypt로 비밀번호 암호화 후 저장
중복 ID 및 이메일 검사

📰 게시판 CRUD
글 작성 / 목록 / 수정 / 삭제 기능
작성자 이름 표시
💬 익명/실명 혼합 게시판 구조
⚙️ 기본 오류 처리 및 콘솔 로그 디버깅 지원

⚙️ 시스템 아키텍처
flowchart LR
  A[React Frontend] -->|REST API| B[Spring Boot Backend]
  B --> C[(H2 Database)]

개발 시 H2 콘솔을 통해 데이터 확인 가능
→ http://localhost:8080/h2-console

JDBC URL 예시: jdbc:h2:mem:testdb
사용자명: sa, 비밀번호: (빈칸)

📄 API 요약
Method	Endpoint	설명
POST	/api/auth/signup	회원가입
POST	/api/auth/login	로그인
GET	/Community	글 목록 조회
GET	/Community/{id}	글 상세 조회
POST	/Community	글 작성
PATCH	/Community/{id}	글 수정
DELETE	/Community/{id}	글 삭제

🧠 폴더 구조
sm-connect/
 ├── backend/
 │   ├── src/main/java/com/example/lsh_community/
 │   │    ├── controller/
 │   │    ├── service/
 │   │    ├── entity/
 │   │    ├── dto/
 │   │    └── repository/
 │   └── resources/
 │       ├── application.yml
 │       └── data.sql (optional)
 └── frontend/
     ├── src/
     │   ├── pages/
     │   ├── components/
     │   ├── api/
     │   └── styles/
     └── package.json
