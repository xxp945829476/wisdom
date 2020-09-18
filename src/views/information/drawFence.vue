<template>
  <div v-if="drawVisible" class="drawPop">
    <a-row type="flex">
      <a-col flex="auto" ref="right_map">
        <baidu-map class="fence_view fence_view_1" :center="center" :scroll-wheel-zoom="true" ak="PYswOGSEIdfO5RcGfgetWd5cbhonKUpz"  :zoom="zoom" @ready="handler"  @mousemove="syncPolyline"
  @click="paintPolyline"
  @rightclick="newPolyline">
          <template v-if="fieldType==56">
             <mapPolyline :path="path" v-for="(path,index) of polyline.paths" :stroke-weight="2" :stroke-color="fillColor" :key="index"></mapPolyline>
          </template>
          <template v-else>
            <mapPolygon :path="path" v-for="(path,index) of polyline.paths" :fill-opacity= "0.3" :fill-color="fillColor" :stroke-weight="2" :stroke-color="fillColor" :key="index"></mapPolygon>
          </template>
           
           <mapLocalSearch :keyword="keyword" :auto-viewport="true" @searchcomplete="searchcomplete"></mapLocalSearch>
           <mapOverlay>
             <div class="back_map">
               <a-button key="submit" type="primary" @click="backMap" class="button_left" v-if="view == 1">
                返回
               </a-button>
             </div>
           </mapOverlay>
           <mapLabel content="" v-for=" (item,index) in allPath" :key="'A' + index" :position="item" :labelStyle="labelStyle" :offset="{width: -7, height: -7}">{{index}}</mapLabel>
        </baidu-map>
      </a-col>

      <a-col flex="280px" class="left_content left_content_1" ref="left_content" v-if="view != 1">
        <div class="draw_city left_search">{{city}}</div>
        <div class="left_tree left_tree_1">
            <div class="repaint" @click="repaint"><a-icon type="reload" />重绘</div>
            <ul class="draw_district">
              <li v-for="(item,index) in areaList" :key="index"><span>{{index}}</span>{{item}}</li>
            </ul>

            <div>
              <a-button key="back" @click="back">
                取消
                </a-button>
                <a-button key="submit" type="primary" @click="save" class="button_left">
                完成
              </a-button>
            </div>
        </div>

        
      </a-col>
    </a-row>
    
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import mapPolygon from 'vue-baidu-map/components/overlays/Polygon.vue'
import mapPolyline from 'vue-baidu-map/components/overlays/Polyline.vue'
import mapLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import mapOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import mapLabel from 'vue-baidu-map/components/overlays/Label.vue'

export default {
  data() {
    return {
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
      allPath:[],
      fieldType:''
    }
  },
  components:{
    BaiduMap,
    mapPolygon,
    mapLocalSearch,
    mapOverlay,
    mapLabel,
    mapPolyline
  },
  methods:{
    drawDence(obj,val,type){
      // val 1 查看
      this.drawVisible = true;
      this.view = val;
      this.list = obj;
      this.polyline.paths = [];
      this.allPath = [];
      this.fieldType = type;
      

    },
    handler ({BMap, map}) {
      console.log(BMap, map)
     
      this.BMap = BMap
      this.map = map
      

      if(this.list.lat){
         
        this.areaList = this.list.address.split(',');
        let latArr = this.list.lat.split(',');
        let lngArr = this.list.lng.split(',');

        this.center.lng = lngArr[0];
        this.center.lat = latArr[0];
        this.zoom = 12;
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
        this.areaList= [];
         this.keyword = this.list.upRegionName + this.list.regionName;
      };
      
      this.city = this.list.upRegionName + this.list.regionName;
     
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

      this.polyline.editing = false
    },
    paintPolyline (e) {


      if(this.view == 1){
        return
      };

      if(!this.polyline.editing){
        this.$message.warning('如需修改，请点击重绘')
        return
      };

      let that = this;
      this.curIndex++;

      // var point = new this.BMap.Point(e.point.lng, e.point.lat);
      // console.log(point)

    //   var opts = {
    //     position : point,    // 指定文本标注所在的地理位置
    //     offset   : new this.BMap.Size(-15, -15) 
    //   }
    //   var label = new this.BMap.Label(this.curIndex, opts);  // 创建文本标注对象
		// label.setStyle({
    //    color : "#fff",
    //    background:'red',
		// 	 fontSize : "12px",
		// 	 height : "30px",
    //    lineHeight : "30px",
    //    width:"30px",
    //    textAlign:'center',
    //    fontFamily:"微软雅黑",
    //    borderRadius:'50%'
    //  });

    this.allPath.push({lat:e.point.lat,lng:e.point.lng});
     
     var geoc = new this.BMap.Geocoder();  

      geoc.getLocation(e.point,function(rs){
        var addComp = rs.addressComponents;
        console.log(addComp)
        that.areaList.push(addComp.street)
        console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      })

      // this.map.addOverlay(label)
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    },
    save(){
      this.drawVisible = false;
      console.log(this.polyline.paths)
      this.$emit('getPosion',JSON.stringify(this.polyline.paths),this.areaList)
    },
    repaint(){
      this.polyline.editing = true;
      this.polyline.paths = [];
      this.areaList = [];
      this.allPath = [];
      this.map.clearOverlays()
    },
    back(){
      let that = this;
      this.$confirm({
        title: '确定取消吗?',
        content: h => <div style="color:red;">取消后将不会保存绘制区域</div>,
        zIndex:1200,
        onOk() {
          that.drawVisible = false;
          that.keyword = ''
          that.repaint()
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
     
    },
    backMap(){
      this.drawVisible = false;
      this.keyword = ''
    },
    searchcomplete(){
      console.log(this.keyword)
    }

  }
}
</script>