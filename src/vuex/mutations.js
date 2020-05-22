export const userStatus = (state, userName,type,token) => {
  state.currentUser = null;
  state.isLogin = false;
  state.token = "";
  if (userName) {
    state.currentUser = userName;
    state.isLogin = true;
    state.type = type;
    state.token = token;
    // sessionStorage.setItem("username", user.username);
  }
};
