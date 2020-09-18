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
          <h2 class="all_car">全部：1530</h2>
          <a-row type="flex" justify="space-between" class="car_status">
            <a-col :span="6" class="select_car">
              <img src="@/assets/images/xs.png"/>
              <span>行驶</span>
              <em>6</em>
            </a-col>
            <a-col :span="6">
              <img src="@/assets/images/tc.png"/>
              <span>停车</span>
              <em class="num_tc">0</em>
            </a-col>
            <a-col :span="6">
              <img src="@/assets/images/yc.png"/>
              <span>在线</span>
              <em class="num_zx">0</em>
            </a-col>
            <a-col :span="6">
              <img src="@/assets/images/lx.png"/>
              <span>离线</span>
              <em class="num_lx">0</em>
            </a-col>
          </a-row>
        </div>
        
        <div class="left_tree left_tree_single">
          <a-tree
            v-model="checkedKeys"
            :show-line="true"
            checkable
            :tree-data="treeData"
            @check="location"
            :replaceFields="replaceFields"
          >
              <template slot="custom" slot-scope="item">
                  <img src="@/assets/images/xs.png"/>
                  <span>{{ item.keyName }}</span>
                  <i class="iconluxian iconfont route_icon"></i>
                  <i class="iconbofang1 iconfont play_icon" @click.stop="previewVideo(item)"></i>
              </template>
          </a-tree> 
        </div>
        
      </a-col>
      <a-col flex="auto" ref="right_map" class="right_map">
        <baidu-map class="bm-view"  @resize="resize" ref="bm_view" :scroll-wheel-zoom="true" ak="PYswOGSEIdfO5RcGfgetWd5cbhonKUpz" :center="center" :zoom="zoom" @ready="handler">
          <navigation></navigation>
          <mapMarker :position="item" v-for="(item,index) in centerList" :key="index" :rotation="rotation" :icon="{url: iconUrl, size: {width: 60, height: 60}}" @click="showCarDetails">
            <mapLabel :content="content" :labelStyle="tipStyle" :offset="{width: 0, height: -20}"></mapLabel>
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
              <a-col flex="100px">全部（5）</a-col>
              <a-col flex="100px">行驶（5）</a-col>
              <a-col flex="100px">停车（0）</a-col>
              <a-col flex="100px">离线（1）</a-col>
              <a-col flex="100px">在线（4）</a-col>
              <i class="iconzuidahua1 iconfont enlarge_icon" @click="enlarge" v-if="!isEnlarge"></i>
              <i class="iconzuixiaohua1 iconfont enlarge_icon" @click="enlarge" v-else></i>
          </a-row>
          <div class="status_list_content">
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300,y:height}" :pagination="false" size="middle">
              <template slot="name" slot-scope="text">
                  <a>{{ text }}</a>
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
        <a-col flex="auto" class="vehicleDetail_brand">冀GM5136</a-col>
       
        <a-col flex="40px" class="vehicle_details_close" @click="vehicleDetailsShow=false">
            <a-icon type="close" />
        </a-col>
      </a-row>
      <a-descriptions class="vehicle_details_content">
        <a-descriptions-item label="车牌号码">
         冀GM5136
        </a-descriptions-item>
        <a-descriptions-item label="是否标定">
          未标定
        </a-descriptions-item>
        <a-descriptions-item label="验证信息">
          ---
        </a-descriptions-item>
        <a-descriptions-item label="有效证件">
         3个
        </a-descriptions-item>
        <a-descriptions-item label="所属公司" span="2">
          复利资源再生利用产业服务张家口有限公司
        </a-descriptions-item>
        <a-descriptions-item label="通讯时间">
         冀GM5136
        </a-descriptions-item>
        <a-descriptions-item label="定位时间">
          未标定
        </a-descriptions-item>
        <a-descriptions-item label="车辆速度">
          ---
        </a-descriptions-item>
        <a-descriptions-item label="定位地址">
         冀GM5136
        </a-descriptions-item>
        <a-descriptions-item label="偏离路线">
          未标定
        </a-descriptions-item>
        <a-descriptions-item label="货箱状态">
          ---
        </a-descriptions-item>
        <a-descriptions-item label="围栏状态">
         冀GM5136
        </a-descriptions-item>
        <a-descriptions-item label="证件状态">
          ---  <a>证件记录</a>
        </a-descriptions-item>
        <a-descriptions-item label="平台管控状态">
          --- <a>管控记录</a>
        </a-descriptions-item>
        <a-descriptions-item label="终端管控状态">
          ---
        </a-descriptions-item>
      </a-descriptions>
      
       <div class="vehicle_details_fuc">
            <span>轨迹</span>
            <span>视频</span>
            <span>跟踪</span>
            <span>管控</span>
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
    

  </div>
</template>

<script>






