/** 综合治理模块 **/

import Layout from '@/layout'

const comprehensiveControl = {
  path: '/comprehensiveControl',
  alwaysShow: true,
  component: Layout,
  redirect: '/comprehensiveControl/criminalRecordPerson',
  name: 'comprehensiveControl',
  meta: {
    title: '综合治理',
    icon: 'peoples'
  },
  children: [{
    path: 'criminalRecordPerson',
    component: () => import('@/views/saas/comprehensiveControl/criminalRecordPerson/index'),
    name: 'criminalRecordPerson',
    meta: {
      title: '前科人员'
    }
  },
  {
    path: 'criminalRecordPersonModify',
    hidden: true,
    component: () => import('@/views/saas/comprehensiveControl/criminalRecordPerson/modify'),
    name: 'criminalRecordPersonModify',
    meta: {
      title: '前科人员信息编辑'
    }
  },
  {
    path: 'psychotic',
    component: () => import('@/views/saas/comprehensiveControl/psychotic/index'),
    name: 'psychotic',
    meta: {
      title: '精神病人员'
    }
  },
  {
    path: 'drugAddict',
    component: () => import('@/views/saas/comprehensiveControl/drugAddict/index'),
    name: 'drugAddict',
    meta: {
      title: '涉毒人员'
    }
  },
  {
    path: 'mitaSbliPetitioners',
    component: () => import('@/views/saas/comprehensiveControl/mitaSbliPetitioners/index'),
    name: 'mitaSbliPetitioners',
    meta: {
      title: '涉维稳上访人员'
    }
  },
  {
    path: 'darsGoodsPractitioners',
    component: () => import('@/views/saas/comprehensiveControl/darsGoodsPractitioners/index'),
    name: 'darsGoodsPractitioners',
    meta: {
      title: '危险品从业人员'
    }
  },
  {
    path: 'correctionObject',
    component: () => import('@/views/saas/comprehensiveControl/correctionObject/index'),
    name: 'correctionObject',
    meta: {
      title: '矫正对象人员'
    }
  },
  {
    path: 'falungong',
    component: () => import('@/views/saas/comprehensiveControl/falungong/index'),
    name: 'falungong',
    meta: {
      title: '法轮功人员'
    }
  },
  {
    path: 'criminalTeenagers',
    component: () => import('@/views/saas/comprehensiveControl/criminalTeenagers/index'),
    name: 'criminalTeenagers',
    meta: {
      title: '犯罪青少年'
    }
  },
  {
    path: 'cultPerson',
    component: () => import('@/views/saas/comprehensiveControl/cultPerson/index'),
    name: 'CultPerson',
    meta: {
      title: '邪教人员'
    }
  },
  {
    path: 'template',
    component: () => import('@/views/saas/comprehensiveControl/template'),
    name: 'Template',
    meta: {
      title: '综合治理模板文件'
    }
  }
  ]
}

export default comprehensiveControl
