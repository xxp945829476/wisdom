<template>
     <a-modal v-model="certificatesVisible"  title="证件记录" :footer="null" :maskClosable="false" width="500px" v-dialogDrag="dialog" :zIndex="1005">
        <a-table :columns="columns" bordered :data-source="tableData" :pagination="false" size="middle" :loading='loading'>
          <a slot="tmplStatus" slot-scope="text,record">
            <a-badge v-if="text == 0" status="processing" text="审核中" />
            <a-badge v-else-if="text == 1" status="success" text="审批通过" />
            <a-badge v-else status="processing" text="审核拒绝" />
          </a>
        </a-table>
     </a-modal>
</template>

<script>
import {ListVehicleCertificate} from "@/network/api"
export default {
  data() {
    const columns = [
      { title: '序号', width: 80,customRender:(text, row, index)=>{
        return <a href="javascript:;">{index}</a>;
      },align:'center'},
      { title: '证件编号', dataIndex: 'workflowName', key: 'workflowName',ellipsis:true,},
      { title: '审批状态', dataIndex: 'tmplStatus', key: 'tmplStatus',scopedSlots: { customRender: 'tmplStatus' },},
    ]
    return {
      loading:false,
      certificatesVisible:false,
      tableData:[],
      dialog:true,
      columns,
    }
  },
  created(){
    
  },
  methods:{
    view(id){
      this.certificatesVisible = true;
      this.getCard(id)
    },
    getCard(id){
        let params = {
          vehicleNo:id
        };
        this.loading = true;
        ListVehicleCertificate(params).then(res=>{
          this.loading = false;
          if(res.data.code == 0){
            this.tableData = res.data.data;
          }else{
            this.$message.warning(res.data.message)
          };
        });
    }
  }
}
</script>