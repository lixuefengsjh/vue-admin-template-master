<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-button type="text" @click="dialogChapterFormVisible = true">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style type="text" @click="openVideo(chapter.id)">添加小节</el-button>
            <el-button style type="text" @click="openEditChatper(chapter)">编辑</el-button>
            <el-button type="text" @click="removeChapter(chapter)">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.eduVideos" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button style type="text">编辑</el-button>
                <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item v-if="false" label="课时id">
          <el-input v-model="video.id" />
        </el-form-item>
                <el-form-item v-if="false" label="章节id">
          <el-input v-model="video.chapterId" />
        </el-form-item>
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/uploadAlyiVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，
                <br />支持3GP、ASF、AVI、DAT、DV、FLV、F4V、
                <br />GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、
                <br />MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、
                <br />SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible= false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo(video)"
        >确 定</el-button>
      </div>
    </el-dialog>
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
    saveOrUpdateVideo(video) {
      video.courseId=this.$route.query.courseId;
      course
        .saveOrUpdateVideo(video)
        .then(resp => {
          //如果是新增需要在视频需要及时刷新页面新增，修改的话也要及时修改页面内容
          if(video.id){
            //修改
          }else{
            //新增
          }
          this.$message({
            message: "恭喜你，新增或者修改成功",
            type: "success"
          }),
          this.dialogVideoFormVisible=false;
        })
        .catch(error => {
          this.$message.error("新增或者修改视频小节过程出错误")
        });
    },
    removeVideo(id){
      course.deleteVideoById(id).then(resp=>{
          this.$message({
            type:"success",
             message: "恭喜你，删除数据成功",
          })
      }).catch(error=>{
        this.$message.error("删除数据失败")
      });
    },
    handleVodUploadSuccess() {},
    handleVodRemove() {},
    beforeVodRemove() {},
    openVideo(id) {
      this.dialogVideoFormVisible = true;
      this.video.chapterId=id;
    },
    removeChapter(chapter) {
      this.$confirm("是否要删除对应的章节？").then(resp => {
        //首先删除对应的数据
        course
          .deleteCharpter(chapter.id)
          .then(resp => {
            this.chapterVideoList.splice(
              this.chapterVideoList.findIndex(item => {
                item.id === chapter.id;
              }),
              1
            );
          })
          .catch(err => {
            this.$message.error("删除数据失败");
          });
        //页面对应的数据也要删除
        //关闭弹框
      });
    },
    openEditChatper(chapter) {
      this.chapter = chapter;
      this.dialogChapterFormVisible = true;
    },
    //添加或者修改章节
    saveOrUpdate() {
      let charpter1 = this.chapter;
      charpter1.courseId = this.$route.query.courseId;
      console.log(charpter1.id);
      course
        .saveOrUpdateCharpter(charpter1)
        .then(resp => {
          this.$message({
            type: "success",
            message: "添加或修改章节成功"
          });
          //页面需要新增一条章节数据
          if (!charpter1.id) {
            charpter1.id = resp.data;
            this.chapterVideoList.push(charpter1);
          } else {
            console.log("开始==========" + charpter1.id);
            let index = this.chapterVideoList.findIndex(item => {
              console.log(item.id);
              item.id == charpter1.id;
            });
            console.log(index);
            console.log(this.chapterVideoList[index].title);
            (this.chapterVideoList[index].title = charpter1.title),
              (this.chapterVideoList[index].sort = charpter1.sort);
          }
          this.dialogChapterFormVisible = false;
        })
        .catch(error => {
          this.$message.error("操作失败，请重试");
        });
    },
    handleUploadExceed() {},
    previous() {},
    next() {},
    getCharpter() {
      const id = this.$route.query.courseId;
      course
        .getCharpter(id)
        .then(resp => {
          this.chapterVideoList = resp.data;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("不好意思，网络出错");
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  created() {
    this.getCharpter();
  },
  data() {
    return {
      fileList: [],
      filterText: "",
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      saveBtnDisabled: false,
      saveVideoBtnDisabled: false,
      chapterVideoList: [],
      BASE_API: "",
      video: {},
      chapter: {
        title: "",
        sort: 0
      }
    };
  }
};
</script>
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>