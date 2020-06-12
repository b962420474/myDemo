import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '@/views/main'
import setTime from '@/views/setTime'
import language from '@/views/language'
import date from '@/views/date'
import brightness from '@/views/brightness'
import setting from '@/views/setting'
import heating from '@/views/heating'
import defrost from '@/views/defrost'
import presets from '@/views/presets'
import microwave from '@/views/microwave'
import voice from '@/views/voice'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/setTime',
      name: 'setTime',
      component: setTime
    },
    {
      path: '/language',
      name: 'language',
      component: language
    },
    {
      path: '/date',
      name: 'date',
      component: date
    }
    ,
    {
      path: '/brightness',
      name: 'brightness',
      component: brightness
    }
    ,
    {
      path: '/setting',
      name: 'setting',
      component: setting
    }
    ,
    {
      path: '/heating/:id',
      name: 'heating',
      component: heating
    }
    ,
    {
      path: '/defrost/:id',
      name: 'defrost',
      component: defrost
    }
    ,
    {
      path: '/presets/:id',
      name: 'presets',
      component: presets
    }
    ,
    {
      path: '/microwave',
      name: 'microwave',
      component: microwave
    }
    ,
    {
      path: '/voice/:id',
      name: 'voice',
      component: voice
    }
  ]
})
