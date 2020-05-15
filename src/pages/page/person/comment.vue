<template>
    <div>
      <h3>留言反馈页面</h3>
      <el-divider></el-divider>
      <el-form :rules="rule" ref="form" :model="form">
        <el-form-item label="留言类型" prop="commentType">
          <el-select v-model="form.commentType" placeholder="请选择类型">
            <el-option
              v-for="(v,i) in typeList"
              :key="i"
              :label="v.title"
              :value="v.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留言内容" prop="commentContent">
          <el-input type="textarea" v-model="form.commentContent" placeholder="请输入留言内容"></el-input>
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
              commentType:'',
              commentContent:'',
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
              //当前id
              this.form.userId=1;
              let res = await this.$axios.post(
                "/api/person/addComment",
                JSON.stringify(this.form),
                {headers:{"content-type":"application/json"}});
              if (res.data.code === "6666") {
                this.$message.success(res.data.message);
                this.content='';
              }else {
                this.$message.warning(res.data.message);
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
