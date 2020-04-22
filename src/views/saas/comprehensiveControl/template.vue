<template>
  <div class="app-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="模板文件" name="1">
        <div class="result-box">
          <el-table :data="tableData" border class="cus-mb-20">
            <el-table-column prop="id" label="序号" width="55"></el-table-column>
            <el-table-column label="文档名称" prop="docName" width="250">
              <span
                style="color: blue;text-decoration:underline"
                @click="$router.push('/generalInfo/xiangqing')"
              >基层应急管理规范化建设</span>
            </el-table-column>
            <el-table-column prop="otherfileName" label="附件名称"></el-table-column>
            <el-table-column prop="type" label="文档类型"></el-table-column>
            <el-table-column prop="startStatus" label="启用状态"></el-table-column>
            <el-table-column prop="uploadTime" label="上传时间"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作" width="70x">
              <template>
                <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="cus-text-right"
            :current-page="1"
            :page-sizes="[10, 15, 20, 30]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100"
            background
          ></el-pagination>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped lang="scss">
.result-box {
  /* background-color: #f5f7f9; */
  /* border-radius: 3px; */
  /* padding: 10px 15px; */
  /* box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 0 3px 0 rgba(0,0,0,0.04); */
  /deep/ .btn-box {
    margin-bottom: 10px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      activeNames: ['1'],
      tableData: [
        {
          id: 1,
          docName: '基层应急管理规范化建设',
          otherfileName: '文件1',
          type: '综合治理',
          uploadTime: '2017/09/27',
          startStatu: '前后台使用',
          remark: ''
        }
      ],
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        title: undefined,
        thingType: undefined
      }
    }
  },
  created() {},
  methods: {}
}
</script>
