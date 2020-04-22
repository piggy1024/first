<template>
  <div class="content">
    <div class="collapse-item">
      <h5 class="item-title cus-d-fl">
        <span class="title cus-fl-1">{{collapseTitle}}</span>
        <span class="disabled cus-text-red">{{isDisabled ? '不可切换' : ''}}</span>
        <el-switch
          class="cus-mr-20"
          v-model="collapseSwitch.isShow"
          active-text="开"
          inactive-text="关"
          @change="handleSwitchChange"
          :disabled="isDisabled"
        ></el-switch>
        <i class="icon" :class="collapseSwitch.isShow ? 'el-icon-arrow-down' :'el-icon-arrow-right'"></i>
      </h5>
      <el-collapse-transition>
        <div class="item-content" v-if="collapseSwitch.isShow">
          <slot name="itemContent"></slot>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapseTitle: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      collapseSwitch: {
        isShow: this.isShow
      }
    }
  },
  methods: {
    handleSwitchChange(value) {
      this.$emit('item-change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.content .collapse-item {
  border-bottom: 1px solid #e6ebf5;
  .item-title {
    margin: 0;
    font-size: 16px;
    padding: 12px 8px 12px 0px;
    > span.disabled {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
    > i.icon {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .item-content {
    padding-top: 15px;
    .el-form-item .el-input,
    .el-form-item .el-date-editor.el-input,
    .el-form-item .el-button {
      width: 200px;
    }
  }
}
</style>
