<template>
  <div>

          <div class=" layout_card_content">
        <div class="table-operator">
            <div class="left_button">
                  <a-button type="primary" @click="exportReport">
                    导出
                  </a-button>
            </div>

              <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData" htmlType="submit">查询</a-button>
                 <a-button class="reload_btn" @click="resetData">重置</a-button>
                  
            </div>

            <div class="layout_card_search layout_card_search_report" style="width:60%">
                   <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                      <a-row :gutter="24">
                         <a-col :md="8">
                              <a-form-model-item label="工地设备">
                                 <a-select placeholder="请选择工地设备" 
                                    show-search option-filter-prop="children"
                                    v-model="formParmas.deviceNo"
                                   
                                    :filter-option="false" @search="filterOption" allowClear>
                                    
                                    <div slot="dropdownRender" slot-scope="menu">
                                        <v-nodes :vnodes="menu" />
                                        <a-divider style="margin: 4px 0;" />
                                        <div
                                            style="padding: 4px 8px; cursor: pointer;"
                                            @mousedown="e => e.preventDefault()"
                                        >
                                        <a-pagination size="small" :total="total"  @change="changeDev" :pageSize='devParmas.pageSize' :show-total="total => `共 ${total} 条`"/>
                                        </div>
                                        </div>
                                        <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                        <template v-for="item in devList">
                                            <a-select-option  :key="item.simNo">
                                                {{item.facilityName}}
                                            </a-select-option>
                                        </template>
                                    </a-select>
                              </a-form-model-item>
                          </a-col>
                          <a-col :md="8">
                              <a-form-model-item label="开始时间">
                                 <a-date-picker show-time placeholder="请选择开始时间" v-model="formParmas.begintime" :disabled-date="disabledStartDate" format="YYYY-MM-DD HH:mm:ss" :allowClear="false"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
                              </a-form-model-item>
                          </a-col>
                          <a-col :md="8">
                              <a-form-model-item label="结束时间">
                                 <a-date-picker show-time  placeholder="请选择结束时间" v-model="formParmas.endtime" :disabled-date="disabledEndDate" format="YYYY-MM-DD HH:mm:ss" :allowClear="false" valueFormat="YYYY-MM-DD HH:mm:ss"/>
                              </a-form-model-item>
                          </a-col>

                         
                          
                      </a-row>
                  </a-form-model>
            </div>
        </div>

        <a-table :columns="columns" bordered :data-source="tableData" @change="changeTable" :rowKey='record' size="middle" :pagination="pagination" :loading="loading" :scroll="{y:height}">
             <span slot="fileNum" slot-scope="text,record">
                   <a @click="view(record)" v-if="record.alarmType==531">查看</a>
                </span>    
        </a-table>

        </div>
        <videoComponents ref="play"></videoComponents>
  </div>
</template>

<script>
import {SiteEquipmentList,SummaryBlacklist,ExportSummaryBlacklist} from "@/network/api"
import videoComponents from '@/components/modalVideoPlayer.vue'


