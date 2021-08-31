// import Representation from 'components/Representation'
// import Outcome from 'components/Outcome'
// import Agent from 'components/Agent'
// import CreateObject from 'components/action/CreateObject'
// import ProveObject from 'components/action/ProveObject'
// import BaseObject from 'components/BaseObject'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':catchAll(.*)', component: () => import('pages/Index.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
