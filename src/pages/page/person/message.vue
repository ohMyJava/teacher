<template>
    <div>
      <el-row>
        <el-col :sm="4" :xs="4" :md="3" :lg="3" :xl="3">
          <el-badge :value="sysInfoNum" class="item">
            <el-button size="small">系统通知</el-button>
          </el-badge>
        </el-col>
        <el-col :sm="4" :xs="4" :md="3" :lg="3" :xl="3">
          <el-badge :value="ansInfoNum" class="item" type="primary">
            <el-button size="small">新的答复</el-button>
          </el-badge>
        </el-col>
        <el-col :sm="4" :xs="4" :md="3" :lg="3" :xl="3">
          <el-badge :value="commentNum" class="item" type="warning">
            <el-button size="small">留言反馈</el-button>
          </el-badge>
        </el-col>
        <!--<el-col :sm="4" :xs="4" :md="3" :lg="3" :xl="3">
          <el-badge :value="12" class="item">
            <el-button size="small">评论</el-button>
          </el-badge>
        </el-col>-->
      </el-row>
      <el-divider></el-divider>
      <div class="contentBox"
           v-for="(value,index) in container"
           :key="index"
           :value="value"
      >
        <div class="title">{{value.title}}</div>
        <div class="content">{{value.content}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "message",
      data(){
          return{
            sysInfoNum:0,
            ansInfoNum:0,
            commentNum:0,
            container:[
              {
                title:'标题一',
                content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
              },
              {
                title:'标题一',
                content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
              },
            ],
          }
      },
      methods:{

      },
    }
</script>

<style scoped>
  .contentBox{
    text-align: left;
    text-indent: 2em;
    background-color: #DCDFE6;
    border-radius: 2px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
  }

  .title{
    line-height: 1;
    font: 16px Medium;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .content{
    font: 14px Base;
    line-height: 1.5;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
