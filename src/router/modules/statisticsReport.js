/** 统计报表模块 **/
import Layout from '@/layout'

const statisticsReportRouter = {

  path: '/statisticsReport',
  component: Layout,
  name: 'statisticsReport',
  meta: {
    title: '统计报表',
    icon: 'user'
  },
  redirect: '/statisticsReport/table',
  alwaysShow: true, // will always show the root menu
  children: [{
    path: 'table',
    component: () => import('@/views/saas/statisticsReport/table'),
    name: 'table',
    meta: {
      title: '统计报表'
    }
  },
  {
    path: 'manage',
    component: () => import('@/views/saas/statisticsReport/manage'),
    name: 'Manage',
    meta: {
      title: '管理驾驶舱'
    }
  }

  ]

}

export default statisticsReportRouter
