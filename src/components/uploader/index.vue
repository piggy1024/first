<template>
  <div class="sv-uploader">
    <div class="sv-uploader--imgListWrapper">
      <ul style="display:inline-block;">
        <li v-for="(item, index) in showPicList" :key="item.src">
          <i title="移除" class="el-icon-error" @click.stop.prevent="removePicture(item)"></i>
          <img title="点击预览" :src="item.src" @click.stop="previewPicture(item, index)"/>
        </li>
      </ul>
    </div>
    <el-upload
      ref="uploader"
      v-show="showPicList.length < limit"
      class="sv-inner-uploader"
      :limit="limit"
      v-bind="$attrs"
      v-on="$listeners"
      name="multipartFile"
      :multiple="false"
      :action="action"
      :data="uploadParams"
      :show-file-list="false"
      :on-success="httpSuccessHandler"
      :before-upload="beforeUploadHandler"
      :on-preview="previewHandler"
      :on-remove="onRemoveHandler"
      :before-remove="befreRemoveHandler"
      :on-exceed="onExceedHandler">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="previewDialogShow">
      <div style="text-align:center;">
        <img style="max-width:100%" :src="previewPictureUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 图片类型
const TypeNewAdd = '1' // 新上传的
const TypeExisted = '2' // 传进来的
const TypeRemoved = '3' // 被移除的，注意只有类型为TypeExisted被删除了才会被置为TypeRemoved
function Pic(src, utype, fileId, ...other) {
  return {
    src,
    utype,
    fileId: fileId || 'fileId_' + Math.random(),
    ...other
  }
}

export default {
  model: {
    prop: 'sources',
    event: 'change'
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number || String,
      default: 1,
      validator(v) {
        return Number(v) >= 0
      }
    },
    sources: { // 需要预先显示的图片;一般情况下如果只能上传一个source是string，否则一般为数组类型Array<String>
      type: [String, Array],
      default: ''
    }
  },
  computed: {
    showPicList() {
      return this.imageList.filter(picObj => picObj.utype !== TypeRemoved)
    }
  },
  watch: {
    sources(val) {
      console.log('watch:', val, ',', this.sources)
      if (!this._fromEmit) {
        this.imageList = [...this.getPicsURL(this.sources, 'watching')]
        if (this.imageList.length === 0 && val === '') {
          this.$refs.uploader.clearFiles()
        }
      }
      this._fromEmit = false
    }
  },
  data() {
    return {
      action: '/paas-file/file/tempSaveFile',
      imageList: [],
      uploadParams: {},
      initialIndex: 0,
      previewDialogShow: false,
      previewPictureUrl: '',
      fileList: []
    }
  },
  created() {
    this.imageList = [...this.getPicsURL(this.sources, 'created')]
  },
  methods: {
    // 需要注意，上传到临时文件夹是不能用id显示该图片的
    // 新上传到临时文件夹的图片使用this.imageUrl = URL.createObjectURL(file.raw)显示
    httpSuccessHandler(response, file, fileList) {
      this.fileList = fileList
      console.log('fileList: ', fileList)
      if (response.fileId) {
        const imageUrl = URL.createObjectURL(file.raw)
        this.imageList.push(new Pic(imageUrl, TypeNewAdd, response.fileId))
        this._fromEmit = true
        // this.emitEvent('uploadSuccess')
        this.$emit('change', response.fileId)
      }
    },
    beforeUploadHandler() {},
    previewHandler() {},
    onRemoveHandler() {},
    befreRemoveHandler() {},
    onExceedHandler() {
      console.log('chaole')
    },
    getFileList() {},
    // 根据id生成图片的实际路径
    getPicsURL(sources, flag) {
      console.log('flag: ', flag)
      const Ret = []
      // 处理空字符串的问题
      if (typeof sources === 'string' && sources !== '') {
        sources = [sources]
      }
      if (Array.isArray(sources)) {
        sources.forEach(s => {
          if (s.startsWith('http') || s.startsWith('https')) {
            Ret.push(new Pic(s, TypeExisted))
          } else {
            Ret.push(new Pic(this.$global.generateImgPath(s), TypeExisted, s))
          }
        })
      }
      return Ret
    },
    removePicture(picObj) {
      if (picObj.utype === TypeExisted) {
        //
        const idx = this.imageList.findIndex(p => p.fileId === picObj.fileId)
        if (idx > -1) {
          this.$set(this.imageList[idx], 'utype', TypeRemoved)
        }
      } else if (picObj.utype === TypeNewAdd) {
        const idx = this.imageList.findIndex(p => p.fileId === picObj.fileId)
        if (idx > -1) {
          this.imageList.splice(idx, 1)
        }
        const idx2 = this.fileList.findIndex(file => file.response.fileId === picObj.fileId)
        if (idx2 > -1) {
          this.fileList.splice(idx2, 1)
        }
      }
      // this.$emit('remove')
      this.emitEvent('change')
    },
    previewPicture(picObj, index) {
      console.log('index:', index)
      this.previewDialogShow = true
      this.previewPictureUrl = picObj.src
    },
    getFileIdList() {
      return this.showPicList.map(picObj => picObj.fileId)
    },
    emitEvent(event) {
      const fileIdList = this.getFileIdList()
      if (this.limit === 1) {
        this.$emit(event, fileIdList[0] || '')
      } else {
        this.$emit(event, fileIdList)
      }
    },
    emitEvent2(event) {
      const fileIdList = this.getFileIdList()
      if (this.limit === 1) {
        this.$emit(event, fileIdList[0])
      } else {
        this.$emit(event, fileIdList)
      }
    }
  }
}
</script>

<style lang="scss">
.sv-inner-uploader {
  .el-upload {
    display: block;
  }
}
</style>
<style lang="scss" scoped>
  .sv-inner-uploader {
    width: 36px;
    height: 36px;
    display: inline-block;
    vertical-align: top;
      border: 1px dashed #d9d9d9;
  }
  .sv-uploader--imgListWrapper {
    display: inline-block;
    vertical-align: top;
    &>ul {
      padding: 0;
      margin: 0;
      li {
        width: 36px;
        height: 36px;
        display: inline-block;
        vertical-align: top;
        position: relative;
        border: 1px dashed #d9d9d9;
        margin-left: 3px;
        margin-right: 5px;
        &:hover {
          border-color:#409eff;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .el-icon-error {
          color: red;
          position: absolute;
          left: -10px;
          top: -10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
