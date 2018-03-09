<template>
  <div>
    <b-navbar toggleable="md" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Zя</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact>Home</b-nav-item>
          <b-nav-item to="/public">Public</b-nav-item>
          <b-nav-item to="/secure">Secure</b-nav-item>
          <b-nav-item to="/article-editor">Редактор статьи</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="$auth.state.loggedIn">
            <b-nav-item-dropdown :text="$auth.user.name" right>
              <b-dropdown-item @click="$auth.logout()">Выйти</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-dropdown-item to="/login">Войти</b-dropdown-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="mt-4">
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import dotProp from 'dotprop'

export default  {
  computed: {
    picture() {
      return  dotProp(this.$auth.user, 'picture') ||  // OpenID
              dotProp(this.$auth.user, 'picture.data.url') || // Facebook graph API
              dotProp(this.$auth.user, 'avatar_url') // Github
    }
  }

}
</script>
