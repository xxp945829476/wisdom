<template>
  <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="form" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item>
            <a-input-search
              v-model="form.name"
              placeholder="请输入车牌号"
              enter-button="搜索"
            />
          </a-form-model-item>
        </a-form-model>

        <div class="query_way">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              按天查询
            </a-radio>
            <a-radio :value="2">
              按时间段查询
            </a-radio>
          </a-radio-group>
        </div>

        <div class="sel_date">
          <a-form-model :model="form" :label-col="labelCol_1" :wrapper-col="wrapperCol_1">
            <a-form-model-item label="日期">
             <a-date-picker  />
            </a-form-model-item>
            <a-form-model-item label="开始时间" >
             <a-date-picker show-time placeholder="请选择开始时间" :disabled-date="disabledStartDate" format="YYYY-MM-DD HH:mm:ss"/>
            </a-form-model-item>
            <a-form-model-item label="结束时间">
            <a-date-picker show-time  placeholder="请选择结束时间" :disabled-date="disabledEndDate" format="YYYY-MM-DD HH:mm:ss"/>
            </a-form-model-item>
          </a-form-model>

          
        </div>

        
       
      </a-col>


      <a-col flex="auto" ref="right_map">
        <baidu-map class="fence_view" :scroll-wheel-zoom="true" ak="PYswOGSEIdfO5RcGfgetWd5cbhonKUpz" :center="center" :zoom="zoom" @ready="handler">
          <mapDriving :start="start"
         :end="end"
          @searchcomplete="handleSearchComplete" 
          @polylinesset="handlePolylinesset"
          :panel="false"
      :auto-viewport="true"></mapDriving>

         <bml-lushu
            @stop="reset"
            :path="path"
            :icon="icon"
            :rotation='true'
            :speed="8000"
            :play="play">
          </bml-lushu>
          
          
        </baidu-map>
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


export default {
  data() {
    return {
      center: {lng: 0, lat: 0},  //经纬度
      zoom: 15,
      form:{
        name:'',
        date:''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      leftWidth:'280px',
      labelCol_1: { span: 6 },
      wrapperCol_1: { span: 18 },
      play: true,
       path: [],
      icon: {
        url: require('@/assets/images/car.png'),
        size: {width: 52, height: 26},
        opts: {anchor: {width: 27, height:13}},
      },
      start:'',
      end:'',
      map:'',
      BMap:''

    }
  },
  components:{
    BaiduMap,
    BmlLushu,
    mapDriving,
    mapOverlay
  },
  created(){
    
  },
  methods:{
    handler ({BMap, map}) {
     
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
      this.BMap = BMap
      this.map = map
      this.start = new BMap.Point(120.480708,31.615982),
      console.log(this.start)
      this.end = new BMap.Point(120.34439,31.503154) 

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
    reset () {
      this.play = false
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

        this.map.addOverlay(new this.BMap.Polyline(arr,  {
          enableEditing: false,//是否启用线编辑，默认为false
          enableClicking: false,//是否响应点击事件，默认为true
          // icons:[icons],
          strokeWeight:'8',//折线的宽度，以像素为单位
          strokeOpacity: 1,//折线的透明度，取值范围0 - 1
          strokeColor:"#18a45b" //折线颜色
        }));

        this.path = res.getPlan(0).getRoute(0).getPath();
     
         

      };
    },
  
    handlePolylinesset(Route){
            var polyline = Route[0].getPolyline(); //获取线条遮挡物
            polyline.setStrokeColor("#18a45b"); //设置颜色
            polyline.setStrokeWeight(8); //设置宽度
            polyline.setStrokeOpacity(0.1); //设置透明度
          
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
  }
}
</script>