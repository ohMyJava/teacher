<template>
    <div style="margin-top: -30px">
      <!-- 分类搜索筛选 -->
      <el-row style="margin: 10px 0">
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
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sex">
        </el-table-column>
        <el-table-column
          label="辅导科目"
          prop="able">
        </el-table-column>
        <el-table-column
          label="年级"
          prop="grade">
        </el-table-column>
        <el-table-column
          label="所在地"
          prop="location">
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
              @click="handleDelete(scope.$index, scope.row)">申请</el-button>
          </template>
        </el-table-column>
      </el-table>
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
          studentList: [],
          search: '',
          currentPage:1,
          limit:10,
          total:0,
          able:'',
          grade:'',
          location:'',
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index)
          console.log(row)
          alert("你查看了我")
        },
        handleDelete(index, row) {
          confirm("确定要申请当Ta的家教吗")
          //  确认邀请后，显示选择自己绑定的学生信息。以便系统将学生信息发送给家教
        },
        handleSizeChange(val) {
          this.limit=val;
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },
        async select(){
          let res=await this.$axios.post(
            '/api/tutor/tutorFilter',
            {able:this.able,school:this.grade,location:this.location,limit:this.limit,page:this.currentPage},
            {headers:{"content-type":"application/json"}});
          this.studentList=res.data.data;
          this.total=this.data.data.length;
        },
        reset(){
          this.able='';
          this.school='';
          this.location='';
          this.select();
        }
      },
      async mounted(){
        let res = await this.$axios.get('../../static/json/studentList.json');
        this.total=res.data.length;
        this.studentList=res.data;
      }
    }
</script>

<style scoped>
  .el-input{
    width: 66%;
  }
</style>
