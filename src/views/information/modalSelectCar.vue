<template>
  <a-modal v-model="selectVisible" title="下发电子围栏至车载终端" :maskClosable="false" :keyboard="false" width="80%" v-dialogDrag="dialog">
      <div>
        <a-spin :spinning="spinning">
        <div class="modal_search">
            <a-form-model layout="inline" :model="formParmas" @submit="modalSearch" @submit.native.prevent>
              <a-row :gutter="10">
                <a-col :md="12">
                  <a-form-model-item label="所属公司">
                    <a-select v-model="formParmas.deptId"
                            placeholder="请选择所属企业">
                              <a-select-option v-for="item in depList" :key="item.id">
                                  {{item.deptName}}
                              </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>


                <a-col :md="12" :sm="24">
                     <a-button type="primary" class="search_btn" @click="modalSearch">查询</a-button>
                     <a-button class="reload_btn" @click="resetSearch">重置</a-button>
              
              </a-col>
              </a-row>
            </a-form-model>
          </div>
        <a-row type="flex">
          <a-col flex="600">
            <a-table :columns="columns" bordered :rowKey='record' :data-source="tableData" :rowSelection="{ selectedRowKeys: selectedRowKeys,onChange: onSelectChange,}" :pagination="pagination" @change="changeTable" :scroll="{ y:height}" :loading='loading'>
            <template slot="ol" slot-scope="text,record">
                  <span v-if="record.ol==1">在线</span>
                  <span v-else>离线</span>
            </template>
         </a-table>
          </a-col>
          <a-col flex="300px">
            <div class="already_sel" >
              <h3>已选车辆({{selectedList.length}})</h3>
              <ul :style="{height:height-40 + 'px'}">
                <li v-for="item in selectedList" :key="item.id">{{item.vehicleNo}}</li>
              </ul>
            </div>
            
          </a-col>
        </a-row>
        </a-spin>
      </div>
    
      <template slot="footer">
          <a-button key="back" @click="selectVisible=false">
          取消
          </a-button>
          <a-button key="submit" type="primary" @click="sure">
          下发
          </a-button>
      </template>
  </a-modal>
</template>

