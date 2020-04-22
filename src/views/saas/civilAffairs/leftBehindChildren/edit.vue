<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="留守儿童信息" name="1">
          <el-form ref="form" label-width="110px" :rules="rules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="  父亲务工地点 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  就学情况 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  村委联系人 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="  母亲务工地点 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  寄宿情况 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  村委联系电话 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="  实际监护情况 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  健康情况 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="  备注 :" prop="remark">
                  <el-input
                    type="textarea"
                    style="width:200px"
                    v-model="temp.name"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddGuide',
  data() {
    return {
      activeNames: ['1'],
      rules: {},
      temp: {
        id: undefined,
        importance: 1,
        creater: undefined,
        reviser: undefined
      }
    }
  }
}
</script>
<style>
.container {
  margin: 20px;
}

.dialog-footer {
  margin-top: 50px;
  text-align: center;
}
</style>
