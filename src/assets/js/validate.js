/*自定义验证规则*/
import Vue from 'vue'
import axios from 'axios'
/*注册axios用于请求接口的验证*/
Vue.use(axios);
axios.defaults.withCredentials = false;

/*用户名是否唯一*/
export const uniqueUserName=(rule,value,callback)=>{
  let reg=RegExp(/\s/);
  if (reg.test(value)){
    return callback(new Error("用户名不能有空格！"));
  }else if (value.length<5||value.length>10) {
    return callback(new Error("用户名长度在5-10之间！"));
  }else {
    axios.get("/api/user/uniqueUserName?name="+value).then(function (response) {
      if (response.data.code === '8888'){
        return callback(new Error("用户名已存在！"));
      } else{
        callback();
      }
    })
  }
};
/*用户名是否正确*/
export const isTrueUserName=(rule,value,callback)=>{
  axios.get('/api/user/isTrueUserName?name='+value).then(function (response) {
    if (response.data.code === '6666') {
      callback();
    }else {
      return callback(new Error("用户名不存在"))
    }
  })
}
/*是否为手机格式*/
export const isPhoneNumber=(rule,value,callback)=>{
  let reg=RegExp('^[1][3-8][0-9]{9}$');
  if (value.length !== 11) {
    return callback(new Error("请输入11位手机号！"))
  }else if (!reg.test(value)) {
    return callback(new Error("请输入正确手机号码！"))
  }else {
    callback();
  }
};
/*年龄判断*/
export const isLegalAge=(rule,value,callback)=>{
  let reg=RegExp('[1-9]\\d*');
  if (!reg.test(value)){
    return callback(new Error("请输入整数"));
  } else if (value > 100 || value < 7) {
    return callback(new Error("年龄值在（7-100）！"))
  }else {
    callback();
  }
};
/*是否为姓名*/
export const isTrueName=(rule,value,callback)=>{
  let reg=RegExp('[\u4e00-\u9fa5]');
  if (!reg.test(value)){
    return callback(new Error("请输入中文"));
  } else if (value.length > 20 || value.length < 2) {
    return callback(new Error("请输入真实姓名！"))
  }else {
    callback();
  }
};



