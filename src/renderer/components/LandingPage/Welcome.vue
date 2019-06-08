<style scoped>
  .demo-carousel{
    height: 400px;
    line-height:400px;
    text-align:center;
    color:#fff;
    font-size:20px;
    background:#506B9E;
  }
  .cycle-gallery {
    position: relative;
    text-align: center;
    padding: 40px 200px 33px;
    margin: 0 0 60px;
    line-height: 1.6; }
  .cycle-gallery p {
    color : #515a6e;
  }
  .cycle-gallery .img-box {
    display: block;
    line-height: 1.5;
    padding: 0 0 40px; }
  .cycle-gallery .img-box .img-holder {
    display: inline-block;
    vertical-align: middle;
    margin: 0 22px 0 0;
    overflow: hidden; }
  .cycle-gallery .img-box .img-holder img {
    width: 100px;
    height: 100px;
    border-radius: 50%; }
  .cycle-gallery .img-box .text-holder {
    display: inline-block;
    vertical-align: middle;
    text-align: left; }
  .cycle-gallery .img-box h3 {
    margin: 0;
    line-height: 1.33333;
    color: #635C73;
  }
  .cycle-gallery .img-box a {
    font-weight: bold; }
  .cycle-gallery:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 180px;
    right: 180px;
    height: 1px;
    background: #f4f4f4;
  }
  .cycle-gallery .date {
    display: block;
    font-style: normal;
    line-height: 1.5;
    font-weight: normal;
    color: #848e97; }
</style>
<template>
  <Carousel autoplay v-model="value2" loop>
    <CarouselItem>
      <div class="demo-carousel">jxtxzzw 物流管理系统</div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">数据库系统实践大作业</div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">前端：Node.js Vue.js iView </div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">后端：Node.js Express.js Sequelize </div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">数据库：Mariadb 10.3.14 </div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">2019-06-08</div>
    </CarouselItem>
  </Carousel>
</template>
<script>
  export default {
    name: 'Welcome',
    data () {
      return {
        value2: 0
      }
    }
  }
</script>
