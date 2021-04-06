<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="讲师主鍵" prop="id" v-if="false">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="讲师姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师资历" prop="career">
        <el-input v-model="ruleForm.career"></el-input>
      </el-form-item>

      <el-form-item label="讲师头衔" prop="level">
        <el-radio-group v-model="ruleForm.level">
          <el-radio label="1">高级讲师</el-radio>
          <el-radio label="2">首席讲师</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="讲师简介" prop="intro">
        <el-input type="textarea" v-model="ruleForm.intro"></el-input>
      </el-form-item>

          <el-form-item label="讲师头像">
            <!-- 头衔缩略图 -->
            <pan-thumb :image="ruleForm.avatar" />
            <!-- 文件上传按钮 -->
            <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>

            <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
        <input type="file" name="file"/>
            -->
            <image-cropper
              v-show="imagecropperShow"
              :width="300"
              :height="300"
              :key="imagecropperKey"
              :url="'/oss/upload'"
              field="file"
              @close="close"
              @crop-upload-success="cropSuccess"
            />
        </el-form-item>
         <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from "@/api/teacher/teacherApi";
import PanThumb from "@/components/PanThumb";
import ImageCropper from "@/components/ImageCropper";
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      ruleForm: {
        name: "",
        career: "",
        level: "",
        intro: ""
      },
     imagecropperShow:false,
      //上传组件初始化
      imagecropperKey :0,
      rules: {
        name: [
          { required: true, message: "请输入讲师姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        career: [
          { required: true, message: "请输入讲师资历", trigger: "change" }
        ],
        level: [
          { required: true, message: "请选择讲师头衔", trigger: "change" }
        ],
        intro: [{ required: true, message: "请填写讲师简介", trigger: "blur" }]
      }
    };
  },
  created() {
    this.initForm();
  },
  watch: {
    //路由變化方法
    $route(to, from) {
      console.log("hhhh");
      this.initForm();
    }
  },
  methods: {
    close() {
      this.imagecropperShow = false;
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      console.log(data);
      this.ruleForm.avatar = data;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    initForm() {
      if (this.$route.query.id) {
        teacher
          .getTeacherById(this.$route.query.id)
          .then(resp => {
            this.ruleForm = resp.data;
          })
          .catch(error => {});
      } else {
        //多次路由跳轉還是有問題，問題
        this.ruleForm = {};
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm.level);
          teacher
            .addOrUpdateTeacher(this.ruleForm)
            .then(resp => {
              //提示消息
              this.$message({
                message: "恭喜你，数据插入成功",
                type: "success"
              });

              //路由跳转页面并传递参数
              this.$router.push({
                path: "/teacher/list"
              });
              this.getTeacher(0, this.pageSize);
            })
            .catch(error => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置數據
      this.$refs[formName].resetFields();
    }
  }
};
</script>