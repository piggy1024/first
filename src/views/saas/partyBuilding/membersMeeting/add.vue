<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-form ref="form" label-width="100px" :rules="rules">
          <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="  会议主题:" prop="meetingTheme">
                    <el-input style="width:200px" v-model="temp.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="  主持人">
                    <el-input style="width:200px" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="   记录人">
                    <el-input style="width:200px" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="会议日期" prop="meetingDate">
                    <el-date-picker
                      style="width:200px"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="会议地点" prop="meetingplace">
                    <el-input style="width:200px" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="与会人员" prop="meetingMembers">
                    <el-input style="width:200px" placeholder="限制20字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="会议类型" prop="meetingType">
                    <el-select placeholder="请选择" v-model="temp.relation" style="width:200px">
                      <el-option
                        v-for="item in relationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="  创建日期" prop="createDate">
                    <el-input style="width:200px" disabled value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="  创建人" prop="creater">
                    <el-input style="width:200px" disabled value="系统反显"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="22">
                  <el-form-item label="事项内容" prop>
                    <tinymce :height="200" v-model="content" id="tinymceBase"></tinymce>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-collapse-item>
        </el-form>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import tinymce from '@/components/Tinymce'
export default {
  name: 'AddGuide',
  components: { tinymce },
  data() {
    return {
      activeNames: ['1'],
      rules: {
        meetingTheme: [
          { required: true, message: '请输入11', trigger: 'blur' }
        ],
        meetingDate: [{ required: true, message: '请输入11', trigger: 'blur' }],
        meetingType: [{ required: true, message: '请输入11', trigger: 'blur' }],
        creater: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
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
