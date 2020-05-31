<template>
    <div>
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
            prop="serial"
            label="订单编号">
          </el-table-column>
          <el-table-column
            prop="time"
            label="创建时间">
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
    </div>
</template>

<script>

    export default {
        name: "order",
      data(){
          return{
            orderData: [],
            userId: this.$store.getters.id
          }
      },
      methods: {},
      async mounted(){
        let res = await this.$axios.get('/api/person/getMyOrders?userId=' +this.userId);
        this.orderData = res.data.data;
      }
    }
</script>

<style scoped>

</style>
