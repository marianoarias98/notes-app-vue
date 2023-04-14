import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Dashboard from '../views/DashboardView.vue'
import Register from '../views/RegisterView.vue'
import useAuth from '../stores/auth'
import CreateNote from '../views/CreateNoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta:{
        requireAuth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requireAuth: false
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateNote,
      meta:{
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next)=>{
  const token = useAuth()
  const auth = token.token != null
  const needAuth = to.meta.requireAuth

  if(needAuth && !auth){
    next('/')   
    alert('Unauthorized')
  }else{
    next()
  }
})

export default router
