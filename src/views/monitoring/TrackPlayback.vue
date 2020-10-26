<template>
  <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="formParmas" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item>
            <a-input-search
              v-model="formParmas.vehicleNo"
              placeholder="请输入车牌号"
              enter-button="搜索"
              @search="onSearch"
            />
          </a-form-model-item>
        </a-form-model>

        <div class="query_way">
          <a-radio-group name="radioGroup" v-model="queryValue">
            <a-radio :value="1">
              按天查询
            </a-radio>
            <a-radio :value="2">
              按时间段查询
            </a-radio>
          </a-radio-group>
        </div>

        <div class="sel_date">
          <a-form-model :model="formParmas" :label-col="labelCol_1" :wrapper-col="wrapperCol_1">
            <a-form-model-item label="日期" v-if="queryValue==1">
             <a-date-picker v-model="formParmas.day" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>
            </a-form-model-item>
            <template v-else>
              <a-form-model-item label="开始时间" >
              <a-date-picker show-time placeholder="请选择开始时间" v-model="formParmas.begintime" :disabled-date="disabledStartDate" format="YYYY-MM-DD HH:mm:ss"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
              </a-form-model-item>
              <a-form-model-item label="结束时间">
              <a-date-picker show-time  placeholder="请选择结束时间" v-model="formParmas.endtime" :disabled-date="disabledEndDate" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss"/>
              </a-form-model-item>
            </template>
            
          </a-form-model>

          
        </div>

        <a-spin :spinning="spinning"> 
        <ul class="play_back_box">
          <li v-if="firstList" :class="{'play_back_li':isLi==-1}" @click="subsection(firstList.gt,lastList.gt,-1)">
            <div class="play_back_list_start">
              <img src="@/assets/images/icon11.png"/>
              <span>
                <em>{{firstList.gt}}</em>
                <p>{{firstList.ps}}</p>
              </span>
            </div>
            <div class="play_back_list_start">
              <img src="@/assets/images/icon10.png"/>
              <span>
                <em>{{lastList.gt}}</em>
                <p>{{lastList.ps}}</p>
              </span>
            </div>
            <div class="mileage">里程：{{statisticsLcTotal(allList,firstList.gt,lastList.gt)}}km&nbsp;&nbsp;&nbsp;时间：{{diffTime(firstList.gt,lastList.gt)}}</div>
            <div class="play_back_tips">总计</div>
          </li>

         
          <li v-for="(item,index) in partitions" :key="'a'+index" @click="subsection(item.start.gt,item.end.gt,index)" :class="{'play_back_li':isLi==index}">
            <div class="play_back_list_start">
              <img src="@/assets/images/icon11.png"/>
              <span>
                <em>{{item.start.gt}}</em>
                <p>{{item.start.ps}}</p>
              </span>
            </div>
            <div class="play_back_list_start">
              <img src="@/assets/images/icon10.png"/>
              <span>
                <em>{{item.end.gt}}</em>
                <p>{{item.end.ps}}</p>
              </span>
            </div>
            <div class="mileage">里程：{{statisticsLc(item)}}km&nbsp;&nbsp;&nbsp;时间：{{diffTime(item.start.gt,item.end.gt)}}</div>
            <div class="play_back_tips play_back_section">分段{{index+1}}</div>
          </li>
         
        </ul>
        </a-spin>

        
       
      </a-col>


      <a-col flex="auto" ref="right_map" class="right_map">
        <baidu-map class="bm-view" ref="bm_view" :scroll-wheel-zoom="true" :ak="$store.getters.ak" :center="center" :zoom="zoom" @ready="handler">
         

         <bml-lushu
            @stop="reset"
            :path="path"
            :icon="icon"
            :rotation='true'
            :speed="speed"
            @pause="pauseBack"
            @start="startBack(this)"
            :play="play">
          </bml-lushu>

          <mapLabel content="" v-for=" (item,index) in stopList" :key="'A' + index" :position="item" :labelStyle="labelStyle" :offset="{width: -5, height: -5}">{{index}}</mapLabel>

          <mapDriving :start="start"
         :end="end"
          @searchcomplete="handleSearchComplete" 
          @polylinesset="handlePolylinesset"
          :panel="false"
      :auto-viewport="true"></mapDriving>

            <div class="track_control">
              <div class="play_car">
                <div class="play_car_btn">
                  <i class="iconkuaijin1 iconfont" @click="startPoint"></i>
                  <i class="iconbofang2 iconfont" @click="startPlay" v-if="!play"></i>
                  <i class="iconbofang3 iconfont" @click="startPlay" v-else></i>
                  <i class="iconkuaijin iconfont" @click="startPoint"></i>
                </div>
                <div class="trial_speed">
                  <div class="trial_speed_x" @click="addSpeed">
                    <i class="iconbeisu iconfont"></i>
                    x{{speedVal}}
                  </div>
                  <a-icon type="ellipsis" class="ellipsis_car" @click="showPoint"/>
                </div>
              </div>
              <div class="show_data_car" v-if="isShow">
                <div class="show_data_car_list show_data_car_sel">
                  <span></span>全部数据
                </div>
                 <div class="show_data_car_list">
                  <span></span>显示报警点
                </div>
                 <div class="show_data_car_list">
                  <span></span>行驶数据
                </div>
                 <div class="show_data_car_list" :class="{'show_data_car_sel':spotStop}" @click="showStop">
                  <span></span>显示停止点
                </div>
              </div>
            </div>
        
          
          
        </baidu-map>

        <div class="status_list" ref="status_list">
          <a-row type="flex" justify="start" class="status_list_nav" ref="status_list_nav">
              <a-col flex="100px">全部</a-col>
              <a-col flex="auto" class="export_locust"><a @click="exportLocust">导出轨迹</a></a-col>
              <i class="iconzuidahua1 iconfont enlarge_icon" @click="enlarge" v-if="!isEnlarge"></i>
              <i class="iconzuixiaohua1 iconfont enlarge_icon" @click="enlarge" v-else></i>
          </a-row>
          <div class="status_list_content">
            <a-table :columns="columns" :rowKey='record' :data-source="tableData" :scroll="{ x: 1200,y:height}" :pagination="pagination" @change="changeTable" size="small" :loading='loading'>
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

               <template slot="accSwitch" slot-scope="text">
                  <span v-if="text.substr(1,1)==1">开启</span>
                  <span v-else>关闭</span>
              </template>

               <template slot="way" slot-scope="text">
                  <span >实时</span>
              </template>

              <template slot="vehicleStatus" slot-scope="text,record">
                  <span v-if="record.pk==0">行驶</span>
                  <span v-else>停车</span>
              </template>
            </a-table>
          </div>

          
          
        </div>
        <div class="drag_status_list_nav" ref="drag"></div>

        

      </a-col>
    
         
     
     
    </a-row>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import navigation from 'vue-baidu-map/components/controls/Navigation.vue'
