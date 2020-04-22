/** 综合信息模块 **/

import Layout from '@/layout'

const generalInfo = {
  path: '/generalInfo',
  alwaysShow: true,
  component: Layout,
  redirect: '/generalInfo/guide',
  name: 'GeneralInfo',
  meta: {
    title: '综合信息',
    icon: 'documentation'
  },
  children: [{
    path: 'guide',
    component: () => import('@/views/generalInfo/guide'),
    name: 'Guide',
    meta: {
      title: '办事指南'
    }
  },
  {
    path: 'service',
    component: () => import('@/views/generalInfo/service'),
    name: 'Service',
    meta: {
      title: '中介服务'
    }
  },
  {
    path: 'lawPopularization',
    component: () => import('@/views/generalInfo/lawPopularization'),
    name: 'LawPopularization',
    meta: {
      title: '普法宣传'
    }
  },
  {
    path: 'addressBook',
    component: () => import('@/views/generalInfo/addressBook'),
    name: 'AddressBook',
    meta: {
      title: '干部通讯录'
    }
  },
  {
    path: 'villageIntroduction',
    component: () => import('@/views/generalInfo/villageIntroduction'),
    name: 'VillageIntroduction',
    meta: {
      title: '村级介绍'
    }
  }, {
    path: 'uploadPic',
    component: () => import('@/views/generalInfo/uploadPic'),
    name: 'UploadPic',
    meta: {
      title: '上传轮播图'
    }
  },
  {
    path: 'templateFile',
    component: () => import('@/views/generalInfo/templateFile'),
    name: 'TemplateFile',
    meta: {
      title: '模板文件'
    }
  },
  {
    path: 'addGuide',
    component: () => import('@/views/generalInfo/addGuide'),
    name: 'AddGuide',
    hidden: true,
    meta: {
      title: '新增办事指南'
    }
  },
  {
    path: 'addLaw',
    component: () => import('@/views/generalInfo/addLaw'),
    name: 'AddLaw',
    hidden: true,
    meta: {
      title: '新增普法宣传'
    }
  },
  {
    path: 'addIntroduce',
    component: () => import('@/views/generalInfo/addIntroduce'),
    name: 'AddIntroduce',
    hidden: true,
    meta: {
      title: '新增村级介绍'
    }
  },
  {
    path: 'addTemplate',
    component: () => import('@/views/generalInfo/addTemplate'),
    name: 'AddTemplate',
    hidden: true,
    meta: {
      title: '新增模板文件'
    }
  },
  {
    path: 'editTemplate',
    component: () => import('@/views/generalInfo/editTemplate'),
    name: 'EditTemplate',
    hidden: true,
    meta: {
      title: '新增模板文件'
    }
  },
  {
    path: 'xiangqing',
    component: () => import('@/views/generalInfo/xiangqing'),
    name: 'xiangqing',
    hidden: true,
    meta: {
      title: '详情'
    }
  }
  ]
}

export default generalInfo
