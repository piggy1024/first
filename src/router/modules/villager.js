/** 村民管理模块 **/
import Layout from '@/layout'

const villager = {

  path: '/villager',
  component: Layout,
  redirect: '/villager/index',
  // alwaysShow: true, // will always show the root menu
  children: [{
    path: 'index',
    component: () => import('@/views/saas/villager/index'),
    name: 'villager',
    meta: {
      title: '村民管理',
      icon: 'user'
    }
  },
  {
    // 组件的路径 -- 拼接父组件的路径
    path: 'villagerDetail/:id',
    // 显示的组件
    component: () => import('@/views/saas/villager/villagerDetail'),
    hidden: true,
    name: 'villagerDetail',
    meta: {
      title: '村民详情'
    }
  },
  {
    path: 'villagerAdd/',
    component: () => import('@/views/saas/villager/villagerAdd'),
    hidden: true,
    name: 'villagerAdd',
    meta: {
      title: '新增村民'
    }
  },
  {
    path: 'villagerEdit/:id',
    component: () => import('@/views/saas/villager/villagerAdd'),
    hidden: true,
    name: 'villagerEdit',
    meta: {
      title: '编辑村民'
    }
  }
  ]

}

export default villager
