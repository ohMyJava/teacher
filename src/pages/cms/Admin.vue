<template>
  <el-container style="height: 100%">
    <el-header style="text-align: right">
      <i
        @click="showMenu"
        :class="menuIconClass"
        style="float: left; line-height: 60px"
      ></i>
      <span style="margin-right: 10px">管理员用户名</span>
      <i class="el-icon-remove-outline" style="margin-right: 15px"></i>
    </el-header>
    <el-container style="height: 100%">
      <el-aside :width="menuWidth" style="height: 100%">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          style="height: 100%"
          :collapse="menuShow"
          active-text-color="#409eff"
          unique-opened
        >
          <component
            class="menu-item"
            v-for="(value) in menus"
            :key="value.name+value.link"
            :index="value.link"
            :is="(value.children&&value.children.length>0?'el-submenu':'el-menu-item')">
            <template slot="title" v-if="value.children&&value.children.length>0">
              <i :class="[value.icon]"></i>
              <span slot="title">{{ value.name }}</span>
            </template>
            <div v-if="!(value.children&&value.children.length)">
              <i :class="[value.icon]"></i>
              <span slot="title">{{ value.name }}</span>
            </div>
            <template v-if="value.children&&value.children.length>0">
              <el-menu-item class="menu-item"
                            v-for="(v,i) in value.children"
                            :key="v.link+i"
                            :index="v.link">
                <i :class="[v.icon]"></i>
                <span slot="title">{{ v.name }}</span>
              </el-menu-item>
            </template>
          </component>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main style="height: 100%"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      menuIconClass: "el-icon-s-fold",
      menuShow: true,
      menus: [
        {
          index: "0",
          icon: "el-icon-user",
          name: "学生管理",
          link: "/admin/student"
        },
        {
          index: "1",
          icon: "el-icon-s-custom",
          name: "家教管理",
          link: "/admin/teacher"
        },
        {
          index: "2",
          icon: "el-icon-tickets",
          name: "订单管理",
          link: "/admin/order"
        },
        {
          index: "3",
          icon: "el-icon-user-solid",
          name: "用户管理",
          link: "/admin/user"
        },
        {
          index: "4",
          icon: "el-icon-setting",
          name: "系统管理",
          link: "/admin/system",
          children:[
            {
              index: "4-1",
              icon: "el-icon-s-check",
              name: "角色管理",
              link: "/admin/systemEdit"
            },
            {
              index: "4-2",
              icon: "el-icon-reading",
              name: "操作日志",
              link: "/admin/systemLog"
            },
            {
              index: "4-3",
              icon: "el-icon-chat-line-round",
              name: "用户留言",
              link: "/admin/systemComment"
            },
          ]
        },
      ]
    };
  },
  methods: {
    showMenu() {
      this.menuShow = !this.menuShow;
    }
  },
  computed: {
    menuWidth() {
      return this.menuShow ? "65px" : "160px";
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}


</style>
