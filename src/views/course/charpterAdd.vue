<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>

<el-tree
  class="filter-tree"
  :data="data"
  :props="defaultProps"
  default-expand-all
  :filter-node-method="filterNode"
  ref="tree">
</el-tree>
   </div>
</template>
<script>
import course from "@/api/course/courseApi";
  export default {
    watch: {
      // filterText(val) {
      //   this.$refs.tree.filter(val);
      // }
    },
    methods: {
      getCharpter(){
        const id=this.$route.query.courseId;
        course.getCharpter(id).then(
              resp=>{
                    this.data=resp.data;
                    console.log( this.data[0]);
              }
        ).catch(
              error=>{
                this.$message.error("不好意思，网络出错")
              }
        );
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
created(){this.getCharpter()},
    data() {
      return {
        filterText: '',
        data: [],
        defaultProps: {
          children: 'title',
          label: 'eduVideos'
        }
      };
    }
  };
</script>