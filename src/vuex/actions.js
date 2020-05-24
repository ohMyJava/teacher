//应用mutation
export const setUser=({commit},{userName,type,token})=>{
  commit("userStatus",{userName,type,token});
};
