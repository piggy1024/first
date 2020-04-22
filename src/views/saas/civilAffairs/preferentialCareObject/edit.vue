<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="残疾信息" name="1">
          <el-row :gutter="20">
            <el-form ref="form" label-width="100px" :rules="rules">
              <el-col :span="8">
                <el-form-item label="  属别">
                  <el-select placeholder="请选择" v-model="temp.attribute" style="width:200px">
                    <el-option
                      v-for="item in attributeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="  银行账号 :" prop="title">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="  备注 :" prop="remark">
                  <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="入伍时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退役时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="取消时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
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
      attributeOptions: [
        {
          label: '请选择',
          value: '0'
        },
        {
          label: '三属对象',
          value: '1'
        },
        {
          label: '参战退役',
          value: '2'
        },
        {
          label: '残疾军人',
          value: '3'
        },
        {
          label: '老复员军人',
          value: '04'
        },
        {
          label: '烈士子女',
          value: '5'
        },
        {
          label: '60岁退役',
          value: '6'
        },
        {
          label: '带病回乡',
          value: '7'
        }
      ],
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
