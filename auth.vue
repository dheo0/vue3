<template>
  <div id="body_layout">
    소셜 로그인
  </div>
</template>
<script>
export default {
  mounted() {
    const code = new URL(window.location.href).searchParams.get('code')
    const type = new URL(window.location.href).searchParams.get('type')

    const self = this;

    if (opener) {
      console.log("opener is valid!!!");
      // opener에 g_winPopup 변수로 this를 넣어줌에 따라 WinPop.vue에서 이 소스의 객체를 직접 접근할 수 있게 된다
      // WinPop.vue에서 g_winPopup 변수 활용을 확인할것
      opener.g_winPopup = this;
    }

    setTimeout(() => {
      this.sendMsgToParent()
    },1000)

  },
  methods : {
    sendMsgToParent(){
      this.sendToOpener(
        {
          evt: 'message' ,
          message : 'hello'
        });
    },

    // 부모로 이벤트 보내기
    sendToOpener(sendObj){

      if(opener == null) {
        return
      }

      let sendStr = JSON.stringify(sendObj)

      // 부모 창에 Message를 보냄
      window.opener.postMessage(sendStr, '*');
    },

    // 부모로 부터 이벤트 받기
    // 이 함수는 WinPop.vue 의 calledFromOpener를 통해서 받게 된다
    calledFromOpener( evt ){
      console.log( "receiveFromOpener  ------" );
      this.message = evt.msg;
    },

  }
}


/*
const social = window.localStorage.getItem('socialType')
console.log(social)


const redirectURI = window.location.origin + '/auth'
// const state = this.secureRandom(15)

let clientID = ''
let secretCode = ''
let uri = ''
const state = secureRandom(15)
switch (social) {
  case 'facebook':
  clientID = '1508578636287219'
  secretCode = '6d68479daf4e05b40e44831c035a5197'
  uri = `https://graph.facebook.com/v2.11/oauth/access_token?client_id=${clientID}&redirect_uri=${redirectURI}&client_secret=${secretCode}&code=${code}`
  window.location.href = uri
  break
case 'naver':
  clientID = 'HTJCHt1f6afmdaYys69x'
  secretCode = '8ttBqJsN6X'
  uri =`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${secretCode}&code=${code}`
  window.location.href = uri
  break
case 'kakao':
  clientID = '62d97060fcb9a144f60815ab0dd8cdfc'
  uri =`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientID}&redirect_uri=${redirectURI}&code=${code}`
  window.location.href = uri
  break
  default:
  console.log(`Sorry, we are out of ${expr}.`)
}



const params = {
  code,
  state: secureRandom(15),
  type
}

function secureRandom(num) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
} */

</script>
