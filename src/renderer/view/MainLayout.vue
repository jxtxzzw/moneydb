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
          <Menu accordion active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="info">
              <template slot="title">
                <Icon type="md-person"/>
                用户查询
              </template>
              <router-link to="/PackageQuery">
                <MenuItem name="PackageQuery">
                  包裹查询
                </MenuItem>
              </router-link>
                <MenuItem name="Login" to="/Login">
                  登录
                </MenuItem>
              <router-link to="/TestPage">
                <MenuItem name="TestPage">
                  测试
                </MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="Logistics">
              <template slot="title">
                <Icon type="md-school"/>
                物流管理
              </template>
              <router-link to="/LogisticsInfoAdd">
                <MenuItem name="LogisticsInfoAdd">
                  运输状态录入
                </MenuItem>
              </router-link>
              <router-link to="/DispachInfoAdd">
                <MenuItem name="DispachInfoAdd">
                  派件状态录入
                </MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="Management">
              <template slot="title">
                <Icon type="md-school"/>
                信息管理
              </template>
              <router-link to="/StaffManage">
                <MenuItem name="StaffManage">
                  员工
                </MenuItem>
              </router-link>
              <router-link to="/PackageManage">
                <MenuItem name="PackageManage">
                  包裹
                </MenuItem>
              </router-link>
              <router-link to="/WarehouseManage">
                <MenuItem name="WarehouseManage">
                  仓库
                </MenuItem>
              </router-link>
            </Submenu>
          </Menu>
        </Sider>
        <Layout style="padding: 24px 24px 24px;">
          <Content style="{margin: 20px; background: #fff; minHeight: 260px;}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import TestPage from '../components/TestPage'
  export default {
    name: 'MainLayout',
    components: {TestPage},
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
