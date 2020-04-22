<template>
  <div class="result-box">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="审批表" name="1">
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column prop="id" label="序号" width="50px"></el-table-column>
          <el-table-column prop="name" label="需上传资料名称"></el-table-column>
          <el-table-column prop="shenpi" label="审批状态"></el-table-column>
          <el-table-column prop="fujianName" label="附件名称" width="150px"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小"></el-table-column>
          <el-table-column prop="uploadUser" label="上传用户" width="100px"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130px">
            <template>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-upload"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="残疾证" name="2">
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column prop="id" label="序号" width="50px"></el-table-column>
          <el-table-column prop="name" label="需上传资料名称"></el-table-column>
          <el-table-column prop="shenpi" label="审批状态"></el-table-column>
          <el-table-column prop="fujianName" label="附件名称" width="150px"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小"></el-table-column>
          <el-table-column prop="uploadUser" label="上传用户" width="100px"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130px">
            <template>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-upload"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="户口页" name="3">
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column prop="id" label="序号" width="50px"></el-table-column>
          <el-table-column prop="name" label="需上传资料名称"></el-table-column>
          <el-table-column prop="shenpi" label="审批状态"></el-table-column>
          <el-table-column prop="fujianName" label="附件名称" width="150px"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小"></el-table-column>
          <el-table-column prop="uploadUser" label="上传用户" width="100px"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130px">
            <template>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-upload"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="身份证" name="4">
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column prop="id" label="序号" width="50px"></el-table-column>
          <el-table-column prop="name" label="需上传资料名称"></el-table-column>
          <el-table-column prop="shenpi" label="审批状态"></el-table-column>
          <el-table-column prop="fujianName" label="附件名称" width="150px"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小"></el-table-column>
          <el-table-column prop="uploadUser" label="上传用户" width="100px"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130px">
            <template>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-upload"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="账号" name="5">
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column prop="id" label="序号" width="50px"></el-table-column>
          <el-table-column prop="name" label="需上传资料名称"></el-table-column>
          <el-table-column prop="shenpi" label="审批状态"></el-table-column>
          <el-table-column prop="fujianName" label="附件名称" width="150px"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小"></el-table-column>
          <el-table-column prop="uploadUser" label="上传用户" width="100px"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130px">
            <el-table-column fixed="right" label="操作" width="130px">
              <template>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-upload"
                  @click="$router.push('/civilAffairs/infoEdit')"
                ></el-button>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-download"
                  @click="$router.push('/civilAffairs/infoEdit')"
                ></el-button>
              </template>
            </el-table-column>
            <template>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-upload"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="其他资料" name="6">
        <el-table :data="tableData" border class="cus-mb-20">
          <el-table-column prop="id" label="序号" width="50px"></el-table-column>
          <el-table-column prop="name" label="需上传资料名称"></el-table-column>
          <el-table-column prop="shenpi" label="审批状态"></el-table-column>
          <el-table-column prop="fujianName" label="附件名称" width="150px"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小"></el-table-column>
          <el-table-column prop="uploadUser" label="上传用户" width="100px"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130px">
            <template>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-upload"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                @click="$router.push('/civilAffairs/infoEdit')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: 'Allowance',
  data() {
    return {
      activeNames: ['1', '2', '3', '4', '5', '6'],
      tableData: [
        {
          id: 1,
          name: '残疾人员审批表',
          shenpi: '审批中',
          fujianName: '图片1',
          fileSize: '100KB',
          uploadUser: '测试用户',
          uploadTime: '2017/09/27',
          remark: ''
        },
        {
          id: 2,
          name: '张三',
          shenpi: '已审批',
          fujianName: '图片2',
          fileSize: '100KB',
          uploadUser: '测试用户',
          uploadTime: '2017/09/27',
          remark: ''
        }
      ]
    }
  }
}
</script>
<style >
.result-box {
  margin: 10px;
}
</style>
