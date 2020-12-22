<template>
  <div>
    <a-row type="flex">
      <a-col :flex="leftWidth" class="left_content" ref="left_content">
        <a-form-model :model="form" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSearch" @submit.native.prevent>
          <a-form-model-item>
            <a-input-search
              v-model="form.areaName"
              placeholder="请输入"
              enter-button="搜索"
              @search="onSearch"
            />
          </a-form-model-item>
        </a-form-model>

        
        <div class="left_tree left_tree_1">
          <a-spin :spinning="spinning">
          <a-tree
          defaultExpandAll
            v-model="checkedKeys"
            :show-line="true"
            :tree-data="treeData"
            :replaceFields="replaceFields"
            @select="sleectArea"
            v-if="!spinning"
          >
          </a-tree>
            </a-spin>
        </div>
      
      </a-col>
      <a-col flex="auto" ref="right_map">
        <baidu-map class="fence_view" :scroll-wheel-zoom="true" :ak="$store.getters.ak" :center="center" :zoom="zoom" @ready="handler">

           
               <mapPolyline :path="path" v-for="(path,index) of polyline.paths" :stroke-weight="6" :stroke-color="fillLineColor" :key="'b' +   index"></mapPolyline>
               <mapPolygon :path="path" v-for="(path,index) of Polygon.paths" :fill-opacity= "0.3" :fill-color="fillColor" :stroke-weight="2" :stroke-style="'dashed'" :stroke-color="fillColor" :key="'a' +index"></mapPolygon>
               <mapPolygon :path="path" v-for="(path,index) of givenPolygon.paths" :fill-opacity= "0.3" :fill-color="fillgivenColor" :stroke-weight="2" :stroke-style="'dashed'" :stroke-color="fillgivenColor" :key="'c' +index"></mapPolygon>
               <mapPolygon :path="path" v-for="(path,index) of parkingPolygon.paths" :fill-opacity= "0.3" :fill-color="fillparkingColor" :stroke-weight="2" :stroke-style="'dashed'" :stroke-color="fillparkingColor" :key="'d' +index"></mapPolygon>
               <mapPolygon :path="path" v-for="(path,index) of bituminousPolygon.paths" :fill-opacity= "0.3" :fill-color="fillbituminousColor" :stroke-weight="2" :stroke-style="'dashed'" :stroke-color="fillbituminousColor" :key="'e' +index"></mapPolygon>
               <mapPolygon :path="path" v-for="(path,index) of speedPolygon.paths" :fill-opacity= "0.3" :fill-color="fillspeedColor" :stroke-weight="2" :stroke-style="'dashed'" :stroke-color="fillspeedColor" :key="'f' +index"></mapPolygon>
               <mapPolygon :path="path" v-for="(path,index) of outPolygon.paths" :fill-opacity= "0.3" :stroke-style="'dashed'" :fill-color="filloutColor" :stroke-weight="2"  :stroke-color="filloutColor" :key="'g' +index"></mapPolygon>
          
                <mapOverlay>
                  <div class="ele_map">
                    <h3>图例</h3>
                    <ul>
                      <li>
                        <span></span>工地
                      </li>
                       <li>
                        <span></span>消纳场
                      </li>
                       <li>
                        <span></span>停车场
                      </li>
                       <li>
                        <span></span>限速圈
                      </li>
                       <li>
                        <span></span>商砼站
                      </li>
                       <li>
                        <span></span>禁区
                      </li>
                       <li>
                        <span></span>路线
                      </li>
                    </ul>
                  </div>
                </mapOverlay>
      
        </baidu-map>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import mapPolyline from 'vue-baidu-map/components/overlays/Polyline.vue'
import mapPolygon from 'vue-baidu-map/components/overlays/Polygon.vue'
import mapOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import {AreaList,Fencelist,BaseList,EditElectronic} from '@/network/api'
import {buildAreaTree} from '@/utils/utils.js'
export default {
  data() {
    return {
      replaceFields:{
        children:'children',
        title:'areaName',
        key:'areaId'
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      form: {
        areaName: '',
      },
      spinning:false,
      leftWidth:'280px',
      fillLineColor:'#18a45b',
      fillColor:'#0099FF',
      fillgivenColor:'#996600',
      fillparkingColor:'#006600',
      fillbituminousColor:'#9933ff',
      fillspeedColor:'#3333ff',
      filloutColor:'#ff0000',
      loading:false,
      map:'',
      BMap:'',
      center: {lng: 0, lat: 0},  //经纬度
      zoom: 3,
      index:0,
      polyline: {
        editing: true,
        paths: []
      },
      Polygon: {
        editing: true,
        paths: []
      },
      givenPolygon: {
        editing: true,
        paths: []
      },
      parkingPolygon: {
        editing: true,
        paths: []
      },
      bituminousPolygon: {
        editing: true,
        paths: []
      },
      speedPolygon: {
        editing: true,
        paths: []
      },
      outPolygon: {
        editing: true,
        paths: []
      },
      formParmas:{
        fieldType:'',
        region:'',
        pageNum:1,
        pageSize:999,
        regionName:null,
      },
      tableData:[],
      treeData:[],
       checkedKeys: [],
    }
  },
  components:{
    BaiduMap,
    mapPolyline,
    mapPolygon,
    mapOverlay
  },
  created(){
    this.init();
  },
  methods:{
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.BMap = BMap
      this.map = map
      this.zoom = 12;
      this.getData()
    },
    init(){
      this.getAreaList()
    },
    getData(){
        this.loading = true;
        Fencelist(this.formParmas).then(res=>{
             this.loading = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.tableData = data;
                this.polyline.paths = [];
                this.Polygon.paths = [];
                this.givenPolygon.paths = [];
                this.givenPolygon.paths = [];
                this.parkingPolygon.paths = [];
                this.bituminousPolygon.paths = [];
                this.outPolygon.paths = [];
                if(data.length>0){
                   this.tableData.forEach(cur=>{
                    let paths =  [];
                    let latArr = cur.lat.split(',');
                    let lngArr = cur.lng.split(',');
                    this.center.lng = lngArr[0];
                    this.center.lat = latArr[0];
                    latArr.forEach((ele,index)=>{
                      paths.push(new BMap.Point(lngArr[index], ele))
                    });
                    if(cur.fieldType == 210 || cur.fieldType == 769){
                       this.polyline.paths.push(paths)
                    }else if(cur.fieldType==770){
                      this.Polygon.paths.push(paths)
                    }else if(cur.fieldType==771){
                      this.givenPolygon.paths.push(paths)
                    }else if(cur.fieldType==773){
                      this.parkingPolygon.paths.push(paths)
                    }else if(cur.fieldType==14){
                      this.bituminousPolygon.paths.push(paths)
                    }else if(cur.fieldType==772){
                      this.speedPolygon.paths.push(paths)
                    }else if(cur.fieldType==774){
                      this.outPolygon.paths.push(paths)
                    }
                  
                 });
                }
                
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getAreaList(val){
        //val 1 搜索
        this.spinning = true;
        AreaList(this.form).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
            let data = JSON.parse(JSON.stringify(res.data.data));
            if(val){
              this.treeData = data;
            }else{
              this.treeData = buildAreaTree(data)
            };
          };
        });
    },
     onSearch(){
      if(this.form.areaName){
        this.getAreaList(1)
      }else{
        this.getAreaList()
      };
    },
    sleectArea(selectedKeys){
      this.formParmas.region = selectedKeys[0];
      this.getData()
    },
     
   
  }
}
</script>