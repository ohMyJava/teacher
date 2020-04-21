<template>
    <div>
        <el-form :model="addList" :rules="rules" ref="form">
          <el-form-item label="学生姓名" prop="studentName">
            <el-input v-model="addList.studentName" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
          <el-form-item label="学生年龄" prop="studentAge">
            <el-input v-model="addList.studentAge" placeholder="请输入学生年龄"></el-input>
          </el-form-item>
          <el-form-item label="用户账号" prop="userName">
            <el-input v-model="addList.userName" placeholder="请输入用户账号"></el-input>
          </el-form-item>
          <el-form-item label="学生性别" prop="studentSex">
            <el-radio-group v-model="addList.studentSex">
              <el-radio label="1" >男</el-radio>
              <el-radio label="0" >女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学生年级" prop="studentGrade">
            <el-select v-model="addList.studentGrade" placeholder="请选择学生年级">
              <el-option v-for="(item,index) in gradeList" :key="index" :label="item.title" :value="item.title" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生科目" prop="studentSubject">
            <el-radio-group v-model="addList.studentSubject">
              <el-radio label="文科" value="文科"></el-radio>
              <el-radio label="理科" value="理科"></el-radio>
              <el-radio label="未分科" value="未分科"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model="addList.phoneNumber" placeholder="请输入学生手机号"></el-input>
          </el-form-item>
          <el-form-item label="家教能力" prop="tags">
            <el-tag
              :key="tag"
              v-for="tag in addList.tags"
              closable
              :disable-transitions="false"
              @close="tagClose(tag)">
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
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新科目</el-button>
          </el-form-item>
          <el-form-item label="家教地点" prop="expectTutorLocation">
            <el-input type="textarea" placeholder="山东省青岛市李沧区**小区" v-model="addList.expectTutorLocation"></el-input>
          </el-form-item>
          <el-form-item label="学生兴趣爱好" prop="studentHobby">
            <el-input type="textarea" v-model="addList.studentHobby" placeholder="可不填"></el-input>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "EditStudent",
      data(){
          return{
            inputVisible: false,
            inputValue: '',
            addList:{
              studentName:'',
              studentAge:'',
              studentSex:'',
              studentGrade:'',
              studentSubject:'',
              phoneNumber:'',
              tags:['语文','数学'],
              expectTutorAble:'',
              expectTutorLocation:'',
              studentHobby:'',
              userName:'',
            },
            gradeList:[
              {title:'小学一年级'},
              {title:'小学二年级'},
              {title:'小学三年级'},
              {title:'小学四年级'},
              {title:'小学五年级'},
              {title:'小学六年级'},
              {title:'初中中一年级'},
              {title:'初中二年级'},
              {title:'初中三年级'},
              {title:'高中一年级'},
              {title:'高中二年级'},
              {title:'高中三年级'},
              {title:'大学'},
              {title:'其他'},
            ],
            rules:{
              studentName:[
                {required:true,message:'请输入姓名',trigger:'blur'}
              ],
              studentSex:[
                {required:true,message:'请选择性别',trigger:'change'}
              ],
              studentAge:[
                {required:true,message:'请选择年龄',trigger:'change'}
              ],
              phoneNumber:[
                {required:true,message:'请输入手机号',trigger:'blur'},
                {min:11,max:11,message:'请正确输入手机号',trigger:'blur'}
              ],
              studentGrade:[
                {required:true,message:'请选择年级',trigger:'change'}
              ],
              studentSubject:[
                {required:true,message:'请选择文理科',trigger:'change'}
              ],
              userName:[
                {required:true,message:'请输入用户姓名',trigger:'blur'}
              ],
              expectTutorLocation:[
                {required:true,message:'请输入家教地点',trigger:'blur'}
              ],
              tags:[
                {required:true,message:'至少添加一个标签',trigger:'blur'}
              ],
            },
          }
      },
      methods:{
        check(){
          this.$refs['form'].validate(async valid=>{
            if (valid) {
              this.addList.expectTutorAble=this.addList.tags.join(",");
              var res=await this.$axios.post('/api/student/addStudent',JSON.stringify(this.addList),{headers:{'content-type':'application/json'}});
              if (res.data.code === '6666') {
                this.$message.success("添加的学生为："+this.addList.studentName);
                this.addList=[];
                return "1"
              }else {
                this.$message.warning(res.data.message);
                return "0";
              }
            }
          })
        },
        async getVal(id){
          let res=await this.$axios.get('/api/student/getOneStudent?studentId='+id);
          let resp=await this.$axios.get('/api/student/studentBindingUser')
          this.addList=res.data.data;

          return this.addList;
        },
        tagClose(tag) {
          this.addList.tags.splice(this.addList.tags.indexOf(tag), 1);
        },

        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.addList.tags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        },

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
