<template>
    <div style="margin-top: -30px">
      <!-- 分类搜索筛选 -->
      <el-row style="margin: 10px 0" v-if="!isLogin">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          辅导科目：<el-input v-model="able" placeholder="请输入筛选条件"></el-input>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          年级：<el-input v-model="grade" placeholder="请输入筛选条件"></el-input>
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
        :data="studentList"
        style="width: 100%"
        :current-page="currentPage"
        :max-height="450">
        <el-table-column
          label="ID"
          prop="studentId"
          v-if="this.show=false">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="studentName">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="studentSex">
        </el-table-column>
        <el-table-column
          label="辅导科目"
          prop="expectTutorAble">
        </el-table-column>
        <el-table-column
          label="年级"
          prop="studentGrade">
        </el-table-column>
        <el-table-column
          label="期待家教地点"
          prop="expectTutorLocation">
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
              @click="handleDelete(scope.$index, scope.row)" v-if="!isLogin">申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title='studentInfo.studentName'
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <div class="student-info">
          <p>学生姓名：{{studentInfo.studentName}}</p>
          <p>学生年龄：{{studentInfo.studentAge}}</p>
          <p>学生性别：{{studentInfo.studentSex}}</p>
          <p>学生年级：{{studentInfo.studentGrade}}</p>
          <p>文理科：{{studentInfo.studentSubject}}</p>
          <p>联系方式：{{studentInfo.phoneNumber}}</p>
          <p>辅导科目：{{studentInfo.expectTutorAble}}</p>
          <p>家教地点：{{studentInfo.expectTutorLocation}}</p>
          <p>学生爱好：{{studentInfo.studentHobby}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
             <el-link type="primary" href="/login" v-if="isLogin">登录查看详细信息</el-link>
            <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
           </span>
      </el-dialog>
      <el-dialog
        :title="'请选择家教'"
        :visible.sync="dialogVisible1"
        width="40%"
        :before-close="handleClose">
        <el-select v-model="tutorValue" placeholder="请选择家教">
          <el-option
            v-for="item in tutorList"
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
        name: "StuCenter",
      data() {
        return {
          isLogin:this.$store.getters.isLogin,
          currentUser:this.$store.getters.currentUser,
          id:this.$store.getters.id,
          tutorValue:'',
          dialogVisible:false,
          dialogVisible1:false,
          studentInfo:{},
          studentList: [],
          search: '',
          currentPage:1,
          limit:10,
          total:0,
          able:'',
          grade:'',
          location:'',
          tutorList:[],
          stuId:'',
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
          console.log(row);
          this.selectOneStudent(row.studentId);
          this.dialogVisible=true;
        },
        handleDelete(index, row) {
          this.$confirm('是否要成为Ta的家教', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            //  确认邀请后，显示选择自己绑定的学生信息。以便系统将学生信息发送给家教
            this.stuId = row.studentId;
            let count = this.tutorList.length;
            switch (count) {
              case 0:
                this.$message.warning("您还不是家教！");
                break;
              case 1:
                //执行邀请操作
                let tutorId = this.tutorList[0].tutorId;
                this.invite(stuId,tutorId,userId);
                break;
              default:
                this.dialogVisible1 = true;
            }
          }).catch(() => {});
          this.stuId='';
        },
        handleSizeChange(val) {
          this.limit=val;
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },
        async select(){
          let res=await this.$axios.post(
            '/api/studentPage/getStudents',
            {able:this.able,grade:this.grade,location:this.location,limit:this.limit,page:this.currentPage},
            {headers:{"content-type":"application/json"}});
          this.studentList=res.data.data;

          let resp=await this.$axios.get('/api/studentPage/getNumbers?able='+this.able+
            '&school='+this.school+'&location='+this.location);
          this.total=resp.data.data;
        },
        reset(){
          this.able='';
          this.school='';
          this.location='';
          this.select();
        },
        async selectOneStudent(id){
          let res=await this.$axios.get('/api/studentPage/getOneStudent?studentId='+id);
          this.studentInfo=res.data.data;
        },
        submit(){
          let tutorId = this.tutorValue;
          let result = this.invite(this.stuId,tutorId,userId);
          if (result === 1){
            this.dialogVisible1 = false;
          }
        },
        async invite(stuId,tutorId,userId){
          let form = {};
          form.stuId=stuId;
          form.tutorId=tutorId;
          form.inviteUserId=userId;
          let res =await this.$axios.post(
            "/api/studentPage/invite",
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
          //页面加载完后，去请求后端查询该用户是否有家教身份
          let res = await this.$axios.get('/api/studentPage/getUserTutor?userName='+this.currentUser);
          // 测试两种方法能否都可以获取到值（后端返回的JSON字符串）
          // this.tutorList = JSON.parse(res.data.data);
          this.tutorList = res.data.data;
      },
    }
</script>

<style scoped>
  .el-input{
    width: 66%;
  }
  .student-info{
    padding: 0 15px;
    text-align: left;
  }
  .student-info p{
    text-indent: 1em;
    border: 1px solid gray;
  }
</style>
