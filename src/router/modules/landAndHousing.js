/** 国土住建模块 **/

import Layout from '@/layout'

const landAndHousing = {
  path: '/landAndHousing',
  alwaysShow: true,
  component: Layout,
  redirect: '/landAndHousing/house',
  name: 'LandAndHousing',
  meta: {
    title: '国土住建',
    icon: 'chart'
  },
  children: [
    {
      path: 'house',
      component: () => import('@/views/saas/landAndHousing/house/index'),
      name: 'house',
      meta: { title: '房屋信息' }
    },
    {
      path: 'houseAdd',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/house/add'),
      name: 'houseAdd',
      meta: { title: '新增房屋信息' }
    },
    {
      path: 'houseModify/:id',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/house/add'),
      name: 'houseModify',
      meta: { title: '修改房屋信息' }
    },
    {
      path: 'houseDetail/:id',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/house/add'),
      name: 'houseDetail',
      meta: { title: '房屋信息详情' }
    },
    {
      path: 'resource',
      component: () => import('@/views/saas/landAndHousing/resource/index'),
      name: 'resource',
      meta: { title: '土地资源' }
    },
    {
      path: 'resourceAdd',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/resource/add'),
      name: 'resourceAdd',
      meta: { title: '新增土地资源' }
    },
    {
      path: 'resourceModify/:id',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/resource/add'),
      name: 'resourceModify',
      meta: { title: '修改土地资源' }
    },
    {
      path: 'resourceDetail/:id',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/resource/add'),
      name: 'resourceDetail',
      meta: { title: '土地资源详情' }
    },
    {
      path: 'landContract',
      component: () => import('@/views/saas/landAndHousing/landContract/index'),
      name: 'LandContract',
      meta: { title: '土地承包经营' }
    },
    {
      path: 'landContractAdd',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/landContract/add'),
      name: 'landContractAdd',
      meta: { title: '新增承包经营' }
    },
    {
      path: 'landContractModify/:id',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/landContract/add'),
      name: 'landContractModify',
      meta: { title: '修改承包经营' }
    },
    {
      path: 'landContractDetail/:id',
      hidden: true,
      component: () => import('@/views/saas/landAndHousing/landContract/add'),
      name: 'landContractDetail',
      meta: { title: '承包经营详情' }
    }
  ]
}

export default landAndHousing
