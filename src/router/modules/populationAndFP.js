/** 人口计生模块 **/

import Layout from '@/layout'

const router = {
  path: '/populationAndFP',
  alwaysShow: true,
  component: Layout,
  redirect: '/populationAndFP/deathPerson',
  name: 'populationAndFP',
  meta: {
    title: '人口计生',
    icon: 'peoples'
  },
  children: [
    {
      path: 'deathPerson',
      component: () => import('@/views/saas/populationAndFP/deathPerson/index'),
      name: 'deathPerson',
      meta: {
        title: '死亡人员'
      }
    },
    {
      path: 'newBorn',
      component: () => import('@/views/saas/populationAndFP/newBorn/index'),
      name: 'newBorn',
      meta: {
        title: '新生儿上户'
      }
    },
    {
      path: 'tempResidePerson',
      component: () => import('@/views/saas/populationAndFP/tempResidePerson/index'),
      name: 'tempResidePerson',
      meta: {
        title: '暂住人口'
      }
    },
    {
      path: 'tempResidePersonModify/:villagerId',
      hidden: true,
      component: () => import('@/views/saas/populationAndFP/tempResidePerson/modify'),
      name: 'tempResidePersonModify',
      meta: {
        title: '修改暂住人口'
      }
    },
    {
      path: 'goOutWork',
      component: () => import('@/views/saas/populationAndFP/goOutWork/index'),
      name: 'GoOutWork',
      meta: {
        title: '外出务工人员信息'
      }
    },
    {
      path: 'modifyGoOutWork/:villagerId',
      hidden: true,
      component: () => import('@/views/saas/populationAndFP/goOutWork/modify'),
      name: 'goOutWorkModify',
      meta: {
        title: '修改外出务工人员信息'
      }
    },
    {
      path: 'childbearingAgeWoman',
      component: () => import('@/views/saas/populationAndFP/childbearingAgeWoman/index'),
      name: 'childbearingAgeWoman',
      meta: {
        title: '已婚育龄妇女信息'
      }
    },
    {
      path: 'childbearingAgeWomanModify/:villagerId',
      hidden: true,
      component: () => import('@/views/saas/populationAndFP/childbearingAgeWoman/modify'),
      name: 'childbearingAgeWomanModify',
      meta: {
        title: '修改已婚育龄妇女信息'
      }
    }
  ]
}

export default router
