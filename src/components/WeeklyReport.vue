<template>
  <el-dialog
    v-model="visible"
    :title="isNew ? '新建周报' : '编辑周报'"
    fullscreen
  >
    <el-input v-model="name" placeholder="请输入你的名字"></el-input>
    <h3>本周任务总览</h3>
    <div class="row">
      <div class="col">
        <el-input v-model="planNumber" type="number">
          <template #prepend><span>计划完成任务数：</span></template>
        </el-input>
      </div>
      <div class="col">
        <el-input v-model="realNumber" type="number">
          <template #prepend><span>实际完成任务数：</span></template>
        </el-input>
      </div>
      <div class="col">
        <el-input v-model="deployNumber" type="number">
          <template #prepend><span>发布任务数：</span></template>
        </el-input>
      </div>
    </div>
    <h3>本周过程数据</h3>
    <div class="row">
      <div class="col">
        <el-input v-model="bugNumber" type="number">
          <template #prepend><span>Bug数：</span></template>
        </el-input>
      </div>
      <div class="col">
        <el-input v-model="onlineNumber" type="number">
          <template #prepend><span>线上问题数：</span></template>
        </el-input>
      </div>
      <div class="col">
        <el-input v-model="solveNumber" type="number">
          <template #prepend><span>发现问题并定位原因问题数：</span></template>
        </el-input>
      </div>
    </div>
    <h3>本周排期工作</h3>
    <el-input
      type="textarea"
      class="work-input"
      v-model="worksInPlan"
    ></el-input>
    <h3>本周排期外工作</h3>
    <el-input
      type="textarea"
      class="work-input"
      v-model="worksNotInPlan"
    ></el-input>
    <h3>下周计划</h3>
    <el-input
      type="textarea"
      class="work-input"
      v-model="worksInNextWeek"
    ></el-input>
    <h3>备注</h3>
    <el-input type="textarea" v-model="tips"></el-input>
    <template #footer>
      <el-button plain @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { addReport, editReport } from '@/api/api';
export default {
  props: {
    week: {
      type: String,
      default: '',
    },
  },
  emits: [
    'refresh',
  ],
  data() {
    return {
      loading: false,
      visible: false,
      isNew: true,
      id: undefined,
      name: '',
      // 本周任务总览
      planNumber: '',
      realNumber: '',
      deployNumber: '',
      // 本周过程数据
      bugNumber: '',
      onlineNumber: '',
      solveNumber: '',
      worksInPlan: '',
      worksNotInPlan: '',
      worksInNextWeek: '',
      tips: '',
    };
  },
  methods: {
    /**
     * @description 增加周报模板
     */
    createReport() {
      this.isNew = true;
      this.id = undefined;
      this.name = '';
      this.planNumber = '0';
      this.realNumber = '0';
      this.deployNumber = '0';
      this.bugNumber = '0';
      this.onlineNumber = '0';
      this.solveNumber = '0';
      this.worksInPlan = '';
      this.worksNotInPlan = '';
      this.worksInNextWeek = '';
      this.tips = '';
      this.visible = true;
    },
    /**
     * @description 编辑周报
     */
    editReport(item) {
      this.isNew = false;
      this.id = item.id;
      this.name = item.name;
      this.planNumber = item.planNumber;
      this.realNumber = item.realNumber;
      this.deployNumber = item.deployNumber;
      this.bugNumber = item.bugNumber;
      this.onlineNumber = item.onlineNumber;
      this.solveNumber = item.solveNumber;
      this.worksInPlan = item.worksInPlan;
      this.worksNotInPlan = item.worksNotInPlan;
      this.worksInNextWeek = item.worksInNextWeek;
      this.tips = item.tips;
      this.visible = true;
    },
    /**
     * @description 提交表单数据
     */
    async handleSubmit() {
      let data = {
        id: this.id,
        name: this.name,
        planNumber: this.planNumber,
        realNumber: this.realNumber,
        deployNumber: this.deployNumber,
        bugNumber: this.bugNumber,
        onlineNumber: this.onlineNumber,
        solveNumber: this.solveNumber,
        worksInPlan: this.worksInPlan,
        worksNotInPlan: this.worksNotInPlan,
        worksInNextWeek: this.worksInNextWeek,
        tips: this.tips,
      };
      this.loading = true;
      try {
        if (this.isNew) {
          data = { ...data, week: this.week };
          await addReport(data);
        } else {
          await editReport(data);
        }
        this.visible = false;
        this.$emit('refresh')
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        console.error(error)
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>
<style lang="stylus">
.el-dialog .el-dialog__body
  color var(--el-text-color-primary)
.work-input
  margin-bottom 5px
.el-input-group__append button.el-button
  color #fff !important
  background-color #f56c6c !important
</style>
