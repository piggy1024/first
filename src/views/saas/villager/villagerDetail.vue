<template>
  <div class="app-container">
    <div class="right-container">
      <div class="up">
        <el-row type="flex" justify="space-between">
          <el-col :span="3">
            <img class="pic" :src="basicData.person.headshot ? $global.generateImgPath(basicData.person.headshot) : '/默认图片.jpg'" alt />
          </el-col>
          <el-col :span="6">
            <el-col :span="8">村民姓名</el-col>
            <el-col :span="16">{{basicData.person.name || '暂无信息'}}</el-col>
            <el-col :span="8">民族</el-col>
            <el-col :span="16">{{basicData.person.ethnic || '暂无信息'}}</el-col>
            <el-col :span="8">所在户</el-col>
            <el-col :span="16">{{basicData.huoseholdMain || '暂无信息'}}</el-col>
            <el-col :span="8">村民状态</el-col>
            <el-col :span="16">{{basicData.status || '暂无信息'}}</el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8">身份证号</el-col>
            <el-col :span="16">{{basicData.person.idCardNumber || '暂无信息'}}</el-col>
            <el-col :span="8">出生日期</el-col>
            <el-col :span="16" v-if="basicData.birthDate">{{basicData.birthDate | parseTime('{y}-{m}-{d}')}}</el-col>
            <el-col :span="16" v-else>{{basicData.birthDate || '暂无信息'}}</el-col>
            <el-col :span="8">与户主关系</el-col>
            <el-col :span="16">{{basicData.andHshdMasterRelate || '暂无信息'}}</el-col>
            <el-col :span="8">户籍地址</el-col>
            <el-col :span="16">{{basicData.hshdRgstAddress || '暂无信息'}}</el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8">性别</el-col>
            <el-col :span="16">{{basicData.person.sex || '暂无信息'}}</el-col>
            <el-col :span="8">入户日期</el-col>
            <el-col :span="16" v-if="basicData.registerHouseholdDate">{{basicData.registerHouseholdDate | parseTime('{y}-{m}-{d}')}}</el-col>
            <el-col :span="16" v-else>暂无信息</el-col>
            <!-- <el-col :span="16">{{basicData.registerHouseholdDate || '暂无信息'}}</el-col> -->
            <el-col :span="8">电话号码</el-col>
            <el-col :span="16">{{basicData.person.phoneNumber || '暂无信息'}}</el-col>
          </el-col>
        </el-row>
      </div>
      <div class="content-box">
        <el-tabs v-model="editableTabsValue">
          <el-tab-pane label="个人信息" name="1">
            <self-info :household-id="basicData.householdId" :self-info-data="basicData"></self-info>
          </el-tab-pane>
          <el-tab-pane label="户成员信息" name="2">
            <house-hold-member-info :household-id="basicData.householdId"></house-hold-member-info>
          </el-tab-pane>
          <el-tab-pane label="房屋信息" name="3">
            <house-info :person-id="$route.params.id"></house-info>

          </el-tab-pane>
          <el-tab-pane label="土地承包经营" name="4">
            <land-contract :person-id="$route.params.id"></land-contract>
          </el-tab-pane>
          <el-tab-pane label="惠民补贴" name="5">
            <civil-affairs :person-id="$route.params.id"></civil-affairs>
          </el-tab-pane>
          <el-tab-pane label="办理事项" name="6">
            <the-matters :person-id="$route.params.id"></the-matters>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import selfInfo from './detailComponent/selfInfo'
import houseHoldMemberInfo from './detailComponent/houseHoldMemberInfo'
import houseInfo from './detailComponent/houseInfo'
import landContract from './detailComponent/landContract'
import civilAffairs from './detailComponent/civilAffairs'
import theMatters from './detailComponent/theMatters'

import villagerService from '@/api/villager/VillagerService'

export default {
  name: 'VillagerDetail',
  components: {
    selfInfo,
    houseHoldMemberInfo,
    houseInfo,
    landContract,
    civilAffairs,
    theMatters
  },
  data() {
    return {
      basicData: {
      },
      editableTabsValue: '1'
    }
  },
  created() {
    this.getVillagerDetail()
  },
  methods: {
    getVillagerDetail() {
      villagerService.acquireVillagerById(this.$route.params.id).then(res => {
        // console.log(res);
        this.basicData = res
        this.basicData.villager = {
          village: '',
          homeCompany: ''
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.pic {
  width: 100%;
  height: 170px;
  object-fit: cover;
}

.up {
  background-color: #f3f5f7;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  padding-top: 10px;
}
.up {
  .el-col > .el-col {
    font-size: 13px;
    color: #303133;
    line-height: 33px;
    margin-bottom: 10px;
  }
}
.content-box {
  /deep/ .el-collapse {
    .el-collapse-item__content {
      // padding: 15px 0 0;
      .el-col > .el-col {
        line-height: 25px;
        margin-bottom: 5px;
      }
    }
  }
}
.up {
  /deep/ .el-collapse {
    border-top: none;
    .el-collapse-item__header.is-active {
      border-bottom-color: #e6ebf5;
    }
    .el-collapse-item__header {
      position: relative;
      padding-left: 35px;
      font-size: 15px;
      > i {
        position: absolute;
        top: auto;
        bottom: auto;
        left: 8px;
        margin: 0;
        font-weight: bold;
      }
    }
    .el-collapse-item__content {
      padding: 15px 0 0;
      .el-col > .el-col {
        line-height: 33px;
        margin-bottom: 15px;
      }
    }
  }
}

.right-container {
  min-height: 100%;
  -webkit-transition: margin-left 0.28s;
  transition: margin-left 0.28s;
}
</style>
