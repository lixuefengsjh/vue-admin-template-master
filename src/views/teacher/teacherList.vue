<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
      </template>
    </el-table-column>
     <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>

    <el-table-column
      prop="career"
      label="讲师资历"
      sortable
      width="180">
    </el-table-column>

     <el-table-column
      prop="intro"
      label="讲师简介"
      sortable
      width="180">
    </el-table-column>

    <el-table-column
      prop="level"
      label="讲师头衔"
      sortable
      width="180">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import teacher from '@/api/teacher/teacherApi'
  export default {
    data() {
      return {
        tableData: [],
        currentPage:0,
        pageSize:10
      }
    },
    created(){
        this.getTeacher(1,10);
    },
    methods: {
      getTeacher(currentPage,pageSize){
        teacher.getTeacherList(currentPage,pageSize,{})
                .then(resp=>{
                    this.tableData=resp.data.records
                })
                .catch(error=>{
                    this.$message.error('错了哦，你的网络可能有问题，请重新尝试！');
                })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>