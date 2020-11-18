<template>
  <div>
    <button @click="exportData">导出数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
         { row1:'123', row2:'111', row2:'112', },
        { row1:'123', row2:'111', row2:'112', },
        { row1:'123', row2:'111', row2:'112', },
        { row1:'123', row2:'111', row2:'112', },
         { row1:'123', row2:'111', row2:'112', },
       ]
    }
  },
    methods: {
    exportData(){
                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                const tHeader = ['列1', '列2', '列3'];
                const filterVal = ['phone','wechatNum','status'];
                const list = this.tableData;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, 'fileName');
        },
 
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
   },
}
</script>