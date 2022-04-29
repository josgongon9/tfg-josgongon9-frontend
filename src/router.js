import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import TimeEntries from './views/TimeEntries.vue'
import LogTime from './views/LogTime.vue';
import Organizations from './views/OrganizationsList.vue';


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
    path: '/time-entries',
    component: TimeEntries
    },
    {
      path: '/time-entries/log-time',
      component: LogTime
    },
  
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/organizations',
      name: "organizations",
      component: Organizations
    },
    {
      path: "/organizations/add",
      name: "add-organization",
      component: () => import('./views/AddOrganization.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: "/vacations",
      name: "vacations",
      component: () => import('./views/VacationsList.vue')
    },
    {
      path: "/vacations/:id",
      name: "vacation-details",
      component: () => import('./views/Vacation.vue')
    },
    {
      path: "/add",
      name: "add",
      component: () => import('./views/AddVacation.vue')
    }
  ]
});
