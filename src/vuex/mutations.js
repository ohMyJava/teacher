export const userStatus = (state, {userName,type,token,id}) => {
  state.currentUser = userName;
  state.isLogin = true;
  state.type = type;
  state.token = token;
  state.id = id;
  localStorage.setItem("username",userName);
  localStorage.setItem("token",token);
  localStorage.setItem("type",type);
  localStorage.setItem("id",id);
};

export const loginOut = (state)=>{
  //退出时清空本地及vuex中信息
  localStorage.clear();
  state.currentUser = null;
  state.isLogin = false;
  state.token = "";
  state.type= "";
  state.id= "";
}
