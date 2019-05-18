<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :rules="ruleValidation" :label-width="80">
        <FormItem label="运单号" prop="package_id">
          <Input :value="formItem.package_id" disabled readonly/>
        </FormItem>
        <FormItem label="金额" prop="price">
          <Input v-model="formItem.price" placeholder="请输入金额"/>
        </FormItem>
        <FormItem label="日期" prop="date">
          <DatePicker v-model="formItem.date" type="date" placeholder="请选择日期"/>
        </FormItem>
        <FormItem label="寄件地址" prop="from">
          <Cascader :data="formItem.from" change-on-select trigger="hover" filterable />
          <!--change-on-select 允许用户停止在任意一级，filterable 允许用户直接输入搜索任意一级的内容并快速选中-->
        </FormItem>
        <FormItem label="收件地址" prop="to">
          <Cascader :data="formItem.to" change-on-select trigger="hover" filterable />
          <!--change-on-select 允许用户停止在任意一级，filterable 允许用户直接输入搜索任意一级的内容并快速选中-->
        </FormItem>
        <FormItem label="物流" prop="info">
          <router-link :to="getTracking">
            <Button>
              查看物流
            </Button>
          </router-link>
        </FormItem>
        <FormItem label="物流" prop="description">
          <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="如果有什么想说的……"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="postRequest()"> {{formItem.buttonPrompt}}</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>


<script>
  export default {
    name: 'Expenditure',
    props: {
      formItem: {}
    },
    data () {
      const priceValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入金额'))
        } else {
          let v = parseFloat(value.toString())
          if (v > 0) {
            callback()
          } else {
            callback(new Error('请输入正确的金额'))
          }
        }
      }
      const descriptionValidator = (rule, value, callback) => {
        if (value.toString().length > 4096) {
          callback(new Error('更新说明不能多于 4096 个字'))
        } else {
          callback()
        }
      }
      return {
        // formItem: {
        //   package_id: '123',
        //   price: '',
        //   date: '',
        //   category: [{
        //     value: '1',
        //     label: 'A',
        //     children: [
        //       {
        //         value: '11',
        //         label: 'V',
        //         children: [
        //           {
        //             value: '111',
        //             label: 'AAA'
        //           }
        //         ]
        //       },
        //       {
        //         value: '1',
        //         label: 'A'
        //       }
        //     ]
        //   }],
        //   reimbursement: false,
        //   description: ''
        // },
        ruleValidation: {
          price: [
            {required: true, message: '请输入金额', trigger: 'blur'},
            {validator: priceValidator, trigger: 'blur'}
          ],
          description: [
            {required: false},
            {validator: descriptionValidator, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    computed: {
      getTracking () {
        return '/PackageModify/' + this.formItem.package_id
      }
    }
  }
</script>

<style scoped>

</style>
