<template>
  <div>
    <el-form ref="formPar" :model="formPar" label-width="120px" :rules="parRules" >
      <el-form-item label="家长身份" prop="parentType" >
        <el-radio-group v-model="formPar.parentType">
          <el-radio label="1" @change="change($event)">父亲</el-radio>
          <el-radio label="2" @change="change($event)">母亲</el-radio>
          <el-radio label="3" @change="change($event)">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="期待家教类型" >
        <el-tag
          :key="tag"
          v-for="tag in formPar.tutorType"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          @change="change($event)"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+  在此处添加类型</el-button>
      </el-form-item>
      <el-form-item label="期待家教地点" prop="tutorLoc" >
        <el-input type="textarea" v-model="formPar.tutorLoc" placeholder="例如：**省**市**区**小区"
                  @change="change($event)"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "Parent",
      data(){
          return{
            inputVisible: false,
            inputValue: '',
            formPar:{
              parentType:'',
              tutorType:['耐心'],
              tutorLoc:'',
            },
            parRules:{
              parentType:[{required:true,message:'请选择家长身份',trigger:'change'}],
              tutorLoc:[{required:true,message:'请输入期待上课地点',trigger:'change'}],
            }
          }
      },
      methods:{
          change(e){
            this.$emit('input',
              {
                parentType:this.formPar.parentType,
                tutorType:this.formPar.tutorType,
                tutorLoc:this.formPar.tutorLoc,
              })
          },
        handleClose(tag) {
          this.formPar.tutorType.splice(this.formPar.tutorType.indexOf(tag), 1);
        },
        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
        validateForm(){
          let flag=null;
          this.$refs['formPar'].validate((valid) => {
            if (valid) {
              flag=true;
            } else {
              flag=false;
            }
          });
          return flag;
        },
        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.formPar.tutorType.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        }
      }
    }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
