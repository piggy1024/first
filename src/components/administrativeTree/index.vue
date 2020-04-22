<template>
  <div class="left-container" :class="{'show-width': isShowTree}">
    <h4 class="text-center tree-title">
      行政区域树
      <i class="el-icon-d-arrow-left" @click="handleClick(true)"></i>
    </h4>
    <div style="padding:0 10px 10px">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        class="filter-tree"
        :data="treeData"
        node-key="id"
        :props="defaultProps"
        @node-click="_getCurrentKey()"
        :expand-on-click-node="false"
        :highlight-current="true"
        default-expand-all
        :filter-node-method="filterNode"
        @current-change="currentChanged"
        ref="tree"
      ></el-tree>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>
import request from '@/utils/request'
const API_URL = '/saas-smart-village/admstrArea/treeChildAdmstrAreaList'

export default {
  props: {
    isShowTree: {
      type: Boolean,
      default: false
    },
    visibleLevel: { // 表示从哪一个level开始显示，默认从省级开始显示
      type: String,
      default: '1'
    },
    treeDatas: {
      type: Array,
      default() {
        return [
          {
            id: 1,
            label: '河北省',
            children: [
              {
                id: 4,
                label: '刑台市',
                children: [
                  {
                    id: 9,
                    label: '演示县',
                    children: [
                      {
                        id: 10,
                        label: '演示村',
                        children: [
                          {
                            id: 11,
                            label: '1队'
                          },
                          {
                            id: 12,
                            label: '2队'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  data() {
    return {
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      filterText: '',
      treeData: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this._queryTreeData()
  },
  methods: {
    _queryTreeData() {
      request({
        url: `${API_URL}?admstrAreaId=0`,
        method: 'post'
      }).then((data) => {
        const TreeData = this.covertToTree(data, this.visibleLevel)
        this.treeData = TreeData
      })
    },
    _getCurrentKey() {

    },
    filterNode(value, data) {
      if (!value) {
        return true
      } else {
        return data.name.indexOf(value) !== -1
      }
    },
    currentChanged(data, node) {
      this.$emit('nodeSelected', data, node)
    },
    handleClick(param) {
      this.$emit('is-show-change', param)
    },
    // data Array
    covertToTree(data, visibleLevel) {
      console.log('lv:', visibleLevel)
      function composeTree(list = []) {
        let data = JSON.parse(JSON.stringify(list)) // 浅拷贝不改变源数据
        data = data.filter(d => Number(d.level) >= Number(visibleLevel))
        const result = []
        if (!Array.isArray(data)) {
          return result
        }
        data.forEach(item => {
          delete item.children
        })
        const map = {}
        data.forEach(item => {
          map[item.admstrAreaId] = item
        })
        data.forEach(item => {
          const parent = map[item.parentAdmstrAreaId]
          if (Number(item.level) >= Number(visibleLevel)) {
            if (parent) {
              (parent.children || (parent.children = [])).push(item)
            } else {
              result.push(item)
            }
          }
        })
        return result
      }
      return composeTree(data)
    }
  }
}
</script>
