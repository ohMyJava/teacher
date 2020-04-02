<template>
    <div>
      <el-form ref="formStu" :model="formStu" label-width="120px" :rules="stuRules" >
      <el-form-item label="年级" prop="grade" >
          <el-select v-model="formStu.grade" placeholder="请选择年级" @change="change($event)">
            <el-option
              v-for="(item, index) in formStu.gradeList"
              :key="index"
              :label="item.title"
              :value="item.title">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文理科" prop="subject" >
          <el-radio-group v-model="formStu.subject">
            <el-radio label="1" @change="change($event)">文科</el-radio>
            <el-radio label="2" @change="change($event)">理科</el-radio>
            <el-radio label="3" @change="change($event)">未分科</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="兴趣爱好" >
          <el-tag
            :key="tag"
            v-for="tag in formStu.hobby"
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
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+  在此处添加新兴趣</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Stu",
      data(){
          return{
            inputVisible: false,
            inputValue: '',
            formStu:{
              grade:'',
              gradeList:[
                {id:1,title:'小学一年级'},
                {id:2,title:'小学二年级'},
                {id:3,title:'小学三年级'},
                {id:4,title:'小学四年级'},
                {id:5,title:'小学五年级'},
                {id:6,title:'小学六年级'},
              ],
              subject: '',
              hobby: [],
            },
            stuRules:{
              grade:[
                {required:true,message:'请选择年级',trigger:'change'}
              ],
              subject:[
                {required:true,message:'请选择文理科情况',trigger:'change'}
              ],
            }
          }
      },
      methods: {
          change($event){
            console.log($event);
            // this.$emit('change', $event);
            this.$emit('input', {
              grade: this.formStu.grade,
              subject: this.formStu.subject,
              hobby:this.formStu.hobby,
            })
            // 要是上边两个不懈  v-model就不行了
            // 这个input时间应该是个最主要的
          },
        handleClose(tag) {
          this.formStu.hobby.splice(this.formStu.hobby.indexOf(tag), 1);
        },
        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
        validateForm(){
            let flag=null;
          this.$refs['formStu'].validate((valid) => {
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
            this.formStu.hobby.push(inputValue);
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
