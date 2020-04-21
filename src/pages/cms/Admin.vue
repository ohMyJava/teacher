<template>
  <el-container style="height: 100%">
    <el-header style="text-align: right">
      <i
        @click="showMenu"
        :class="menuIconClass"
        style="float: left; line-height: 60px"
      ></i>
      <span style="margin-right: 10px">Admin</span>
      <i class="el-icon-remove-outline" style="margin-right: 15px"></i>
    </el-header>
    <el-container style="height: 100%">
      <el-aside :width="menuWidth" style="height: 100%">
        <el-menu
          :default-active="currentIndex"
          class="el-menu-vertical-demo"
          style="height: 100%"
          :collapse="menuShow"
        >
          <el-menu-item
            v-for="menu in menus"
            :key="menu.index"
            :index="menu.index"
            @click="$router.push(menu.link)"
          >
            <i :class="[menu.icon]"></i>
            <span slot="title">{{ menu.name }}</span>
          </el-menu-item>
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
          icon: "el-icon-setting",
          name: "学生管理",
          link: "/admin/student"
        },
        {
          index: "1",
          icon: "el-icon-setting",
          name: "家教管理",
          link: "/admin/teacher"
        },
        {
          index: "2",
          icon: "el-icon-setting",
          name: "订单管理",
          link: "/admin/order"
        },
        {
          index: "3",
          icon: "el-icon-setting",
          name: "用户管理",
          link: "/admin/user"
        },
        {
          index: "4",
          icon: "el-icon-setting",
          name: "系统管理",
          link: "/admin/system"
        }
      ]
    };
  },
  methods: {
    showMenu() {
      this.menuShow = !this.menuShow;
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.menus.length; i++) {
        if (this.menus[i].link == this.$router.currentRoute.name) {
          console.log(this.$router.currentRoute.name);
          return this.menus[i].index;
        }
      }
    },
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
