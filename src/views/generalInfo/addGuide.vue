<template>
  <div class="container">
    <div class="btn-box cus-mb-10">
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
    <div class="content-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-row :gutter="20">
            <el-form ref="form" label-width="100px" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="  标题:" prop="title">
                    <el-input style="width:200px" v-model="temp.name"></el-input>
                  </el-form-item>
                  <el-form-item label="  创建人">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                  <el-form-item label="   修改人">
                    <el-input style="width:200px" disabled="true" value="系统反显"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="启用状态" prop="startStuta">
                    <el-select placeholder="请选择" v-model="temp.relation" style="width:200px">
                      <el-option
                        v-for="item in selectOptionsMap.enableStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="事项类型" prop="type">
                    <el-select placeholder="请选择" v-model="temp.relation" style="width:200px">
                      <el-option
                        v-for="item in selectOptionsMap.thingType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="修改时间:" prop="name">
                    <el-input style="width:200px" disabled value="自动显示"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="封面图">
                    <el-upload>
                      <el-button type="primary" style="width:200px">
                        <span>选择文件</span>
                      </el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="  创建时间:" prop="name">
                    <el-input style="width:200px" disabled value="自动显示"></el-input>
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
            </el-form>
          </el-row>
        </el-collapse-item>
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
        title: [{ required: true, message: '请输入11', trigger: 'blur' }],
        type: [{ required: true, message: '请输入11', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        importance: 1,
        creater: undefined,
        reviser: undefined
      },
      selectOptionsMap: {
        enableStatus: [
          { label: '前后台启用', value: '0' },
          { label: '后台启用', value: '1' },
          { label: '禁用', value: '2' }
        ],
        thingType: [
          { label: '农业', value: '0' },
          { label: '财政', value: '1' },
          { label: '民政', value: '2' },
          { label: '户籍', value: '3' },
          { label: '国土住建', value: '4' },
          { label: '计生服务', value: '5' },
          { label: '就业指南', value: '6' },
          { label: '惠民政策', value: '7' }
        ]
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
