<template>
<div>
  <h2 class="text-center">Вход в систему</h2>
  <hr>
  <b-alert v-if="error" show variant="danger">{{ error + '' }}</b-alert>
  <b-alert show v-if="$auth.getState('redirect')">
    Нужно войти в систему, чтобы перейти к <strong>{{ $auth.getState('redirect') }}</strong>
  </b-alert>
  <b-row align-h="center" align-v="center">
    <b-col md="4">
      <b-card bg-variant="light">
        <busy-overlay />
        <form @keydown.enter="login">
        <b-form-group label="Имя пользователя (логин)">
          <b-input v-model="username" placeholder="anything" ref="username" />
        </b-form-group>

        <b-form-group label="Пароль">
          <b-input type="password" v-model="password" placeholder="123" />
        </b-form-group>

        <div class="text-center">
          <b-btn @click="login" variant="primary" block>Войти</b-btn>
        </div>
        </form>
      </b-card>
    </b-col>
  </b-row>
</div>
</template>

<style scoped>
.login-button {
  border: 0;
};
</style>

<script>
import busyOverlay from '~/components/busy-overlay'

export default {
  middleware: ['auth'],
  components: { busyOverlay },
  data() {
    return {
      username: '',
      password: '123',
      error: null
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    }
  },
  methods: {
    async login() {
      this.error = null
      try {
          const Рез = await this.$auth
              .loginWith('local', {
              data: {
                  username: this.username,
                  password: this.password
              }
        });
        console.log('await loginWith вернул:',Рез)
        return Рез;
      } catch (и) {
        if ("response" in и) {
          this.error = и.response.data+'';
        } else {
          this.error = и + ''
        }
      }
    }
  }
}
</script>
