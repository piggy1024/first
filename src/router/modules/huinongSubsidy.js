/** 惠农补贴模块 **/

import Layout from '@/layout'

const huinongSubsidyRouter = {
  path: '/huinongSubsidy',
  alwaysShow: true,
  component: Layout,
  redirect: '/huinongSubsidy/issueSummary',
  name: 'HuinongSubsidy',
  meta: {
    title: '惠农补贴',
    icon: 'peoples'
  },
  children: [{
    path: 'issueSummary',
    component: () => import('@/views/saas/huinongSubsidy/issueSummary'),
    name: 'IssueSummary',
    meta: {
      title: '发放汇总'
    }
  },
  {
    path: 'subsidyDetail',
    component: () => import('@/views/saas/huinongSubsidy/subsidyDetail'),
    name: 'SubsidyDetail',
    meta: {
      title: '补贴明细'
    }
  },
  {
    path: 'addSubsidyDetail',
    hidden: true,
    component: () => import('@/views/saas/huinongSubsidy/addSubsidyDetail'),
    name: 'AddSubsidyDetail',
    meta: {
      title: '新增补贴明细'
    }
  },
  {
    path: 'subsidyPublicPic',
    component: () => import('@/views/saas/huinongSubsidy/subsidyPublicPic'),
    name: 'SubsidyPublicPic',
    meta: {
      title: '补贴公示照片'
    }
  },
  {
    path: 'addSubsidyPubliPic',
    hidden: true,
    component: () => import('@/views/saas/huinongSubsidy/addSubsidyPubliPic'),
    name: 'AddSubsidyPubliPic',
    meta: {
      title: '新增补贴公示照片'
    }
  }
  ]
}

export default huinongSubsidyRouter
