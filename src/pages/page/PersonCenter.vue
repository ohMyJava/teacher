<template>
    <div>
      <el-container>
        <el-aside :width="'20%'">
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            style="height: 100%"
            background-color="#CCFFFF"
            text-color="#666666"
            active-text-color="#CC0033"
            unique-opened>
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
        <el-main style="background-color: #FFFFCC;width: 80%"><router-view></router-view></el-main>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "PersonCenter",
      data(){
          return{
            menus: [
              {
                index: "0",
                icon: "el-icon-cloudy",
                name: "个人资料",
                link: "/personCenter/info"
              },
              {
                index: "1",
                icon: "el-icon-chat-dot-square",
                name: "我的消息",
                link: "/personCenter/message"
              },
              {
                index: "2",
                icon: "el-icon-s-custom",
                name: "我是家教",
                link: "/personCenter/tutor"
              },
              {
                index: "3",
                icon: "el-icon-user",
                name: "我是学生",
                link: "/personCenter/student"
              },
              {
                index: "4",
                icon: "el-icon-tickets",
                name: "我的订单",
                link: "/personCenter/order"
              },
              {
                index: "5",
                icon: "el-icon-chat-line-round",
                name: "意见反馈",
                link: "/personCenter/comment",
              },
            ]
          }
      },
      methods:{},
      components:{

      }
    }
</script>

<style scoped>
  .el-container{
    min-height: 400px;
  }
</style>
