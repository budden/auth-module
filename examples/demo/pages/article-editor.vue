<template>
  <no-ssr>
    <div>
      <button @click="$auth.logout()">Выйти</button>
      Код: {{английское_слово.код}}
      <textarea v-model="английское_слово.перевод"/><br>
      <button @click="записать_в_бд()">Записать в БД</button>
    </div>
  </no-ssr>
</template>

<script>
import axios from 'axios';
import утил from 'util';
export default {
  middleware: ['auth'],
  data() { 
      return { английское_слово: 
                { код: 'код не загружен', слово: 'слово не загружено', перевод: 'перевод не загружен'}, 
                  Сохранено: true} },
  async asyncData () {
    const { data : запись_из_базы} = await axios.get(encodeURI('http://127.0.0.1:8082/дай-статью'));
    console.log("Получили статью: ",запись_из_базы)
    return { английское_слово : запись_из_базы };
  },
  head: {
    title: "Редактор словарной статьи"
  },
  computed: {
    state() {
      return JSON.stringify(this.$auth.state, undefined, 2)
    }
  },
  methods: {
      async записать_в_бд() { 
          try {
            // alert(утил.format('вызвано "Записать" для данных: %s', this.английское_слово.перевод));
            console.log(this.$auth.getToken("local"));
            const Успех = await axios.put(encodeURI('/api/auth/savearticle'
            //'http://127.0.0.1:8082/api/auth/запиши-одно-слово'
            ),this.английское_слово, { headers: { Authorization: this.$auth.getToken("local")}});
            this.Сохранено = true;
          } catch (и) {
              console.error(и);
              throw и;
          }
      }
  }
}
</script>
