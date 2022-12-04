<template>
  <div id="body_layout">
  </div>
</template>
<script>
import axios from 'axios'
const REDIRECT_URI = 'http://localhost:5000/auth_kakao'
const JDK_API_KEY = 'ac29fdf4aae91c2fb0a196a1f5e60e43'
const code = new URL(window.location.href).searchParams.get('code')
const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
console.log(code)

Kakao.init('ac29fdf4aae91c2fb0a196a1f5e60e43')
Kakao.isInitialized()
console.log(Kakao.isInitialized())



const headers = {
  withCredentials: true,
  'Contetn-type': 'application/x-www-form-urlencoded'
}
const data = {
  grant_type: 'authorization_code',
  client_id: JDK_API_KEY,
  redirect_uri: REDIRECT_URI,
  code: code
}
let access_token = null
axios.post('/oauth/token', formUrlEncoded(data), {
  headers: headers
}).then((res) => {
  access_token = res.data.access_token
  console.log('Access token', access_token, res)
  window.localStorage.setItem('kakao', JSON.stringify(res.data))
  Kakao.Auth.setAccessToken(access_token);
  requestUserInfo()
})

function requestUserInfo() {
  Kakao.API.request({
    url: '/v2/user/me',
  })
    .then(function(res) {
      console.log(JSON.stringify(res));
    })
    .catch(function(err) {
      alert('failed to request user information: ' + JSON.stringify(err));
    });
}

displayToken()
function displayToken() {
  var token = getCookie('authorize-access-token');

  if(token) {
    Kakao.Auth.setAccessToken(token);
    document.querySelector('#token-result').innerText = 'login success, ready to request API';
    document.querySelector('button.api-btn').style.visibility = 'visible';
  }
}

function getCookie(name) {
  var parts = document.cookie.split(name + '=');
  if (parts.length === 2) { return parts[1].split(';')[0]; }
}

/*
const headers2 = {
  withCredentials: true,
  Authorization: `Bearer ${access_token}`,
  'Contetn-type': 'application/x-www-form-urlencoded;charset=utf-8'
}

axios.get('/v2/user/me', {}, {
  headers2
}).then((res) => {
 console.log('getMe', res)
})

*/


/*

const REST_API_KEY ='62d97060fcb9a144f60815ab0dd8cdfc'
const REDIRECT_URI = 'http://localhost:5000/auth_kakao'
const headers = {
  withCredentials: true,
  "Contetn-type": "application/x-www-form-urlencoded"
}
const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
const data = {
  grant_type: 'authorization_code',
  client_id: REST_API_KEY,
  redirect_uri: REDIRECT_URI,
  code: code
}


  axios.post('/oauth/token', formUrlEncoded(data), {
    headers: headers
  }).then((res) => {
    console.log(res)
    window.localStorage.setItem('kakao', JSON.stringify(res.data))
  }).finally(() => {
    const kakao = window.localStorage.getItem('kakao')
    const APP_ADMIN_KEY = '7c60d4216720746897c3131f84e808e3'
    const ACCESS_TOKEN = JSON.parse(kakao).access_token
    const getHeader = {
      Authorization: `Bearer ${ACCESS_TOKEN}/KakaoAK ${APP_ADMIN_KEY}`,
      withCredentials: true,
      "Contetn-type": "application/x-www-form-urlencoded;charset=utf-8"
    }
    axios.get('https://kapi.kakao.com/v2/user/me', {}, {
      headers: getHeader
    }).then((res) => {
      console.log('', res)
    })
  })




*/



export default {}
</script>