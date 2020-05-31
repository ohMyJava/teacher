<template>
    <div>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" prop="tutorName">
          <el-input v-model="form.tutorName" placeholder="请输入姓名" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="tutorAge">
          <el-select v-model="form.tutorAge" placeholder="请选择年龄">
            <el-option
              v-for="item in 30"
              :key="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="tutorSex">
          <el-radio-group v-model="form.tutorSex">
            <el-radio label="男" >男</el-radio>
            <el-radio label="女" >女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户账号" prop="userName" v-if="isShow">
          <el-select
            v-model="form.userName"
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
        <el-form-item label="学历" prop="tutorEducation">
          <el-select v-model="form.tutorEducation" placeholder="请选择学历">
            <el-option v-for="(item,index) in gradeList" :key="index" :label="item.title" :value="item.title" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学校" prop="tutorSchool">
          <el-input v-model="form.tutorSchool" placeholder="请输入学校名称（全称）" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="擅长科目" prop="tags">
          <el-tag
            :key="tag"
            v-for="tag in form.tags"
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
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入手机号" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="当前所在地" prop="tutorLocation">
          <el-cascader
            style="width: 100%"
            clearable
            placeholder="试试搜索：青岛市"
            :options="address"
            v-model="location"
            filterable></el-cascader>
        </el-form-item>
        <el-form-item label="兴趣爱好" prop="hobby">
          <el-input type="textarea" v-model="form.tutorHobby" placeholder="可不填"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import * as validate from '../assets/js/validate';
  import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
    export default {
        name: "EditTutorForm",
      components: {ElSelectDropdown},
      props:{
        isShow:''
      },
      data() {
        return {
          location:[],
          message:'',
          options: [],
          list: [],
          loading: false,
          states: [],
          inputVisible: false,
          inputValue: '',
          form: {
            tutorName: '',
            tutorAge:'',
            tutorSex: '',
            tutorEducation: '',
            tutorSchool:'',
            tutorGoodSubjects: '',
            tutorPhoneNumber: '',
            tags: [],
            tutorLocation: '',
            tutorHobby:'',
            userName: '',
          },
          gradeList: [
            {title: '大一'},
            {title: '大二'},
            {title: '大三'},
            {title: '大四'},
            {title: '研究生'},
            {title: '已毕业'},

          ],
          rules: {
            tutorName: [
              {required: true, message: '请输入姓名', trigger: 'blur'}
            ],
            tutorSex: [
              {required: true, message: '请选择性别', trigger: 'change'}
            ],
            tutorAge: [
              {required: true, message: '请输入年龄', trigger: 'change'},
            ],
            phoneNumber: [
              {required: true, message: '请输入手机号', trigger: 'blur'},
              {validator: validate.isPhoneNumber, trigger: 'blur'}
            ],
            tutorEducation: [
              {required: true, message: '请选择年级', trigger: 'change'}
            ],
            tutorSchool: [
              {required: true, message: '请输入学校名称', trigger: 'change'}
            ],
            userName: [
              {required: true, message: '请输入家教关联的用户名', trigger: 'change'},
              {validator: validate.isTrueUserName, trigger: 'blur'}
            ],
            tutorLocation: [
              {required: true, message: '请输入家教地点', trigger: 'blur'}
            ],
            tags: [
              {required: true, message: '至少添加一个标签', trigger: 'blur'}
            ],
          },
          address: [],
        }
      },
      methods: {
        check(flag) {
          if (flag === 1) {
            this.form.userName = this.$store.state.currentUser;
          }
          this.form.tutorLocation=this.location.join("-");
          console.log(this.form);
          this.$refs['form'].validate(async valid => {
            if (valid) {
              this.form.tutorGoodSubjects = this.form.tags.join(",");
              let res = await this.$axios.post('/api/tutor/addTutor', JSON.stringify(this.form), {headers: {'content-type': 'application/json'}});
              if (res.data.code === '6666') {
                this.$message.success("添加的家教为：" + this.form.tutorName);
                this.form = [];
                this.$emit('getMessage', true);
              } else {
                this.$message.error(res.data.message);
                this.$emit('getMessage', false);
              }
            } else {
              this.$message.warning("请输入正确信息！");
            }
          })
        },
        /*不了解getVal方法中注释中与非注释中的语句对tag标签删除操作的影响的原因*/
        async getVal(id) {
          let res = await this.$axios.get('/api/tutor/getOneTutor?tutorId=' + id);
          console.log(res)
          const list = res.data.data;
          list.tags = res.data.data.tutorGoodSubjects.split(",");
          this.location=res.data.data.tutorLocation.split("-");
          console.log(this.location)
          this.form = list;
        },
        tagClose(tag) {
          console.log("closeTag")
          this.form.tags.splice(this.form.tags.indexOf(tag), 1);
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
            this.form.tags.push(inputValue);
          }
          console.log(inputValue)
          this.inputVisible = false;
          this.inputValue = '';
        },
        modifyStudent(id) {
          this.$refs['form'].validate(async valid => {
            if (valid) {
              this.form.tutorId = id;
              this.form.tutorLocation=this.location.join("-");
              console.log(this.form.tags);
              this.form.tutorGoodSubjects = this.form.tags.join(",");
              console.log(this.form.tutorGoodSubjects);
              let res = await this.$axios.post('/api/tutor/modifyTutor', JSON.stringify(this.form), {headers: {'content-type': 'application/json'}});
              if (res.data.code === '6666') {
                this.$message.success(res.data.message);
                this.form = [];
                this.$emit('getMessage', true);
              } else {
                this.$message.warning(res.data.message);
                this.$emit('getMessage', false);
              }
            } else {
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
      },
      async mounted(){
          let res = await this.$axios.get('../../static/json/address.json');
          this.address=res.data;
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
