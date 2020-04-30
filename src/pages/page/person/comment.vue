<template>
    <div>
      <h3>留言反馈页面</h3>
      <el-divider></el-divider>
      <el-form :rules="rule" ref="form" :model="form">
        <el-form-item label="留言类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="(v,i) in typeList"
              :key="i"
              :label="v.title"
              :value="v.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留言内容" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="请输入留言内容"></el-input>
        </el-form-item>
        <span style="text-align: center"><el-button round type="primary" @click="submit">提交</el-button></span>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "comment",
      data(){
          return{
            form:{
              type:'',
              content:'',
            },
            typeList:[
              {title:'错误提交',id:1},
              {title:'意见反馈',id:2},
              {title:'其他',id:3},
            ],
            rule:{
              type:[{required:true,message:'请选择留言类型',trigger:'blur'}],
              content:[{required:true,message:'请输入留言内容',trigger:'blur'}],
            }
          }
      },
      methods:{
        submit(){
          console.log(this.type);
          this.$refs['form'].validate(async(valid)=>{
            if (valid) {
              let res = await this.$axios.post(
                "/api/person/pushComment",
                {type:this.type,comment:this.comment},
                {headers:{"content-type":"application/json"}});
              if (res.data.code === "6666") {
                this.$message.success("提交成功！");
                this.content='';
              }else {
                this.$message.warning("提交失败！请重试或联系管理员！");
              }
            }else {
              this.$message.warning("请正确填写！");
            }
          })

        }
      }
    }
</script>

<style scoped>

</style>
