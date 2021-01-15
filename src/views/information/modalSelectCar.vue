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
      jsession:'',
      PI:3.1415926535897932384626,
      ee:0.00669342162296594323,
      a:6378245.0
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
      bd09togcj02(bd_lon, bd_lat) {
        var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        var x = bd_lon - 0.0065;
        var y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        var gg_lng = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
       

      
        
      return this.gcj02towgs84(gg_lng, gg_lat)
      

    },

    /**
       * GCJ02 转换为 WGS84
       */
      gcj02towgs84(lng, lat) {
          if (this.out_of_china(lng, lat)) {
              return [lng, lat]
          }
          else {
              var dlat = this.transformlat(lng - 105.0, lat - 35.0);
              var dlng = this.transformlng(lng - 105.0, lat - 35.0);
              var radlat = lat / 180.0 * this.PI;
              var magic = Math.sin(radlat);
              magic = 1 - this.ee * magic * magic;
              var sqrtmagic = Math.sqrt(magic);
              dlat = (dlat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtmagic) * this.PI);
              dlng = (dlng * 180.0) / (this.a / sqrtmagic * Math.cos(radlat) * this.PI);
              var mglat = lat + dlat;
              var mglng = lng + dlng;
              return [lng * 2 - mglng, lat * 2 - mglat]
          }
      },
      
      transformlat(lng, lat) {
          var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
          ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
          ret += (20.0 * Math.sin(lat * this.PI) + 40.0 * Math.sin(lat / 3.0 * this.PI)) * 2.0 / 3.0;
          ret += (160.0 * Math.sin(lat / 12.0 * this.PI) + 320 * Math.sin(lat * this.PI / 30.0)) * 2.0 / 3.0;
          return ret
      },
      
      transformlng(lng, lat) {
          var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
          ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
          ret += (20.0 * Math.sin(lng * this.PI) + 40.0 * Math.sin(lng / 3.0 * this.PI)) * 2.0 / 3.0;
          ret += (150.0 * Math.sin(lng / 12.0 * this.PI) + 300.0 * Math.sin(lng / 30.0 * this.PI)) * 2.0 / 3.0;
          return ret
      },
      
      /**
       * 判断是否在国内，不在国内则不做偏移
       */
      out_of_china(lng, lat) {
          return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
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
                ID:parseInt(cur.id),
                NAME:'线路名称',
                SLAGTYPE: parseInt(cur.fieldType),
                POINT:this.getPoint(cur)
              })
            }else{
              this.jsonObj.POLY22.push({
                ID:parseInt(cur.id),
                NAME:'围栏名称',
                ALMIN:1,
                ALMOUT:1,
                UPIN:1,
                UPOUT: 1,
                SLAGTYPE:parseInt(cur.fieldType),
              
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
        

        // let a = [];
        let l = [];
        let point = [];

        let newArr = [];
        let wgsArr = [];

       

        latArr.forEach((cur,index)=>{
          newArr.push({
            lat:cur,
            lng:lngArr[index]
          })
        })

         


          newArr.filter(cur=>{
            wgsArr.push({
              lat:this.bd09togcj02(cur.lng,cur.lat)[1],
              lng:this.bd09togcj02(cur.lng,cur.lat)[0]
            })
         })


         wgsArr.forEach(cur=>{
           cur.lat = parseFloat(cur.lat).toFixed(6).replace(/\./g,'');
           cur.lng = parseFloat(cur.lng).toFixed(6).replace(/\./g,'')
         })





        

        wgsArr.forEach((cur,index)=>{
          if(obj.fieldType==210||obj.fieldType==769){
            point.push({
              ID: parseInt(index),
					    W: 100, 
              Y:parseInt(cur.lat),
              X:parseInt(cur.lng)
            })
          }else{
            point.push({
              Y:parseInt(cur.lat),
              X:parseInt(cur.lng)
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
            account:'admin',
                password:'admin',
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