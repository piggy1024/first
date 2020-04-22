/** 医社保模块 **/

import Layout from '@/layout'

const medicalSocialSecurity = {
  path: '/medicalSocialSecurity',
  alwaysShow: true,
  component: Layout,
  redirect: '/medicalSocialSecurity/index',
  name: 'MedicalSocialSecurity',
  meta: {
    title: '医社保',
    icon: 'peoples'
  },
  children: [{
    path: 'medicalSecurity',
    component: () => import('@/views/saas/medicalSocialSecurity/medicalSecurity'),
    name: 'MedicalSecurity',
    meta: {
      title: '医保'
    }
  },
  {
    path: 'socialSecurity',
    component: () => import('@/views/saas/medicalSocialSecurity/socialSecurity'),
    name: 'socialSecurity',
    meta: {
      title: '社保'
    }
  },
  {
    path: 'oldPension',
    component: () => import('@/views/saas/medicalSocialSecurity/oldPension'),
    name: 'oldPension',
    meta: {
      title: '养老金'
    }
  },
  {
    path: 'addMedicalSecurity',
    component: () => import('@/views/saas/medicalSocialSecurity/addMedicalSecurity'),
    hidden: true,
    name: 'addMedicalSecurity',
    meta: {
      title: '新增医保'
    }
  },
  {
    path: 'addSocialSecurity',
    component: () => import('@/views/saas/medicalSocialSecurity/addSocialSecurity'),
    hidden: true,
    name: 'addSocialSecurity',
    meta: {
      title: '新增社保'
    }
  },
  {
    path: 'addOldPension',
    component: () => import('@/views/saas/medicalSocialSecurity/addOldPension'),
    hidden: true,
    name: 'addOldPension',
    meta: {
      title: '新增养老金'
    }
  }
  ]
}

export default medicalSocialSecurity
