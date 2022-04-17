<template>
  <el-card v-if="name" :id="name">
    <h2>
      <span class="name">{{ name }}</span>
      <el-icon @click="$emit('edit')"><edit /></el-icon>
      <el-popconfirm
        class="el-popconfirm"
        confirm-button-text="OK"
        cancel-button-text="No, Thanks"
        icon-color="red"
        title="Are you sure to delete this?"
        @confirm="confirmEvent"
      >
        <template #reference>
          <el-icon color="#ff0012"><delete /></el-icon>
        </template>
      </el-popconfirm>
    </h2>
    <h3>本周任务总览</h3>
    <div class="row">
      <div class="col">计划完成任务数：{{ planNumber }}</div>
      <div class="col">实际完成任务数：{{ realNumber }}</div>
      <div class="col">发布任务数：{{ deployNumber }}</div>
    </div>
    <h3>本周过程数据</h3>
    <div class="row">
      <div class="col">Bug数：{{ bugNumber }}</div>
      <div class="col">线上问题数：{{ onlineNumber }}</div>
      <div class="col">发现问题并定位原因问题数：{{ solveNumber }}</div>
    </div>
    <h3>本周排期工作</h3>
    <p v-for="(item, index) in worksInPlan" :key="index">
      {{ `${index + 1}. ${item}` }}
    </p>
    <h3>本周排期外工作</h3>
    <p v-for="(item, index) in worksNotInPlan" :key="index">
      {{ `${index + 1}. ${item}` }}
    </p>
    <h3>下周计划</h3>
    <p v-for="(item, index) in worksInNextWeek" :key="index">
      {{ `${index + 1}. ${item}` }}
    </p>
    <h3 v-if="tips">备注</h3>
    <p v-html="tips.replace(/\n/g, '<br />')"></p>
  </el-card>
</template>
<script>
import { deleteReport } from '@/api/api';
export default {
  props: {
    reportId: {
      type: Number,
      default: undefined
    },
    name: {
      type: String,
      default: ''
    },
    planNumber: {
      type: String,
      default: '0'
    },
    realNumber: {
      type: String,
      default: '0'
    },
    deployNumber: {
      type: String,
      default: '0'
    },
    bugNumber: {
      type: String,
      default: '0'
    },
    onlineNumber: {
      type: String,
      default: '0'
    },
    solveNumber: {
      type: String,
      default: '0'
    },
    worksInPlan: {
      type: Array,
      default: []
    },
    worksNotInPlan: {
      type: Array,
      default: []
    },
    worksInNextWeek: {
      type: Array,
      default: []
    },
    tips: {
      type: String,
      default: ''
    }
  },
  emits: [
    'edit',
    'refresh'
  ],
  methods: {
    async confirmEvent() {
      const loading = this.$loading();
      try {
        await deleteReport(this.reportId)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$emit('refresh')
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        console.error(error)
      } finally {
        loading.close();
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
h2
  display flex
  justify-content flex-start
  align-items center
  span.name
    flex 1
  .el-icon+.el-icon
    margin-left 20px
.el-icon
  font-size 24px
  cursor pointer
  user-select none
</style>
