/** 工程项目模块 **/

import Layout from '@/layout'

const router = {
  path: '/engineeringProject',
  alwaysShow: true,
  component: Layout,
  redirect: '/engineeringProject/projectList',
  name: 'EngineeringProject',
  meta: {
    title: '工程项目',
    icon: 'chart'
  },
  children: [
    {
      path: 'projectList',
      component: () => import('@/views/saas/engineeringProject/projectList/index'),
      name: 'ProjectList',
      meta: {
        title: '项目列表'
      }
    },
    {
      path: 'detailProjectList',
      hidden: true,
      component: () => import('@/views/saas/engineeringProject/projectList/detail'),
      name: 'DetailProjectList',
      meta: {
        title: '工程项目详情'
      }
    },
    {
      path: 'projectDeclare',
      component: () => import('@/views/saas/engineeringProject/projectDeclare/index'),
      name: 'ProjectDeclare',
      meta: {
        title: '项目申报'
      }
    },
    {
      path: 'addProjectDeclare',
      hidden: true,
      component: () => import('@/views/saas/engineeringProject/projectDeclare/add'),
      name: 'AddProjectDeclare',
      meta: {
        title: '新增项目申报'
      }
    },
    {
      path: 'detailProjectDeclare',
      hidden: true,
      component: () => import('@/views/saas/engineeringProject/projectDeclare/detail'),
      name: 'DetailProjectDeclare',
      meta: {
        title: '项目申报详情'
      }
    },
    {
      path: 'projectAcceptance',
      component: () => import('@/views/saas/engineeringProject/projectAcceptance/index'),
      name: 'ProjectAcceptance',
      meta: {
        title: '项目验收'
      }
    },
    {
      path: 'addProjectAcceptance',
      hidden: true,
      component: () => import('@/views/saas/engineeringProject/projectAcceptance/add'),
      name: 'AddProjectAcceptance',
      meta: {
        title: '新增项目验收'
      }
    },
    {
      path: 'detailProjectAcceptance',
      hidden: true,
      component: () => import('@/views/saas/engineeringProject/projectAcceptance/detail'),
      name: 'detailProjectAcceptance',
      meta: {
        title: '项目验收详情'
      }
    },
    {
      path: 'settlementDeclare',
      component: () => import('@/views/saas/engineeringProject/settlementDeclare/index'),
      name: 'SettlementDeclare',
      meta: {
        title: '结算申报'
      }
    },
    {
      path: 'addSettlementDeclare',
      hidden: true,
      component: () => import('@/views/saas/engineeringProject/settlementDeclare/add'),
      name: 'AddSettlementDeclare',
      meta: {
        title: '新增结算申报'
      }
    },
    {
      path: 'detailSettlementDeclare',
      hidden: true,
      component: () => import('@/views/saas/engineeringProject/settlementDeclare/detail'),
      name: 'DetailSettlementDeclare',
      meta: {
        title: '结算申报详情'
      }
    }
  ]
}

export default router
