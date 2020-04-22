/** 村务公开模块 **/

import Layout from '@/layout'

const router = {
  path: '/villageAffairsOpen',
  alwaysShow: true,
  component: Layout,
  redirect: '/villageAffairsOpen/leaveMsg',
  name: 'VillageAffairsOpen',
  meta: {
    title: '村务公开',
    icon: 'user'
  },
  children: [
    {
      path: 'leaveMsg',
      component: () => import('@/views/saas/villageAffairsOpen/leaveMsg/index'),
      name: 'leaveMsg',
      meta: {
        title: '村民留言'
      }
    },
    {
      path: 'leaveMsgReply/:leaveMsgId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/leaveMsg/reply'),
      name: 'leaveMsgReply',
      meta: {
        title: '回复村民留言'
      }
    },
    {
      path: 'leaveMsgModify/:leaveMsgId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/leaveMsg/reply'),
      name: 'leaveMsgModify',
      meta: {
        title: '修改回复村民留言'
      }
    },
    {
      path: 'villageLedger',
      component: () => import('@/views/saas/villageAffairsOpen/villageLedger/index'),
      name: 'VillageLedger',
      meta: {
        title: '村务台账'
      }
    },
    {
      path: 'addLedger',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/villageLedger/add'),
      name: 'addVillageLedger',
      meta: {
        title: '新增台账'
      }
    },
    {
      path: 'editLedger/:villageAffairsId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/villageLedger/add'),
      name: 'editVillageLedger',
      meta: {
        title: '编辑台账'
      }
    },
    {
      path: 'detailLedger',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/villageLedger/detail'),
      name: 'DetailLedger',
      meta: {
        title: '台账详情'
      }
    },
    {
      path: 'onDutyLog',
      component: () => import('@/views/saas/villageAffairsOpen/onDutyLog/index'),
      name: 'OnDutyLog',
      meta: {
        title: '值班日志'
      }
    },
    {
      path: 'onDutyLogAdd',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/onDutyLog/operation'),
      name: 'OnDutyLogAdd',
      meta: {
        title: '新增日志'
      }
    },
    {
      path: 'onDutyLogUpdate',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/onDutyLog/operation'),
      name: 'OnDutyLogUpdate',
      meta: {
        title: '编辑日志'
      }
    },
    {
      path: 'infrastructure',
      component: () => import('@/views/saas/villageAffairsOpen/infrastructure/index'),
      name: 'Infrastructure',
      meta: {
        title: '基础设施'
      }
    },
    {
      path: 'addInfrastructure',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/infrastructure/add'),
      name: 'AddInfrastructure',
      meta: {
        title: '新增基础设施'
      }
    },
    {
      path: 'modifyInfrastructure/:articleId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/infrastructure/add'),
      name: 'ModifyInfrastructure',
      meta: {
        title: '编辑基础设施'
      }
    },
    {
      path: 'detailInfrastructure',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/infrastructure/detail'),
      name: 'DetailInfrastructure',
      meta: {
        title: '基础设施详情'
      }
    },
    {
      path: 'announcement',
      component: () => import('@/views/saas/villageAffairsOpen/announcement/index'),
      name: 'Announcement',
      meta: {
        title: '公告公示'
      }
    },
    {
      path: 'addAnnouncement',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/announcement/add'),
      name: 'AddAnnouncement',
      meta: {
        title: '新增公告公示'
      }
    },
    {
      path: 'editAnnouncement/:announcementId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/announcement/add'),
      name: 'EditAnnouncement',
      meta: {
        title: '编辑公告公示'
      }
    },
    {
      path: 'detailAnnouncement/:announcementId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/announcement/detail'),
      name: 'DetailAnnouncement',
      meta: {
        title: '公告公示详情'
      }
    },
    {
      path: 'officialDocument',
      component: () => import('@/views/saas/villageAffairsOpen/officialDocument/index'),
      name: 'GovernmentDoc',
      meta: {
        title: '政府文件'
      }
    },
    {
      path: 'receiptRegist',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/officialDocument/receiptRegist'),
      name: 'ReceiptRegist',
      meta: {
        title: '收文登记'
      }
    },
    {
      path: 'editReceiptRegist/:articleId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/officialDocument/receiptRegist'),
      name: 'EditReceiptRegist',
      meta: {
        title: '编辑收文登记'
      }
    },
    {
      path: 'replyReceipt/:articleId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/officialDocument/reply'),
      name: 'ReplyReceipt',
      meta: {
        title: '收文回复'
      }
    },
    {
      path: 'viewReplyReceipt/:viewArticleId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/officialDocument/reply'),
      name: 'ViewReplyReceipt',
      meta: {
        title: '查看回复'
      }
    },
    {
      path: 'detailGovernmentDoc',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/officialDocument/detail'),
      name: 'DetailGovernmentDoc',
      meta: {
        title: '政府文件详情'
      }
    },
    {
      path: 'notice',
      component: () => import('@/views/saas/villageAffairsOpen/notice/index'),
      name: 'Notice',
      meta: {
        title: '通知公告'
      }
    },
    {
      path: 'addNotice',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/notice/add'),
      name: 'AddNotice',
      meta: {
        title: '新增通知公告'
      }
    },
    {
      path: 'detailNotice/:articleId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/notice/detail'),
      name: 'DetailNotice',
      meta: {
        title: '通知公告详情'
      }
    },
    {
      path: 'editNotice/:articleId',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/notice/add'),
      name: 'EditNotice',
      meta: {
        title: '编辑通知公告'
      }
    },
    {
      path: 'villageFinance',
      component: () => import('@/views/saas/villageAffairsOpen/villageFinance/index'),
      name: 'VillageFinance',
      meta: {
        title: '村级财务'
      }
    },
    {
      path: 'addVillageFinance',
      hidden: true,
      component: () => import('@/views/saas/villageAffairsOpen/villageFinance/add'),
      name: 'AddVillageFinance',
      meta: {
        title: '新增村级财务'
      }
    }
  ]
}

export default router
