const form = document.querySelector('form');
const idInput = document.querySelector('#user-id');
const passwordInput = document.querySelector('#user-password');
const loginButton = document.querySelector('#login-button');

const main = document.querySelector('main');
const userName = document.querySelector('#user-name');
const userInfo = document.querySelector('#user-info');
const logoutButton = document.querySelector('#logout-button');

axios.defaults.withCredentials = true;
let accessToken = ''

form.addEventListener('submit', (e) => {
  e.preventDefault();
})

function login() {
  const userId = idInput.value;
  const userPassword = passwordInput.value;

  return axios.post('http://localhost:3000', {userId, userPassword})
  .then(res => accessToken = res.data)
}

function logout() {
  accessToken = ''
}

function getUserInfo() {
  return axios.get('http://localhost:3000', {
    headers: { 'Authorization' : `Bearer ${accessToken}` } // jwt를 header로 보낼때(개발자약속)
  });
}

function renderUserInfo(user) {
  main.style.display = 'block';
  form.style.display = 'none';
  userName.textContent = user.user_name;
  userInfo.textContent = user.user_info;
}

function renderLoginForm() {
  main.style.display = 'none';
  form.style.display = 'block';
  userName.textContent = '';
  userInfo.textContent = '';
}

loginButton.onclick = () => {
  login()
    .then(() => getUserInfo())
    .then(res => {
      console.log(res.data)
      renderUserInfo(res.data)
    })
}

logoutButton.onclick = () => {
  logout()
  renderLoginForm();
}

/** 쿠키
 * 특징 - 클라이언트에 저장되는 짧은 텍스트(HTTP의 무상태성 보완)
 * 상태 저장 위치 - 클라이언트
 * 장점 - HTTP 요청과 응답의 정보를 저장할 수 있다. 자동으로 서버에 전달된다.
 * 단점 - 쿠키 자체는 인증을 위한 것이 아니다.
 */

/** 세션
 * 특징 - 인증 정보를 서버에 저장하고 관리, 세션 아이디를 쿠키로 전송
 * 상태 저장 위치 - 서버
 * 장점 - 서버에서 인증 정보를 관리해 보안성이 더 좋다.
 * 단점 - 로그인한 사용자가 많아지면 서버에 주하가 걸릴 수 있다. 서버 분산이 어렵다.
 */

/** 쿠키
 * 특징 - 토큰 자체로 인증 상태 증명 가능, 클라이언트에 인증 정보 저장
 * 상태 저장 위치 - 클라이언트
 * 장점 - 인증 정보를 클라이언트에 저장해 서버의 부하를 줄여준다.
 * 단점 - 토큰이 탈취당하면 무효화하기 힘들다.
 */