<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" round size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="主键" v-if="false" width="180"></el-table-column>
      <el-table-column label="日期" sortable width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>

      <el-table-column prop="career" label="讲师资历" width="180"></el-table-column>

      <el-table-column prop="intro" label="讲师简介" show-overflow-tooltip width="180"></el-table-column>

      <el-table-column prop="level" label="讲师头衔" width="180"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAdd()" round>新增</el-button>

          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            round
          >修改</el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            round
          >删除</el-button>
        </template>
      </el-table-column>
      <template></template>
    </el-table>

    <div class="block" style="margin-top:15px;">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import teacher from "@/api/teacher/teacherApi";
export default {
  data() {
    return {
      tableData: [],
      formInline: {
        user: "",
        region: ""
      },
      currentPage: 0,
      pageSize: 5,
      currentPage: 0,
      total: 0
    };
  },
  created() {
    this.getTeacher(this.currentPage, this.pageSize);
  },
  methods: {
    getTeacher(currentPage, pageSize) {
      teacher
        .getTeacherList(currentPage, pageSize, {})
        .then(resp => {
          this.tableData = resp.data.records;
          this.total = resp.data.total;
        })
        .catch(error => {
          this.$message.error("错了哦，你的网络可能有问题，请重新尝试！");
        });
    },
    onSubmit() {},
    handleAdd() {
      	   //路由跳转页面并传递参数
	   this.$router.push({
	     path:'/teacher/add',
	    //  query:{
	    //    id:id
	    //  }
	   })
    },
    handleEdit(index, row) {
      console.log(index, row.id);
    },
    handleDelete(index, row) {
      teacher
        .deleteTeacher(row.id)
        .then(resp => {
          //提示消息
          this.$message({
            message: "恭喜你，数据删除成功",
            type: "success"
          });
          //重新刷新页面
          this.getTeacher(0, this.pageSize);
        })
        .catch(error => {
          this.$message.error("错了哦，请重新操作");
        });
    },

    //切换pagesize
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTeacher(0, val);
    },
    //切换页码
    handleCurrentChange(val) {
      this.getTeacher(val, this.pageSize);
    }
  }
};
</script>