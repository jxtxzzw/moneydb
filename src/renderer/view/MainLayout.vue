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
          <router-link to="/Welcome">
            <Icon type="ios-home" size="40" color="#FFFFFF" />
          </router-link>
        </Menu>
      </Header>
      <Layout >
        <Sider hide-trigger style="background: #fff;">
          <Menu accordion active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="info">
              <template slot="title">
                <Icon type="md-person"/>
                公共查询
              </template>
                <MenuItem name="PackageQuery" to="/UserQuery">
                  包裹信息查询
                </MenuItem>
            </Submenu>
            <Submenu name="Employee">
              <template slot="title">
                <Icon type="md-person"/>
                  员工信息
              </template>
              <MenuItem name="Login" to="/Login">
                个人信息
              </MenuItem>
            </Submenu>
            <Submenu name="Logistics" v-if="this.$store.state.Auth.token !== ''">
              <template slot="title">
                <Icon type="md-school"/>
                物流管理
              </template>
                <MenuItem name="TrackingCheckpoint" to="/TrackingCheckpoint">
                  运输状态录入
                </MenuItem>
                <MenuItem name="DispachInfoAdd" to="/DispatchingView">
                  派件状态记录
                </MenuItem>
            </Submenu>
            <Submenu name="Management" v-if="this.$store.state.Auth.token !== ''">
              <template slot="title">
                <Icon type="md-school"/>
                企业信息管理
              </template>
                <MenuItem name="EmployeeManage" to="/EmployeeManage">
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
