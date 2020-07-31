<template>
  <div class="hello">
    <h1>Emoji-tweet</h1>
    <div>{{ emoji.replace_colons(input_text) }}</div><br>
    <textarea style="width: 400px; height: 150px" v-model="input_text" placeholder="ここに入力"></textarea><br>
    <input type="button" value="つぶやく" @click="tweet()">
  </div>
</template>

<script>
import Emojijs from 'emoji-js'

var emoji = new Emojijs.EmojiConvertor();
console.log(emoji.replace_colons(':tada:表示できた:tada:'))
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      input_text: '',
      emoji
    }
  },
  methods: {
    tweet: function(){
      const content = {
        text: this.emoji.replace_colons(this.input_text)
      };
      for (let key in content) {
        content[key] = encodeURIComponent(content[key]);
      }
      const tweet_text = `https://twitter.com/intent/tweet?text=${content.text}`;
      window.open(tweet_text);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
