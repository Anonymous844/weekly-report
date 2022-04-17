<template>
  <el-container>
    <el-aside class="scrollbar buttons" width="240px">
      <el-date-picker
        v-model="week"
        type="week"
        format="YYYY/MM/DD 第ww周"
        value-format="YYYY/MM/DD"
        placeholder="Pick a week"
        :clearable="false"
        @change="getReportByWeek"
      ></el-date-picker>
      <el-button
        plain
        @click="createReport"
        :disabled="!week"
      >新建周报</el-button>
    </el-aside>
    <el-main class="scrollbar">
      <el-empty
        v-if="!list.length && !loadingFlag"
        description="暂无数据"
      ></el-empty>
      <card-info
        v-for="(item, index) in list"
        :key="index"
        :report-id="item.id"
        :name="item.name"
        :plan-number="item.planNumber"
        :real-number="item.realNumber"
        :deploy-number="item.deployNumber"
        :bug-number="item.bugNumber"
        :online-number="item.onlineNumber"
        :solve-number="item.solveNumber"
        :works-in-plan="item.worksInPlan"
        :works-not-in-plan="item.worksNotInPlan"
        :works-in-next-week="item.worksInNextWeek"
        :tips="item.tips"
        @edit="editReport(item)"
        @refresh="getReportByWeek"
      ></card-info>
    </el-main>
    <el-aside class="scrollbar" width="150px">
      <div v-for="(item, index) in list" :key="index" class="link">
        <el-link
          type="default"
          :underline="false"
          :href="`#${item.name}`"
        >{{ item.name }}</el-link>
      </div>
    </el-aside>
    <weekly-report
      ref="weeklyReport"
      :week="week"
      @refresh="getReportByWeek"
    ></weekly-report>
  </el-container>
</template>
<script>
import CardInfo from './components/CardInfo.vue';
import WeeklyReport from './components/WeeklyReport.vue';
import { getWeeklyDate, getReportByWeek } from '@/api/api';
export default {
  components: {
    CardInfo,
    WeeklyReport
  },
  data() {
    return {
      loading: null,
      laodingFlag: true,
      week: '',
      weekList: [],
      list: []
    }
  },
  created() {
    this.getWeeklyDate()
  },
  methods: {
    /**
     * @description 获取存在的所有周报日期
     */
    async getWeeklyDate() {
      this.loading = this.$loading();
      this.loadingFlag = true;
      try {
        const res = await getWeeklyDate() || [];
        // 按时间从近到远排序
        res.sort((x, y) => new Date(y) - new Date(x));
        this.weekList = res;
        this.week = this.weekList.length ? this.weekList[0] : '';
        // 当前周存在，再请求周报列表
        this.week && this.getReportByWeek();
      } catch (error) {
        this.loading.close();
        this.loadingFlag = false;
        this.$message({
          type: 'error',
          message: error
        })
        console.error(error)
      }
    },
    /**
     * @description 以周为维度获取所有周报
     */
    async getReportByWeek() {
      if (!this.loadingFlag) {
        this.loading = this.$loading();
        this.loadingFlag = true;
      }
      try {
        const res = await getReportByWeek(this.week) || [];
        this.list = res;
        if (!this.list.length) {
          this.$message({
            type: 'info',
            message: '暂无数据'
          })
        }
      } catch (error) {
        this.list = [];
        this.$message({
          type: 'error',
          message: error
        })
        console.error(error);
      } finally {
        this.loading.close();
        this.loadingFlag = false;
      }
    },
    /**
     * @description 新建周报
     */
    createReport() {
      this.$refs.weeklyReport.createReport();
    },
    /**
     * @description 编辑周报
     */
    editReport(item) {
      this.$refs.weeklyReport.editReport(JSON.parse(JSON.stringify(item)));
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-aside
  height 100vh
  user-select none
  &.buttons
    padding-top 30px
    .el-button, :deep(.el-input)
      margin 10px auto 0
      display block
  .link
    font-size 24px
    margin 8px
    padding 0 32px 0 24px
.el-main
  height 100vh
.el-card
  margin-bottom 20px
.el-card__body
  padding 0 20px !important
</style>
