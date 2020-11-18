<template>
  <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="form" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSearch" @submit.native.prevent>
          <a-form-model-item>
            <a-input-search
              v-model="form.keyName"
              placeholder="查找地区、公司、车辆"
              enter-button="搜索"
              @search="onSearch"
            />
          </a-form-model-item>
        </a-form-model>

        <div>
          <h2 class="all_car" @click="screenTree(6)">请选择车辆类型：</h2>
          <div class="index_type">
            <a-radio-group v-model="form.vehicleType" @change="changeType">
            <a-radio v-for="item in typeList" :key="item.id" :value="item.id">
              {{item.name}}
            </a-radio>
          </a-radio-group>
          </div>
    
          <h2 class="all_car" @click="screenTree(6)">全部：{{allCar}}</h2>
          <a-row type="flex" justify="space-between" class="car_status">
            <a-col :span="6" :class="{select_car:deviceStatusValue==0}" @click="screenTree(0)">
              <img src="@/assets/images/xs.png"/>
              <span>行驶</span>
              <em>{{st}}</em>
            </a-col>
            <a-col :span="6"  @click="screenTree(1)" :class="{select_car:deviceStatusValue==1}"> 
              <img src="@/assets/images/tc.png"/>
              <span>停车</span>
              <em class="num_tc">{{pk}}</em>
            </a-col>
            <a-col :span="6"  @click="screenTree(2)" :class="{select_car:deviceStatusValue==2}">
              <img src="@/assets/images/yc.png"/>
              <span>异常</span>
              <em class="num_zx">0</em>
            </a-col>
            <a-col :span="6"  @click="screenTree(3)" :class="{select_car:deviceStatusValue==3}">
              <img src="@/assets/images/lx.png"/>
              <span>离线</span>
              <em class="num_lx">{{offLine}}</em>
            </a-col>
          </a-row>
        </div>
        <a-spin :spinning="spinning">  
        <div class="left_tree left_tree_single">
          <a-tree
            v-model="checkedKeys"
            :show-line="true"
            checkable
            :tree-data="treeData"
            @check="location"
            v-if="!spinning"
            :replaceFields="replaceFields"
          >
              <template slot="custom" slot-scope="item">
                  <img src="@/assets/images/xs.png" v-if="deviceStatusValue==0"/>
                  <img src="@/assets/images/tc.png" v-if="deviceStatusValue==1"/>
                  <img src="@/assets/images/lx.png" v-if="deviceStatusValue==2"/>
                  <img src="@/assets/images/yc.png" v-if="deviceStatusValue==3"/>
                  <span>{{ item.keyName }}</span>
                  <i class="iconluxian iconfont route_icon" @click.stop="trajectory(item.keyName)"></i>
                  <i class="iconbofang1 iconfont play_icon" @click.stop="previewVideo(item.devIdNo)" v-if="item.deviceStatus.ol==1&&item.deviceStatus.pk==0"></i>
              </template>
          </a-tree> 
        </div>
        </a-spin>
        
      </a-col>
      <a-col flex="auto" ref="right_map" class="right_map">
        <baidu-map class="bm-view"  @resize="resize" ref="bm_view" :scroll-wheel-zoom="true" :ak="$store.getters.ak" :center="center" :zoom="zoom" @ready="handler">
          <navigation></navigation>
          <mapMarker :position="item" v-for="(item,index) in centerList" :key="index" :rotation="item.rotation" :icon="{url: iconUrl, size: {width: 55, height: 24}}" @click="showCarDetails(item)">
            <mapLabel :content="item.content" :labelStyle="tipStyle" :offset="{width: 0, height: -35}"></mapLabel>
          </mapMarker>
          <mapOverlay>
            <!-- 收缩左侧树按钮 -->
            <div class="double_left" @click.stop="toggleLeftTree" ref="double_left">
              <a-icon type="double-left" v-if="leftWidth=='280px'" />
              <a-icon type="double-right" v-else />
            </div>
          </mapOverlay>
        </baidu-map>

        <div class="status_list" ref="status_list">
          <a-row type="flex" justify="start" class="status_list_nav" ref="status_list_nav">
              <a-col flex="100px" @click="filterData(6)" :class="{'cur_statue':curStatue==6}">全部（{{total}}）</a-col>
              <a-col flex="100px" @click="filterData(0)" :class="{'cur_statue':curStatue==0}">行驶（{{downMove}}）</a-col>
              <a-col flex="100px" @click="filterData(1)" :class="{'cur_statue':curStatue==1}">停车（{{downStop}}）</a-col>
              <a-col flex="100px" @click="filterData(3)" :class="{'cur_statue':curStatue==3}">离线（{{downOffline}}）</a-col>
              <a-col flex="100px" @click="filterData(4)" :class="{'cur_statue':curStatue==2}">异常（0）</a-col>
              <i class="iconzuidahua1 iconfont enlarge_icon" @click="enlarge" v-if="!isEnlarge"></i>
              <i class="iconzuixiaohua1 iconfont enlarge_icon" @click="enlarge" v-else></i>
          </a-row>
          <div class="status_list_content">
            <a-table :columns="columns" :rowKey='record' :data-source="tableData" :pagination="pagination" @change="changeTable" :scroll="{ x: 1300,y:height}" size="small" :loading='loading'>
              <template slot="vehicleNewOld" slot-scope="text">
                  <span v-if="text==1">新</span>
                  <span v-else-if="text==2">旧</span>
              </template>

               <template slot="deviceMaster" slot-scope="text">
                  <span v-if="text">车辆主设备</span>
              </template>
              <template slot="hx" slot-scope="text">
                  <span v-if="text==0||text==360">北</span>
                  <span v-if="text>0&&text<90">西北</span>
                  <span v-if="text==90">西</span>
                  <span v-if="text>90&&text<180">西南</span>
                  <span v-if="text==180">南</span>
                  <span v-if="text>180&&text<270">东南</span>
                  <span v-if="text==270">东</span>
                  <span v-if="text>270&&text<360">东</span>
              </template>

               <!-- <template slot="isExistVideo" slot-scope="text">
                  <span>否</span>
              </template> -->

              <template slot="deviceCalibration" slot-scope="text">
                  <span v-if="text == 0">是</span>
                  <span v-else>否</span>
              </template>

               <template slot="accSwitch" slot-scope="text">
                  <span v-if="text.substr(1,1)==1">开启</span>
                  <span v-else>关闭</span>
              </template>

              <template slot="alarmType" slot-scope="text">
                  <span>--</span>
              </template>

              <template slot="vehicleStatus" slot-scope="text,record">
                  <span v-if="record.pk==0">行驶</span>
                  <span v-else>停车</span>
              </template>

              <template slot="statusJob" slot-scope="text,record">
                  
                  <span v-if="(record.s3 >> 20) & 1 > 0">半载</span>
                  <span v-else-if="(record.s2 >> 19) & 1 > 0">重载</span>
                  <span v-else>空载</span>
                  &nbsp;
                  <span v-if="record.tp[0] == '00'">无效</span>
                  <span v-else-if="record.tp[0] == '01'">关闭</span>
                  <span v-else-if="record.tp[0] == '02'">打开</span>
                  <span v-else-if="record.tp[0] == '03'">异常</span>
                  <span v-else-if="record.tp[0] == '04'">开启未完全</span>
                  <span v-else-if="record.tp[0] == '05'">关闭未完全</span>
                  &nbsp;
                  <span v-if="record.tp[1] == '00'">无效</span>
                  <span v-else-if="record.tp[1] == '01'">平放</span>
                  <span v-else-if="record.tp[1] == '02'">举升</span>
                  <span v-else-if="record.tp[1] == '03'">异常</span>
              </template>

              <template slot="controlStatus" slot-scope="text,record">
                  <span v-if='("0x" + record.tp[21] + "" + record.tp[20]  + ""+ record.tp[19]  + ""+ record.tp[18]) >> 0 == 0'>未锁车</span>
                  <span v-else-if='("0x" + record.tp[21] + "" + record.tp[20]  + ""+ record.tp[19]  + ""+ record.tp[18]) >> 0 == 1'>锁车</span>
                  &nbsp;
                  <span v-if='("0x" + record.tp[25] + "" + record.tp[24]  + ""+ record.tp[23]  + ""+ record.tp[22]) >> 0 == 0'>未限速</span>
                  <span v-else-if='("0x" + record.tp[25] + "" + record.tp[24]  + ""+ record.tp[23]  + ""+ record.tp[22]) >> 0 == 1'>限速</span>
                  &nbsp;
                  <span v-if='("0x" + record.tp[29] + "" + record.tp[28]  + ""+ record.tp[27]  + ""+ record.tp[26]) >> 0 == 0'>未限举</span>
                  <span v-else-if='("0x" + record.tp[29] + "" + record.tp[28]  + ""+ record.tp[27]  + ""+ record.tp[26]) >> 0 == 1'>限举</span>
              </template>

              
            </a-table>
          </div>
          
        </div>
        <div class="drag_status_list_nav" ref="drag"></div>
      </a-col>
      
    </a-row>

    
    
     <!-- 全屏 按钮-->
      <div class="fullscreen_btn" @click="fullscreen">
        <a-icon type="fullscreen"/>
      </div>


    <!-- 车辆详情 -->
    <div class="vehicle_details" v-if="vehicleDetailsShow">
      <a-row type="flex" justify="space-between" align="middle" class="vehicle_details_title">
        <a-col flex="auto" class="vehicleDetail_brand">{{detailsData.vehicleNo}}</a-col>
       
        <a-col flex="40px" class="vehicle_details_close" @click="vehicleDetailsShow=false">
            <a-icon type="close" />
        </a-col>
      </a-row>
      <a-descriptions class="vehicle_details_content">
        <a-descriptions-item label="车牌号码">
         {{detailsData.vehicleNo}}
        </a-descriptions-item>
        <a-descriptions-item label="是否标定">
          <span v-if="detailsData.deviceCalibration==0">是</span>
          <span v-else>否</span>
        </a-descriptions-item>
        <a-descriptions-item label="验证信息">
          ---
        </a-descriptions-item>
        <a-descriptions-item label="有效证件">
         ---
        </a-descriptions-item>
        <a-descriptions-item label="所属公司">
         {{detailsData.deptName}}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="通讯时间">
         冀GM5136
        </a-descriptions-item> -->
        <a-descriptions-item label="定位时间">
          {{detailsData.gt}}
        </a-descriptions-item>
         <a-descriptions-item label="定位地址">
         {{detailsData.ps}}
        </a-descriptions-item>
        <a-descriptions-item label="车辆速度">
           {{detailsData.sp}}km/h
        </a-descriptions-item>
       
        <a-descriptions-item label="偏离路线">
          ---
        </a-descriptions-item>
        <a-descriptions-item label="货箱状态">
          <span v-if="(detailsData.s3 >> 20) & 1 > 0">半载</span>
          <span v-else-if="(detailsData.s2 >> 19) & 1 > 0">重载</span>
          <span v-else>空载</span>

          <em v-if="detailsData.tp" class="details_em">
            
        
          <span v-if="detailsData.tp[0] == '00'">无效</span>
          <span v-else-if="detailsData.tp[0] == '01'">关闭</span>
          <span v-else-if="detailsData.tp[0] == '02'">打开</span>
          <span v-else-if="detailsData.tp[0] == '03'">异常</span>
          <span v-else-if="detailsData.tp[0] == '04'">开启未完全</span>
          <span v-else-if="detailsData.tp[0] == '05'">关闭未完全</span>
          </em>
            <em v-if="detailsData.tp" class="details_em">
          <span v-if="detailsData.tp[1] == '00'">无效</span>
          <span v-else-if="detailsData.tp[1] == '01'">平放</span>
          <span v-else-if="detailsData.tp[1] == '02'">举升</span>
          <span v-else-if="detailsData.tp[1] == '03'">异常</span>
            </em>
        </a-descriptions-item>
        <a-descriptions-item label="围栏状态">
          ---
        </a-descriptions-item>
        <a-descriptions-item label="证件状态">
          <!-- ---  <a @click="certificateRecord(detailsData.vehicleId)">证件记录</a> -->
        </a-descriptions-item>
        <!-- <a-descriptions-item label="平台管控状态">
          --- <a>管控记录</a>
        </a-descriptions-item> -->
        <a-descriptions-item label="终端管控状态">
          <template v-if="detailsData.tp">
             <span v-if='("0x" + detailsData.tp[21] + "" + detailsData.tp[20]  + ""+ detailsData.tp[19]  + ""+ detailsData.tp[18]) >> 0 == 0'>未锁车</span>
            <span v-else-if='("0x" + detailsData.tp[21] + "" + detailsData.tp[20]  + ""+ detailsData.tp[19]  + ""+ detailsData.tp[18]) >> 0 == 1'>锁车</span>
            <em class="details_em">
            <span v-if='("0x" + detailsData.tp[25] + "" + detailsData.tp[24]  + ""+ detailsData.tp[23]  + ""+ detailsData.tp[22]) >> 0 == 0'>未限速</span>
            <span v-else-if='("0x" + detailsData.tp[25] + "" + detailsData.tp[24]  + ""+ detailsData.tp[23]  + ""+ detailsData.tp[22]) >> 0 == 1'>限速</span>
            </em>
             <em class="details_em">
            <span v-if='("0x" + detailsData.tp[29] + "" + detailsData.tp[28]  + ""+ detailsData.tp[27]  + ""+ detailsData.tp[26]) >> 0 == 0'>未限举</span>
            <span v-else-if='("0x" + detailsData.tp[29] + "" + detailsData.tp[28]  + ""+ detailsData.tp[27]  + ""+ detailsData.tp[26]) >> 0 == 1'>限举</span>
             </em>
          </template>
           
        </a-descriptions-item>
      </a-descriptions>
      
       <div class="vehicle_details_fuc">
            <span @click="trajectory(detailsData.vehicleNo)">轨迹</span>
            <span @click.stop="previewVideo(detailsData.simNo)">视频</span>
            <span @click.stop="tracking(detailsData,true)" v-if="!isTracking">跟踪</span>
            <span @click.stop="tracking(detailsData,false)" v-else class="cancel_tracking">取消跟踪</span>
            <span @click.stop="control">管控</span>
        </div>
    </div>

    <div class="real_time_video" v-show="videoVisible">
      <div id="cmsv6flash" class="ttx-video-h5">
        <div data-index="0" class="ttx-video-h5-item video-basis-2 ttx-video-h5-item-check" id="TtxH5Video-0">
          </div><div data-index="1" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-1"></div>
          <div data-index="2" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-2"></div>
          <div data-index="3" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-3"></div>
      </div>
      <div class="set_video">
       <a-icon type="close" @click="closeVideo"/>
       <i class="iconfont" v-for="item in videoMultiple" :key="item.num" :class="item.icon" @click="splitScreen(item.num)"></i>
      </div>
    </div>
    
      <modalCertificates ref="view_certificates"></modalCertificates>
  </div>
