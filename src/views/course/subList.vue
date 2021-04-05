<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="tree"
    ></el-tree>
  </div>
</template>
<script>
import course from "@/api/course/courseApi";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
 created(){
    this.getCourseSub();
 },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getCourseSub() {
      course
        .getCourserSubList()
        .then(resp => {
          this.data = resp.data;
        })
        .catch(error => {
          this.$message.error("错了哦，你的网络可能有问题，请重新尝试！");
        });
    }
  },

  data() {
    return {
      filterText: "",
      data: [],
      defaultProps: {
        children: "childs",
        label: "title"
      }
    };
  }
};
</script>
