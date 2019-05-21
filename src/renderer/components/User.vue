<!--<template>-->
<!--  <div>-->
<!--    <Card>-->
<!--      <Form ref="formItem" :model="formItem" :label-width="80">-->
<!--        <FormItem label="组名">-->
<!--          <Input type="text" placeholder="用户名">-->
<!--            <Icon type="ios-person-outline" slot="prepend"></Icon>-->
<!--          </Input>-->
<!--        </FormItem>-->
<!--        <FormItem label="组名">-->
<!--          <Input type="text" placeholder="用户名">-->
<!--            <Icon type="ios-person-outline" slot="prepend"></Icon>-->
<!--          </Input>-->
<!--        </FormItem>-->
<!--        <Table border :columns="columns1" :data="data1"></Table>-->
<!--      </Form>-->
<!--    </Card>-->
<!--  </div>-->
<!--</template>-->


<!--<script>-->
<!--  export default {-->
<!--    name: 'Expenditure',-->
<!--    props: {-->
<!--      formItem: {}-->
<!--    },-->
<!--    data () {-->
<!--      return {-->
<!--        columns1: [-->
<!--          {-->
<!--            title: '增加',-->
<!--            key: 'add',-->
<!--            render: (h, params) => {-->
<!--              const name = this.data1[params.index].add-->
<!--              const prompt = '允许增加' + name-->
<!--              return h('div', [-->
<!--                h('Checkbox', {-->
<!--                  props: {-->
<!--                    name: name,-->
<!--                    label: '允许增加'-->
<!--                  }-->
<!--                }, prompt)-->
<!--              ])-->
<!--            }-->
<!--          },-->
<!--          {-->
<!--            title: '删除',-->
<!--            key: 'delete',-->
<!--            render: (h, params) => {-->
<!--              const name = this.data1[params.index].delete-->
<!--              const prompt = '允许删除' + name-->
<!--              return h('div', [-->
<!--                h('Checkbox', {-->
<!--                  props: {-->
<!--                    name: name,-->
<!--                    label: '允许删除'-->
<!--                  }-->
<!--                }, prompt)-->
<!--              ])-->
<!--            }-->
<!--          },-->
<!--          {-->
<!--            title: '修改',-->
<!--            key: 'modify',-->
<!--            render: (h, params) => {-->
<!--            -->
<!--            }-->
<!--          },-->
<!--          {-->
<!--            title: '查看',-->
<!--            key: 'show',-->
<!--            render: (h, params) => {-->
<!--              if (this.data1[params.index].show)-->
<!--              const name = this.data1[params.index].modify-->
<!--              const prompt = '允许修改' + name-->
<!--              return h('div', [-->
<!--                h('Checkbox', {-->
<!--                  props: {-->
<!--                    name: name,-->
<!--                    label: '允许修改'-->
<!--                  }-->
<!--                }, prompt)-->
<!--              ])-->
<!--            }-->
<!--          }-->
<!--        ],-->
<!--        data1: [-->
<!--          {-->
<!--            add: '员工',-->
<!--            delete: '员工',-->
<!--            modify: '员工',-->
<!--            show: '员工'-->
<!--          },-->
<!--          {-->
<!--            add: '仓库',-->
<!--            delete: '仓库',-->
<!--            modify: '仓库',-->
<!--            show: '仓库'-->
<!--          },-->
<!--          {-->
<!--            add: '包裹',-->
<!--            delete: '包裹',-->
<!--            modify: '包裹',-->
<!--            show: '包裹'-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      show (index) {-->
<!--        this.$Modal.info({-->
<!--          title: 'User Info',-->
<!--          content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`-->
<!--        })-->
<!--      },-->
<!--      generateCheckboxPrompt(h, items, prompt) {-->
<!--        prompt = '允许' + prompt-->
<!--        let comp = []-->
<!--        if (items.length === 1) {-->
<!--          comp.push(h('Checkbox', {-->
<!--            props: {-->
<!--              name: items[0],-->
<!--              label: prompt + items[0]-->
<!--            }-->
<!--          }))-->
<!--        } else {-->
<!--              comp.push(h('RadioGroup'))-->
<!--          for (const item of items) {-->
<!--            let select = []-->
<!--            select.push(h('Radio', {-->
<!--              name: item,-->
<!--              label: prompt + item-->
<!--            }))-->
<!--            -->

<!--          }-->
<!--        }-->
<!--        return h('div', [-->
<!--          h('Checkbox', {-->
<!--            props: {-->
<!--              name: name,-->
<!--              label: '允许修改'-->
<!--            }-->
<!--          }, prompt)-->
<!--        ])-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
