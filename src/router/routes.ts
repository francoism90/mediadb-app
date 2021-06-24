import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index.vue'),
        meta: { auth: true },
      },
    ],
  },
  {
    path: '/video',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: ':id/:slug?/:version?',
        name: 'video',
        component: () => import('pages/Video.vue'),
        props: true,
        meta: { auth: true },
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
        meta: { auth: true },
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
        meta: { auth: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
