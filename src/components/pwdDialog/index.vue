<template>
  <div class="app-container">
    <el-dialog title="确认密码" :visible.sync="pwdDialog.isShow" :show-close="false" @closed="afterCloseHandler" width="40%" :close-on-click-modal="false">
      <el-form :model="form" class="cus-pr-15" :rules="formRules" ref="form">
        <el-form-item label="密码" label-width="60px" prop="pwd" width="200px">
          <el-input v-model="form.pwd" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdDialog.isShow = false; form.pwd = '';">取 消</el-button>
        <el-button type="primary" :loading="pwdDialog.loading" @click="confirm">{{ pwdDialog.loading ? '正在删除' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>
import storeMixin from '@/mixins/storeMixin'

const EventSuccessed = 'success'
const EventFailed = 'failed'
export default {
  mixins: [storeMixin],
  props: {
    pwdDialog: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { isShow: false, loading: false }
      }
    }
  },
  data() {
    return {
      form: {
        pwd: ''
      },
      formRules: {
        // pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    closeDialog() {
      this.pwdDialog.isShow = false
    },
    confirm() {
      // 验证密码
      console.log('pwd:', this.$md5SaltedPwd)
      if (this.form.pwd === '') {
        this.$message({
          message: '必须输入密码！',
          type: 'error'
        })
        return
      }
      const inputPwd = this.$global.md5Pwd(this.form.pwd)
      const correctPwd = this.$md5SaltedPwd
      if (inputPwd === correctPwd) {
        // 验证成功
        this.$emit(EventSuccessed, this.closeDialog.bind(this))
      } else {
        // 验证失败
        this.$message({
          message: '密码错误！',
          type: 'error'
        })
        this.$emit(EventFailed, this.closeDialog.bind(this))
      }
    },
    afterCloseHandler() {
      this.form.pwd = ''
    }
  }
}
</script>