<script>
/*!
  @param {Boolean} dialog - 弹框是否拖动
  @param {Boolean} roleVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/


import {IndexVehicleList,SendCertificate,DepartmentList,GetJsession} from '@/network/api'
import {TruckSetting} from '@/network/apiOther'


export default {
  data() {
    const columns = [
      { title: '车牌号码', dataIndex: 'vehicleNo', key: 'vehicleNo',ellipsis:true,align:'center',},
      { title: '车辆状态', dataIndex: 'ol', key: 'ol',ellipsis:true,align:'center',scopedSlots: { customRender: 'ol' },},
      { title: '车辆类型', dataIndex: 'vehicleTypeName', key: 'vehicleTypeName',ellipsis:true,align:'center',},
    ]
    return {
      columns,
      loading:false,
      tableData:[],
      dialog:true,
      selectVisible:false,
      labelCol: { span: 5 },
      height:'',
      wrapperCol: { span: 16 },
      pagination:{
        total:0,
        size:'small',
        showLessItems:false,
        current:1,
        pageSize:20,
        showTotal:total => `共 ${total} 条`
      },
      depList:[],
      formParmas:{
        pageNum:1,
        pageSize:20,
        vehicleId:'',
        vehicleNos:[],
        vehicleNo:'',
        vehicleStatus :'',
        vehicleType:'',
        deptId:'',
      },
      selectedRowKeys:[],
      selectedList:[],
      jsonObj:{
        POLY22:[],
        LINE22:[]
      },
      spinning:false,
      jsession:''
    }
  },
  created(){
   
  },
  methods:{
    getJsession(){
        let params = {
              };
            GetJsession(params).then(res=>{
              if(res.data.code == 0){
                  this.jsession = res.data.data;
              }else{
              };
            })
      },
      selCar(arr){
          console.log(arr)

          let polyParams = {
            ID:'',
            NAME:'围栏名称',
            ALMIN:1,
            ALMOUT:1,
            UPIN:1,
            SLAGTYPE:'',
            POINT:[]
          };

          let lineParams = {
            ID:'',
            NAME:'围栏名称',
            POINT:[]
          };

          arr.forEach(cur=>{
            if(cur.fieldType==210||cur.fieldType==769){
              this.jsonObj.LINE22.push({
                ID:cur.id,
                NAME:'线路名称',
                POINT:this.getPoint(cur)
              })
            }else{
              this.jsonObj.POLY22.push({
                ID:cur.id,
                NAME:'围栏名称',
                ALMIN:1,
                ALMOUT:1,
                UPIN:1,
                SLAGTYPE:'',
                POINT:this.getPoint(cur)
              })
            }
          });

          
    

          this.selectVisible = true;
          this.selectedList = [];
          this.selectedRowKeys = [];
          this.getData();
          this.getDepart();
          this.getJsession()
          this.$nextTick(()=>{
            this.height = parseFloat($('.ant-modal-body').css('maxHeight'))-190
          })
      },
      getPoint(obj){
        let latArr = obj.lat.split(',');
        let lngArr = obj.lng.split(',');

        let a = [];
        let l = [];
        let point = [];

        latArr.forEach(cur=>{
          a.push(parseFloat(cur).toFixed(6).replace(/\./g,''))
        });
        lngArr.forEach(cur=>{
          l.push(parseFloat(cur).toFixed(7).replace(/\./g,''))
        });



        a.forEach((cur,index)=>{
          if(obj.fieldType==210||obj.fieldType==769){
            point.push({
              ID: index,
					    W: 100, 
              Y:cur,
              X:l[index]
            })
          }else{
            point.push({
              Y:cur,
              X:l[index]
            })
          }
          
        })


        return point
      },

      getDepart(type){
         let params = {
            deptName: '',
            pageNum:1,
            pageSize:999,
            deptType:3,
            deptBusinessType:''
         };
         this.spinning = true;
         DepartmentList(params).then(res=>{
             this.spinning = false;
            if(res.data.code == 0){
                
                this.depList = res.data.data.records;
                
               
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
      getData(){
        this.loading = true;

        IndexVehicleList(this.formParmas).then(res=>{
          this.loading = false;
          this.flag = false;
          if(res.data.code == 0){
          
            this.tableData = res.data.data.records;
            this.pagination.total = res.data.data.total;

           

          }else{
            this.$message.warning(res.data.message)
          }
          console.log(this.tableData)
        });
      },
      record(key){
          return key.vehicleId
      },
      changeTable(pagination){
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.formParmas.pageSize = pagination.pageSize;
        this.formParmas.pageNum = pagination.current;
        this.getData()
      },
      sure(){
        if(this.selectedList.length<=0){
          this.$message.warning('请选择车辆')
          return false
        };
        
        this.selectedList.forEach(cur=>{
          this.sureOk(cur.simNo)
        });
      },
      sureOk(val){

       
        
        

        let params = {
          devIdno:val,
          json:JSON.stringify(this.jsonObj),
          type:100,
          ip:playVideoUrl,
          port:portNumber,
          jsession:this.jsession,
          devType: 0
        };

        
        

        this.spinning = true;

        TruckSetting(params).then(res=>{
          this.spinning = false;
          this.selectVisible = false;
          if(res.data.result == 3){
            // this.selectVisible = false;
            // this.$message.success('下发成功')
          }else{
            // this.$message.success('下发失败')
          }
        }).catch(res=>{
          this.spinning = false;
           this.$message.success('下发失败')
        })


        // this.selectVisible = false;
        // console.log()
        // this.$emit('getVehicleNo',this.selectedList)

      },
      onSelectChange(val,row){
        this.selectedRowKeys = val;
        this.selectedList = row;
      },
      modalSearch(){
        this.pagination.current = 1;
        this.formParmas.pageNum = 1;
        this.getData()
      },
      resetSearch(){
        this.pagination.current = 1;
        this.formParmas.pageNum = 1;
        this.formParmas.deptId = '';
        this.getData();
      }

    
    }
  
}
</script>