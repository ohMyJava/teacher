<template>
    <div>
      <el-form ref="formAdm" :model="formAdm" label-width="120px" :rules="admRules" >
        <el-form-item label="权限" prop="power" >
          <el-select v-model="formAdm.power" placeholder="请选择权限" @change="change($event)">
            <el-option
              v-for="(item, index) in formAdm.powerList"
              :key="index"
              :label="item.title"
              :value="item.title">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密钥" prop="keywords">
          <el-input v-model="formAdm.keywords" placeholder="请输入密钥" @change="change($event)"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Admin",
      data(){
          return{
            formAdm:{
              power:'',
              powerList:[
                {id:1,title:'系统管理员'},
                {id:2,title:'省管理员'},
                {id:3,title:'市管理员'},
                {id:4,title:'区管理员'},
                {id:5,title:'学校管理员'},
              ],
              keywords:'',
            },
            admRules:{
              power:[
                {required:true,message:'请选择权限',trigger:'change'}
              ],
              keywords:[
                {required:true,message:'请输入密钥',trigger:'change'}
              ],
            }
          }
      },
      methods:{
        change($event){
          this.$emit('input', {
            power: this.formAdm.power,
            keywords: this.formAdm.keywords,
          })
        },
        validateForm(){
          let flag=null;
          this.$refs['formAdm'].validate((valid) => {
            if (valid) {
              flag=true;
            } else {
              flag=false;
            }
          });
          return flag;
        },
      }
    }
</script>

<style scoped>

</style>
