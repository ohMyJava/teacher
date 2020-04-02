<template>
  <div>
    <el-row> </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="professional" label="专业"> </el-table-column>
      <el-table-column prop="money" label="时薪"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          age: 18,
          professional: "初中数学",
          money: 80
        },
        {
          name: "王小虎",
          age: 18,
          professional: "初中数学",
          money: 80
        },
        {
          name: "王小虎",
          age: 18,
          professional: "初中数学",
          money: 80
        },
        {
          name: "王小虎",
          age: 18,
          professional: "初中数学",
          money: 80
        }
      ]
    };
  },
  methods: {},
  components: {}
};
</script>

<style scoped></style>
