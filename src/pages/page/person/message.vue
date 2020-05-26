<template>
    <div>
      <el-row>
        <el-col :sm="4" :xs="4" :md="3" :lg="3" :xl="3">
          <el-badge :value="sysInfoNum" class="item">
            <el-button size="small" @click="systemInfo">系统通知</el-button>
          </el-badge>
        </el-col>
        <el-col :sm="4" :xs="4" :md="3" :lg="3" :xl="3">
          <el-badge :value="ansInfoNum" class="item" type="primary">
            <el-button size="small" @click="this.container=this.replyInfos;this.flag=2">邀请答复</el-button>
          </el-badge>
        </el-col>
        <el-col :sm="4" :xs="4" :md="3" :lg="3" :xl="3">
          <el-badge :value="commentNum" class="item" type="warning">
            <el-button size="small" @click="this.container=this.commentInfos;this.flag=3">留言反馈</el-button>
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
           :value="value">
        <div class="title">{{value.title}}</div>
        <div class="content">
          <!-- 系统消息内容 -->
          <div v-if="this.flag=1"></div>

          <!-- 邀请答复内容 -->
          <div v-if="this.flag=2"></div>

          <!-- 留言反馈内容 -->
          <div v-if="this.flag=3"></div>

        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "message",
      data(){
          return{
            flag:2,
            total:0,
            currentPage:1,
            sysInfoNum:0,
            ansInfoNum:0,
            commentNum:0,
            container:[
              {
                title:'标题一',
                content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
              },
            ],
            sysInfos:[],
            replyInfos:[],
            commentInfos:[],
          }
      },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        /* 系统通知 */
        async systemInfo(){},
        /* 新的答复 */
        async replyInfo(){
          let res = await this.$axios.get('/api/person/replyInfo?userId='+userId);
          if (res.data.code === '6666') {
            this.ansInfoNum = res.data.data.length;
            this.replyInfos = res.data.data;
          }else {}
        },
        /* 留言反馈 */
        async commentInfo(){
          let res = await this.$axios.get('/api/person/commentInfo?userId='+userId);
          if (res.data.code === '6666') {

          }else {}
        },
      },
      created(){
        //获取系统通知条数和内容、新的答复及留言反馈条数
      }
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
