<template>
    <div>
      <el-row>
        <el-col :xs="16" :sm="16" :md="10" :lg="10" :xl="10">
          <el-input v-model="condition" placeholder="请输入学生或家教姓名"></el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="3" :lg="3" :xl="3" >
          <el-button type="primary" round icon="el-icon-search" @click="select">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          ref="multipleTable"
          :data="orderData"
          tooltip-effect="dark"
          style="width: 100%"
          height="400"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'5px 0'}"
          size="medium"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="serial"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="tutorName"
            label="家教姓名">
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
    export default {
        name: "OrderTable",
      data(){
          return{
            condition:'',
            multipleSelection:[],
            orderData: [],
            total: 0,
            currentPage: 1,
            limit: 10,
          }
      },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.limit = val;
          this.select();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.select();
        },
        async select(){
          let res=await this.$axios.get('/api/order/getOrders?limit='+this.limit+
            "&page="+this.currentPage+
            "&condition="+this.condition)
          this.orderData=res.data.data;
          let resp = await this.$axios.get('/api/order/getOrdersNum?condition='+this.condition);
          this.total = resp.data.data;
        },
      },
      created(){
          this.select();
      }
    }
</script>

<style scoped>

</style>
