<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :rules="ruleValidation" :label-width="80">
        <FormItem label="账本" prop="account">
          <Cascader :data="formItem.account" trigger="hover" filterable />
        </FormItem>
        <FormItem label="金额" prop="price">
          <Input v-model="formItem.price" placeholder="请输入金额"/>
        </FormItem>
        <FormItem label="日期" prop="date">
          <DatePicker v-model="formItem.date" type="date" placeholder="请选择日期" style="width: 200px"/>
        </FormItem>
        <FormItem label="分类" prop="category">
          <Cascader :data="formItem.category" change-on-select trigger="hover" filterable />
          <!--change-on-select 允许用户停止在任意一级，filterable 允许用户直接输入搜索任意一级的内容并快速选中-->
        </FormItem>
        <FormItem label="钱包" prop="wallet">
          <Cascader :data="formItem.wallet" trigger="hover" filterable />
        </FormItem>
        <FormItem label="报销" prop="reimbursement">
          <i-switch v-model="formItem.reimbursement" size="large">
            <span slot="open">申请</span>
            <span slot="close">不报</span>
          </i-switch>
        </FormItem>
        <FormItem label="备注" prop="description">
          <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="如果有什么想说的……"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="postRequest()">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>


<script>
  export default {
    name: 'Expenditure',
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
        formItem: {
          account: [
          ],
          price: '',
          date: '',
          category: [{
            value: '1',
            label: 'A',
            children: [
              {
                value: '11',
                label: 'V',
                children: [
                  {
                    value: '111',
                    label: 'AAA'
                  }
                ]
              },
              {
                value: '1',
                label: 'A'
              }
            ]
          }],
          reimbursement: false,
          description: ''
        },
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
    }
  }
</script>

<style scoped>

</style>
