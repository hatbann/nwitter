#  nwitter


# 📄 프로젝트 소개
 react와 firebase실습을 위해 진행한 클론코딩 사이트입니다

<br>

# ⌛ 제작 기간
2022년 7월 24일 ~ 2022년 8월 1일
<br>

# ⚙ 사용 기술 및 라이브러리
- `HTML / CSS`
- `Javascript`
- `React`
- `Firebase`
<br>

# 🛠 주요 기능
<h3>1. 회원가입 및 로그인</h3>

- 이메일과 비밀번호로 회원가입이 가능하며, 구글 및 깃허브로 소셜로그인 또한 가능합니다
- firebase에 query를 보내 현재 로그인한 유저정보를 조회하고 값이 있을경우 router에서 Home으로 가게되고, 없을 경우 로그인 및 회원가입 폼으로 넘어갑니다.


<h3>2. 글쓰기</h3>

- 회원은 글을 쓸 수 있고 사진을 첨부할 수 있습니다. 또한 작성한 게시글은 삭제 및 수정이 가능합니다
- 첨부한 이미지는 fileReader 객체의 readAsDataURL메서드로 읽어오고 읽어오기가 끝나면 onloadend 메서드가 실행되어 useState Hook으로 imgfile변수에 저장합니다
- 이미지는 firebase의 storage에 저장하고 getDownloadURL메서드를 통해 다시 불러온 url과 입력한 내용, 시간, 글쓴이 정보값과 함께 객체 형태로 firestore에 저장됩니다.


<h3>3. 회원정보 수정 및 로그아웃</h3>

- 회원은 자신의 닉네임을 변경할 수 있습니다
- 현재 firebase.auth().currentUser를 통해 불러와 사용하고 있는 user객체의 displayName을 기본적으로 보여주고, user객체의 updateProfile메소드를 사용해서 수정합니다.
- 파이어베이스의 signOut을 호출해서 현제 유저 객체를 넘겨 로그아웃하고, useHistory를 통해 Home으로 가게 됩니다.

<br>

# 🖥 Site
https://hatbann.github.io/nwitter/#/
