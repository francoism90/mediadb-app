import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('src/pages/VideoOverview.vue'),
      },
      {
        path: 'video/:id/:slug?',
        name: 'video',
        component: () => import('src/pages/VideoDetails.vue'),
        props: true,
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('src/pages/TagsOverview.vue'),
      },
      {
        path: '',
        name: 'settings',
        component: () => import('src/pages/UserSettings.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('src/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('src/pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/logout',
    component: () => import('src/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'logout',
        component: () => import('src/pages/UserLogout.vue'),
      },
    ],
  },
  {
    path: '/421',
    name: '421',
    component: () => import('pages/RateLimited.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: '404',
    component: () => import('pages/NotFound.vue'),
  },
];

export default routes;
