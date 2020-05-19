<template>
    <div>
      <h3>系统管理处理用户留言界面</h3>
      <!-- 留言显示区域 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.submitTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.commentTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.commentContent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">回复</el-button>
            <el-dialog
              title="处理用户留言"
              :visible.sync="dialogVisible"
              width="60%"
              :before-close="handleClose">
              <span>回复内容</span>
              <el-input type="textarea" placeholder="请输入回复内容" v-model="answer"></el-input>
              <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="apply()">回复</el-button>
  </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "systemComment",
      data(){
          return{
            currentPage:1,
            limit:10,
            total:0,
            dialogVisible: false,
            tableData:[
              {
                commentContent:'无未处理留言'
              }
            ],
            answer:'',
            currId:0,
          }
      },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        handleEdit(index, row) {
          console.log(index, row);
          this.currId=row.commentId;
          this.dialogVisible=true;

        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        async apply(){
          console.log(this.currId);
          let res = await this.$axios.post("/api/admin/answerComment",
            {commentId:this.currId,answer:this.answer},{headers:{"content-type":"application/json"}});
          if (res.data.code === "6666") {
            this.$message.success("回复成功！");
            this.dialogVisible = false;
          }else {
            this.$message.warning("回复失败！");
          }
        }
      },
      async beforeMount(){
          let res = await this.$axios.get("/api/admin/getComments?page="+this.currentPage+"&limit="+this.limit);
          if (res.data.code === "6666") {
            this.tableData=res.data.data;
          }
          let resp = await this.$axios.get("/api/admin/getCommentsNum");
          this.total = resp.data.data;
      }
    }
</script>

<style scoped>

</style>
