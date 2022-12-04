<template>
  <div id="body_layout">
    <div id="naverIdLogin"></div>
  </div>
</template>
<script>
const code = new URL(window.location.href).searchParams.get('code')
console.log(code)
import axios from 'axios'

const client_id = "HTJCHt1f6afmdaYys69x";
const client_secret = "8ttBqJsN6X";
const redirectURI = encodeURI("http://localhost:5000/auth");
let apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&";
apiURL += "client_id=" + client_id;
apiURL += "&client_secret=" + client_secret;
apiURL += "&redirect_uri=" + redirectURI;
apiURL += "&code=" + code;
apiURL += "&state=" + secureRandom(10);

window.location.href = apiURL

const headers = {
  'Access-Control-Allow-Origin': '*',
  withCredentials: true,
  'Contetn-type': 'application/x-www-form-urlencoded'
}

const params = {
  grant_type: 'authorization_code',
  client_id: client_id,
  client_secret: client_secret,
  state: secureRandom(10)
}
function secureRandom(num){
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}





axios.get(apiURL, headers).then((res) => {
  console.log('되냐?', res)
})


export default {}
</script>