import mapDriving from 'vue-baidu-map/components/search/Driving.vue'
import mapOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import {BmlLushu} from 'vue-baidu-map'
import mapLabel from 'vue-baidu-map/components/overlays/Label.vue'

import {QueryTrackDetail,ExportLocust,Geocoding} from "@/network/api"


export default {
  
  data() {
    const columns = [
  { title: '序号', width: 80,customRender:(text, row, index)=>{
    return <a href="javascript:;">{index}</a>;
  },align:'center'},
  { title: '位置',width: 200, dataIndex: 'ps', key: 'ps' ,ellipsis:true,align:'center',},
  { title: '定位时间',width: 150,dataIndex: 'rt', key: 'rt',ellipsis:true,align:'center',},
  { title: '接收时间',width: 150,dataIndex: 'gt', key: 'gt',ellipsis:true,align:'center',},
  { title: '传输方式',dataIndex: 'way', key: 'way',ellipsis:true,align:'center',scopedSlots: { customRender: 'way' }},
  { title: '车辆状态',dataIndex: 'vehicleStatus', key: 'vehicleStatus',ellipsis:true,align:'center',scopedSlots: { customRender: 'vehicleStatus' }},
 { title: 'acc开关',dataIndex: 's1', key: 's1',ellipsis:true,align:'center',scopedSlots: { customRender: 'accSwitch' }},
  { title: '里程(km)',dataIndex: 'lc', key: 'lc',ellipsis:true,align:'center', },
  { title: '速度(km/h)',dataIndex: 'sp', key: 'sp',ellipsis:true, align:'center',},
  { title: '方向', dataIndex: 'hx', key: 'hx' ,ellipsis:true,align:'center',scopedSlots: { customRender: 'hx' }},
  { title: '卫星颗数', dataIndex: 'sn', key: 'sn',ellipsis:true,align:'center',},
 
];
    return {
      spinning:false,
      isShow:false,
      speed:8000,
      speedVal:1,
      isLi:-1,
      labelStyle:{
        color : "red",
        width:"8px",
        background:'#fff',
        height : "8px",
        borderWidth:'2px',
        borderRadius:'50%',
      },
      isEnlarge:false,
      loading:false,
      height:'',
      columns,
      center: {lng: 0, lat: 0},  //经纬度
      zoom: 15,
      form:{
        name:'',
        date:''
      },
      queryValue:1,
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      leftWidth:'280px',
      labelCol_1: { span: 6 },
      wrapperCol_1: { span: 18 },
      play: false,
      path: [],
      icon: {
        url: require('@/assets/images/car.png'),
        size: {width: 52, height: 26},
        opts: {anchor: {width: 27, height:13}},
      },
      start:'',
      end:'',
      map:'',
      BMap:'',
      formParmas:{
        devIdno:'',
        vehicleNo:'',
        begintime:'',
        endtime:'',
        currentPage:1,
        pageRecords :999,
        day:''
      },
      pathArr:[],
      tableData:[],
      partitions:[],
      stopList:[],
      spotStop:false,
      curStopList:[],
      currentPageSize:20,
      allList:[],
      firstList:'',
      lastList:'',
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
    }
  },
  components:{
    BaiduMap,
    BmlLushu,
    mapDriving,
    mapOverlay,
    mapLabel
  },
  created(){
    this.init()
  },
  mounted(){
    this.$nextTick(()=>{
      let h1 = this.$refs.right_map.$el.offsetHeight;
      let h2 = this.$refs.bm_view.$el.offsetHeight;
      this.height = h1 - h2 - 138;//计算列表最大高度
      this.dragLine()//上下拖动列表
    });

    this.$once('hook:beforeDestroy', () => {
      // document.querySelector('.ant-table-body').removeEventListener('scroll',this.scrollLoad,false)
    })
  },
  methods:{
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
        

        //  document.querySelector('.ant-table-body').addEventListener('scroll',this.scrollLoad);
        
       
    },
    scrollLoad(){
      // console.log(document.querySelector('.ant-table-body').scrollTop)
      // console.log(document.querySelector('.ant-table-body').scrollLeft)
      let that = this;
      if(document.querySelector('.ant-table-body').scrollTop>0){
        if(document.querySelector('.ant-table-body').scrollTop + document.querySelector('.ant-table-body').offsetHeight >= document.querySelector('.ant-table-body').scrollHeight - 8){
              that.flag = true;
              console.log(that.allList)
              if(that.allList.length< that.currentPageSize){
                  that.stopDown = true;
              };
              if(that.flag&&!that.stopDown){

                that.currentPageSize =  that.currentPageSize + 20;
                
                that.tableData = JSON.parse(JSON.stringify(this.allList)).splice(0,that.currentPageSize);
                that.tableData.forEach(cur=>{
                 cur.lc = cur.lc/1000;
                  cur.sp = cur.sp/10;
                 cur.s1 = that.binary(cur.s1);
                 this.geocoding(cur)
               });
                that.flag = false;
              }
              
          }
      }
      
    },
    changeTable(pagination){
      console.log(pagination)
       this.pagination.current = pagination.current;
       this.pagination.pageSize = pagination.pageSize;
       this.tableData = [];
        this.tableData = JSON.parse(JSON.stringify(this.allList)).slice((pagination.current-1)*pagination.pageSize,pagination.current*pagination.pageSize);
        console.log(this.tableData)
        this.tableData.forEach(cur=>{
          cur.lc = cur.lc/1000;
          cur.sp = cur.sp/10;
          cur.s1 = this.binary(cur.s1);
          this.geocoding(cur)
        });
    },
    enlarge(){
      this.isEnlarge = !this.isEnlarge;
      if(this.isEnlarge){
        this.$refs.bm_view.$el.style.height = 0;
        this.$refs.status_list.style.height = '100%'
        console.log(this.$refs.right_map.$el.offsetHeight)
        console.log(this.$refs.status_list.style.height)
        this.height = this.$refs.right_map.$el.offsetHeight - 138;
        this.$refs.drag.style.top = 0;
      }else{
        this.$refs.bm_view.$el.style.height = 'calc(50vh + 40px)';
        this.$refs.status_list.style.height = 'auto';
        this.height = this.$refs.right_map.$el.offsetHeight - this.$refs.bm_view.$el.offsetHeight - 138;
         this.$refs.drag.style.top = 'calc(50vh + 39px)';
      }
    },
    record(key){
          return key.index
    },
    init(){

      let day = this.$moment().format("YYYY-MM-DD");
      this.formParmas.day = day;
      this.formParmas.begintime = day + ' ' + '00:00:00'
      this.formParmas.endtime = day + ' ' + '23:59:59'
      if(this.$route.query.id){
        
        this.formParmas.vehicleNo = this.$route.query.id
        this.getData();
      };
    },
    handler ({BMap, map}) {
     
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
      this.BMap = BMap
      this.map = map
      // this.start = new BMap.Point(120.480708,31.615982),
      // this.end = new BMap.Point(120.34439,31.503154) 

    },
    getData(val){
      this.loading = true
      this.spinning = true;
      this.pagination.current = 1;
      QueryTrackDetail(this.formParmas).then(res=>{
         this.loading = false;
         this.spinning = false;
          if(res.data.code == 0){

           this.allList = res.data.data;
          
           if(val != 1){
             this.partitions = res.data.partitions;
              this.firstList = res.data.first;
              this.lastList = res.data.last;
              
      

              if(res.data.partitions){
                this.partitions.forEach(cur=>{
      
                  this.curStopList.push(new this.BMap.Point(cur.end.mlng,cur.end.mlat))
                  this.geocoding(cur.start)
                  this.geocoding(cur.end)
                })
              };
           };
           
         
           if(res.data.data){
              res.data.data.forEach(cur=>{
              this.pathArr.push(
                new this.BMap.Point(cur.mlng,cur.mlat)
              );
              
            });

             this.pagination.total = res.data.data.length - 1;
               this.tableData = JSON.parse(JSON.stringify(res.data.data)).slice(0,50);
               console.log(this.tableData)
               this.tableData.forEach(cur=>{
                 cur.lc = cur.lc/1000;
                  cur.sp = cur.sp/10;
                 cur.s1 = this.binary(cur.s1);
                 this.geocoding(cur)
               });

                this.geocoding(this.firstList)
           this.geocoding(this.lastList)

            this.path = this.pathArr;

            this.start = this.pathArr[0]

            this.end = this.pathArr[this.pathArr.length - 1]

             this.map.addOverlay(new this.BMap.Polyline(this.path,  {
                enableEditing: false,//是否启用线编辑，默认为false
                enableClicking: false,//是否响应点击事件，默认为true
                // icons:[icons],
                strokeWeight:'8',//折线的宽度，以像素为单位
                strokeOpacity: 1,//折线的透明度，取值范围0 - 1
                strokeColor:"#49cc7d" //折线颜色
              }));

            
              console.log(this.stopList)
              // this.map.addOverlay(new this.BMap.Polyline(this.stopList,  {
              //   enableEditing: false,//是否启用线编辑，默认为false
              //   enableClicking: false,//是否响应点击事件，默认为true
              //   // icons:[icons],
              //   strokeWeight:'100',//折线的宽度，以像素为单位
              //   strokeOpacity: 1,//折线的透明度，取值范围0 - 1
              //   strokeColor:"red" //折线颜色
              // }));
             


               
              
           }else{
             this.pathArr = [];
             this.path = [];
             
           }

           
           

              
          }else{
             this.$message.warning(res.data.message)
          }
      })
    },
    geocoding(location){

       var geoc = new this.BMap.Geocoder();  
      let point = {
        lat:location.mlat,
        lng:location.mlng
      };

      geoc.getLocation(new this.BMap.Point(location.mlng,location.mlat),function(rs){

   
        let addComp = rs.address;
       location.ps = addComp

        
        // console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      })
        // let params = {
        //   ak:this.$store.getters.ak,
        //   location:location.lat/1000000 + ',' + location.lng/1000000
        // };
        // Geocoding(params).then(res=>{
        //    if(res.data.code == 0){
        //      let data = JSON.parse(res.data.data);
        //      location.ps = data.result.formatted_address
        //   }
        // });
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
    diffTime(s,e){
      const date1=this.$moment(s);
      const date2=this.$moment(e);
      const date3=date2.diff(date1,'minute');
      const h = Math.floor(date3/60);
      const m = date3 - h*60;

      return h +'h' +' ' + m + 'min'
    },
    onSearch(){
      this.pathArr = [];
      this.path = [];
     this.map.clearOverlays()
      if(this.queryValue == 1){
        console.log(this.formParmas.day)
        this.formParmas.begintime = this.formParmas.day + ' ' + '00:00:00';
        this.formParmas.endtime =  this.formParmas.day + ' ' + '23:59:59';
        this.getData()
      }else{
        let t1= this.$moment(this.formParmas.begintime);
        let t2 = this.$moment(this.formParmas.endtime);
      
        let dura = t2.format('x') - t1.format('x');
        let tempTime = this.$moment.duration(dura);
        
      
        if(tempTime.days() < 2){
          this.getData()
        }else{
          this.$message.warning('查询范围不能大于3天')
        }
      }
      
     
    },
    onPanelChange(value, mode) {
      // eslint-disable-next-line no-console
      console.log(value, mode);
    },
    headerRender({ value, type, onChange, onTypeChange }) {
      return (
        <div>
          
        </div>
      );
    },
    reset (e) {
      this.play = false
    },
    pauseBack(e){
      console.log(BmlLushu)
    },
    startBack(e){
    
    },
    handleSearchComplete (res) {
      var sy = new this.BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6,//图标缩放大小
        strokeColor:'#fff',//设置矢量图标的线填充颜色
        strokeWeight: '2',//设置线宽
    });
    var icons = new this.BMap.IconSequence(sy, '100%', '5%',false);
    
      if(res){
        let arr = res.getPlan(0).getRoute(0).getPath();

       

        // this.path = res.getPlan(0).getRoute(0).getPath();
        // this.path = this.pathArr;
        

         

      };
    },
  
    handlePolylinesset(Route){
            var polyline = Route[0].getPolyline(); //获取线条遮挡物
            console.log(polyline)
            polyline.setStrokeColor("#000"); //设置颜色
            polyline.setStrokeWeight(8); //设置宽度
            polyline.setStrokeOpacity(0.1); //设置透明度
          
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
    startPlay(){
      this.play = !this.play
    },
    showStop(){
      this.spotStop = !this.spotStop;
      if(this.spotStop){
        this.stopList = this.curStopList;
      }else{
        this.stopList = []
      }
      
    },
    subsection(start,end,i){
      console.log(end)
      this.formParmas.begintime = start;
      this.formParmas.endtime = end;
      this.pagination.current = 1;
      this.tableData = [];
      this.spotStop = false;
      this.isLi = i;
       this.curStopList = [];
       this.pathArr = [];
      this.map.clearOverlays()
      this.getData(1)
      
      
    },
    startPoint(){
      // this.play = 
    },
    addSpeed(){
      this.speedVal++
      if(this.speedVal>4){
          this.speedVal = 1;
      }
      this.speed = this.speedVal * 4000
    },
    showPoint(){
      this.isShow = !this.isShow
    },
    exportLocust(){
      let params={
        devIdno:'',
        vehicleNo:this.formParmas.vehicleNo,
        begintime:this.formParmas.begintime,
        endtime:this.formParmas.endtime,
      }
      ExportLocust(params).then(res=>{
         if(window.navigator.msSaveBlob){
            const blobObject = new Blob([res.data]);
            window.navigator.msSaveBlob(blobObject, '轨迹.xls');
          }else{
            let blob = new Blob([res.data]); // 假设文件为pdf
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = '轨迹.xls';
            link.click();
            link.remove();
          }
      })
    },
    statisticsLc(item){
      let sd = 0;
      let totalSd = 0;
      const date1=this.$moment(item.start.gt);
      const date2=this.$moment(item.end.gt);
      const date3=date2.diff(date1,'minute');
      const h=date3/60;
      console.log(h)

    
      item.process.forEach(cur=>{
          totalSd = totalSd + cur.sp/10;
      })
      sd = totalSd/item.process.length
       return (h * sd).toFixed(1)
    },
    statisticsLcTotal(allList,s,e){
      let sd = 0;
      let totalSd = 0;
      const date1=this.$moment(s);
      const date2=this.$moment(e);
      const date3=date2.diff(date1,'minute');
      const h=date3/60;
      console.log(h)

      console.log(allList)
      allList.forEach(cur=>{
          totalSd = totalSd + cur.sp/10;
      })
      sd = totalSd/allList.length
       return (h * sd).toFixed(1)
    }
  }
}
</script>