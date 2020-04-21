<template>
  <div>
    <!--按钮区域-->
    <el-row >
      <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
        <el-button type="primary" icon="el-icon-document-add" @click="dialogVisible = true">添加</el-button>
        <el-dialog
          title="学生信息"
          :visible.sync="dialogVisible"
          width="60%"
          :destroy-on-close="true"
          :before-close="handleClose">
          <edit v-show="dialogVisible" ref="addList"></edit>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addStudent('form')">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
          <el-button type="primary" icon="el-icon-edit" @click="dialogVisible1=true;getOneStudent()">修改</el-button>
        <el-dialog
          title="学生信息"
          :visible.sync="dialogVisible1"
          width="60%"
          :destroy-on-close="true"
          :before-close="handleClose">
          <edit v-show="dialogVisible1" ref="editList"></edit>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="editStudent('form')">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
          <el-button type="primary" icon="el-icon-delete" @click="delStudent">删除</el-button>
      </el-col>
      <el-col :xs="12" :sm="10" :md="10" :lg="5" :xl="5">
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="padding-right: 5px">
          <el-input placeholder="请输入要查询学生姓名" v-model="condition"></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-button type="primary" icon="el-icon-search" @click="selectStudent">查询</el-button>
        </el-col>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="studentList"
                :current-page.sync="currentPage"
                @selection-change="handleSelectionChange"
                style="width: 100%"
                :row-style="{height:'15px'}"
                :cell-style="{padding:'5px 0'}"
                :max-height="350">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" v-if="this.show=false" > </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="grade" label="年级"> </el-table-column>
        <el-table-column prop="subject" label="专业"> </el-table-column>
        <!--:show-overflow-tooltip="true" 解决了当此列内容过长自动换行的问题，它会以hover的方式显示全部信息-->
        <el-table-column prop="location" label="家教地点" :show-overflow-tooltip="true"> </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration">大于 7 页时的效果</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="records">
        </el-pagination>
      </div>
    </el-row>

  </div>
</template>

<script>
  import editStudent from '../../components/EditStudent';
export default {
  props: {
    addList:{
    }
  },
  data() {
    return {
      dialogVisible:false,
      dialogVisible1:false,
      condition:'',
      pageSize:10,
      currentPage: 1,
      multipleSelection: [],
      studentList: [
      ],
      addStudentList:[],
      records:0,

    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange(val) {
      this.pageSize=val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.selectStudent();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addStudent(formName){
      //调用子组件的check方法，验证并提交表单
      if(this.$refs['addList'].check()==='1'){
        this.dialogVisible=false;
      }else{
        this.dialogVisible=true;
      }
    },
    getOneStudent(){
      this.$refs.addList.getVal();
    },
    editStudent(){
      console.log("edit");
      if (this.multipleSelection.length === 1) {
        let id=this.multipleSelection.id;
        console.log(id);
      }
      // this.$refs['addList'].getVal()
    },
    delStudent(){
      //multipleSelection中是根据选中顺序添加或删除选项的，所以其中列表并不会按照id从小到大的顺序，并且数组中存放的是整个对象。
      var list=[];
      if (this.multipleSelection.length > 0) {
        for (let key in this.multipleSelection) {
         list[key] = this.multipleSelection[key].id;
        }
        let delList=list.join(",");
        console.log(delList);
        this.$axios.post('/api/student/delStudent',{delList:delList}).then(res=>{
          if (res.data.code === '6666') {
            this.$message.success("删除成功！");
            this.selectStudent();
          }else {
            this.$message.error("删除失败，请联系管理员！");
          }
        })
      }else {
        this.$message.error("请至少选择一名学生！");
      }
    },
    async selectStudent(){
      let response=await this.$axios.get('/api/student/studentNumber');
      this.$data.records=response.data.data;
      let res=await this.$axios.get('/api/student/getStudents?limit='
        +this.pageSize+'&page='
        +this.currentPage+'&condition='+this.condition);
      this.$data.studentList=res.data.data;
    },
  },
  components: {
    edit: editStudent,
  },
  created() {
    this.selectStudent();
  }
};
</script>

<style scoped>

</style>
