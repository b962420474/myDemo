import swiperSlide from "../swiper/src/slider.vue"
swiperSlide.install=function(Vue){
    Vue.component(swiperSlide.name,swiperSlide)
}
export default swiperSlide;