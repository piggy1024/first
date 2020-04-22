/** 综合信息模块 **/

import Layout from '@/layout'

const comprehensiveInfo = {
  path: '/comprehensiveInfo',
  alwaysShow: true,
  component: Layout,
  redirect: '/comprehensiveInfo/businessGuide',
  name: 'ComprehensiveInfo',
  meta: {
    title: '综合信息',
    icon: 'documentation'
  },
  children: [{
    path: 'businessGuide',
    component: () => import('@/views/saas/comprehensiveInfo/businessGuide/index'),
    name: 'BusinessGuide',
    meta: {
      title: '办事指南'
    }
  },
  {
    path: 'addBusinessGuide',
    component: () => import('@/views/saas/comprehensiveInfo/businessGuide/add'),
    name: 'AddBusinessGuide',
    hidden: true,
    meta: {
      title: '新增办事指南'
    }
  },
  {
    path: 'editBusinessGuide/:articleId',
    component: () => import('@/views/saas/comprehensiveInfo/businessGuide/add'),
    name: 'EditBusinessGuide',
    hidden: true,
    meta: {
      title: '新增办事指南'
    }
  },
  {
    path: 'intermediaryService',
    component: () => import('@/views/saas/comprehensiveInfo/intermediaryService/index'),
    name: 'IntermediaryService',
    meta: {
      title: '中介服务'
    }
  },
  {
    path: 'lawPopularization',
    component: () => import('@/views/saas/comprehensiveInfo/lawPopularization/index'),
    name: 'LawPopularization',
    meta: {
      title: '普法宣传'
    }
  },
  {
    path: 'villageCadre',
    component: () => import('@/views/saas/comprehensiveInfo/villageCadre/index'),
    name: 'VillageCadre',
    meta: {
      title: '干部通讯录'
    }
  },
  {
    path: 'addLawPopularization',
    component: () => import('@/views/saas/comprehensiveInfo/lawPopularization/add'),
    name: 'AddLawPopularization',
    hidden: true,
    meta: {
      title: '新增普法宣传'
    }
  },
  {
    path: 'editLawPopularization/:articleId',
    component: () => import('@/views/saas/comprehensiveInfo/lawPopularization/add'),
    name: 'EditLawPopularization',
    hidden: true,
    meta: {
      title: '编辑普法宣传'
    }
  },
  {
    path: 'village',
    component: () => import('@/views/saas/comprehensiveInfo/village/index'),
    name: 'VillageIntroduction',
    meta: {
      title: '村级介绍'
    }
  },
  {
    path: 'editVillage/:villageId',
    component: () => import('@/views/saas/comprehensiveInfo/village/edit'),
    name: 'EditVillage',
    hidden: true,
    meta: {
      title: '修改村级介绍'
    }
  },
  {
    path: 'detailVillage/:villageId',
    component: () => import('@/views/saas/comprehensiveInfo/village/detail'),
    name: 'DetailVillage',
    hidden: true,
    meta: {
      title: '村级介绍详情'
    }
  },
  {
    path: 'carouselPicture',
    component: () => import('@/views/saas/comprehensiveInfo/carouselPicture/index'),
    name: 'CarouselPicture',
    meta: {
      title: '上传轮播图'
    }
  },
  {
    path: 'templateDocument',
    component: () => import('@/views/saas/comprehensiveInfo/templateDocument/index'),
    name: 'TemplateDocument',
    meta: {
      title: '模板文件'
    }
  },
  {
    path: 'addTemplateDocument',
    component: () => import('@/views/saas/comprehensiveInfo/templateDocument/add'),
    name: 'AaddTemplateDocument',
    hidden: true,
    meta: {
      title: '新增模板文件'
    }
  },
  {
    path: 'editTemplateDocument/:templateDocumentId',
    component: () => import('@/views/saas/comprehensiveInfo/templateDocument/add'),
    name: 'EditTemplateDocument',
    hidden: true,
    meta: {
      title: '编辑模板文件'
    }
  }]
}

export default comprehensiveInfo
