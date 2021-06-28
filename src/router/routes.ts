import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Videos.vue'),
      },
    ],
  },
  {
    path: '/video',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: ':id/:slug?',
        name: 'video',
        component: () => import('pages/Video.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/tags',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'tags',
        component: () => import('pages/Tags.vue'),
      },
    ],
  },
  {
    path: '/settings',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('pages/Settings.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue'),
      },
    ],
  },
  {
    path: '/logout',
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'logout',
        component: () => import('pages/Logout.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
