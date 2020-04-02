export const userStatus = (state, user) => {
  state.currentUser = null;
  state.isLogin = false;
  state.token = "";
  if (user) {
    state.currentUser = user;
    state.isLogin = true;
    sessionStorage.setItem("username", user.username);
  }
};
