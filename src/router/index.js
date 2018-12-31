import Vue from 'vue'
import Router from 'vue-router'
import EmotionsDashboard from '@/components/EmotionsDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EmotionsDashboard',
      component: EmotionsDashboard
    }
  ]
})
