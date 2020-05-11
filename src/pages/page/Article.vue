<template>
  <div>
    <template>
      <el-carousel :interval="5000" arrow="always" height="350px">
        <el-carousel-item>
          <div class="contentBox">
            <div class="header-info">小学</div>
            <div class="item"
                 v-for="(value,index) in elementary"
                 :key="index"
                 :index="index"
                 :value="value">
              <div>【{{value.name}}】</div>
              <div>{{value.demand}}</div>
              <el-divider></el-divider>
            </div>
          </div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="contentBox">
            <div class="header-info">初中</div>

          </div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="contentBox">
            <div class="header-info">高中</div>

          </div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="contentBox">
            <div class="header-info">大学</div>

          </div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="contentBox">
            <div class="header-info">其他</div>

          </div>
        </el-carousel-item>
      </el-carousel>
    </template>
    <!--<div>
      <el-row>
        &lt;!&ndash; 小学 &ndash;&gt;
        <el-col :xs="20" :sm="20" :md="12" :lg="12" :xl="12">
          <div class="contentBox">
            <div class="header-info">小学</div>
            <div class="item"
                 v-for="(value,index) in elementary"
                 :key="index"
                 :index="index"
                 :value="value">
              <div>【{{value.name}}】</div>
              <div>{{value.demand}}</div>
              <el-divider></el-divider>
            </div>
          </div>
        </el-col>

        &lt;!&ndash; 初中 &ndash;&gt;
        <el-col :xs="20" :sm="20" :md="12" :lg="12" :xl="12">
          <div class="contentBox">
            <div class="header-info">初中</div>

          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row>
        &lt;!&ndash; 高中 &ndash;&gt;
        <el-col :xs="20" :sm="20" :md="12" :lg="12" :xl="12">
          <div class="contentBox">
            <div class="header-info">高中</div>

          </div>
        </el-col>

        &lt;!&ndash; 其他 &ndash;&gt;
        <el-col :xs="20" :sm="20" :md="12" :lg="12" :xl="12">
          <div class="contentBox">
            <div class="header-info">其他</div>

          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row>
        &lt;!&ndash; 大学 &ndash;&gt;
        <el-col :xs="20" :sm="20" :md="24" :lg="24" :xl="24">
          <div class="contentBox1">
          <div class="header-info">大学</div>

          </div>
        </el-col>
      </el-row>
    </div>-->
  </div>
</template>

<script>
    export default {
        name: "Article",
      data(){
        return{
          elementary:[],
          junior:[],
          high:[],
          university:[],
          other:[]
        }
      },
      methods:{},
      async created(){
        let res = await this.$axios.get('../../static/json/elementary.json');
        console.log(res);
        this.elementary=res.data;
      }
    }
</script>

<style scoped>
  .contentBox{
    padding-bottom: 10px;
    margin: 30px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .contentBox1{
    padding-bottom: 10px;
    margin: 30px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .header-info{
    color: #fff;
    border-radius: 10px;
    font:20px Extra large;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    background-color: #409EFF;
    width: 100px;
    height: 30px;
    position: relative;
    left: 10px;
    top: -20px;
    /*利用margin-bottom来消除relative下偏移所占的空间*/
    margin-bottom: -10px;
  }
  .item{
    word-wrap:break-word;
    word-break:normal;
    text-align: left;
    text-indent: 2em;
    margin: 5px 10px;
  }
  .el-divider--horizontal{
    margin: 5px 0;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
 /*走马灯背景颜色*/
  .el-carousel__item:nth-child(2n) {
    background-color: #FFFFCC;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #FFFFCC;
  }
</style>
