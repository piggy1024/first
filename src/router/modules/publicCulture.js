/** 公共文化模块 **/
import Layout from '@/layout'

const publicCultureRouter = {

  path: '/publicCulture',
  component: Layout,
  name: 'publicCulture',
  meta: {
    title: '公共文化',
    icon: 'user'
  },
  redirect: '/publicCulture/index',
  alwaysShow: true, // will always show the root menu
  children: [{
    path: 'index',
    component: () => import('@/views/saas/publicCulture/index'),
    name: 'PublicCulture',
    meta: {
      title: '公共文化信息'
    }
  },
  {
    path: 'add',
    component: () => import('@/views/saas/publicCulture/add'),
    hidden: true,
    name: 'AddpublicCulture',
    meta: {
      title: '新增公共文化'
    }
  }

  ]

}

export default publicCultureRouter
