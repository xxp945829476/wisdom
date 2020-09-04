<template>
  <div>
    <a-row type="flex">
      <a-col flex="auto" ref="right_map">
        <baidu-map class="fence_view" :scroll-wheel-zoom="true" ak="PYswOGSEIdfO5RcGfgetWd5cbhonKUpz" :center="center" :zoom="zoom" @ready="handler"  @mousemove="syncPolyline"
  @click="paintPolyline"
  @rightclick="newPolyline">
           <mapPolyline :path="path" v-for="(path,index) of polyline.paths" :key="index"></mapPolyline>
        </baidu-map>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import navigation from 'vue-baidu-map/components/controls/Navigation.vue'
import mapPolyline from 'vue-baidu-map/components/overlays/Polyline.vue'
export default {
  data() {
    return {
      map:'',
      BMap:'',
      center: {lng: 0, lat: 0},  //经纬度
      zoom: 3,
      polyline: {
        editing: true,
        paths: []
      },
      index:0
    }
  },
  components:{
    BaiduMap,
    mapPolyline
  },
  methods:{
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.BMap = BMap
      this.map = map
      this.zoom = 15
    },
     syncPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    newPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      if(!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    paintPolyline (e) {
      this.index++;
      console.log(this.index)
      console.log(e.point.lng)
      var point = new this.BMap.Point(e.point.lng, e.point.lat);
      // var marker = new this.BMap.Marker(point);
      var opts = {
        position : point,    // 指定文本标注所在的地理位置
        offset   : new this.BMap.Size(-20, -20) 
      }
      var label = new this.BMap.Label(this.index, opts);  // 创建文本标注对象
		label.setStyle({
       color : "#fff",
       background:'red',
			 fontSize : "12px",
			 height : "40px",
       lineHeight : "40px",
       width:"40px",
       textAlign:'center',
       fontFamily:"微软雅黑",
       borderRadius:'50%'
     });
     
     var geoc = new this.BMap.Geocoder();  

      geoc.getLocation(e.point,function(rs){
        var addComp = rs.addressComponents;
        console.log(addComp)
        // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
  
      })

      this.map.addOverlay(label)
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    }
  }
}
</script>