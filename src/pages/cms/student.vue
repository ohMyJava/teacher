<template>
  <div>
    <el-row> </el-row>
    <el-table :data="studentList" style="width: 100%">
      <el-table-column prop="id" label="ID" v-if="this.show=false"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="grade" label="年级"> </el-table-column>
      <el-table-column prop="subject" label="专业"> </el-table-column>
      <el-table-column prop="location" label="家教地点"> </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">大于 7 页时的效果</span>
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      studentList: [
        {
          id:'',
          name:'a',
          grade:'a',
          subject:'a',
          location:'a'
        }
      ]
    };
  },
  methods: {},
  components: {},
  beforeCreate() {
    /*this.$axios.get('student/getStudent').then(function (response) {
      console.log(response);
    })*/
    //从响应中获取JSON数据，遍历数据并赋值给studentList
  }
};
</script>

<style scoped></style>
