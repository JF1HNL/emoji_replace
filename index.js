const objectToMap = object =>
  new Map(Object.entries(object))
const localStorageData = localStorage.getItem('tweetdeck_emoji-emojiStore')
const emojiStore = localStorageData ? objectToMap(JSON.parse(localStorageData)) : new Map()
let Field = new Vue({
  el: '#app',
  computed: {
    emoji_replace_display : function(){
      let emoji_replace = this.emoji_replace;
      if(emoji_replace === ""){
        return "ツイート内容"
      }
      return emoji_replace.split("\n").map(x => `<div>${x}</div>`).join("")
    }
  },
  watch: {
    input_text: function(){
      this.emoji_replace = this.input_text
      val = this.input_text.split(":")
      for(i in val){
        if(i % 2){
          if(i == (val.length - 1)){
            val[i] = `:${val[i]}`
            continue;
          }
          code = val[i].split(':').join('')
          if (code != '') {
            const mapToObject = map =>
              [...map].reduce((l,[k,v]) => Object.assign(l, {[k]:v}), {})
            const emojiSet = (code, moji) => this.emoji_replace = this.emoji_replace.replace(':' + code + ':', moji)
            if (this.emojiStore.has(code)) {
              emojiSet(code, this.emojiStore.get(code))
              continue
            }
            fetch('https://www.emojidex.com/api/v1/emoji/' + code)
              .then(async response => {
                if (response.ok) {
                  const data = await response.json()
                  this.emojiStore.set(code, data.moji)
                  localStorage.setItem('tweetdeck_emoji-emojiStore',　JSON.stringify(mapToObject(this.emojiStore)))
                  console.log(data.moji)
                  emojiSet(code, data.moji)
                }
              })
          }
        }
      }
    }
  },
  data: {
    emoji_replace: '',
    input_text: '',
    emojiStore
  },
  methods: {
    tweet: function(){
      const content = {
        text: this.emoji_replace
      };
      for (let key in content) {
        content[key] = encodeURIComponent(content[key]);
      }
      const tweet_text = `https://twitter.com/intent/tweet?text=${content.text}`;
      window.open(tweet_text);
    },
    copy : function(){
      navigator.clipboard.writeText(this.emoji_replace);
    }
  }
})