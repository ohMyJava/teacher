<template>
    <div>
      <el-row>
        <el-col :sm="12" :xs="6" :md="4" :lg="3" :xl="3">
          <el-badge :value="sysInfoNum" class="item">
            <el-button size="small" @click="systemInfo();flag = 1">系统通知</el-button>
          </el-badge>
        </el-col>
        <el-col :sm="12" :xs="6" :md="4" :lg="3" :xl="3">
          <el-badge :value="ansInfoNum" class="item" type="primary">
            <el-button size="small" @click="replyInfo();flag = 2;">邀请答复</el-button>
          </el-badge>
        </el-col>
        <el-col :sm="12" :xs="46" :md="4" :lg="3" :xl="3">
          <el-badge :value="commentNum" class="item" type="warning">
            <el-button size="small" @click="commentInfo();flag = 3;">留言反馈</el-button>
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
           v-show="!isNull"
           v-for="(value,index) in container"
           :key="index"
           :value="value">
        <div class="title">{{value.title}}</div>
        <div class="content">
          {{value.content}}
          <!-- 系统消息内容 -->
          <div v-if="flag===1">
          </div>

          <!-- 邀请答复内容 -->
          <div v-show="flag===2 && value.id!==0 && value.type===1" >
            <el-button size="small" @click="agree(value.id,index)" type="primary">同意</el-button>
            <el-button size="small" @click="refuse(value.id,index)" type="danger">拒绝</el-button>
          </div>

          <div v-show="flag===2 && value.id!==0 && value.type===2" >
            <el-button size="small" @click="setInviteInfoIsRead(value.id,index)" type="primary">已读</el-button>
          </div>

          <!-- 留言反馈内容 -->
          <div v-if="flag===3&&value.id!==0">
            <el-button size="small" @click="setIsRead(value.id,index)" type="primary">已读</el-button>
          </div>

        </div>
      </div>
      <div class="contentBox" v-show="isNull">
        {{this.nullMessage}}
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
            nullMessage:'',
            isNull:true,
            flag:1,
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
            userId: this.$store.getters.id,
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
        async systemInfo(){
          this.container = null;
          this.isNull = true;
          this.nullMessage = "暂无系统通知";
        },
        /* 新的答复 */
        async replyInfo(){
          let res = await this.$axios.get('/api/person/replyInfo?userId='+this.userId);
          if (res.data.code === '6666') {
            this.isNull = false;
            this.ansInfoNum = res.data.data.length;
            this.replyInfos = res.data.data;
            this.container = this.replyInfos;
            this.total = res.data.data.length;
          }else {
            this.container=[];
            this.isNull = true;
            this.nullMessage = "无新回复";
          }
        },
        /* 留言反馈 */
        async commentInfo(){
          let res = await this.$axios.get('/api/person/commentInfo?userId='+this.userId);
          if (res.data.code === '6666') {
            this.isNull = false;
            this.commentInfos = res.data.data;
            this.commentNum = res.data.data.length;
            this.total = res.data.data.length;
            this.container = this.commentInfos;
          }else {
            this.container = null;
            this.isNull = true;
            this.nullMessage = "无新留言反馈信息";
          }
        },
        async agree(id,index){
          let that = this;
          let res = await this.$axios.get('/api/person/agree?id='+id);
          if (res.data.code === '6666') {
            that.$message.success(res.data.message);
            //未读数量减一，按钮隐藏
            this.ansInfoNum = this.ansInfoNum -1;
            this.container[index].id=0;
            this.container.splice(index);
            this.total = this.total-1;
          }
        },
        async refuse(id,index){
          let that = this;
          let res = await this.$axios.get('/api/person/refuse?id='+id);
          if (res.data.code === '6666') {
            that.$message.success(res.data.message);
            //未读数量减一，按钮隐藏
            this.ansInfoNum = this.ansInfoNum -1;
            this.container[index].id=0;
            this.container.splice(index);
            this.total = this.total-1;
          }
        },
        async setIsRead(id,index){
          let that = this;
          let res = await this.$axios.get('/api/person/setIsRead?id='+id);
          if (res.data.code === '6666') {
            that.$message.success(res.data.message);
            //未读数量减一，按钮隐藏
            this.commentNum = this.commentNum -1;
            this.container[index].id=0;
            this.container.splice(index);
            this.total = this.total-1;
          }
        },
        async setInviteInfoIsRead(id,index){
          let that = this;
          let res = await this.$axios.get('/api/person/setInviteInfoIsRead?id='+id);
          if (res.data.code === '6666') {
            that.$message.success(res.data.message);
            //未读数量减一，按钮隐藏
            this.ansInfoNum =this.ansInfoNum - 1;
            this.container[index].id=0;
            this.container.splice(index);
            this.total = this.total-1;
          }
        }
      },
      beforeMount(){
        //获取系统通知条数和内容、新的答复及留言反馈条数
        this.commentInfo();
        this.replyInfo();
      },
    }
</script>

<style scoped>
  .contentBox{
    text-align: left;
    text-indent: 2em;
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
