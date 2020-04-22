<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <el-row :gutter="10" type="flex" class="cus-mb-10">
      <el-col :span="7">
        <div class="village-intro cus-bg-f5f7f9 cus-text-666">
          <h3 class="title text-center cus-text-333">演示村</h3>
          <p
            class="content"
          >演示村位于镇政府西北方向，距镇政府1.5公里，该村共有人口2862人，其中党员92人，两委班子人员总数6人，其中党支部委员3人，村委委员3人，交叉任职人数0人，村级活动场所位于永兴街12号，建于2017年.</p>
          <p
            class="content"
          >演示村与大陆村二村、镇邱村、金家庄村、大陆村一村、大陆村三村、大陆村四村、赵平邱南村、赵平邱北村、雷家庄村、常家庄一村、常家庄二村、常家庄三村、雷李庄村、武家庄村、东张家庄村、草厂村、周家庄村、陈家庄村、东阎家庄村、南梁家庄村、北梁家庄村、东魏家庄村、东王庄村相邻。</p>
        </div>
      </el-col>
      <el-col :span="10" class="carousel-info">
        <el-carousel>
          <el-carousel-item v-for="item in 4" :key="item" class="text-center">
            <span>来源：综合信息-上传轮播图</span>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="7">
        <div class="right-list cus-bg-f5f7f9">
          <h3 class="title text-center">
            <svg-icon icon-class="user" />
            <span>第XX周值班人员</span>
          </h3>
          <el-table :data="tableData" border max-height="260" size="small">
            <el-table-column prop="dutyMan" label="值班人员"></el-table-column>
            <el-table-column prop="position" label="职务"></el-table-column>
            <el-table-column prop="phone" label="联系电话" width="100"></el-table-column>
          </el-table>
          <div class="select-date">
            <i class="el-icon-date surface-icon"></i>
            <el-date-picker class="hidden-vis" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <div class="cus-card cus-d-fl cus-fl-dir cus-box-sh">
          <div class="card-title cus-d-fl cus-align-center">
            <span class="cus-fl-1">通知公告</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="cart-content cus-fl-1">
            <p>来源：村务公开-通知公告</p>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="村务台账" name="first">村务台账</el-tab-pane>
          <el-tab-pane label="村民留言" name="second">村民留言</el-tab-pane>
          <el-tab-pane label="基础设施" name="third">基础设施</el-tab-pane>
          <el-tab-pane label="公共文化" name="fourth">公共文化</el-tab-pane>
          <el-tab-pane label="党建" name="five">党建</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="7">
        <div class="cus-card cus-d-fl cus-fl-dir cus-box-sh">
          <div class="card-title cus-d-fl cus-align-center">
            <span class="cus-fl-1">代办审核</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="card-content cus-fl-1">
            <p class="item cus-d-fl">
              <span class="cus-fl-1">待审核：xxxx</span>
              <span>03-20 09:00:12</span>
            </p>
            <p class="item cus-d-fl">
              <span class="cus-fl-1">待审核：xxxx</span>
              <span>03-20 09:00:12</span>
            </p>
            <p class="item cus-d-fl">
              <span class="cus-fl-1">待审核：xxxx</span>
              <span>03-20 09:00:12</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  padding: 10px;
  .village-intro {
    padding: 5px;
    height: 100%;
    .title {
      margin: 0;
    }
    .content {
      font-size: 14px;
    }
  }
  .carousel-info /deep/ {
    .el-carousel {
      height: 100%;
      .el-carousel__container {
        height: 100%;
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
      }
    }
  }
  .right-list {
    padding: 5px;
    position: relative;
    /deep/ .el-table__header {
      th.is-leaf {
        color: #1890ff;
      }
    }
    .select-date {
      position: absolute;
      right: 15px;
      top: 10px;
      .surface-icon {
        font-size: 20px;
      }
      .hidden-vis {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
    }
  }
  .cus-card {
    height: 300px;
    .card-title {
      padding: 0 8px;
      height: 40px;
      background-color: #206bb3;
      color: #fff;
      font-size: 14px;
    }
    .card-content {
      > .item {
        font-size: 14px;
        color: #666;
        padding: 0 5px;
      }
    }
  }
  /deep/ .el-tabs {
    .el-tabs__header {
      margin: 0;
      background-color: #f5f7f9;
      .el-tabs__nav-scroll {
        padding: 0 10px;
      }
    }
    .el-tabs__content {
      height: 260px;
      box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
      padding: 10px;
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
      tableData: [
        {
          dutyMan: '张三',
          position: '村干部',
          phone: '12542635241'
        },
        {
          dutyMan: '李四',
          position: '村长',
          phone: '12542635241'
        },
        {
          dutyMan: '王五',
          position: '主任',
          phone: '12542635241'
        },
        {
          dutyMan: '王五',
          position: '主任',
          phone: '12542635241'
        },
        {
          dutyMan: '王五',
          position: '主任',
          phone: '12542635241'
        }
      ],
      activeName: 'second'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
