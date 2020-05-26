<template>
 <div style="margin-top: -30px">
   <!-- 分类搜索筛选 -->
   <el-row style="margin: 10px 0" v-if="!isLogin">
     <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
       辅导科目：<el-input v-model="able" placeholder="请输入筛选条件"></el-input>
     </el-col>
     <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
       学校：<el-input v-model="school" placeholder="请输入筛选条件"></el-input>
     </el-col>
     <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
       地区：<el-input v-model="location" placeholder="请输入筛选条件"></el-input>
     </el-col>
     <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
       <el-button round type="primary" @click="select">筛选</el-button>
       <el-button round type="primary" @click="reset">重置</el-button>
     </el-col>
   </el-row>
   <el-table
     :data="tutorList"
     style="width: 100%"
     :current-page.sync="currentPage"
     :max-height="450">
     <el-table-column
       label="ID"
       prop="tutorId"
       v-if="this.show=false">
     </el-table-column>
     <el-table-column
       label="姓名"
       prop="tutorName">
     </el-table-column>
     <el-table-column
       label="性别"
       prop="tutorSex">
     </el-table-column>
     <el-table-column
       label="擅长科目"
       prop="tutorGoodSubjects">
     </el-table-column>
     <el-table-column
       label="学校"
       prop="tutorSchool">
     </el-table-column>
     <el-table-column
       label="学历"
       prop="tutorEducation">
     </el-table-column>
     <el-table-column
       label="所在地"
       prop="tutorLocation">
     </el-table-column>
     <el-table-column
       align="center">
       <template slot-scope="scope">
         <el-button
           size="mini"
           @click="handleEdit(scope.$index, scope.row)">查看</el-button>
         <el-button
           size="mini"
           type="danger"
           @click="handleDelete(scope.$index, scope.row)"v-if="!isLogin">邀请</el-button>
       </template>
     </el-table-column>
   </el-table>
   <el-dialog
     :title='tutorInfo.tutorName'
     :visible.sync="dialogVisible"
     width="40%"
     :before-close="handleClose">
     <div class="tutor-info">
       <p>家教姓名：{{tutorInfo.tutorName}}</p>
       <p>家教年龄：{{tutorInfo.tutorAge}}</p>
       <p>家教性别：{{tutorInfo.tutorSex}}</p>
       <p>擅长科目：{{tutorInfo.tutorGoodSubjects}}</p>
       <p>联系方式：{{tutorInfo.phoneNumber}}</p>
       <p>学&nbsp;&nbsp;历：{{tutorInfo.tutorEducation}}</p>
       <p>所在地区：{{tutorInfo.tutorLocation}}</p>
       <p>学&nbsp;&nbsp;校：{{tutorInfo.tutorSchool}}</p>
       <p>兴趣爱好：{{tutorInfo.tutorHobby}}</p>
     </div>
     <span slot="footer" class="dialog-footer">
             <el-link type="primary" href="/login" v-if="!isLogin">登录查看详细信息</el-link>
            <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
           </span>
   </el-dialog>
   <el-dialog
     :title="'请选择学生'"
     :visible.sync="dialogVisible1"
     width="40%"
     :before-close="handleClose">
     <el-select v-model="studentValue" placeholder="请选择学生">
       <el-option
         v-for="item in studentList"
         :key="item.id"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select>
     <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确定</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">关闭</el-button>
           </span>
   </el-dialog>
   <div class="block">
     <el-pagination
       background
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage"
       :page-sizes="[10, 20, 50, 100]"
       :page-size.sync="limit"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total">
     </el-pagination>
   </div>
 </div>
</template>

<script>
    export default {
        name: "TutorCenter",
      data() {
        return {
          isLogin:this.$store.getters.isLogin,
          currentUser:this.$store.getters.currentUser,
          userId:this.$store.getters.id,
          studentValue:'',
          dialogVisible:false,
          dialogVisible1:false,
          tutorList: [],
          tutorInfo:{},
          search: '',
          currentPage:1,
          limit:10,
          total:0,
          able:'',
          school:'',
          location:'',
          studentList:[],
          tutorId:'',
        }
      },
      methods: {
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        handleEdit(index, row) {
          this.selectOneTutor(row.tutorId)
          this.dialogVisible=true;
          console.log(index);
          console.log(row);
        },
        handleDelete(index, row) {
          this.$confirm('是否要成为Ta的家教', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            //  确认邀请后，显示选择自己绑定的学生信息。以便系统将学生信息发送给家教
            this.tutorId = row.tutorId;
            let count = this.studentList.length;
            switch (count) {
              case 0:
                this.$message.warning("您还不是学生！");
                break;
              case 1:
                //执行邀请操作
                let stuId = this.studentList[0].studentId;
                this.invite(stuId,tutorId,this.userId);
                break;
              default:
                this.dialogVisible1 = true;
            }
          }).catch(() => {});
          this.tutorId='';
        },
        handleSizeChange(val) {
          this.limit=val;
          this.select();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.select();
        },
        async select(){
          let res=await this.$axios.post(
            '/api/tutorPage/getTutors',
            {limit:this.limit,page:this.currentPage,able:this.able,school:this.school,location:this.location},
            {headers:{"content-type":"application/json"}});
          this.tutorList=res.data.data;
          let resp=await this.$axios.get('api/tutorPage/getNumbers?able='+this.able+
                                         '&school='+this.school+'&location='+this.location);
          this.total=resp.data.data;
        },
        reset(){
          this.able='';
          this.school='';
          this.location='';
          this.select();
        },
        async selectOneTutor(id){
          let res=await this.$axios.get('/api/tutorPage/getOneTutor?tutorId='+id);
          this.tutorInfo=res.data.data;
        },
        submit(tutorId,userId){
          let stuId = this.studentValue;
          let result = this.invite(stuId,tutorId,userId);
          if (result === 1){
            this.dialogVisible1 = false;
          }
        },
        async invite(stuId,tutorId,userId){
          let form = {};
          form.stuId=stuId;
          form.tutorId=tutorId;
          form.userId=userId;
          let res =await this.$axios.post(
            "/api/tutorPage/invited",
            JSON.stringify(form),
            {headers:{'content-type':'application-json'}});
          if (res.data.code === '6666') {
            this.$message.success(res.data.info);
            return 1;
          }else {
            this.$message.warning("请求出错")
          }
        },
      },
      async mounted(){
        this.select();
      },
      async created(){
        //页面加载完后，去请求后端查询该用户是否有学生身份
        let res = await this.$axios.get('/api/tutorPage/getUserStudent?userName='+this.currentUser);
        this.studentList = res.data.data;
      }
    }
</script>

<style scoped>
  .el-input{
    width: 66%;
  }
  .tutor-info{
    padding: 0 15px;
    text-align: left;
  }
  .tutor-info p{
    text-indent: 1em;
    border: 1px solid gray;
  }
</style>
