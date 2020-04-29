<template>
    <div>
      <el-row>
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
        </el-col>
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
        </el-col>
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
          <el-button type="primary" icon="el-icon-delete" >删除</el-button>
        </el-col>
        <el-col :xs="12" :sm="10" :md="10" :lg="5" :xl="5">
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="padding-right: 5px">
            <el-input placeholder="请输入要查询用户账号或姓名" v-model="condition"></el-input>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-button type="primary" icon="el-icon-search" @click="getUsers()">查询</el-button>
          </el-col>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-row>
        <el-table :data="userList"
                  :current-page.sync="currentPage"
                  @selection-change="handleSelectionChange"
                  style="width: 100%"
                  :row-style="{height:'15px'}"
                  :cell-style="{padding:'5px 0'}"
                  :max-height="350">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="userId" label="ID" v-if="this.show=false" > </el-table-column>
          <el-table-column prop="userName" label="用户名"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="phoneNumber" label="联系方式"> </el-table-column>
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
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "user",
      data(){
          return{
            condition:'',
            userList:[
              {
                userId:'0001',
                userName:'2020-04-24',
                name:'张三',
                phoneNumber:'家教',
              },
            ],
            currentPage:0,
            limit:10,
            total:0,
            multipleSelection: [],
          }
      },
      methods:{
        handleSizeChange(val) {
          this.limit=val;
          this.getUsers();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getUsers();
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection);
        },
        getUsers(){
          console.log("ok")
        }
      }
    }
</script>

<style scoped>

</style>
