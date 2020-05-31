export const userStatus = (state, {userName,type,token,id}) => {
  state.currentUser = userName;
  state.isLogin = true;
  state.type = type;
  state.token = token;
  state.id = id;
};

export const loginOut = (state)=>{
  //退出时清空本地及vuex中信息
  sessionStorage.clear();
  state.currentUser = null;
  state.isLogin = false;
  state.token = null;
  state.type= null;
  state.id= null;
}
