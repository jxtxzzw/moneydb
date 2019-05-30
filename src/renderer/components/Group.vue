<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :label-width="80">
        <FormItem label="部门编号" prop="dept_id">
          <Input :value="formItem.dept_id" disabled readonly/>
        </FormItem>
        <FormItem label="部门名称" prop="dept_name">
          <Input v-model="formItem.dept_name" placeholder="请输入部门名称"/>
        </FormItem>
        <FormItem label="人事信息" prop="UserPrivilege">
          <CheckboxGroup v-model="formItem.UserPrivilege" @on-change="UserPrivilegeValidate">
            <Checkbox label="增加用户信息"></Checkbox>
            <Checkbox label="删除用户信息"></Checkbox>
            <Checkbox label="修改用户信息"></Checkbox>
            <Checkbox label="查看用户信息"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="仓库信息" prop="WarehousePrivilege">
          <CheckboxGroup v-model="formItem.WarehousePrivilege" @on-change="WarehousePrivilegeValidate">
            <Checkbox label="增加仓库信息"></Checkbox>
            <Checkbox label="删除仓库信息"></Checkbox>
            <Checkbox label="修改仓库信息"></Checkbox>
            <Checkbox label="查看仓库信息"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="包裹信息" prop="PackagePrivilege">
          <CheckboxGroup v-model="formItem.PackagePrivilege" @on-change="PackagePrivilegeValidate">
            <Checkbox label="增加包裹信息"></Checkbox>
            <Checkbox label="修改包裹信息"></Checkbox>
            <RadioGroup v-model="formItem.PackagePrivilegeShow">
              <Radio label="仅能查看物流信息"></Radio>
              <Radio label="能查看物流和用户信息"></Radio>
              <Radio label="能查看所有信息"></Radio>
            </RadioGroup>
          </CheckboxGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="postRequest">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>


<script>
  export default {
    name: 'Group',
    methods: {
      postRequest () {
        console.log(formItem)
      }
    }
  }
</script>

<style scoped>

</style>
