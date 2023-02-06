# 2022.5.7~ 3355 프로젝트 업데이트

전반적인 업데이트 항목
1. 컴포넌트 재활용성 높임(중복 코드 줄임)
2. 컴포넌트 명을 직관적으로 수정

## 5.7
LoginPage, SignUpPage(로그인, 회원가입 컴포넌트)
1. 페이지별 제목에 공통으로 사용되는 코드를 컴포넌트화 하였음(common/PageName)
2. 보안상의 이유로 HomePage url을 변경하였음 (/home/${id} -> /study)
3. HomePage -> StudyPage로 컴포넌트 명 수정

## 5.11
StudyPage, AttendPage(스터디, 출석 컴포넌트)
1. BulletinList -> StudyList로 컴포넌트 명 수정

## 5.14
ChatPage(채팅 컴포넌트)
1. 채팅 페이지를 세분화 하였음
2. 채팅 폼을 컴포넌트화 해주었음
2. webstomp-client, sockjs-client을 이용해 채팅 기능 구현

## 5.16
common(컴포넌트 재사용)
1. 각 페이지별 제목을 컴포넌트화 하여 재활용해 사용했음
2. 내 정보에 반복적으로 사용되는 부분을 컴포넌트화 하여 재활용해 사용했음
3. 어떤 컴포넌트 인지 직관적으로 알기 위해 TopTile -> PageNmae으로 수정

## 5.19 ~ 5.21
1. json-server의 json 파일을 세부적으로 구별해주었다.
1. state 공유 필요없이 api만 요청하는 것을 api/index.js에 작성
2. store에서도 불필요한 코드를 수정해주었다.