export default {
  data() {
    const columns = [
      { title: '序号', fixed: 'left',width: 80, dataIndex: 'name', key: 'name', customRender:(text, row, index)=>{
        return <span>{index}</span>;
      },align:'center'},
      {
        title: '车牌号码',
        dataIndex: 'vehicleNo',
        key: 'vehicleNo',
        align:'center',
        ellipsis:true,
      },
      {
        title: '所属企业',
        dataIndex: 'deptName',
        key: 'deptName',
        align:'center',
        ellipsis:true,
      },
      {
        title: '车辆类型',
        dataIndex: 'vehicleType',
        key: 'vehicleType',
        align:'center',
        ellipsis:true,
      },
      {
        title: '报警类型',
        dataIndex: 'type',
        key: 'type',
        align:'center',
        ellipsis:true,
      },
      {
        title: '上报时间',
        dataIndex: 'time',
        key: 'time',
        align:'center',
        ellipsis:true,
      },
      {
        title: '附件',
        dataIndex: 'fileNum',
        key: 'fileNum',
        align:'center',
        ellipsis:true,
        scopedSlots: { customRender: 'fileNum' },
      },
    ];
    return {
      fetching:false,
      height:'',
      loading:false,
      columns,
      pagination:{
        total:0,
        size:'middle',
        showSizeChanger: true,
        showLessItems:true,
        current:1,
        pageSize:20,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showQuickJumper:true,
        showTotal:total => `共 ${total} 条`
      },
 
     
   
      tableData:[],
      formParmas: {
        begintime:'',
        endtime:'',
        currentPage:1,
        pageRecords:20,
        geoaddress:1,
        toMap:2,
        armType:'530,531,532,533,536,537',
        deviceNo:undefined
      },
      devParmas: {
        pageNum:1,
        pageSize:20,
        simNo:'',
        deviceType:'',
        activition:'',
        deviceOperator:'',
        vehicleNo:'',
        bindStatus:1,
        deviceName:'',
      },
      total:'',
      devList:[]
    }
  },
  created(){
    this.init()
  },
  mounted(){
    this.$nextTick(()=>{
      this.tableHeight()
    })
  },
  components:{
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
    videoComponents
  },
  methods:{
    tableHeight(){
      this.height = document.documentElement.clientHeight - 295
    },
    init(){
      this.getDay();
      this.getDevList();
    },
    getDay(){
       let day = this.$moment().format("YYYY-MM-DD");
      this.formParmas.begintime = day + ' ' + '00:00:00'
      this.formParmas.endtime = day + ' ' + '23:59:59'
    },
    getDevList(){
         this.fetching = true;
        SiteEquipmentList(this.devParmas).then(res=>{
             this.fetching = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.devList= data;
                this.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    filterOption(val) {
      this.devParmas.pageNum = 1;
      this.devParmas.deviceName = val;
      this.getDevList();
    },
    changeDev(page){
        this.devParmas.pageNum = page;
        this.getDevList();
    },
    getData(){
        this.loading = true;
        SummaryBlacklist(this.formParmas).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
                this.tableData = res.data.data.list;
                this.pagination.total = res.data.data.total;
                 if(this.tableData.length>0){
                  this.tableData.forEach((cur,index)=>{
                    this.$set(cur,'keyIdex',index+'a')
                  })
                };
            }else{
                this.$message.warning(res.data.message)
            };
            
        }).catch(error=>{
           this.tableData = []
           this.loading = false;
        })
    },
   
    changeTable(pagination){
      this.pagination.current = pagination.current;
      this.formParmas.currentPage = pagination.current;
      this.formParmas.pageRecords = pagination.pageSize;
      this.pagination.pageSize = pagination.pageSize;
      this.getData()
    },
    record(key){
          return key.keyIdex
    },
    searchData(){
      this.formParmas.currentPage = 1;
      this.pagination.current = 1;
      this.getData()
    },
    resetData(){
      this.getDay();
      this.formParmas.currentPage = 1;
      this.pagination.current = 1;
      this.getData()
    },
    disabledStartDate(startValue) {
      
      const endValue = this.$moment(this.formParmas.endtime);
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.$moment(this.formParmas.begintime);
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    exportReport(){

      let params = {
        begintime:this.formParmas.begintime,
        endtime:this.formParmas.endtime,
        geoaddress:1,
        toMap:2,
        armType:'530,531,532,533,536,537',
        deviceNo:this.formParmas.deviceNo
      };
      ExportSummaryBlacklist(params).then(res=>{
          if(window.navigator.msSaveBlob){
            const blobObject = new Blob([res.data]);
            window.navigator.msSaveBlob(blobObject, '黑车报警报表.xls');
          }else{
            let blob = new Blob([res.data]); // 假设文件为pdf
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = '黑车报警报表.xls';
            link.click();
            link.remove();
          }
         
      });
    },
    view(record){
      console.log(record)
      this.$refs.play.playVideo(record,this.formParmas.deviceNo,this.formParmas.begintime)
    }

  }
  
}
</script>