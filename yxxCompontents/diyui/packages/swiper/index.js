import swiper from "./src/swiper.vue"
swiper.install=function(Vue){
    Vue.component(swiper.name,swiper)
}
export default swiper;