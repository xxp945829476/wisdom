<template>
  <div v-if="drawVisible" class="drawPop">
  

        <baidu-map class="fence_view fence_view_1" :center="center" :scroll-wheel-zoom="true" ak="PYswOGSEIdfO5RcGfgetWd5cbhonKUpz"  :zoom="zoom" @ready="handler" @click="location">
           <mapPolygon :path="path" v-for="(path,index) of polyline.paths" :fill-opacity= "0.3" :fill-color="fillColor" :stroke-weight="2" :stroke-color="fillColor" :key="index"></mapPolygon>
           <mapLocalSearch :keyword="keyword" :auto-viewport="true" @searchcomplete="searchcomplete"></mapLocalSearch>
           <mapOverlay>
             <div class="back_map">
               <a-button key="submit" type="primary" @click="backMap" class="button_left">
                返回
               </a-button>
             </div>
           </mapOverlay>
           <mapMarker :position="positionSite" :icon="{url:icon, size: {width: 30, height: 30}}" ></mapMarker>
           <mapMarker :position="position"></mapMarker>
        </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import mapPolygon from 'vue-baidu-map/components/overlays/Polygon.vue'
import mapPolyline from 'vue-baidu-map/components/overlays/Polyline.vue'
import mapLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import mapOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import mapLabel from 'vue-baidu-map/components/overlays/Label.vue'
import mapMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import {AddElectronic} from '@/network/api'

export default {
  data() {
    return {
      icon:require('@/assets/images/godi.png'),
      positionSite:{},
      position:{},
      keyword:'',
      drawVisible:false,
      map:'',
      BMap:'',
      center: {lng: 0, lat: 0},  //经纬度
      zoom: 3,
      polyline: {
        editing: true,
        paths: []
      },
      curIndex:0,
      fillColor:'red',
      areaList:[],
      list:{},
      view:0,
      city:'',
      labelStyle:{
        color : "#fff",
       background:'#fff',
			 fontSize : "12px",
			 height : "14px",
       lineHeight : "14px",
       width:"14px",
       textAlign:'center',
       fontFamily:"微软雅黑",
       borderRadius:'50%',
       borderWidth:'2px'
      },
      fieldType:'',
      address:'',
    }
  },
  components:{
    BaiduMap,
    mapPolygon,
    mapLocalSearch,
    mapOverlay,
    mapLabel,
    mapPolyline,
    mapMarker
  },
  methods:{
    selPosition(obj,position){
      console.log(position)
      // val 1 查看
      this.drawVisible = true;
      this.list = obj;
      this.polyline.paths = [];
      this.position = {}

      this.positionSite = {
        lat:position.split(',')[0],
        lng:position.split(',')[1]
      };

    },
    handler ({BMap, map}) {
      console.log(BMap, map)
     
      this.BMap = BMap
      this.map = map
      
      let that = this;
      if(this.list.lat){
         
        let latArr = this.list.lat.split(',');
        let lngArr = this.list.lng.split(',');

        this.center.lng = lngArr[0];
        this.center.lat = latArr[0];
        this.zoom = 15;
        let arr = [];
        latArr.forEach((cur,index)=>{
          arr.push(new BMap.Point(lngArr[index], cur))
        });
        this.polyline.paths.push(arr);
        this.polyline.editing = false;
        this.keyword = '';
        this.allPath = arr;
      }else{
        this.polyline.editing = true;
        this.zoom = 15;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);

           that.center.lng = r.point.lng;
           that.center.lat = r.point.lat;
          }
          else {
            // alert('failed'+this.getStatus());
          }        
        },{enableHighAccuracy: true})
      };
      
    
    },
     
    

    backMap(){
      this.drawVisible = false;
      this.keyword = ''
    },
    searchcomplete(){
      console.log(this.keyword)
    },

    location(e){
      console.log(e.point)
      let p = e.target;
      let that = this;

      this.position = e.point

      var geoc = new this.BMap.Geocoder();  
      geoc.getLocation(e.point,function(rs){
        var addComp = rs.addressComponents;
        console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        that.address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
        that.drawVisible = false;
        that.$emit('getPosition',that.address,JSON.stringify(e.point))
      });
      
       

    }

  }
}
</script>