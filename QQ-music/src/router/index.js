import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend'
import top from '@/components/top'
import singer from '@/components/singer'
import search from '@/components/search'
import SingerDetail from '@/components/singer-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },

      {
        path: '/top',
        name: 'top',
        component: top
      },
      {
        path: '/singer',
        name: 'singer',
        component: singer,
        children: [
          {
            path: ':id',
            component: SingerDetail
          }
        ]
      },
      {
        path: '/search',
        name: 'search',
        component: search
      }
  ]
})