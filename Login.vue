<template>
  <div class="lp_body">
    <div class="layout">
      <div>
        <img
          class="login-visual"
          src="@assets/images/sub/bg_login@3x.png"
          alt="로그인"
          width="216"
        >
      </div>

      <div
        class="form-box m_t_20"
        :class="{'type-error': emailInputErrorFlag}"
      >
        <input
          v-model="email"
          type="email"
          name="loginId"
          required
          :disabled="isLogin"
          placeholder="이메일 아이디"
          @blur="validateEmail"
        >
        <p
          v-if="emailInputMessage"
          class="message"
        >
          {{ emailInputMessage }}
        </p>
      </div>
      <div class="form-box m_t_20">
        <input
          type="text"
          name="passwdTxt"
          inputmode="decimal"
          @input="$event.target.value = changeToNumber($event.target.value, 5)"
          required
          placeholder="비밀번호 (영문,숫자,특수기호 포함 10~16자)"
          :disabled="isLogin"
        >        
        <button
          type="button"
          class="btn-toggle-password-visibility"
          @click="togglePasswordVisibility"
        >
          <img
            v-show="passwordInputType === 'password'"
            src="@assets/images/login-password-off@2x.png"
            alt="비밀번호 확인"
          >
          <img
            v-show="passwordInputType !== 'password'"
            src="@assets/images/login-password-on@2x.png"
            alt="비밀번호 확인"
          >
        </button>
      </div>
      <div class="m_t_32">
        <comp-button-wrap
          class-name="grid-row bs-8 type-full"
        >
          <comp-button
            button-style-class="type1"
            name="로그인 하기"
            @btnClick="isLogin ? logoutProcess() : loginProcess()"
          />
        </comp-button-wrap>
      </div>
      <div class="m_t_24 login-util">
        <comp-checkbox
          :id="keepLogin"
          checkbox-style-class="type2"
        >
          로그인 유지하기
        </comp-checkbox>
        <div class="find-id">
          <router-link :to="{ name: '' }">
            아이디찾기
          </router-link>
          <i />
          <router-link :to="{ name: '' }">
            비밀번호 찾기
          </router-link>
        </div>        
      </div>

      <div class="social-login">
        <p class="tit">
          소셜 간편 로그인
        </p>
        <ul>
          <li>
            <button
              type="button"
              @click="handleSocialLoginFacebook"
            >
              <img
                src="@assets/images/share/social-login-facebook.png"
                alt=""
              >
              <span>페이스북<br>로그인</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              @click="handleSocialLoginKakao"
            >
              <img
                src="@assets/images/share/social-login-kakao.png"
                alt=""
              >
              <span>카카오톡<br>로그인</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              @click="handleSocialLoginApple"
            >
              <img
                src="@assets/images/share/social-login-apple.png"
                alt=""
              >
              <span>애플<br>로그인</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              @click="handleSocialLoginNaver"
            >
              <img
                src="@assets/images/share/social-login-naver.png"
                alt=""
              >
              <span>네이버<br>로그인</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              @click="handleSocialLoginGoogle"
            >
              <img
                src="@assets/images/share/social-login-google.png"
                alt=""
              >
              <span>구글<br>로그인</span>
            </button>
          </li>
        </ul>
      </div>

      <div class="m_t_40">
        <comp-button-wrap
          class-name="grid-row bs-8 type-full"
        >
          <comp-button
            button-style-class="type2"
            name="회원가입"
            @btnClick="handleButtonClick"
          />
        </comp-button-wrap>
      </div>
    </div>
  </div>
</template>
<script>
import ROUTE from '@constants/route.json'
import { login } from '@api/login/loginApi'
import { setToken, isLogin, removeToken } from '@utils/login/loginUtil'
import useMeta from '@utils/meta/vueMetaUtil'
import CompButtonWrap from '@comp/common/ButtonWrap'
import CompButton from '@comp/common/Button'
import CompCheckbox from '@comp/common/SelectionControls/Checkbox'

export default {
  name: ROUTE.login,
  components: {
    CompButtonWrap,
    CompButton,
    CompCheckbox
  },
  data () {
    return {
      loginId: '',
      emailInputMessage: '',
      emailInputErrorFlag: false,
      passwdTxt: '',
      passwordInputType: 'password',
      isLogin: isLogin()
    }
  },
  beforeMount() {
    useMeta({
      title: 'login',
      type: 'article',
      url: 'http://localhost:5000',
      description: 'description',
      image: 'http://localhost:5000/testImage.jpg'
    })
  },
  methods: {
    changeToNumber(value, len) {
      const num = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
      let lastWord
      if (num.includes('.')) {
        const str = num.split('.')
        if (str[1].length > len) {
          lastWord = str[0] + '.' + str[1].slice(0, -1)
        }
      }
      return this.$isNull(lastWord) ? num : lastWord
    },
    async loginProcess () {
      try {
        const { status, data } = await login({ loginId: this.loginId, passwdTxt: this.passwdTxt })

        if (status === 200) {
          const { accessToken, refreshToken } = data
          setToken(accessToken, refreshToken)
          this.isLogin = isLogin()
        }
      } catch (error) {
        console.log(error.message)
      }
    },

    logoutProcess () {
      removeToken()
      this.isLogin = isLogin()
      alert('logout')
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.emailInputMessage = ''
        this.emailInputErrorFlag = false
      } else {
        this.emailInputMessage = '이메일 아이디를 정확하게 입력해주세요.'
        this.emailInputErrorFlag = true
      }
    },
    togglePasswordVisibility() {
      this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
    },
    handleSocialLoginFacebook() {
      console.log('Facebook login click')
    },
    handleSocialLoginKakao() {
      console.log('Kakao login click')
    },
    handleSocialLoginApple() {
      console.log('Apple login click')
    },
    handleSocialLoginNaver() {
      console.log('Naver login click')
    },
    handleSocialLoginGoogle() {
      console.log('Google login click')
    }
  }
}
</script>
<style lang="scss" scoped>
.login-visual {
  margin: 16px auto 24px;
}
::v-deep .form-box.type-error input {
  border-color: #d93e40;
}
.btn-toggle-password-visibility {
  position: absolute;
  top: 9px;
  right: 7px;
  width: 20px;
  height: 20px;
  padding: 5px;
  box-sizing: content-box;
  img {
    width: 100%;
  }
}
.login-util {
  display: flex;
  justify-content: space-between;
  ::v-deep .ckGroup.type2 > span {
    margin-top: 0;
  }
  .find-id {
    display: flex;
    align-items: center;
    i {
      width: 1px;
      height: 12px;
      margin: 0 16px;
      background-color: #d8d8d8;
    }
    a {
      min-height: 24px;
      font-weight: 300;
      font-size: 14px;
      color: #666;
      line-height: 24px;
      display: inline-block;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
.social-login {
    margin-top: 60px;
  .tit {
    position: relative;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #666;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 7px;
      width: 104px;
      height: 1px;
      background-color: #d8d8d8;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  ul {
    margin: 24px -10px 0;
    padding: 0 4px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    li {
      flex: none;
      button {
        width: 60px;
        padding: 0 10px;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: #666;
        img {
          width: 100%;
        }
        span {
          margin: 8px -10px 0;
        }
      }
    }
  }
}
</style>
