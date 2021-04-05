<template>
   <el-upload
  class="upload-demo"
  ref="upload"
  action="http://localhost:80/edu/edu-subject/addEduSubject"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :limit=1
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500m</div>
</el-upload> 
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        BASE_API:process.env.BASE_API, 
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>