</template>

<script>






import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import navigation from 'vue-baidu-map/components/controls/Navigation.vue'
import mapMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import mapLabel from 'vue-baidu-map/components/overlays/Label.vue'
import mapOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import {launchFullscreen,exitfullscreen,isJSON} from '@/utils/utils.js'
import modalCertificates from './modalCertificates.vue'

import {IndexTree,GetJsession,IndexVehicleList,Geocoding,BaseList} from "@/network/api"


/*!
  @param {Boolean} vehicleDetailsShow - 车辆详情弹框显示隐藏
  @param {string} leftWidth - 左侧菜单宽度
*/


export default {
  data() {
    const columns = [
  { title: '序号', width: 80, fixed: 'left',customRender:(text, row, index)=>{
    return <a href="javascript:;">{index}</a>;
  },align:'center'},
  { title: '状态', width: 100, dataIndex: 'vehicleStatus', key: 'vehicleStatus',ellipsis:true,align:'center',scopedSlots: { customRender: 'vehicleStatus' },},
  // { title: '上级机构',width: 100, dataIndex: 'address', key: '1'},
  { title: 'SIM号',width: 120, dataIndex: 'simNo', key: 'simNo',ellipsis:true,align:'center',},
  { title: '车牌号码',width: 100, dataIndex: 'vehicleNo', key: 'vehicleNo',ellipsis:true,align:'center',},
  { title: '车辆类型',width: 100, dataIndex: 'vehicleTypeName', key: 'vehicleTypeName',ellipsis:true,align:'center',},
  { title: '驾驶员',width: 100, dataIndex: 'driverName', key: 'driverName',ellipsis:true, align:'center',},
  { title: '企业名称',width: 100, dataIndex: 'deptName', key: 'deptName',ellipsis:true, align:'center',},
  { title: '车辆新旧',width: 100, dataIndex: 'vehicleNewOld', key: 'vehicleNewOld',ellipsis:true,align:'center',scopedSlots: { customRender: 'vehicleNewOld' },},
  { title: '主从设备',width: 100, dataIndex: 'deviceMaster', key: 'deviceMaster' ,ellipsis:true,align:'center',scopedSlots: { customRender: 'deviceMaster' },},
  { title: '里程',width: 100, dataIndex: 'lc', key: 'lc',ellipsis:true, align:'center',},
  { title: '速度', width: 100,dataIndex: 'sp', key: 'sp',ellipsis:true, align:'center',},
  { title: '方向', width: 100,dataIndex: 'hx', key: 'hx' ,ellipsis:true,align:'center',scopedSlots: { customRender: 'hx' }},
  { title: 'GPS时间',width:180, dataIndex: 'gt', key: 'gt',ellipsis:true,align:'center', },
  { title: '纬度',width: 100, dataIndex: 'mlat', key: 'mlat',ellipsis:true,align:'center', },
  { title: '经度', width: 100,dataIndex: 'mlng', key: 'mlng',ellipsis:true, align:'center',},
  { title: '地址',width: 200, dataIndex: 'ps', key: 'ps' ,ellipsis:true,align:'center',},
  { title: '作业状态', width: 150,dataIndex: 'statusJob', key: 'statusJob',ellipsis:true,align:'center',scopedSlots: { customRender: 'statusJob' }},
  // { title: '设备手机号',width: 120, dataIndex: 'address', key: '17' },
  // { title: '是否存在视频',width: 120, dataIndex: 'isExistVideo', key: 'isExistVideo' ,ellipsis:true,align:'center',scopedSlots: { customRender: 'isExistVideo' }},
  { title: '设备类型', width: 100,dataIndex: 'deviceTypeName', key: 'deviceTypeName',ellipsis:true, align:'center',},
  { title: '报警类型',width: 100, dataIndex: 'alarmType', key: 'alarmType',ellipsis:true,align:'center',scopedSlots: { customRender: 'alarmType' } },
  { title: 'acc开关', width: 100,dataIndex: 's1', key: 's1',ellipsis:true,align:'center',scopedSlots: { customRender: 'accSwitch' }},
  { title: '管控状态', width: 160,dataIndex: 'controlStatus', key: 'controlStatus',ellipsis:true,align:'center', scopedSlots: { customRender: 'controlStatus' }},
  { title: '是否标定',width: 100, dataIndex: 'deviceCalibration', key: 'deviceCalibration' ,ellipsis:true,align:'center',scopedSlots: { customRender: 'deviceCalibration' }},
  
];


    return {
      outTime:1,
      operatedTime:'',
      count:0,
      curStatue:6,
      videoMultiple:[
        {num:1,icon:'iconweibiaoti-1'},
        {num:2,icon:'icon2bei'},
        {num:4,icon:'icon4bei'},
        {num:6,icon:'icon6bei'},
        {num:9,icon:'icon9bei'},
        {num:16,icon:'icon16bei'},
        {num:36,icon:'icon36bei'},
      ],
      videoVisible:false,//视频显示
      isEnlarge:false,
      vehicleDetailsShow:false,
      leftWidth:'280px',
      columns,
      checkedKeys: [],
      treeData:[],
      form:{
        keyName:'',
        vehicleType:''
      },
      formParmas:{
        pageNum:1,
        pageSize:20,
        vehicleId:'',
        vehicleNos:[],
        vehicleStatus :'',
        vehicleType:'',
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      center: {lng: 0, lat: 0},  //经纬度
      centerList:[
        {lng: 120.344394, lat: 31.503154},
        {lng: 120.351724, lat: 31.538077},
      ],
      zoom: 3,　 //地图展示级别
      rotation:0,
      iconUrl:' ',
      tipStyle:{
        background:'#ff872e',
        color:'#fff',
        padding:'8px 5px',
        border:'none',
        borderRadius:'4px'
      },
      content:'',
      height:100,
      map:'',
      BMap:'',
      isInitFinished:false,
      maxChnCount:4,
      devIdno:'',
      vehiIdno:'',
      jsession:'',
      abbr:'',
      closeSecond:0,
      list:[],
      websock: null,
      carNumber:[],
      replaceFields:{
        children:'nexts',
        title:'keyName',
        key:'id'
      },
      sendTime:'',
      tableData:[],
      detailsData:{},
      isTracking:false,
      flag:true,
      loading:false,
      stopDown:false,
      deviceStatus:[],
      deviceStatusValue:0,
      spinning:false,
      st:0,
      pk:0,
      onLine:0,
      offLine:0,
      allCar:0,
      downMove:0,
      downStop:0,
      downOnline:0,
      downOffline:0,
      total:0,
      preList:[],
      typeList:[],
      pagination:{
        total:0,
        size:'small',
        showSizeChanger: true,
        showLessItems:false,
        current:1,
        pageSize:20,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showQuickJumper:true,
        showTotal:total => `共 ${total} 条`
      },
      h1:'',
      detailsiD:'',
    }
  },
  components:{
    BaiduMap,
    navigation,
    mapMarker,
    mapLabel,
    mapOverlay,
    modalCertificates
  },
  created(){

    this.init();
     
   
  },
  mounted(){
    this.$nextTick(()=>{
      let h1 = this.$refs.right_map.$el.offsetHeight;
      let h2 = this.$refs.bm_view.$el.offsetHeight;
      this.height = h1 - h2 - 138;//计算列表最大高度
      this.h1 = h1;
      this.dragLine()//上下拖动列表
      setTimeout(()=>{
        this.initVideo(h1)
      },200)
      
    });


    this.$once('hook:beforeDestroy', () => {
      this.websocketclose();
      clearTimeout(this.sendTime);
      clearInterval(this.operatedTime);
      // document.querySelector('.ant-table-body').removeEventListener('scroll',this.scrollLoad,false)
    })
    
  },
  methods:{
    init(){
      
    
         
       
        
      this.websocketclose();
      this.uuid()
      
      this.getType()
    },
    tracking(obj,val){
      this.isTracking = val;
      if(val){
        this.center.lng =  obj.lng/1000000
        this.center.lat = obj.lat/1000000
      };
      
    },
    geocoding(location){
        let params = {
          ak:this.$store.getters.ak,
          location:location.lat/1000000 + ',' + location.lng/1000000
        };
        Geocoding(params).then(res=>{
           if(res.data.code == 0){
             let data = JSON.parse(res.data.data);
             location.ps = data.result.formatted_address
          }
        });
    },
    getData(){
      this.loading = true;
      this.formParmas.vehicleNos = this.carNumber;
      IndexVehicleList(this.formParmas).then(res=>{
         this.loading = false;
         this.flag = false;
         if(res.data.code == 0){
           if(res.data.data.records.length>0){
             this.stopDown = false;
             this.tableData = res.data.data.records;
             console.log(this.tableData)
            
           }else{
             this.stopDown = true;
           };
           
           this.downMove = res.data.move;
           this.downStop = res.data.stop;
           this.downOnline = res.data.online;
           this.downOffline = res.data.offline;
           this.total = res.data.data.total;
           this.pagination.total = res.data.data.total;

           this.tableData.forEach(cur=>{
             cur.lc = cur.lc/1000;
             cur.lng = cur.lng/1000000;
             cur.lat = cur.lat/1000000;
             let reg = new RegExp('"',"g")
             if(cur.gt){
               cur.gt = cur.gt.replace(reg, "");
             }
             if(cur.ps){
                cur.ps = cur.ps.replace(reg, "");
             }
             cur.sp = cur.sp/10;
             let list=[];
             for(let i=0;i<cur.tp.length-1;i+=2){
              list.push((cur.tp.substring(i,i+2)))
             };
             cur.tp = list;
            cur.s1 = this.binary(cur.s1)
           })

           console.log(this.tableData)
         }else{
           this.$message.warning(res.data.message)
         }
         console.log(this.tableData)
      });
    },
    changeTable(pagination){
       this.pagination.current = pagination.current;
       this.pagination.pageSize = pagination.pageSize;
       this.formParmas.pageSize = pagination.pageSize;
        this.formParmas.pageNum = pagination.current;
        this.getData()
    },
     getType(){
         let params = {
              pid: 51
            };
        BaseList(params).then(res=>{
          if(res.data.code == 0){

                  this.typeList = res.data.data
                  this.typeList.push(
                    {id: "",name:'全部'}
                  )
            
          };
        });
    },
    binary(n){
            let output=[], temp;
            for(let i=0;i<32;i++){
                temp=n&(1<<31-i);
                temp=temp>>>31-i;
                output.push((temp==0)?'0':'1');
            }
            return output.join('');
        
    },
    filterData(val){
      if(val==6){
        this.formParmas.vehicleStatus = ''
      }else{
        this.formParmas.vehicleStatus = val;
      };
      

      this.curStatue = val
     
      this.tableData = [];
      this.formParmas.pageNum = 1;
      this.pagination.current = 1;
      this.getData();
    },
    getDetailsData(){
      let params = {
         pageNum:1,
         pageSize:10,
         vehicleId:'',
         vehicleNos:[this.detailsiD],
         vehicleStatus :'',
         vehicleType:'',
      };
      IndexVehicleList(params).then(res=>{
         if(res.data.code == 0){
           this.detailsData = res.data.data.records[0];
           
         
             let reg = new RegExp('"',"g")
             if(this.detailsData.gt){
                this.detailsData.gt =  this.detailsData.gt.replace(reg, "");
             };
             if(this.detailsData.ps){
                 this.detailsData.ps = this.detailsData.ps.replace(reg, "");
             };
           
               this.detailsData.sp =  this.detailsData.sp/10

               
                 let list=[];
             for(let i=0;i<this.detailsData.tp.length-1;i+=2){
              list.push((this.detailsData.tp.substring(i,i+2)))
             };
             this.detailsData.tp = list;
             
              
            
           
             
           console.log(this.detailsData)
         }else{
           this.$message.warning('加载失败')
         }
      });
    },
    record(key){
          return key.vehicleId
    },
    initVideo(){
      let params = {
          allowFullscreen: "true",
          allowScriptAccess: "always",
          bgcolor: "#FFFFFF"
        };
      ttxVideoAll.init("cmsv6flash", this.h1, this.h1, params);

       setTimeout(this.initFlash, 200);

     
      
    },
    getVehicleList(){
      this.spinning = true;
           IndexTree(this.form).then(res=>{
             this.spinning = false;
             if(res.data.code == 0){
                this.treeData = res.data.data;
                this.deviceStatus =  res.data.deviceStatus;
                

                this.loop(this.treeData);
                this.screenCar(this.treeData);
                this.allCar = this.deviceStatus.length;
                this.st =  this.deviceStatus.filter(cur=>{return cur.pk == 0&&cur.ol == 1}).length;
                this.pk =  this.deviceStatus.filter(cur=>{return cur.pk > 0&&cur.ol == 1}).length;
                this.onLine =  this.deviceStatus.filter(cur=>{return cur.ol == 1}).length;
                this.offLine =  this.deviceStatus.filter(cur=>{return cur.ol != 1}).length;
             };
             console.log( this.treeData)
           });
    },
    screenCar(arr){
      //过滤树
      arr.forEach(cur=>{
              
             
              if(cur.nexts){
                if(cur.nexts.length>0){
                  if(cur.nexts[0].vehicleId){
                      let newArr = cur.nexts.filter(ele=>{
                        if(this.deviceStatusValue==0){
                            return ele.deviceStatus.pk == 0&&ele.deviceStatus.ol == 1
                          }else if(this.deviceStatusValue==1){
                            return ele.deviceStatus.pk > 0&&ele.deviceStatus.ol == 1
                          }else if(this.deviceStatusValue==2){
                            return ele.deviceStatus.ol == 2
                          }else if(this.deviceStatusValue==3){
                            return ele.deviceStatus.ol != 1
                          }else{
                            return ele
                          }
                      })
                      cur.nexts = newArr
                  }
                }
                this.screenCar(cur.nexts)
              };
          });

          return arr

    },
    screenTree(val){
      this.checkedKeys = [];
      this.carNumber = [];
      this.websocketclose();
      this.deviceStatusValue = val;
      this.getVehicleList();
      this.tableData = [];
      this.curStatue = 6
    },
    onSearch(){
      this.getVehicleList()
    },
    loop(arr){
          arr.forEach(cur=>{
              if(cur.vehicleId){
                this.$set(cur,'scopedSlots', {title: 'custom' });
                console.log(this.deviceStatus)
                this.deviceStatus.forEach(ele=>{
                  if(cur.keyName == ele.vid){
                     this.$set(cur,'deviceStatus', ele);
                  };
                });
                
              };
              if(cur.nexts){
                this.loop(cur.nexts)
              };
          });
    },
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      this.initWebSocket(uuid);
    },
    initWebSocket(uuid){ //初始化weosocket
        const wsuri = webUrl + "/api/websocket/" + uuid;
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
        console.log('连接成功')
        
    },
    websocketonerror(){//连接建立失败重连
      // this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
    console.log(this.carNumber)
      if(isJSON(e.data)){
        console.log(e.data)
        const redata = JSON.parse(e.data);
        console.log(redata.position)
        let position = JSON.parse(redata.position)
        if(!this.isTracking){
          this.center.lng =  position[0].mlng
          this.center.lat = position[0].mlat
        }

       
        
        
        
    
        position.forEach(cur=>{
          this.centerList.push(
            {lng: cur.mlng, lat: cur.mlat,content:cur.vi}
          )
        });
    
        if(this.preList.length>0){
          this.centerList.forEach((cur,index)=>{
            this.$set(cur,'rotation',this.getAngle(this.preList[index],this.centerList[index]))
          })
        }

        
        
         console.log(this.centerList)
        
        this.zoom = 15
        if(this.deviceStatusValue==0){
           this.iconUrl = require('@/assets/images/top1.png')
        }else if(this.deviceStatusValue==1){
          this.iconUrl = require('@/assets/images/top3.png')
        }else if(this.deviceStatusValue==2){
          this.iconUrl = require('@/assets/images/top2.png')
        }else if(this.deviceStatusValue==3){
          this.iconUrl = require('@/assets/images/car.png')
        }
        

        this.sendTime = setTimeout(() => {
          
          if(this.vehicleDetailsShow){
            this.getDetailsData()
          };
          if(this.carNumber.length>0){
            this.getData();
            this.websocketsend(this.carNumber.join(','))
          }
        }, 32000);
      };
      
    },
    websocketsend(Data){//数据发送
    this.preList = this.centerList;
     this.centerList = [];
     
      this.websock.send(Data);
    },
    websocketclose(e){  //关闭
     this.centerList = [];
      console.log('断开连接',e);
    },
    handler ({BMap, map}) {
      let that = this;
      that.center.lng = 120.640643;
      that.center.lat = 31.155029;
      // var geolocation = new BMap.Geolocation();
      //   geolocation.getCurrentPosition(function(r){
      //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
      //       var mk = new BMap.Marker(r.point);

      //      that.center.lng = r.point.lng;
      //      that.center.lat = r.point.lat;
      // } else {
      //       // alert('failed'+this.getStatus());
      //   }        
      // },{enableHighAccuracy: true})
      this.map = map
      this.BMap = BMap
      this.zoom = 12
     
    },
    bd_encrypt(gcjLat, gcjLon){
      let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
      var x = gcjLon, y = gcjLat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        let bdLon = z * Math.cos(theta) + 0.0065;
        let bdLat = z * Math.sin(theta) + 0.006;
        return {'lat' : bdLat,'lng' : bdLon};
    },
    location(checkedKeys){
      this.carNumber = [];
      checkedKeys.forEach(cur=>{
        this.loopCar(this.treeData,cur)
      });

      console.log(this.carNumber)
      //  let point = {
      //   lng:120.344394,
      //   lat:31.503154
        
      // }
      // let pointNext = {
      //   lng:116.404,
      //   lat:39.915
      // }
      // this.rotation = this.getAngle(point,pointNext);
      this.formParmas.pageNum = 1;
      this.tableData = [];
      this.getData();
      if(this.carNumber.length>0){
        this.websocketsend(this.carNumber.join(','));
      }else{
        this.websocketclose();
        clearTimeout(this.sendTime);
        this.centerList = [];
      }
      
    },
    loopCar(arr,cur){
      
        arr.forEach(ele=>{
          if(ele.vehicleId && ele.id == cur){
            this.carNumber.push(ele.keyName)
          };
          if(ele.nexts){
            this.loopCar(ele.nexts,cur)
          };
        });
    },
    getAngle(n,next){
            // 计算车辆实时方向角度
            var ret
            var w1 = n.lat/180 * Math.PI
            var j1 = n.lng/180 * Math.PI
            var w2 = next.lat/180 * Math.PI
            var j2 = next.lng/180 * Math.PI

            ret = 4 * Math.pow(Math.sin((w1 - w2) / 2), 2) - Math.pow(Math.sin((j1 - j2) / 2) * (Math.cos(w1) - Math.cos(w2)), 2);
            ret = Math.sqrt(ret);

            // var temp = Math.sin(Math.abs(j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
            var temp = Math.sin((j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
            console.log(temp)
            ret = ret/temp;

            ret = Math.atan(ret) / Math.PI * 180 ;
            ret += 360;

            

            // 这里用如此臃肿的if..else是为了判定追踪单个点的具体情况,从而调整ret的值
            if(j1-j2 < 0){
                // console.log('j1<j2')
                if(w1-w2 < 0){
                    // console.log('w1<w2')
                    ret;
                }else{
                    // console.log('w1>w2')
                    ret = -ret+180;
                }
            }else{
              
                // console.log('j1>j2')
                if(w1-w2 < 0){
                  
                    // console.log('w1<w2')
                    ret = 180+ret;
                }else{
               
                    // console.log('w1>w2')
                    ret = -ret;
                }
            }
            console.log(ret)
            return ret ;
    },
    showCarDetails(obj){
      console.log(obj.content)
      this.isTracking = false;
       this.vehicleDetailsShow = true;
       this.detailsiD = obj.content;
       this.getDetailsData()
    },
    toggleLeftTree(){
      if(this.leftWidth == 0){
        this.leftWidth = '280px';
        this.$refs.left_content.$el.style.width = '280px';
      }else{
        this.leftWidth = 0;
        this.$refs.left_content.$el.style.width = 0;
      };
    },
    fullscreen(){
        launchFullscreen(this.$refs.bm_view.$el)
    },
    clickMap({type, target, point, pixel, overlay}){
      console.log(type)
    },
    resize({type, target, size}	){
     this.map.centerAndZoom(new this.BMap.Point(this.center.lng, this.center.lat), this.zoom)
    },
    
    dragLine(){
      // 上下拖动列表
      let that = this;
      let oLine = this.$refs.drag;
        let oBox = this.$refs.right_map.$el;
        let oTop = this.$refs.bm_view.$el;
        let oBottom = this.$refs.status_list;
        let maxHeight = oBox.clientHeight;
        oLine.onmousedown = function(e){
          let disY = (e || event).clientY;
          oLine.top = oLine.offsetTop;
          
          document.onmousemove = function(e){
            let iT = oLine.top + ((e || event).clientY - disY);
            var e=e||window.event,tarnameb=e.target||e.srcElement;
            let maxT = oBox.clientHeight - oLine.offsetHeight;
            oLine.style.margin = 0;
            iT < 0 && (iT = 0);
            iT > maxT && (iT = maxT);
            oLine.style.top = oTop.style.height = iT + "px";
            oBottom.style.height = maxHeight - iT + "px"
            that.height = oBox.offsetHeight - oTop.offsetHeight - 138;
          }

          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null; 
            oLine.releaseCapture && oLine.releaseCapture()
          };
          oLine.setCapture && oLine.setCapture();
          return false
        }

        
        // document.querySelector('.ant-table-body').addEventListener('scroll',this.scrollLoad);
    },
    scrollLoad(){
      // console.log(document.querySelector('.ant-table-body').scrollTop)
      // console.log(document.querySelector('.ant-table-body').scrollLeft)
      let that = this;
      if(document.querySelector('.ant-table-body').scrollTop>0){
        if(document.querySelector('.ant-table-body').scrollTop + document.querySelector('.ant-table-body').offsetHeight >= document.querySelector('.ant-table-body').scrollHeight - 8){
              that.flag = true;
              if(that.flag&&!that.stopDown){
               
                that.formParmas.pageNum =  that.formParmas.pageNum +1;
                that.getData();
              }
              
          }
      }
      
    },
    initFlash(){
        console.log(typeof swfobject)
       if (typeof swfobject == "undefined" || typeof swfobject == undefined || swfobject.getObjectById("cmsv6flash") == null ||
            typeof swfobject.getObjectById("cmsv6flash").setWindowNum == "undefined" ) {
              this.isInitFinished = false;
            setTimeout(this.initVideo(this.h1), 50);

           
      } else {
            //设置视频插件的语言('playerType=flash'时生效)
            swfobject.getObjectById("cmsv6flash").setLanguage("cn.xml");
            //先将全部窗口创建好
            swfobject.getObjectById("cmsv6flash").setWindowNum(36);
            //再配置当前的窗口数目
            swfobject.getObjectById("cmsv6flash").setWindowNum(this.maxChnCount);
            //设置视频插件的服务器
            swfobject.getObjectById("cmsv6flash").setServerInfo(playVideoUrl,6605);
             this.$message.success({ content: '初始视屏插件成功', duration: 2 });
            this.getVehicleList();
            this.isInitFinished = true;
    }
    },
    previewVideo(devIdNo){
      this.devIdno = devIdNo;
      this.getJsession();
      this.count = 0;
      clearInterval(this.operatedTime);
      this.operatedNot()
      this.operatedTime = setInterval(this.go, 1000);
    },
    go(){
      console.log(this.count)
       this.count++;
       if(this.count == this.outTime * 60 - 10){
         this.$message.warning('您长时间未操作，视屏即将自动关闭')
       };
       if (this.count == this.outTime * 60) {
            clearInterval(this.operatedTime);
            this.closeVideo()
      }
    },
    operatedNot(count) {
      //监测页面长时间未操作
        //监听鼠标
        let x;
        let y;
        let that = this;
        document.onmousemove = function(event) {
            /* Act on the event */
            var x1 = event.clientX;
            var y1 = event.clientY;
            if (x != x1 || y != y1) {
                that.count = 0;
            }
            x = x1;
            y = y1;
        };
        document.onkeydown = function(event) {
            that.count = 0;
        };
    },
    getJsession(){

      let params = {
            };
           GetJsession(params).then(res=>{
             if(res.data.code == 0){
                this.jsession = res.data.data;
                this.previewVideoOK();
                // this.loadDeviceInfo()
             }else{
               this.closeVideo();
             };
           })
    },
    previewVideoOK(){
     
         //视频插件初始化完成
            if (this.isInitFinished) {
                //再一次设置flash窗口数量
                
                this.loadFlashWindowNum(this.maxChnCount);
                // if (this.closeSecond != 0) {
                //     $("#closeTip").show();
                //     setTimeout(closeVideo, 1000);
                // }
                var vehiName = this.abbr == "" ? this.devIdno : this.abbr;
                for (var i = 0; i < this.maxChnCount; ++i) {
                    swfobject.getObjectById('cmsv6flash').setBufferTime(i, 4);
                    swfobject.getObjectById('cmsv6flash').setVideoInfo(i, vehiName + " - CH" + (i + 1));
        
                    swfobject.getObjectById('cmsv6flash').startVideo(i, this.jsession, this.devIdno, i, 1, true);
                }
                this.videoVisible = true;
            }
    },
    loadFlashWindowNum(num) {
        swfobject.getObjectById('cmsv6flash').setWindowNum(num);
    },
    enlarge(){
      this.isEnlarge = !this.isEnlarge;
      this.tableData = [];
      this.stopDown = false;
      if(this.isEnlarge){
        this.$refs.bm_view.$el.style.height = 0;
        this.$refs.status_list.style.height = '100%'
        this.height = this.$refs.right_map.$el.offsetHeight - 138;
        this.$refs.drag.style.top = 0;

       
        this.getData();
      }else{
        this.$refs.bm_view.$el.style.height = 'calc(50vh + 40px)';
        this.$refs.status_list.style.height = 'auto';
        this.height = this.$refs.right_map.$el.offsetHeight - this.$refs.bm_view.$el.offsetHeight - 138;
         this.$refs.drag.style.top = 'calc(50vh + 39px)';
        this.getData();
      }
    },
    loadDeviceInfo() {
          let that = this;
            var param = [];
            param.push({name: 'jsession', value: this.jsession});
            param.push({name: 'devIdno', value: this.devIdno});
            param.push({name: 'vehiIdno', value: this.vehiIdno});

            this.doAjaxSubmit('http://dzkjbd.com/StandardApiAction_getVideoDevice.action', param, function (json, action, success) {
                if (success) {
                  
                    //不是视频设备
                    if (!json.isVideoDevice) {
                        alert(lang.errorVideoDevice);
                    } else {
                        that.devIdno = json.devIdno;
                        // that.chnCount = json.chnCount;
                        if (json.abbr != null) {
                            that.abbr = that.vehiIdno;
                        }
                        //加载完成再加载其他信息
                        // loadOtherInfo();
                    }
                } else {
                    //没有操作权限
                    if (json) {
                        if (json.result == 5) {
                             that.$message.warning('会话号不存在')
                        } else if (json.result == 8) {
                            that.$message.warning('没有车辆或者设备操作权限')
                        } else {
                          that.$message.warning('找不到车辆信息')
                        }
                    } else {
                        that.$message.warning('找不到车辆信息')
                    }
                }
            });
        },
        doAjaxSubmit(action, params, callback) {
            $.ajax({
                type: 'POST',
                url: action,
                data: params,
                cache: false,
                //contentType:'application/json',
                dataType: 'json',
                success: function (json) {
                    if (json.result == 0) {
                        callback.call(this, json, action, true);
                    } else {
                        callback.call(this, json, action, false);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    try {
                        if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown);
                    } catch (e) {
                    }
                    callback.call(this, null, action, false);
                }
            });
        },
        closeVideo(){
           this.videoVisible = false;
           for (let index = this.maxChnCount; index >= 0; index--) {
              swfobject.getObjectById('cmsv6flash').stopVideo(index);//关闭视频
           };
        },
        splitScreen(num){
          this.maxChnCount = num;
          this.getJsession();
        },
        trajectory(val){
          this.$router.push({path:'/trackPlayback',query:{id:val}})
        },
        control(){
          this.$router.push({path:'/remoteControl'})
        },
        certificateRecord(id){
          this.$refs.view_certificates.view(id)
        },
        changeType(val){
          this.getVehicleList()
        }
        
  }
  
}
</script>




