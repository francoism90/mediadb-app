import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('components/App/Layout/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('components/App/Views/Videos/VideoOverview.vue'),
      },
      {
        path: 'video/:id/:slug?',
        name: 'video',
        component: () => import('components/App/Views/Video/VideoItem.vue'),
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('components/App/Views/Tags/TagOverview.vue'),
      },
      {
        path: 'settings',
        name: 'tags',
        component: () => import('components/App/Views/UserSettings/SettingsForm.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('components/Auth/Layout/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('components/Auth/UserLogout/LoginForm.vue'),
      },
    ],
  },
  {
    path: '/logout',
    component: () => import('components/Auth/Layout/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'logout',
        component: () => import('components/Auth/UserLogout/LogoutForm.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('components/GeneralViews/NotFound.vue'),
  },
];

export default routes;
