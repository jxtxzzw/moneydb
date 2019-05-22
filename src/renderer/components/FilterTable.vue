<template>
  <div>
    <Table
      border
      :data="filters"
      :columns="tableColumnsFilters"
      stripe>
    </Table>
  
    <Table
      :show-header=false
      border
      :data="data"
      :columns="columns"
      stripe>
    </Table>
  </div>
</template>

<script>
  export default {
    name: 'FilterTable',
    props: {
      columns: Array,
      data: Array
    },
    data () {
      return {
        filters: [{
          title: ''
        }],
        tableColumnsFilters: [],
        search: {}
      }
    },
    created () {
      for (let index in this.columns) {
        let filter = {}
        this.$set(filter, 'title', this.columns[index].title)
        if (this.columns[index].width) {
          this.$set(filter, 'width', this.columns[index].width)
        }
        let render = (h) => {}
        if (this.columns[index].filter) {
          if (this.columns[index].filter.type && this.columns[index].filter.type === 'Select') {
            render = (h) => {
              return h(this.columns[index].filter.type, {
                props: {
                  value: 0,
                  clearable: true
                },
                on: {
                  'on-change': (val) => {
                    if (val === 0) {
                      this.$delete(this.search, this.columns[index].key)
                      this.load()
                      return
                    }
                    this.$set(this.search, this.columns[index].key, val)
                    this.load()
                  }
                }
              }, this.createOptionsRender(index, h))
            }
          } else if (this.columns[index].filter.type && this.columns[index].filter.type === 'Input') {
            render = (h) => {
              let inputValue = {}
              return h(this.columns[index].filter.type, {
                props: {
                  placeholder: '输入' + this.columns[index].title,
                  icon: 'ios-search-strong'
                },
                on: {
                  input: val => {
                    inputValue = val
                    if (!inputValue) {
                      this.validInputValue(index, inputValue)
                    }
                  },
                  'on-click': () => {
                    this.validInputValue(index, inputValue)
                  },
                  'on-enter': () => {
                    this.validInputValue(index, inputValue)
                  }
                }
              })
            }
          } else {
            render = this.columns[index].filter.render
          }
        }
        this.$set(filter, 'render', render)
        this.tableColumnsFilters.push(filter)
      }
    },
    methods: {
      createOptionsRender (index, h) {
        let optionRender = []
        if (this.columns[index].filter.option) {
          let option = this.columns[index].filter.option
          for (let i in option) {
            optionRender.push(h('Option', {
              props: {
                value: option[i].value
              }
            }, option[i].name))
          }
        }
        return optionRender
      },
      load () {
        this.$emit('on-search', this.search)
      },
      validInputValue (index, inputValue) {
        if (!inputValue) {
          this.$delete(this.search, this.columns[index].key)
          this.load()
          return
        }
        this.$set(this.search, this.columns[index].key, inputValue)
        this.load()
      }
    }
  }
</script>

<style scoped>
</style>
