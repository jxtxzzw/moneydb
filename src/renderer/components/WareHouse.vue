<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :rules="ruleValidation" :label-width="80">
        <FormItem label="仓库编号" prop="warehouse_id">
          <Input v-model="formItem.warehouse_id" disabled readonly/>
        </FormItem>
        <FormItem label="仓库名称" prop="warehouse_name">
          <Input v-model="formItem.warehouse_name" placeholder="仓库名称"/>
        </FormItem>
        <FormItem label="仓库负责人" prop="warehouse_manager" placeholder="仓库负责人">
            <Select v-model="formItem.warehouse_manager" filterable clearable >
              <Option v-for="manager in warehouseManagerList" :value="manager.value" :key="manager.value">{{ manager.value }}</Option>
            </Select>
          <p>因为员工可能会有重名，所以必须要用 UUID 来标记</p>
        </FormItem>
  
        <FormItem label="仓库所在地" prop="location">
          <Cascader v-model="formItem.location" :data="city" change-on-select trigger="hover" filterable :load-data="loadCascadeCity" />
          <!--change-on-select 允许用户停止在任意一级，filterable 允许用户直接输入搜索任意一级的内容并快速选中-->
        </FormItem>
        <FormItem>
          <Button type="primary" @click="postRequest('formItem')"> {{formItem.buttonPrompt}}</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>


<script>
  import router from '../router'
  export default {
    name: 'WareHouse',
    props: {
      formItem: {}
    },
    data () {
      return {
        ruleValidation: {
          warehouse_name: [
            {required: true, trigger: 'blur'}
          ],
          warehouse_manager: [
            {required: true, trigger: 'blur'}
          ],
          warehouse_location: [
            {required: true}
          ]
        },
        city: [],
        warehouseManagerList: []
      }
    },
    methods: {
      async getManagerData () {
        await this.$http.get('http://127.0.0.1:3000/WareHouse/ManagerList')
          .then(response => {
            if (response) {
              const data = response.data
              for (const x of data) {
                this.warehouseManagerList.push({
                  value: x.manager_id,
                  label: x.manager_id
                })
              }
            }
          })
      },
      async loadCascadeCity (item, callback) {
        item.loading = true
        await this.getCityData(item.children, item.value)
        item.loading = false
        callback()
      },
      async getCityData (array, father = null) {
        await this.$http.post('http://127.0.0.1:3000/Location/Query', {
          father: father
        })
          .then(response => {
            if (response) {
              const data = response.data
              for (const x of data) {
                array.push({
                  value: x.location,
                  label: x.location,
                  children: []
                })
              }
            }
          })
        for (const x of array) {
          await this.getCityData(x.children, x.value)
        }
      },
      trim (data) {
        if (data.receive_date === '') {
          data.receive_date = null
        }
      },
      async postRequest (name) {
        this.trim(this.formItem)
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            const _this = this
            await this.$http.post('http://127.0.0.1:3000/WareHouse/Add', this.formItem)
              .then(() => {
                _this.$Message.success('操作成功！')
                router.push('/WareHouseManage')
              })
              .catch((error) => {
                _this.$Modal.error({
                  title: '操作失败',
                  content: error.data
                })
              })
          }
        })
      }
    },
    async mounted () {
      await this.getCityData(this.city)
      await this.getManagerData()
    }
  }
</script>

<style scoped>

</style>
