//应用mutation
export const setUser=({commit},{userName,type,token,id})=>{
  commit("userStatus",{userName,type,token,id});
};

export const clearUser=({commit})=>{
  commit("loginOut");
}
