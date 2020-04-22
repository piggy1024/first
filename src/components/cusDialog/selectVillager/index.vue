<template>
  <div class="sks">
    <template v-if="!$slots.default">
      <el-input readonly placeholder="请选择" :value="selectedPerson">
        <el-button style="width:56px;" slot="append" type="primary" icon="el-icon-plus"  @click="showDialog"></el-button>
      </el-input>
    </template>
    <div v-if="$slots.default" @click="showDialog">
      <slot></slot>
    </div>
    <cus-villager @confirm="confirm" :isShow="dialogTableVisible" @is-show-change="dialogTableVisible = false"></cus-villager>
  </div>
</template>

<script>
import cusVillager from '@/components/cusDialog/cusVillager'

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
  watch: {
    person(val) {
      this.selectedPerson = val
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      selectedPerson: ''
    }
  },
  methods: {
    updateName(person) {
      console.log('person:', person)
      this.$emit('changePerson', person)
    },
    confirm(data) {
      console.log('@@confirm:', data)
      if (data) {
        this.selectedPerson = data.person.name
        this.updateName(this.selectedPerson)
      }
      this.$emit('confirm', data)
    },
    showDialog() {
      this.dialogTableVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
