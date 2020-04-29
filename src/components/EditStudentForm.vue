<template>
    <div>
        <el-form :model="addList" :rules="rules" ref="form">
          <el-form-item label="学生姓名" prop="studentName">
            <el-input v-model="addList.studentName" placeholder="请输入学生姓名" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="学生年龄" prop="studentAge">
            <el-select v-model="addList.studentAge" placeholder="请选择年龄">
              <el-option
                v-for="item in 30"
                :key="item"
                :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户账号" prop="userName" v-if="isShow">
            <el-select
              v-model="addList.userName"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生性别" prop="studentSex">
            <el-radio-group v-model="addList.studentSex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
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
            <el-input v-model="addList.phoneNumber" placeholder="请输入学生手机号" style="width: 70%"></el-input>
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
            <el-cascader
              style="width: 100%"
              clearable
              placeholder="试试搜索：青岛市"
              :options="address"
              v-model="location"
              filterable></el-cascader>
          </el-form-item>
          <el-form-item label="学生兴趣爱好" prop="studentHobby">
            <el-input type="textarea" v-model="addList.studentHobby" placeholder="可不填"></el-input>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import * as validate from '../assets/js/validate';
    export default {
      name: "EditStudent",
      props:{
        isShow:'',
      },
      data() {
        return {
          address:'',
          location:'',
          message:'',
          options: [],
          list: [],
          loading: false,
          states: [],
          inputVisible: false,
          inputValue: '',
          addList: {
            studentName: '',
            studentAge:'',
            studentSex: '',
            studentGrade: '',
            studentSubject: '',
            phoneNumber: '',
            tags: [],
            expectTutorAble: '',
            expectTutorLocation: '',
            studentHobby: '',
            userName: '',
          },
          gradeList: [
            {title: '小学一年级'},
            {title: '小学二年级'},
            {title: '小学三年级'},
            {title: '小学四年级'},
            {title: '小学五年级'},
            {title: '小学六年级'},
            {title: '初中中一年级'},
            {title: '初中二年级'},
            {title: '初中三年级'},
            {title: '高中一年级'},
            {title: '高中二年级'},
            {title: '高中三年级'},
            {title: '大学'},
            {title: '其他'},
          ],
          rules: {
            studentName: [
              {required: true, message: '请输入姓名', trigger: 'blur'}
            ],
            studentSex: [
              {required: true, message: '请选择性别', trigger: 'change'}
            ],
            studentAge: [
              {required: true, message: '请输入年龄', trigger: 'change'},
              {validator:validate.isLegalAge,trigger:'blur'}
            ],
            phoneNumber: [
              {required: true, message: '请输入手机号', trigger: 'blur'},
              {validator: validate.isPhoneNumber, trigger: 'blur'}
            ],
            studentGrade: [
              {required: true, message: '请选择年级', trigger: 'change'}
            ],
            studentSubject: [
              {required: true, message: '请选择文理科', trigger: 'change'}
            ],
            userName: [
              {required: true, message: '请输入学生关联的用户名', trigger: 'change'},
              {validator: validate.isTrueUserName, trigger: 'blur'}
            ],
            expectTutorLocation: [
              {required: true, message: '请输入家教地点', trigger: 'blur'}
            ],
            tags: [
              {required: true, message: '至少添加一个标签', trigger: 'blur'}
            ],
          },
        }
      },
      async created() {
        /*可以不在这里执行*/
        let response=await this.$axios.get('/api/user/getUsernameList');
        if (response.data.code === '6666') {
          this.states=response.data.data;
        }else {
          this.states=['无数据']
        }
        this.list = this.states.map(item => {
          return {value: `${item}`, label: `${item}`};
        });
      },
      async mounted(){
        let res = await this.$axios.get('../../static/json/address.json');
        this.address=res.data;
      },
      methods: {
        check(flag) {
          if (flag === 1) {
            this.addList.userName=this.$store.state.currentUser;
          }
          this.addList.expectTutorLocation=this.location.join("-");
          console.log(this.addList)
          this.$refs['form'].validate(async valid => {
            if (valid) {
              this.addList.expectTutorAble = this.addList.tags.join(",");
              var res = await this.$axios.post('/api/student/addStudent', JSON.stringify(this.addList), {headers: {'content-type': 'application/json'}});
              if (res.data.code === '6666') {
                this.$message.success("添加的学生为：" + this.addList.studentName);
                this.addList = [];
                this.$emit('getMessage',true);
              } else {
                this.$message.error(res.data.message);
                this.$emit('getMessage',false);
              }
            }else {
              this.$message.warning("请输入正确信息！");
            }
          })
        },
        /*不了解getVal方法中注释中与非注释中的语句对tag标签删除操作的影响的原因*/
        async getVal(id) {
          let res = await this.$axios.get('/api/student/getOneStudent?studentId=' + id);
          const list=res.data.data;
          list.tags=res.data.data.expectTutorAble.split(",");
          this.location=res.data.data.expectTutorLocation.split("-");
          this.addList=list;
         /* this.addList = res.data.data;
          this.addList.tags=this.addList.expectTutorAble.split(",");*/
        },
        tagClose(tag) {
          console.log("closeTag")
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
          console.log(inputValue)
          this.inputVisible = false;
          this.inputValue = '';
        },
        modifyStudent(id) {
          this.$refs['form'].validate(async valid=>{
            if (valid) {
              this.addList.studentId = id;
              console.log(this.addList.tags);
              this.addList.expectTutorAble = this.addList.tags.join(",");
              console.log(this.addList.expectTutorAble);
              let res = await this.$axios.post('/api/student/modifyStudent', JSON.stringify(this.addList), {headers: {'content-type': 'application/json'}});
              if (res.data.code === '6666') {
                this.$message.success(res.data.message);
                this.addList = [];
                this.$emit('getMessage',true);
              } else {
                this.$message.warning(res.data.message);
                this.$emit('getMessage',false);
              }
            }else {
              this.$message.error("请输入正确信息！");
            }
          })
          /**/
        },
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options = [];
          }
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
