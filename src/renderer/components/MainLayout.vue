<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

</style>
<template>
  <div class="layout">
    <Layout style="min-height: -webkit-fill-available;">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
          
          </div>
          
        </Menu>
      </Header>
      <Layout >
        <Sider hide-trigger style="background: #fff;">
          <Menu accordion active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="changeMenu">
            <Submenu name="info">
              <template slot="title">
                <Icon type="md-person"/>
                个人经历
              </template>
              <MenuItem name="profile">
                个人信息
              </MenuItem>
            </Submenu>
            <Submenu name="111">
              <template slot="title">
                <Icon type="md-school"/>
                记账
              </template>
              <MenuItem name="money">
                333
              </MenuItem>
            </Submenu>
            <Submenu name="management">
              <template slot="title">
                <Icon type="md-school"/>
                信息管理
              </template>
              <MenuItem name="22222">
                钱包管理
              </MenuItem>
              <MenuItem name="33333">
                aaaaa
              </MenuItem>
            </Submenu>
            <Submenu name="analysis">
              <template slot="title">
                <Icon type="md-school"/>
                数据分析
              </template>
              <MenuItem name="22222">
                消费组成
              </MenuItem>
              <MenuItem name="33333">
                消费趋势
              </MenuItem>
            </Submenu>
            <Submenu name="system">
              <template slot="title">
                <Icon type="md-school"/>
                系统设置
              </template>
              <MenuItem name="22222">
                偏好设置
              </MenuItem>
              <MenuItem name="22222">
                导入导出
              </MenuItem>
              <MenuItem name="33333">
                清空
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout style="padding: 24px 24px 24px;">
          <Content style="{margin: 20px; background: #fff; minHeight: 260px;}">
          
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {
    name: 'MainLayout',
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>
