import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
 
// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  'eng': require('../static/i18n/eng.js'),    // 英文语言包
  'deu': require('../static/i18n/deu.js'),
  'fra': require('../static/i18n/fra.js'),
  'pol': require('../static/i18n/pol.js'),
  'por': require('../static/i18n/por.js'),
  'rum': require('../static/i18n/rum.js'),
  'rus': require('../static/i18n/rus.js'),
  'spa': require('../static/i18n/spa.js'),
  'tur': require('../static/i18n/tur.js'),
}
export const language=localStorage.language?localStorage.language:'eng';
// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale : language, // set locale 默认显示英文
  messages : messages // set locale messages
})