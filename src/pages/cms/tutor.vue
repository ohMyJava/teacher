<template>
  <div>
    <!-- 按钮区域：添加、修改、删除、查询 -->
    <el-row>
      <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
        <el-button type="primary" icon="el-icon-document-add" @click="dialogVisible = true">添加</el-button>
        <el-dialog
          title="家教信息"
          :visible.sync="dialogVisible"
          width="60%"
          :destroy-on-close="true"
          :before-close="handleClose">
          <edit v-if="dialogVisible" ref="addTutor" @getMessage="getFlag" :isShow="flag"></edit>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTutor()">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
        <el-button type="primary" icon="el-icon-edit" @click="getOneTutor()">修改</el-button>
        <el-dialog
          title="家教信息"
          :visible.sync="dialogVisible1"
          width="60%"
          @open="dosome()"
          :destroy-on-close="true"
          :before-close="handleClose">
          <edit1 v-if="dialogVisible1" ref="editTutor" @getMessage="getFlag1" :isShow="flag"></edit1>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="editStudent('form')">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
        <el-button type="primary" icon="el-icon-delete" @click="delTutor">删除</el-button>
      </el-col>
      <el-col :xs="12" :sm="10" :md="10" :lg="5" :xl="5">
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="padding-right: 5px">
          <el-input placeholder="请输入要查询家教姓名" v-model="condition"></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-button type="primary" icon="el-icon-search" @click="findTutor()">查询</el-button>
        </el-col>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-row>
      <el-table :data="tutorList"
                :current-page.sync="currentPage"
                @selection-change="handleSelectionChange"
                style="width: 100%"
                :row-style="{height:'15px'}"
                :cell-style="{padding:'5px 0'}"
                :max-height="350">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="tutorId" label="ID" v-if="this.show=false" > </el-table-column>
        <el-table-column prop="tutorName" label="姓名"> </el-table-column>
        <el-table-column prop="phoneNumber" label="联系方式"> </el-table-column>
        <el-table-column prop="tutorEducation" label="学历"> </el-table-column>
        <!--:show-overflow-tooltip="true" 解决了当此列内容过长自动换行的问题，它会以hover的方式显示全部信息-->
        <el-table-column prop="tutorLocation" label="所在地区" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="records">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
  import edit from '../../components/EditTutorForm'
  import edit1 from '../../components/EditTutorForm'
export default {
  props: {},
  data() {
    return {
      dialogVisible:false,
      dialogVisible1:false,
      flag:true,
      condition:'',
      tutorList:'',
      currentPage:1,
      pageSize:10,
      records:0,
      multipleSelection:[],
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
      this.selectTutors();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.selectTutors();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    getFlag(msg){
      this.dialogVisible=!msg;
    },
    getFlag1(msg){
      this.dialogVisible1=!msg;
    },
    addTutor(){
      this.$refs['addTutor'].check();
      this.selectTutors();
    },
    getOneTutor(){
      //获取当前选中id
      if (this.multipleSelection.length === 1) {
        this.dialogVisible1=true;
      }else {
        this.$message.warning("请选择一个学生！");
      }

    },
    dosome(){
      setTimeout(()=>{
        let id=this.multipleSelection[0].tutorId;
        this.$refs['editTutor'].getVal(id);
      })
    },
    editStudent(){
      this.$refs['editTutor'].modifyStudent(this.multipleSelection[0].tutorId);
      this.selectTutors();
    },
    delTutor(){
      var list=[];
      if (this.multipleSelection.length > 0) {
        for (let key in this.multipleSelection) {
          list[key] = this.multipleSelection[key].tutorId;
        }
        let delList=list.join(",");
        // console.log(this.multipleSelection)
        console.log(delList)
        // console.log(list)
        this.$axios.post('/api/tutor/delTutor',delList,{headers:{'content-type':'application/json'}}).then(res=>{
          if (res.data.code === '6666') {
            this.$message.success("删除成功！");
            this.selectTutors();
          }else {
            this.$message.error("删除失败，请联系管理员！");
          }
        })
      }else {
        this.$message.error("请至少选择一名学生！");
      }
    },
    findTutor(){
      if (this.condition !== null) {
        this.currentPage=1;
        this.selectTutors();
      }
    },
    async selectTutors(){
      let response=await this.$axios.get('/api/tutor/tutorNumber?condition='+this.condition.trim());
      this.$data.records=response.data.data;
      let res=await this.$axios.get('/api/tutor/getTutors?limit='
        +this.pageSize+'&page='
        +this.currentPage+'&condition='+this.condition.trim());
      this.tutorList=res.data.data;
    }
  },
  components: {
    edit,
    edit1
  },
  mounted(){
    this.selectTutors();
  }
};
</script>

<style scoped></style>
