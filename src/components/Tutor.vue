<template>
  <div>
    <el-form ref="formTutor" :model="formTutor" label-width="120px" :rules="tutRules" >
      <el-form-item label="学历" prop="education" >
        <el-select v-model="formTutor.education" placeholder="请选择学历" @change="change($event)">
          <el-option
            v-for="(item, index) in formTutor.educationList"
            :key="index"
            :label="item.title"
            :value="item.title">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="擅长科目" >
        <el-tag
          :key="tag"
          v-for="tag in formTutor.goodSubjects"
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
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+  在此处添加科目</el-button>
      </el-form-item>
      <el-form-item label="可辅导年级" prop="gradeList">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="formTutor.gradeList" @change="handleCheckedGradesChange;change($event)">
          <el-checkbox v-for="grade in grades" :label="grade" :key="grade">{{grade}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    const gradeOptions = ['小学', '初中', '高中', '大学'];
    export default {
        name: "Tutor",
      data(){
          return{
            checkAll: false,
            grades: gradeOptions,
            isIndeterminate: true,
            inputVisible: false,
            inputValue: '',
            formTutor:{
              education:'',
              educationList:[
                {id:1,title:'大一'},
                {id:2,title:'大二'},
                {id:3,title:'大三'},
                {id:4,title:'大四'},
                {id:5,title:'研究生'},
                {id:6,title:'已毕业'},
              ],
              goodSubjects:[],
              gradeList: ['小学'],
            },
            tutRules:{
              education:[
                {required:true,message:'请选择学历',trigger:'change'}
              ],
              gradeList:[
                {required:true,message:'请选择辅导范围',trigger:'change'}
              ]
            }
          }
      },
      methods:{
        change($event){
          this.$emit('input', {
            education: this.formTutor.education,
            goodSubjects: this.formTutor.goodSubjects,
            gradeList:this.formTutor.gradeList,
          })
        },
        handleClose(tag) {
          this.formTutor.goodSubjects.splice(this.formTutor.goodSubjects.indexOf(tag), 1);
        },
        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
        validateForm(){
          let flag=null;
          this.$refs['formTutor'].validate((valid) => {
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
            this.formTutor.goodSubjects.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        },
        handleCheckAllChange(val) {
          this.formTutor.gradeList = val ? gradeOptions : [];
          this.isIndeterminate = false;
        },
        handleCheckedGradesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.grades.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.grades.length;
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
