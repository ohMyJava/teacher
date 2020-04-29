<template>
    <div>
      <el-row>
        <!-- 如果为学校管理员，添加功能不被实现 思路：v-if -->
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
          <el-dialog
            title="添加管理员"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">
            <edit-admin-form ref="addAdminForm"></edit-admin-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAdmin()">确 定</el-button>
          </span>
          </el-dialog>
        </el-col>
        <!-- 只有当前用户为超级管理员才被实现 v-if -->
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
          <el-button type="primary" icon="el-icon-delete" >删除</el-button>
        </el-col>
        <el-col :xs="6" :sm="6" :md="5" :lg="3" :xl="3">
          <el-button type="primary" icon="el-icon-edit" @click="dialogVisible1 = true">编辑个人信息</el-button>
          <el-dialog
            title="修改资料"
            :visible.sync="dialogVisible1"
            width="60%"
            :before-close="handleClose">
            <edit-admin-form ref="editAdminForm"></edit-admin-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="editAdmin()">确 定</el-button>
          </span>
          </el-dialog>
        </el-col>
        <el-col :xs="10" :sm="10" :md="10" :lg="5" :xl="5">
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="padding-right: 5px">
            <el-input placeholder="请输入管理员账号" v-model="adminNameSearch"></el-input>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-button icon="el-icon-search" type="primary" @click="getAdminList">查询</el-button>
          </el-col>
        </el-col>
      </el-row>

      <el-row>
        <el-table
          ref="multipleTable"
          :data="adminData"
          tooltip-effect="dark"
          style="width: 100%"
          :max-height="400"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'5px 0'}"
          size="medium"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="adminName"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="power"
            label="权限">
          </el-table-column>
          <el-table-column
            prop="adminInformation"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
    </div>
</template>

<script>
  import EditAdminForm from '../../../components/EditAdminForm';
    export default {
        name: "systemEdit",
      props: {},
      data() {
        return {
          dialogVisible:false,
          dialogVisible1:false,
          adminNameSearch: '',
          multipleSelection: [],
          adminData: [],
          total: 0,
          currentPage: 1,
          limit: 10,
        };
      },
      created(){
        this.getAdminList();
      },
      methods: {
        async getAdminList(){
          let res =await this.$axios.get('/api/admin/getAdmins?power=0');
          console.log(res);
          this.$data.adminData=res.data.data;
          this.$data.total=res.data.data.length;
          console.log("查询了管理员列表")
          /*分页模糊请求后端*/
        },
        addAdmin(){
          this.$message.info("添加用户");
          this.dialogVisible=false;
        },
        editAdmin(){
          this.$message.info("修改个人资料");
          this.dialogVisible1=false;
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.getAdminList();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.getAdminList();
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      },
      components: {
        EditAdminForm,
      }
    }
</script>

<style scoped>

</style>
