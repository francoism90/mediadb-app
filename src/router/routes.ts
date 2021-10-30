import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('components/app/videos/VideoLibrary.vue'),
      },
      {
        path: 'video/:id/:slug?',
        name: 'video',
        component: () => import('components/app/video/VideoItem.vue'),
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('components/app/tags/TagOverview.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('components/app/user/SettingsForm.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('components/auth/login/LoginForm.vue'),
      },
    ],
  },
  {
    path: '/logout',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'logout',
        component: () => import('components/auth/logout/LogoutForm.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFound.vue'),
  },
];

export default routes;
