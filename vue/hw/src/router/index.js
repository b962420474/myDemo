import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '@/views/main'
import healthy from '@/views/healthy'
import setting from '@/views/setting'
import defrost from '@/views/defrost'
import presets from '@/views/presets'
import pizza from '@/views/pizza'
import microwave from '@/views/microwave'
import defrostItem from '@/views/defrostItem'
import presetsItem from '@/views/presetsItem'
import microwaveItem from '@/views/microwaveItem'
import defrostOption from '@/views/defrostOption'
import healthyOption from '@/views/healthyOption'
import heatingItem from '@/views/heatingItem'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/healthy',
      name: 'healthy',
      component: healthy
    },
    ,
    {
      path: '/settings',
      name: 'settings',
      component: setting
    }
    ,
    {
      path: '/defrost',
      name: 'defrost',
      component: defrost
    }
    ,
    {
      path: '/presets',
      name: 'presets',
      component: presets
    }
    ,
    {
      path: '/pizza',
      name: 'pizza',
      component: pizza
    }
    ,
    {
      path: '/microwave',
      name: 'microwave',
      component: microwave
    }
    ,
    {
      path: '/defrostItem',
      name: 'defrostItem',
      component: defrostItem
    },
    {
      path: '/defrostOption',
      name: 'defrostOption',
      component: defrostOption
    }
    ,
    {
      path: '/presetsItem',
      name: 'presetsItem',
      component: presetsItem
    }
    ,
    {
      path: '/microwaveItem',
      name: 'microwaveItem',
      component: microwaveItem
    }
    ,
    {
      path: '/healthyOption',
      name: 'healthyOption',
      component: healthyOption
    }
    ,
    {
      path: '/heatingItem',
      name: 'heatingItem',
      component: heatingItem
    }
  ]
})
