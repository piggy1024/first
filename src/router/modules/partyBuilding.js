/** 党建模块 **/

import Layout from '@/layout'

const partyBuilding = {
  path: '/partyBuilding',
  alwaysShow: true,
  component: Layout,
  redirect: '/partyBuilding/index',
  name: 'PartyBuilding',
  meta: {
    title: '党建',
    icon: 'peoples'
  },
  children: [{
    path: 'partyBuilding/index',
    component: () => import('@/views/saas/partyBuilding/partyBuilding/index'),
    name: 'partyBuilding',
    meta: {
      title: '党建'
    }
  },
  {
    path: 'membersList/index',
    component: () => import('@/views/saas/partyBuilding/membersList/index'),
    name: 'Disability',
    meta: {
      title: '党员列表'
    }
  },
  {
    path: 'membersMeeting/index',
    component: () => import('@/views/saas/partyBuilding/membersMeeting/index'),
    name: 'membersMeeting',
    meta: {
      title: '党员大会'
    }
  },
  {
    path: 'partyBuilding/add',
    component: () => import('@/views/saas/partyBuilding/partyBuilding/add'),
    hidden: true,
    name: 'partyBuilding',
    meta: {
      title: '新增党建'
    }
  },
  {
    path: 'membersList/edit',
    component: () => import('@/views/saas/partyBuilding/membersList/edit'),
    hidden: true,
    name: 'membersList',
    meta: {
      title: '修改党员列表'
    }
  },
  {
    path: 'membersMeeting/add',
    component: () => import('@/views/saas/partyBuilding/membersMeeting/add'),
    hidden: true,
    name: 'membersMeeting',
    meta: {
      title: '新增党员大会'
    }
  }
  ]
}

export default partyBuilding
