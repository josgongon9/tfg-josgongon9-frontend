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
    name: "timeEntries",
    component: TimeEntries
    },
    {
      path: '/time-entries/log-time',
      name: "addTimeEntries",
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
      path: "/organizations/:id",
      name: "organizations-details",
      component: () => import('./views/Organization.vue')
    },
    {
      path: "/organizations/add",
      name: "add-organization",
      component: () => import('./views/AddOrganization.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: "/user/:id",
      name: "viewUser",
      component: () => import('./views/ViewUser.vue')
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
    },
    {
      path: "/alerts",
      name: "alerts",
      component: () => import('./views/AlertsList.vue')
    },
    {
      path: "/add-alert",
      name: "add-alert",
      component: () => import('./views/AddAlert.vue')
    }
  ]
});
