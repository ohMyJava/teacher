<template>
 <div style="margin-top: -30px">
   <!-- 分类搜索筛选 -->
   <el-row>
     <el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3"></el-col>
     <el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3"></el-col>
     <el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3"></el-col>
     <el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3"></el-col>
   </el-row>
   <el-table
     :data="tutorList.filter(data => !search
                             || data.able.toLowerCase().includes(search.toLowerCase())
                             || data.school.toLowerCase().includes(search.toLowerCase())
                             || data.education.toLowerCase().includes(search.toLowerCase())
                             || data.location.toLowerCase().includes(search.toLowerCase()))"
     style="width: 100%"
     :current-page.sync="currentPage"
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
       label="擅长科目"
       prop="able">
     </el-table-column>
     <el-table-column
       label="学校"
       prop="school">
     </el-table-column>
     <el-table-column
       label="学历"
       prop="education">
     </el-table-column>
     <el-table-column
       label="所在地"
       prop="location">
     </el-table-column>
     <el-table-column
       align="center">
       <template slot="header" slot-scope="scope">
         <el-input
           v-model="search"
           size="mini"
           placeholder="输入关键字搜索"/>
       </template>
       <template slot-scope="scope">
         <el-button
           size="mini"
           @click="handleEdit(scope.$index, scope.row)">查看</el-button>
         <el-button
           size="mini"
           type="danger"
           @click="handleDelete(scope.$index, scope.row)">邀请</el-button>
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
        name: "TutorCenter",
      data() {
        return {
          tutorList: [],
          search: '',
          currentPage:1,
          limit:10,
          total:0
        }
      },
      methods: {
        handleEdit(index, row) {
          alert("你查看了我")
        },
        handleDelete(index, row) {
          confirm("确定要邀请他当您的家教吗")
        //  确认邀请后，显示选择自己绑定的学生信息。以便系统将学生信息发送给家教
        },
        handleSizeChange(val) {
          this.limit=val;
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },
      },
      async mounted(){
        let res = await this.$axios.get('../../static/json/tutorList.json');
        this.total=res.data.length;
        this.tutorList=res.data;
      }
    }
</script>

<style scoped>

</style>