const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: '行驶',
    
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: '河东区',
  },
   {
    key: '3',
    name: 'John Brown',
    age: 32,
    address: '行驶',
  },
   {
    key: '4',
    name: 'John Brown',
    age: 32,
    address: '行驶',
  },
   {
    key: '5',
    name: 'John Brown',
    age: 32,
    address: '行驶',
  },
];


import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import navigation from 'vue-baidu-map/components/controls/Navigation.vue'
import mapMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import mapLabel from 'vue-baidu-map/components/overlays/Label.vue'
import mapOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import {launchFullscreen,exitfullscreen,isJSON} from '@/utils/utils.js'

import {IndexTree,GetJsession} from "@/network/api"


/*!
  @param {Boolean} vehicleDetailsShow - 车辆详情弹框显示隐藏
  @param {string} leftWidth - 左侧菜单宽度
*/


export default {
  data() {
    const columns = [
  { title: '序号', width: 80, dataIndex: 'name', key: 'name', fixed: 'left',customRender:(text, row, index)=>{
    return <a href="javascript:;">{index}</a>;
  },sorter: true,align:'center'},
  { title: '状态', width: 100, dataIndex: 'age', key: 'age'},
  { title: '上级机构',width: 100, dataIndex: 'address', key: '1'},
  { title: '设备ID',width: 100, dataIndex: 'address', key: '2'},
  { title: '车牌号码',width: 100, dataIndex: 'address', key: '3' },
  { title: '车辆类型',width: 100, dataIndex: 'address', key: '4'},
  { title: '驾驶员',width: 100, dataIndex: 'address', key: '5' },
  { title: '企业名称',width: 100, dataIndex: 'address', key: '6' },
  { title: '车辆新旧',width: 100, dataIndex: 'address', key: '7' },
  { title: '主从设备',width: 100, dataIndex: 'address', key: '8' },
  { title: '里程',width: 100, dataIndex: 'address', key: '9' },
  { title: '速度', width: 100,dataIndex: 'address', key: '10' },
  { title: '方向', width: 100,dataIndex: 'address', key: '11' },
  { title: 'GPS时间',width: 100, dataIndex: 'address', key: '12' },
  { title: '纬度',width: 100, dataIndex: 'address', key: '13' },
  { title: '经度', width: 100,dataIndex: 'address', key: '14' },
  { title: '地址',width: 100, dataIndex: 'address', key: '15' },
  { title: '作业状态', width: 100,dataIndex: 'address', key: '16' },
  { title: '设备手机号',width: 120, dataIndex: 'address', key: '17' },
  { title: '是否存在视频',width: 120, dataIndex: 'address', key: '18' },
  { title: '设备类型', width: 100,dataIndex: 'address', key: '19' },
  { title: '报警类型',width: 100, dataIndex: 'address', key: '20' },
  { title: 'acc开关', width: 100,dataIndex: 'address', key: '21' },
  { title: '管控状态', width: 100,dataIndex: 'address', key: '22' },
  { title: '是否标定',width: 100, dataIndex: 'address', key: '23' },
  
];


    return {
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
      data,
      columns,
      checkedKeys: [],
      treeData:[],
      form:{
        keyName:'',
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
    }
  },
  components:{
    BaiduMap,
    navigation,
    mapMarker,
    mapLabel,
    mapOverlay
  },
  created(){
    this.init();

  },
  mounted(){
    this.$nextTick(()=>{
      let h1 = this.$refs.right_map.$el.offsetHeight;
      let h2 = this.$refs.bm_view.$el.offsetHeight;
      this.height = h1 - h2 - 92;//计算列表最大高度
      this.dragLine()//上下拖动列表
      this.initVideo(h1)
    });


    this.$once('hook:beforeDestroy', () => {
      this.websocketclose();
      clearTimeout(this.sendTime);
    })
    
  },
  methods:{
    init(){
      this.websocketclose();
      this.getVehicleList();
      this.initWebSocket()
    },
    initVideo(h1){
      let params = {
          allowFullscreen: "true",
          allowScriptAccess: "always",
          bgcolor: "#FFFFFF"
        };
      ttxVideoAll.init("cmsv6flash", h1, h1, params);
      setTimeout(this.initFlash, 50);
      
    },
    getVehicleList(){
           IndexTree(this.form).then(res=>{
             if(res.data.code == 0){
                this.treeData = res.data.data;
                this.loop(this.treeData)
             };
           });
    },
    onSearch(){
      this.getVehicleList()
    },
    loop(arr){
          arr.forEach(cur=>{
              if(cur.vehicleId){
                this.$set(cur,'scopedSlots', {title: 'custom' })
              };
              if(cur.nexts){
                this.loop(cur.nexts)
              };
          });
    },
    initWebSocket(){ //初始化weosocket
        const wsuri = "ws://192.168.20.120:8001/api/websocket/0";
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
      if(isJSON(e.data)){
        const redata = JSON.parse(e.data);
        console.log(redata.position)
        let position = JSON.parse(redata.position)
        this.center.lng = position[0].pos.split(',')[1]
        this.center.lat = position[0].pos.split(',')[0]
        this.centerList = [
          {lng: position[0].pos.split(',')[1], lat: position[0].pos.split(',')[0]}
        ]
        
        this.zoom = 15
        this.iconUrl = require('@/assets/images/xs.png')
        this.content = this.carNumber[0]
        this.sendTime = setTimeout(() => {
          this.websocketsend(this.carNumber[0])
        }, 5000);
      };
      
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e);
    },
    handler ({BMap, map}) {
      this.center.lng = 121.308090
      this.center.lat = 31.137268
      this.map = map
      this.BMap = BMap
      this.zoom = 15
     
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


      //  let point = {
      //   lng:120.344394,
      //   lat:31.503154
        
      // }
      // let pointNext = {
      //   lng:116.404,
      //   lat:39.915
      // }
      // this.rotation = this.getAngle(point,pointNext)
      if(this.carNumber.length>0){
        this.websocketsend(this.carNumber[0]);
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
            ret += 90;

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
            return ret ;
    },
    showCarDetails(){
       this.vehicleDetailsShow = true;
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
            that.height = oBox.offsetHeight - oTop.offsetHeight - 92;
          }

          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null; 
            oLine.releaseCapture && oLine.releaseCapture()
          };
          oLine.setCapture && oLine.setCapture();
          return false
        }

        // document.querySelector('.ant-table-body').addEventListener('scroll',function(){
        //   console.log(document.querySelector('.ant-table-body').scrollTop)
        //   console.log(document.querySelector('.ant-table-body').offsetHeight)
        //   console.log(document.querySelector('.ant-table-body').scrollHeight)
        //   if(document.querySelector('.ant-table-body').scrollTop + document.querySelector('.ant-table-body').offsetHeight >= document.querySelector('.ant-table-body').scrollHeight - 8){
            
        //   }
        // });
    },
    initFlash(){

       if (typeof swfobject == "undefined" || typeof swfobject == undefined || swfobject.getObjectById("cmsv6flash") == null ||
            typeof swfobject.getObjectById("cmsv6flash").setWindowNum == "undefined" ) {
            setTimeout(this.initFlash, 50);
           
      } else {
            //设置视频插件的语言('playerType=flash'时生效)
            swfobject.getObjectById("cmsv6flash").setLanguage("cn.xml");
            //先将全部窗口创建好
            swfobject.getObjectById("cmsv6flash").setWindowNum(36);
            //再配置当前的窗口数目
            swfobject.getObjectById("cmsv6flash").setWindowNum(this.maxChnCount);
            //设置视频插件的服务器
            swfobject.getObjectById("cmsv6flash").setServerInfo("www.dzkjbd.com",6605);
            this.isInitFinished = true;
    }
    },
    previewVideo(obj){
      this.devIdno = obj.keyName;
      this.getJsession();
        
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
      this.videoVisible = true;
         //视频插件初始化完成
            if (this.isInitFinished) {
                //再一次设置flash窗口数量
                
                this.loadFlashWindowNum(this.maxChnCount);
                // if (this.closeSecond != 0) {
                //     $("#closeTip").show();
                //     setTimeout(closeVideo, 1000);
                // }
                var vehiName = this.abbr == "" ? this.devIdno : this.abbr;
                for (var i = 0; i < 4; ++i) {
                    swfobject.getObjectById('cmsv6flash').setBufferTime(i, 4);
                    swfobject.getObjectById('cmsv6flash').setVideoInfo(i, vehiName + " - CH" + (i + 1));
        
                    swfobject.getObjectById('cmsv6flash').startVideo(i, this.jsession, this.devIdno, i, 1, true);
                }
            } else {
                setTimeout(this.previewVideoOK, 500);
            }
    },
    loadFlashWindowNum(num) {
        swfobject.getObjectById('cmsv6flash').setWindowNum(num);
    },
    enlarge(){
      this.isEnlarge = !this.isEnlarge;
      if(this.isEnlarge){
        this.$refs.bm_view.$el.style.height = 0;
        this.$refs.status_list.style.height = '100%'
        this.height = this.$refs.right_map.$el.offsetHeight - this.$refs.status_list.style.height - 92;
        this.$refs.drag.style.top = 0;
      }else{
        this.$refs.bm_view.$el.style.height = 'calc(50vh + 40px)';
        this.$refs.status_list.style.height = 'auto';
        this.height = this.$refs.right_map.$el.offsetHeight - this.$refs.bm_view.$el.offsetHeight - 92;
         this.$refs.drag.style.top = 'calc(50vh + 39px)';
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
  }
  
}
</script>




