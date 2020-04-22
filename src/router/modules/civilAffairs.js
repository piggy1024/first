/** 民政模块 **/

import Layout from '@/layout'

const civilAffairs = {
  path: '/civilAffairs',
  alwaysShow: true,
  component: Layout,
  redirect: '/civilAffairs/civilAffairsInfo',
  name: 'civilAffairs',
  meta: {
    title: '民政',
    icon: 'peoples'
  },
  children: [
    {
      path: 'civilAffairsInfo',
      component: () => import('@/views/saas/civilAffairs/civilAffairsInfo/index'),
      name: 'civilAffairsInfo',
      meta: {
        title: '民政信息汇总'
      }
    },
    {
      path: 'civilAffairsEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/civilAffairsInfo/edit'),
      name: 'civilAffairsEdit',
      meta: {
        title: '民政信息编辑'
      }
    },
    {
      path: 'disabilityPerson',
      component: () => import('@/views/saas/civilAffairs/disabilityPerson/index'),
      name: 'disabilityPerson',
      meta: {
        title: '残疾人员'
      }
    },
    {
      path: 'disabilityPersonEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/disabilityPerson/edit'),
      name: 'disabilityPersonEdit',
      meta: {
        title: '残疾人员编辑'
      }
    },
    {
      path: 'preferentialCareObject',
      component: () => import('@/views/saas/civilAffairs/preferentialCareObject/index'),
      name: 'preferentialCareObject',
      meta: {
        title: '优抚对象'
      }
    },
    {
      path: 'preferentialCareObjectEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/preferentialCareObject/edit'),
      name: 'preferentialCareObjectEdit',
      meta: {
        title: '优抚对象编辑'
      }
    },
    {
      path: 'elderly',
      component: () => import('@/views/saas/civilAffairs/elderly/index'),
      name: 'elderly',
      meta: {
        title: '高龄老年人'
      }
    },
    {
      path: 'elderlyEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/elderly/edit'),
      name: 'elderlyEdit',
      meta: {
        title: '高龄老年人编辑'
      }
    },
    {
      path: 'lowInsureHukou',
      component: () => import('@/views/saas/civilAffairs/lowInsureHukou/index'),
      name: 'lowInsureHukou',
      meta: {
        title: '低保户'
      }
    },
    {
      path: 'lowInsureHukouEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/lowInsureHukou/edit'),
      name: 'lowInsureHukou',
      meta: {
        title: '低保户编辑'
      }
    },
    {
      path: 'fiveInsureHukou',
      component: () => import('@/views/saas/civilAffairs/fiveInsureHukou/index'),
      name: 'fiveInsureHukou',
      meta: {
        title: '五保户'
      }
    },
    {
      path: 'fiveInsureHukouEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/fiveInsureHukou/edit'),
      name: 'fiveInsureHukouEdit',
      meta: {
        title: '五保户编辑'
      }
    },
    {
      path: 'retrenchObject',
      component: () => import('@/views/saas/civilAffairs/retrenchObject/index'),
      name: 'retrenchObject',
      meta: {
        title: '精简对象'
      }
    },
    {
      path: 'retrenchObjectEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/retrenchObject/edit'),
      name: 'retrenchObjectEdit',
      meta: {
        title: '精简对象编辑'
      }
    },
    {
      path: 'tempSuccourObject',
      component: () => import('@/views/saas/civilAffairs/tempSuccourObject/index'),
      name: 'tempSuccourObject',
      meta: {
        title: '临时救助'
      }
    },
    {
      path: 'tempSuccourObjectEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/tempSuccourObject/edit'),
      name: 'tempSuccourObjectEdit',
      meta: {
        title: '临时救助编辑'
      }
    },
    {
      path: 'leftBehindChildren',
      component: () => import('@/views/saas/civilAffairs/leftBehindChildren/index'),
      name: 'leftBehindChildren',
      meta: {
        title: '留守儿童'
      }
    },
    {
      path: 'leftBehindChildrenEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/leftBehindChildren/edit'),
      name: 'leftBehindChildrenEdit',
      meta: {
        title: '留守儿童编辑'
      }
    },
    {
      path: 'distressHukou',
      component: () => import('@/views/saas/civilAffairs/distressHukou/index'),
      name: 'distressHukou',
      meta: {
        title: '贫困户'
      }
    },
    {
      path: 'distressHukouEdit',
      hidden: true,
      component: () => import('@/views/saas/civilAffairs/distressHukou/edit'),
      name: 'distressHukouEdit',
      meta: {
        title: '贫困户'
      }
    }
  // {
  //   path: 'disability/editDisability',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/disability/editDisability'),
  //   name: 'EditDisability',
  //   meta: {
  //     title: '残疾人信息编辑'
  //   }
  // },
  // {
  //   path: 'disability/infoUpload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/disability/infoUpload'),
  //   name: 'InfoUpload',
  //   meta: {
  //     title: '残疾人员资料上传'
  //   }
  // },
  // {
  //   path: 'disability/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/disability/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '残疾人员补贴发放'
  //   }
  // },
  // {
  //   path: 'disability/infoPrint',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/disability/infoPrint'),
  //   name: 'InfoPrint',
  //   meta: {
  //     title: '残疾人员信息打印'
  //   }
  // },
  // {
  //   path: 'disability/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/disability/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '残疾人员信息导出'
  //   }
  // },
  // {
  //   path: 'firstToHelp/edit',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/firstToHelp/edit'),
  //   name: 'Edit',
  //   meta: {
  //     title: '优扶对象信息编辑'
  //   }
  // },
  // {
  //   path: 'firstToHelp/upload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/firstToHelp/upload'),
  //   name: 'Upload',
  //   meta: {
  //     title: '优扶对象信息上传'
  //   }
  // },
  // {
  //   path: 'firstToHelp/print',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/firstToHelp/print'),
  //   name: 'Print',
  //   meta: {
  //     title: '优扶对象信息打印'
  //   }
  // },
  // {
  //   path: 'firstToHelp/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/firstToHelp/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '优扶对象补贴发放'
  //   }
  // },
  // {
  //   path: 'firstToHelp/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/firstToHelp/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '优扶对象信息导出'
  //   }
  // },
  // {
  //   path: 'seniorCitizens/edit',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/seniorCitizens/edit'),
  //   name: 'LowIncome',
  //   meta: {
  //     title: '高龄老年人信息编辑'
  //   }
  // }, {
  //   path: 'seniorCitizens/upload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/seniorCitizens/upload'),
  //   name: 'InfoUpload',
  //   meta: {
  //     title: '高龄老年人资料上传'
  //   }
  // }, {
  //   path: 'seniorCitizens/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/seniorCitizens/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '高龄老年人补贴发放'
  //   }
  // }, {
  //   path: 'seniorCitizens/print',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/seniorCitizens/print'),
  //   name: 'InfoPrint',
  //   meta: {
  //     title: '高龄老年人信息打印'
  //   }
  // },
  // {
  //   path: 'seniorCitizens/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/seniorCitizens/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '高龄老年人信息导出'
  //   }
  // },
  // {
  //   path: 'lowIncome/edit',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/lowIncome/edit'),
  //   name: 'LowIncome',
  //   meta: {
  //     title: '低保户信息编辑'
  //   }
  // },
  // {
  //   path: 'lowIncome/upload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/lowIncome/upload'),
  //   name: 'InfoUpload',
  //   meta: {
  //     title: '低保户资料上传'
  //   }
  // }, {
  //   path: 'lowIncome/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/lowIncome/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '低保户补贴发放'
  //   }
  // },
  // {
  //   path: 'lowIncome/print',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/lowIncome/print'),
  //   name: 'InfoPrint',
  //   meta: {
  //     title: '低保户信息打印'
  //   }
  // },
  // {
  //   path: 'lowIncome/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/lowIncome/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '低保户信息导出'
  //   }
  // },
  // {
  //   path: 'five/edit',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/five/edit'),
  //   name: 'LowIncome',
  //   meta: {
  //     title: '五保户信息编辑'
  //   }
  // }, {
  //   path: 'five/upload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/five/upload'),
  //   name: 'InfoUpload',
  //   meta: {
  //     title: '五保户资料上传'
  //   }
  // }, {
  //   path: 'five/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/five/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '五保户补贴发放'
  //   }
  // }, {
  //   path: 'five/print',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/five/print'),
  //   name: 'InfoPrint',
  //   meta: {
  //     title: '五保户信息打印'
  //   }
  // }, {
  //   path: 'five/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/five/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '五保户信息导出'
  //   }
  // }, {
  //   path: 'streamlinedObject/edit',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/streamlinedObject/edit'),
  //   name: 'LowIncome',
  //   meta: {
  //     title: '精简对象信息编辑'
  //   }
  // }, {
  //   path: 'streamlinedObject/upload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/streamlinedObject/upload'),
  //   name: 'InfoUpload',
  //   meta: {
  //     title: '精简对象资料上传'
  //   }
  // }, {
  //   path: 'streamlinedObject/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/streamlinedObject/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '精简对象补贴发放'
  //   }
  // }, {
  //   path: 'streamlinedObject/print',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/streamlinedObject/print'),
  //   name: 'InfoPrint',
  //   meta: {
  //     title: '精简对象信息打印'
  //   }
  // }, {
  //   path: 'streamlinedObject/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/streamlinedObject/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '精简对象信息导出'
  //   }
  // },
  // {
  //   path: 'temAssistance/edit',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/temAssistance/edit'),
  //   name: 'LowIncome',
  //   meta: {
  //     title: '临时救助信息编辑'
  //   }
  // }, {
  //   path: 'temAssistance/upload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/temAssistance/upload'),
  //   name: 'InfoUpload',
  //   meta: {
  //     title: '临时救助资料上传'
  //   }
  // }, {
  //   path: 'temAssistance/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/temAssistance/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '临时救助补贴发放'
  //   }
  // }, {
  //   path: 'temAssistance/print',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/temAssistance/print'),
  //   name: 'InfoPrint',
  //   meta: {
  //     title: '临时救助信息打印'
  //   }
  // }, {
  //   path: 'temAssistance/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/temAssistance/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '临时救助信息导出'
  //   }
  // },
  // {
  //   path: 'stayhomeKid/edit',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/stayhomeKid/edit'),
  //   name: 'LowIncome',
  //   meta: {
  //     title: '留守儿童信息编辑'
  //   }
  // }, {
  //   path: 'stayhomeKid/upload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/stayhomeKid/upload'),
  //   name: 'InfoUpload',
  //   meta: {
  //     title: '留守儿童资料上传'
  //   }
  // }, {
  //   path: 'stayhomeKid/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/stayhomeKid/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '留守儿童补贴发放'
  //   }
  // }, {
  //   path: 'stayhomeKid/print',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/stayhomeKid/print'),
  //   name: 'InfoPrint',
  //   meta: {
  //     title: '留守儿童信息打印'
  //   }
  // }, {
  //   path: 'stayhomeKid/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/stayhomeKid/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '留守儿童信息导出'
  //   }
  // },
  // {
  //   path: 'poorFamily/edit',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/poorFamily/edit'),
  //   name: 'LowIncome',
  //   meta: {
  //     title: '贫困户信息编辑'
  //   }
  // }, {
  //   path: 'poorFamily/upload',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/poorFamily/upload'),
  //   name: 'InfoUpload',
  //   meta: {
  //     title: '贫困户资料上传'
  //   }
  // }, {
  //   path: 'poorFamily/allowance',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/poorFamily/allowance'),
  //   name: 'Allowance',
  //   meta: {
  //     title: '贫困户补贴发放'
  //   }
  // }, {
  //   path: 'poorFamily/print',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/poorFamily/print'),
  //   name: 'InfoPrint',
  //   meta: {
  //     title: '贫困户信息打印'
  //   }
  // }, {
  //   path: 'poorFamily/export',
  //   hidden: true,
  //   component: () => import('@/views/saas/civilAffairs/poorFamily/export'),
  //   name: 'Export',
  //   meta: {
  //     title: '贫困户信息导出'
  //   }
  // }
  ]
}

export default civilAffairs
