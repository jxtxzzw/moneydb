<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :rules="ruleValidation" :label-width="80">
        <FormItem label="操作" prop="action" placeholder="操作">
          <Select v-model="formItem.action">
            <Option value="入库" :key="'入库'">入库</Option>
            <Option value="出库" :key="'出库'">出库</Option>
          </Select>
        </FormItem>
        <FormItem label="仓库" prop="warehouse_name" placeholder="仓库">
            <Select v-model="formItem.warehouse_name" filterable clearable >
              <Option v-for="warehouse in warehouseList" :value="warehouse.value" :key="warehouse.value">{{ warehouse.value }}</Option>
            </Select>
        </FormItem>
        <FormItem label="包裹编号" prop="package_id" placeholder="包裹编号">
          <Input v-model="formItem.package_id" @keyup.enter.native="postRequest('formItem')"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="postRequest('formItem')">录入</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>


<script>
  export default {
    name: 'TrackingCheckpoint',
    data () {
      const selectorValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('此项必填'))
        } else {
          callback()
        }
      }
      return {
        formItem: {
          action: '',
          warehouse_name: '',
          package_id: ''
        },
        warehouseList: [],
        ruleValidation: {
          warehouse_name: [
            {required: true, trigger: 'blur'},
            {validator: selectorValidator, trigger: 'blur'}
          ],
          action: [
            {required: true, trigger: 'blur'},
            {validator: selectorValidator, trigger: 'blur'}
          ],
          package_id: [
            {required: true, trigger: 'blur'},
            {validator: selectorValidator, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      async getWareHouseData () {
        await this.$http.post('http://127.0.0.1:3000/WareHouse/Query')
          .then(response => {
            if (response) {
              const data = response.data
              for (const x of data) {
                this.warehouseList.push({
                  value: x.warehouse_name,
                  label: x.warehouse_name
                })
              }
            }
          })
      },
      async postRequest (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            const _this = this
            await this.$http.post('http://127.0.0.1:3000/Package/Checkpoint', this.formItem)
              .then(() => {
                _this.$Message.success('操作成功！')
                this.reset()
              })
              .catch((error) => {
                _this.$Modal.error({
                  title: '操作失败',
                  content: error.data
                })
              })
          }
        })
      },
      reset () {
        this.formItem = {
          package_id: ''
        }
      }
    },
    async mounted () {
      this.reset()
      await this.getWareHouseData()
    }
  }
</script>

<style scoped>

</style>
