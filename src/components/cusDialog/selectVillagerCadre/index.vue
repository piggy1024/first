<template>
  <div class="sks">
    <el-input readonly placeholder="请选择" :value="person">
      <el-button style="width:56px;" slot="append" type="primary" icon="el-icon-plus"  @click="showDialog"></el-button>
    </el-input>

    <cus-villager @confirm="confirm" :isShow="dialogTableVisible" @is-show-change="dialogTableVisible = false"></cus-villager>
  </div>
</template>

<script>
import cusVillager from '@/components/cusDialog/cusVillager/index2'

export default {
  model: {
    prop: 'person',
    event: 'changePerson'
  },
  props: {
    person: String
  },
  components: {
    cusVillager
  },
  data() {
    return {
      dialogTableVisible: false
    }
  },
  methods: {
    updateName(person) {
      this.$emit('changePerson', person)
    },
    confirm(data) {
      if (data) {
        this.selectedPerson = data.villager.person.name
        this.updateName(this.selectedPerson)
      }
      this.$emit('confirm', data || {})
    },
    showDialog() {
      this.dialogTableVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
