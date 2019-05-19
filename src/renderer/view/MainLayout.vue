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
                <MenuItem name="PackageQuery" to="/PackageQuery">
                  包裹查询
                </MenuItem>
                <MenuItem name="Login" to="/Login">
                  <span v-if="this.$store.state.Auth.isLogin">
                    个人信息
                  </span>
                  <span v-else>
                    登录
                  </span>
                </MenuItem>
                <MenuItem name="TestPage" to="/TestPage">
                  测试
                </MenuItem>
            </Submenu>
            <Submenu name="Logistics">
              <template slot="title">
                <Icon type="md-school"/>
                物流管理
              </template>
                <MenuItem name="LogisticsInfoAdd" to="/LogisticsInfoAdd">
                  运输状态录入
                </MenuItem>
                <MenuItem name="DispachInfoAdd" to="/DispachInfoAdd">
                  派件状态录入
                </MenuItem>
            </Submenu>
            <Submenu name="Management">
              <template slot="title">
                <Icon type="md-school"/>
                信息管理
              </template>
                <MenuItem name="StaffManage" to="/StaffManage">
                  员工
                </MenuItem>
                <MenuItem name="PackageManage"  to="/PackageManage">
                  包裹
                </MenuItem>
                <MenuItem name="WarehouseManage" to="/WarehouseManage">
                  仓库
                </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout style="padding: 24px 24px 24px;">
            <router-view/>
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
