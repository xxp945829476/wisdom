<template>
    <div class="big_screen" ref="big_screen">
        <div class="monitor_display_nav">
            <ul>
                <li :class="{curColor:navCurrent==1}"  @click="linkRinse" :style="{backgroundImage:'url('+ navImgSel +')'}">黑车识别</li>
                <li :class="{curColor:navCurrent==2}" :style="{backgroundImage:'url('+ navImg +')'}">冲洗设备</li>
            </ul>
            <div class="monitor_display_t">建筑垃圾运输处置监管</div>
            <div class="monitor_display_time">
                <span>{{today}}</span>
                <img src="../assets/images/quanp.png" @click="fullScreen">
            </div>
            
        </div>
        

        <div class="monitor_display_content">
            <div class="monitor_display_left">
                <h2>冲洗监控<span v-if="onlineStatus==1">(在线)</span><span v-else>(离线)</span><img src="../assets/images/icon01.png"></h2>
                <div class="congx" @click="playLiver">
                     <a-spin :spinning="spinning">  
                    <img src="../assets/images/congx.jpg" alt="">
                     </a-spin>
                </div>
                <h2 class="congxzk congxzk_1">冲洗状况<img src="../assets/images/icon01.png"></h2>
                <div class="congxzk_content">
                    <div class="congxzk_content_th">
                        <span>通行车辆</span>
                        <span>通行时间</span>
                        <span>报警类型</span>
                    </div>
                    <div class="congxzk_content_list">
                        <div class="congxzk_content_tr" :class="{'congxzk_content_tr_cur':curNum == index }" v-for="(item,index) in tableData" :key="item.keyIdex" @click="carDetail(item,index)">
                            <span>{{item.vehicleNo}}</span>
                            <span>{{item.time}}</span>
                            <span>{{item.type}}</span>
                        </div>
                        
                    </div>
                   
                </div>
            </div>

            <div class="monitor_display_map">
                <ul class="car_num_box">
                    <li>
                        <span>今日作业车辆</span>
                        <p><em>{{todayTotal}}</em>辆</p>
                    </li>
                    <li>
                        <span>今日黑车车辆</span>
                        <p><em>{{todayBlackNum}}</em>辆</p>
                    </li>
                    <li>
                        <span>昨日作业车辆</span>
                        <p><em>{{yesTotal}}</em>辆</p>
                    </li>
                    <li>
                        <span>昨日黑车车辆</span>
                        <p><em>{{yesBlackNum}}</em>辆</p>
                    </li>
                </ul>
                <div class="map_box">
                     <!-- <baidu-map class="bm-view" :mapStyle="mapStyle"  @resize="resize" ref="bm_view" :scroll-wheel-zoom="true" ak="pfc1m07NsOzjmAFh8xbhvcIEMo2HWECr" :center="center" :zoom="zoom" @ready="handler">
                          <mapMarker :position="{lng: center.lng, lat: center.lat}" :icon="{url: siteUrl, size: {width: 61, height: 61}}"></mapMarker>
                    <mapMarkerClusterer :averageCenter="true" >
                        <mapMarker :position="{lng: marker.lng, lat: marker.lat}"></mapMarker>
                        <mapCircle :center="circlePath.center" :radius="circlePath.radius"  :stroke-opacity="0.1" :fillColor="'#0d2f48'" :strokeWeight="1" @lineupdate="updateCirclePath"></mapCircle>
                    </mapMarkerClusterer>
                </baidu-map> -->

                    <div id="bm-view"  class="bm-view"></div>
                </div>
               
            </div>

            <div class="monitor_display_right">
                <h2>范围查车<img src="../assets/images/icon01.png">
                    <img class="set" src="../assets/images/set.png" @click="showSlider">
                </h2>
                <div class="range_car">
                    <h3>{{sliderValue}}米范围内共有 <em>{{areaNum}}</em> 辆车</h3>
                    <ul>
                        <li v-for="(item,index) in areaMarkersLists" :key="index+'a'"><span></span>{{item.name}}</li>

                        
                    </ul>
                </div>
                <h2 class="congxzk">通行车辆<img src="../assets/images/icon01.png">
                </h2>
                <div class="task_car">
                    <div class="task_car_echarts">
                        <div class="task_car_echarts_l">
                            <div class="task_car_echarts_map_l" ref="echarts_bar_l"></div>
                            <div class="yesterday">昨日</div>
                        </div>
                        <div class="task_car_echarts_r">
                            <div class="task_car_echarts_map_r" ref="echarts_bar_r"></div>
                            <div class="yesterday">今日</div>
                        </div>
                    </div>
                    <ul>
                        <li><span></span>黑车</li>
                        <li><span></span>正常车</li>
                        <li><span></span>其他车</li>
                        <!-- <li><span></span>套牌车</li>
                        <li><span></span>绕行</li>
                        <li><span></span>未冲洗</li>
                        <li><span></span>冲洗时间不足</li>
                        <li><span></span>冲洗不干净</li> -->
                    </ul>
                </div>
                <h2 class="congxzk">通行详情<img src="../assets/images/icon01.png">
                </h2>
                <div class="wash_status">
                    <h4 v-if="details.vehicleNo">{{details.vehicleNo}}</h4>
                    <h4 v-else>---</h4>
                    <dl>
                        <dt>
                            <img src="../assets/images/load.png"/>
                            <p></p>
                        </dt>
                        <dd>
                            <p><span>通行时间：</span>{{details.time}}</p>
                            <p><span>报警类型：</span>{{details.type}}</p>
                            <p><span>所属企业：</span>{{details.deptName}}</p>
                            <p><span>车辆型号：</span>{{details.vehicleModel}}</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>


        <div class="livePlayer_box" v-show="livePlayerShow">
            <div class="livePlayer">
                <div class="livePlayer_t">实时视频</div>
                <div class="livePlayer_1">
                   <div id="cmsv6flash" class="ttx-video-h5">
                        <div data-index="0" class="ttx-video-h5-item video-basis-2 ttx-video-h5-item-check" id="TtxH5Video-0">
                        </div><div data-index="1" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-1"></div>
                        <div data-index="2" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-2"></div>
                        <div data-index="3" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-3"></div>
                    </div>
                </div>
                <div class="close_livePlayer" @click="closed">关闭</div>
                <div class="set_big_video">
                    <i class="iconfont" v-for="item in videoMultiple" :key="item.num" :class="item.icon" @click="splitScreen(item.num)"></i>
                </div>
            </div>
        </div>

        <div class="livePlayer_box" v-if="sliderShow">
            <div class="slider_box">
                <h2 class="congxzk"><img src="../assets/images/icon01.png">查询范围设置</h2>
                <div class="slider_area">
                    <a-slider id="test" :default-value="sliderValue" @change="changeSlider" :min="200" :max="5000"/>
                    <ul>
                        <li>200m</li>
                        <li>2600m</li>
                        <li>5000m</li>
                    </ul>
                </div>

                <div class="slider_btn_box">
                    <div class="slider_btn" @click="cancelSlider">取消</div>
                    <div class="slider_btn" @click="sureSlider">确定</div>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import {launchFullscreen,exitfullscreen} from '@/utils/utils.js'
import BMapLibArea from '@/utils/GeoUtils_min.js'
import debounce from 'lodash/debounce'
import {FacilityList,IndexVehicleList,OnlineOffline,GetJsession,GetDeviceOlStatus,SummaryBlacklist} from "@/network/api"




export default {
    data() {
        return {
            details:'',
            onlineStatus:'',
             videoMultiple:[
                {num:1,icon:'iconweibiaoti-1'},
                {num:2,icon:'icon2bei'},
                {num:4,icon:'icon4bei'},
                {num:6,icon:'icon6bei'},
                {num:9,icon:'icon9bei'},
                {num:16,icon:'icon16bei'},
                {num:36,icon:'icon36bei'},
            ],
            sliderShow:false,
            sliderValue:1500,
            livePlayerShow:false,
            siteUrl:require('@/assets/images/jkgd.png'),
            
            navImg:require('@/assets/images/big_nosel.png'),
            navImgSel:require('@/assets/images/big_sel.png'),
            carImg:require('@/assets/images/pos.png'),
            navCurrent:2,
            center: {lng: 0, lat: 0},  //经纬度
            map:'',
            BMap:'',
            zoom:12,
            minClusterSize:1,
            mapStyle:{
                styleJson:[{
    "featureType": "land",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#0e1c33"
    }
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#113549ff"
    }
}, {
    "featureType": "green",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#0e1b30ff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.topfill",
    "stylers": {
        "color": "#113549ff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.sidefill",
    "stylers": {
        "color": "#143e56ff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#dadada00"
    }
}, {
    "featureType": "subwaystation",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#113549B2"
    }
}, {
    "featureType": "education",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#12223dff"
    }
}, {
    "featureType": "medical",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#12223dff"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#12223dff"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "weight": "4"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#fed66900"
    }
}, {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "weight": "2"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffeebb00"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "local",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "weight": "1"
    }
}, {
    "featureType": "local",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "local",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "local",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "local",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#979c9aff"
    }
}, {
    "featureType": "local",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "weight": "1"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#123c52ff"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "weight": "1"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#d8d8d8ff"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "subway",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "subway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#979c9aff"
    }
}, {
    "featureType": "subway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "continent",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "city",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "city",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "town",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "town",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#454d50ff"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "district",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "manmade",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "entertainment",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "shopping",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "subwaylabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "subwaylabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiarywaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiarywaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "provincialwaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "provincialwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "nationalwaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "nationalwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highwaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "village",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "country",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "country",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff10"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "estate",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "scenicspotsway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "scenicspotsway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "universityway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "universityway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "vacationway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "vacationway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "transportation",
    "elementType": "geometry",
    "stylers": {
        "color": "#113549ff"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "otherlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "otherlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "otherlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "manmade",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "manmade",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "education",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "education",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "medical",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "medical",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}]
            },
            markerList:[
 
            ],
            circlePath: {
                    center: {
                    lng: 0,
                    lat: 0
                    },
                    radius: 1000
            },
            formParmas:{
                pageNum:1,
                pageSize:999,
                vehicleId:'',
                vehicleNos:[],
                vehicleStatus :'',
                vehicleType:'',
            },
            
            areaNum:0,
            markers:[],
            areaMarkersLists:[],
            todayTotal:0,
            yesTotal:0,
            todayBlackTotal:0,
            yesBlackTotal:0,
            positionData:[],
            siteName:'',
            maxChnCount:9,
            abbr:'',
            devIdno:'',
            today:'',
            setTime:'',
            spinning:false,
            tableData:[],
            todayBlackNum:0,
            todayOtherNum:0,
            todayWhiteNum:0,
            yesBlackNum:0,
            yesOtherNum:0,
            yesWhiteNum:0,
            curNum:0,
        }
    },
    mounted(){

        this.myChart1 = echarts.init(this.$refs.echarts_bar_l);
        
       

        this.myChart2 = echarts.init(this.$refs.echarts_bar_r);
        

       this.$nextTick(()=>{
           setTimeout(()=>{
                this.initVideo()
            },200);

           this.getHeight();
           
           window.addEventListener('resize',debounce(this.getHeight, 300))//防抖
       
       });

      
        
        
        
        this.$once('hook:beforeDestroy', () => {
            clearInterval(this.setTime)
          
        });
     
    },
    components:{
        // BaiduMap,
        // mapMarkerClusterer,
        // mapMarker,
        // mapCircle,
    },
    created(){
  
        this.init()
    },
  
    methods:{
        getHeight(){
            let h1 = document.querySelector('.monitor_display_left').offsetHeight - 290;
            let h2 = getComputedStyle(document.querySelector('.congxzk_1')).marginTop;
            document.querySelector('.congxzk_content_list').style.height = h1 - parseInt(h2) + 'px'
        },
        init(){
            
            this.setTime = setInterval(()=>{
                this.today = this.$moment().format("YYYY-MM-DD hh:mm:ss");
            },1000)

            let day = this.$moment().format("YYYY-MM-DD");
            let todayBegintime = day + ' ' + '00:00:00'
            let todayEndtime = day + ' ' + '23:59:59'
            let yesBegintime = this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD 00:00:00");
            let yesEndtime = this.$moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD 23:59:59");


            
          
           
            this.getOnlineData(todayBegintime,todayEndtime,1)
            this.getOnlineData(yesBegintime,yesEndtime,2)
            this.getSiteData(this.$route.query.id);
          
            this.getBackData(todayBegintime,todayEndtime,1);
            this.getBackData(yesBegintime,yesEndtime,2);
        },
        getBackData(s,e,val){
            let params = {
                begintime:s,
                endtime:e,
                currentPage:1,
                pageRecords:9999,
                geoaddress:1,
                toMap:2,
                armType:'530,531,532,533,536,537',
                deviceNo:this.$route.query.simNo
            };
            SummaryBlacklist(params).then(res=>{
        
                if(res.data.code == 0){
                    if(val==1){
                        this.tableData = res.data.data.list;
                            if(this.tableData.length>0){
                            this.tableData.forEach((cur,index)=>{
                                this.$set(cur,'keyIdex',index+'a')
                            })
                        };
                        this.todayBlackNum = res.data.data.blackNum;
                        this.todayOtherNum = res.data.data.otherNum;
                        this.todayWhiteNum = res.data.data.whiteNum;
                        this.details = this.tableData[0]
                    }else{
                         this.yesBlackNum = res.data.data.blackNum;
                        this.yesOtherNum = res.data.data.otherNum;
                        this.yesWhiteNum = res.data.data.whiteNum
                    };

                    
                    this.getChart()
                    
                }else{
                    this.$message.warning(res.data.message)
                };
                
            }).catch(error=>{
                this.tableData = []
                this.loading = false;
            })
        },
        getChart(){
            
             this.myChart1.setOption({
                // title: {
                //     text: '南丁格尔玫瑰图',
                //     subtext: '纯属虚构',
                //     left: 'center'
                // },
                series: [
                    {
                        // name: '面积模式',
                        type: 'pie',
                        label: {
                            position: 'inner'
                        },
                        // roseType: 'area',
                        radius: ['20%', '70%'],
                        data: [
                            {value: this.yesBlackNum, name:this.yesBlackNum,itemStyle: { color: '#ff5a00' }},
                            {value: this.yesWhiteNum, name: this.yesWhiteNum,itemStyle: { color: '#ffc500' }},
                            // {value: 3, name: '3',itemStyle: { color: '#1dd58f' }},
                            // {value: 3, name: '3',itemStyle: { color: '#00beff' }},
                            // {value: 5, name: '5',itemStyle: { color: '#7bbed5' }},
                            {value: this.yesOtherNum, name: this.yesOtherNum,itemStyle: { color: '#6d45ee' }},
                        ]
                    }
                ]
            });
            this.myChart2.setOption({
                // title: {
                //     text: '南丁格尔玫瑰图',
                //     subtext: '纯属虚构',
                //     left: 'center'
                // },
                series: [
                    {
                        // name: '面积模式',
                        type: 'pie',
                        label: {
                            position: 'inner'
                        },
                        // roseType: 'area',
                        radius: ['20%', '70%'],
                         data: [
                            {value: this.todayBlackNum, name:this.todayBlackNum,itemStyle: { color: '#ff5a00' }},
                            {value: this.todayWhiteNum, name: this.todayWhiteNum,itemStyle: { color: '#ffc500' }},
                            // {value: 3, name: '3',itemStyle: { color: '#1dd58f' }},
                            // {value: 3, name: '3',itemStyle: { color: '#00beff' }},
                            // {value: 5, name: '5',itemStyle: { color: '#7bbed5' }},
                            {value: this.todayOtherNum, name: this.todayOtherNum,itemStyle: { color: '#6d45ee' }},
                        ]
                    }
                ]
            });
        },
        getSiteData(siteId){
            let params = {
                pageNum:1,
                pageSize:20,
                id:siteId,
                areaId:'',
                facilityName:'',
                deviceName:'',
                fieldId:'',
            }
   
            FacilityList(params).then(res=>{
                this.loading = false;
                if(res.data.code == 0){
                    let data = res.data.data.records;
                    this.positionData = data[0];
                    this.siteName = this.positionData.fieldName;
                     this.getData();
                     this.getDeviceOlStatus();
                }else{
                    this.$message.warning('加载失败')
                };
                
            });
        },
        getDeviceOlStatus(){
            let params = {
                deviceNo: this.positionData.simNo,
            }
   
            GetDeviceOlStatus(params).then(res=>{
             
                if(res.data.code == 0){
                    this.onlineStatus = res.data.data.onlines[0].online
                }else{
                    this.$message.warning('加载失败')
                };
                
            });
        },
        getData(){
           
            IndexVehicleList(this.formParmas).then(res=>{
                  if(res.data.code == 0){
                      res.data.data.records.forEach(cur=>{
                          this.markerList.push({
                              lat:cur.mlat,
                              lng:cur.mlng,
                              content:cur.vehicleNo
                          })
                      })
                      this.$nextTick(()=>{
                          this.mapReady()
                      })
                       
                  }else{

                  }
               
            });
        },
        getOnlineData(b,e,val){
            let params = {
                begintime:b,
                endtime:e,
                pageNum:1,
                pageSize:9999,
                geoaddress:1,
                toMap:2,
                handle:3,
                armType:17,
                vehicleNo:[]
            };
            OnlineOffline(params).then(res=>{
  
                if(res.data.code == 0){
                    if(val==1){
                        this.todayTotal = res.data.total;
                    }else{
                         this.yesTotal = res.data.total;
                    }
                    
                    
                }else{
                    this.$message.warning(res.data.message)
                };
                
            }).catch(error=>{
    
           
            })
        },
        mapReady(){
            let that = this;
            var map = new BMap.Map('bm-view');
            const position = this.positionData;
                let lngAry = position.lng.split(',');
                let latAry = position.lat.split(',');


                var x = 0.0;

            　　var y = 0.0;

            　　for (let i = 0; i < lngAry.length; i++) {

            　　　　x = x + parseFloat(lngAry[i]);


            　　}

                for (let i = 0; i < latAry.length; i++) {



            　　　　y = y + parseFloat(latAry[i]);

            　　}

                x = x / lngAry.length;

        　　    y = y / latAry.length;

                this.center.lng = x
                this.center.lat = y  //取区域中心
                let point = new BMap.Point(x,y);
                map.centerAndZoom(point, 15);
                
                map.enableScrollWheelZoom();
                map.setMapStyleV2({styleJson:this.mapStyle.styleJson}); 
                let myIcon = new BMap.Icon(that.siteUrl, new BMap.Size(61, 61));
                let marker1 = new BMap.Marker(point,{
                    icon: myIcon
                });
                map.addOverlay(marker1);//圆形中心

                let circle = new BMap.Circle(point, this.sliderValue, {
                    strokeWeight: 1,
                    strokeOpacity: 0.1,
                    fillColor:'#16486d'
                });

                map.addOverlay(circle);//添加圆形区域

                this.markers = []
                this.areaMarkersLists = [];
                 
                var myCarOverlayList = [];
                this.markerList.forEach(cur=>{
                     
                    if(BMapLibArea.GeoUtils.isPointInCircle(new BMap.Point(cur.lng,cur.lat),circle)){
                          this.markers.push(new BMap.Marker(new BMap.Point(cur.lng,cur.lat),{
                            icon:  new BMap.Icon(that.carImg, new BMap.Size(24, 24))
                          }));
                          
                         this.areaMarkersLists.push({
                             name:cur.content
                         });
              
                         var opts = {
                        position : new BMap.Point(cur.lng,cur.lat),    // 指定文本标注所在的地理位置
                        offset   : new BMap.Size(5, -50)    //设置文本偏移量
                    }
                            var label = new BMap.Label("", opts);  // 创建文本标注对象
                                label.setStyle({
                                    color : "#fff",
                                    fontSize : "12px",
                                    height : "20px",
                                    lineHeight : "20px",
                                    fontFamily:"微软雅黑",
                                    background:'transparent',
                                    border:'none'
                        });
                        var content = '<div><span style="display:block;border:1px solid #00beff;padding:2px 10px;border-radius:20px;background:rgba(0,190,255,0.5)">'+cur.content+'</span>'
                        + '<div style="border-top:1px solid #00beff;border-left:1px solid #00beff;transform:skewX(-30deg);width:12px;height:15px"></div></div>'
                        label.setContent(content)
                        myCarOverlayList.push(label)
                    };
                  
                       
   
                       
                });
              
                var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:this.markers});
                var markerClusterer1 = new BMapLib.MarkerClusterer(map, {markers:myCarOverlayList});//车辆聚合

                

                function ComplexCustomOverlay(point, text){
                    this._point = point;
                    this._text = text;
                }
                ComplexCustomOverlay.prototype = new BMap.Overlay();
                ComplexCustomOverlay.prototype.initialize = function(map){
                this._map = map;
                let div = this._div = document.createElement("div");
                div.style.position = "absolute";
                div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                //   div.style.backgroundColor = "#EE5D5B";
                //   div.style.border = "1px solid #ffc500";
                div.style.color = "white";
                //   div.style.height = "18px";
                //   div.style.padding = "2px";
                //   div.style.lineHeight = "18px";
                div.style.whiteSpace = "nowrap";
                //   div.style.MozUserSelect = "none";
                //   div.style.fontSize = "12px"
                div.className = 'map_draw_box'
                let span = this._span = document.createElement("span");
                div.appendChild(span);
                span.appendChild(document.createTextNode(this._text));
                span.style.display = 'block';
                span.style.border = "1px solid #ffc500";
                span.style.padding = "2px 10px";
                span.style.borderRadius = "20px";
                span.style.fontSize = "12px";
                span.style.background = "rgba(255,197,0,0.5)"

                let arrow = this._arrow = document.createElement("div");
                //   arrow.style.background = "url(//map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
                arrow.style.borderTop = "1px solid #ffc500";
                arrow.style.borderLeft = "1px solid #ffc500";
                arrow.style.transform = "skewX(-30deg)";
                arrow.style.width = "12px";
                arrow.style.height = "15px";
                arrow.style.left = "-15px";
                div.appendChild(arrow);
                
                

                map.getPanes().labelPane.appendChild(div);
                
                return div;
                }
                ComplexCustomOverlay.prototype.draw = function(){
                let map = this._map;
                let pixel = map.pointToOverlayPixel(this._point);
                this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
                this._div.style.top  = pixel.y - 65 + "px";
                }
                // let txt = "银湖海岸城"
                    
                let myCompOverlay = new ComplexCustomOverlay(point, this.siteName);

                map.addOverlay(myCompOverlay);

                 this.areaNum = this.markers.length;
                 
                

        },
        showInfo(point) {

            //判断点是否在
            if(BMapLibArea.GeoUtils.isPointInCircle(point,circle)){
               
               
            }else{
         
               
            }
        },
        handler ({BMap, map}) {
           
            
           


            this.map = map
            this.BMap = BMap
            this.zoom = 12;
        },
        resize({type, target, size}	){
            this.map.centerAndZoom(new this.BMap.Point(this.center.lng, this.center.lat), this.zoom)
        },
        updateCirclePath (e) {
            this.circlePath.center = e.target.getCenter()
            console.log(this.circlePath.center)
            this.circlePath.radius = e.target.getRadius()
        },
        playLiver(){
            console.log(this.positionData)
            this.devIdno = this.positionData.simNo;
            this.getJsession();
        },
        showSlider(){
            this.sliderShow = true
        },
        fullScreen(){
            launchFullscreen(this.$refs.big_screen)
        },
        changeSlider(val){
            this.sliderValue = val;
        },
        cancelSlider(){
            this.sliderValue = 1500
            this.sliderShow=false
        },
        sureSlider(val){
            this.sliderShow=false;
            this.mapReady();
        },
        initVideo(){
            let params = {
                allowFullscreen: "true",
                allowScriptAccess: "always",
                bgcolor: "#FFFFFF"
                };
            ttxVideoAll.init("cmsv6flash", 800, 498, params);

            setTimeout(this.initFlash, 200);

            
            
        },
        initFlash(){
            this.spinning = true
            console.log(typeof swfobject)
            if (typeof swfobject == "undefined" || typeof swfobject == undefined || swfobject.getObjectById("cmsv6flash") == null ||
                    typeof swfobject.getObjectById("cmsv6flash").setWindowNum == "undefined" ) {
                    this.isInitFinished = false;
                    setTimeout(this.initVideo, 50);

                
            } else {
                    //设置视频插件的语言('playerType=flash'时生效)
                    swfobject.getObjectById("cmsv6flash").setLanguage("cn.xml");
                    //先将全部窗口创建好
                    swfobject.getObjectById("cmsv6flash").setWindowNum(36);
                    //再配置当前的窗口数目
                    swfobject.getObjectById("cmsv6flash").setWindowNum(this.maxChnCount);
                    //设置视频插件的服务器
                   
                    swfobject.getObjectById("cmsv6flash").setServerInfo(playVideoUrl,6605);
                     this.spinning = false
                    this.isInitFinished = true;
            }
        },
        splitScreen(num){
          this.maxChnCount = num;
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
                this.livePlayerShow = true;
            }
        },
        loadFlashWindowNum(num) {
            swfobject.getObjectById('cmsv6flash').setWindowNum(num);
        },
        closeVideo(){
            
            for (let index = this.maxChnCount; index >= 0; index--) {
                swfobject.getObjectById('cmsv6flash').stopVideo(index);//关闭视频
            };
        },
        closed(){
            this.livePlayerShow = false;
            this.closeVideo()
        },
        carDetail(obj,i){
            console.log(obj)
            this.details = obj;
            this.curNum = i;
        },
         linkRinse(){
             this.$router.push({path:'/monitoringDisplay',query:{id:this.$route.query.id,simNo:this.$route.query.simNo}})
        }
    }
}
</script>

<style scoped lang='less'>
    
    .big_screen{
        background: url(../assets/images/top.png) #101624 center 3.2vh no-repeat;
        background-size: auto;
        height: 100vh;
        .top_line{
            img{
                width: 100%;
                display: block;
            }
        }
    }
    .monitor_display_nav{
        display: flex;
        color: #fff;
        padding-top: 1.39vh;
        ul{
            overflow: hidden;
            width: 400px;
            padding-left: 60px;
            li{
                float: left;
                height: 4vh;
                line-height: 4vh;
                width: 114px;
                text-align: center;
                background-size: 100% 4vh;
                background-position: left center;
                font-size: 14px;
                background-repeat: no-repeat;
                &:last-child{
                    margin-left: -12px;
                }
            }
            .curColor{
                color: #00d8ff;
            }
        }
        .monitor_display_t{
            flex: 1;
            text-align: center;
            font-size: 24px;
        }
        .monitor_display_time{
            width: 400px;
            text-align: right;
            padding-right: 30px;
            margin-top: 0.925vh;
            font-size: 12px;
            span{
                padding-right: 18px;
            }
        }
    }

    .monitor_display_content{
        display: block;
        margin-top: 3.3vh;
        display: flex;
        padding: 0 20px;
        .monitor_display_left{
            height: 88vh;
            background: url(../assets/images/background1.png) left center no-repeat;
            background-size: 100% 88vh;
            padding:  1.67vh 25px;
            width: 390px;
            box-sizing: border-box;
            h2{
                color: #fff;
                font-size: 15px;
                img{
                    padding-left: 5px;
                }
            }
            .congx{
                img{
                    width: 100%;
                }
            }
            .congxzk{
                margin-top: 3.18vh;
            }
            .congxzk_content{
                background: url(../assets/images/background5.png) left center no-repeat;
                background-size: 100% 100%;
                padding: 1vh 6px 0;
            }
            .congxzk_content_th{
                color: #fff;
                font-size: 12px;
                display: flex;
                span{
                    flex: 1;
                    text-align: center;
                }
            }
            .congxzk_content_list{
                height: 47vh;
                overflow: hidden;
            }
            .congxzk_content_tr{
                color: #fff;
                font-size: 12px;
                display: flex;
                padding: 1vh 0;
                align-items: center;
                cursor: pointer;
                span{
                   flex: 1;
                    text-align: center;
                    word-break: break-all;
                }
            }
            .congxzk_content_tr_cur{
                background:rgba(0,0,0,0.2);
            }
        }
        .monitor_display_map{
            flex: 1;
        }
        .monitor_display_right{
            height: 88vh;
            box-sizing: border-box;
            background: url(../assets/images/background1.png) left center no-repeat;
            background-size: 100% 88vh;
            padding:  1.67vh 25px;
            width: 390px;
            box-sizing: border-box;
            h2{
                position: relative;
                color: #fff;
                font-size: 15px;
                img{
                    padding-left: 5px;
                }
                .set{
                    position: absolute;
                    right: 0;
                    top: 0;
                    cursor: pointer;
                }
            }
            .congxzk{
                margin-top: 3.18vh;
            }
            .range_car{
                color: #fff;
                font-size: 12px;
                background: url(../assets/images/background4.png) left center no-repeat;
                background-size: 100% 100%;
                height: 16.75vh;
                overflow: auto;
                padding-top: 1.3vh;
                h3{
                    text-align: center;
                    color: #fff;
                    font-size: 12px;
                    margin-bottom: 1vh;
                    em{
                        font-style: normal;
                        font-size: 16px;
                        color: #00dfff;
                    }
                }
                ul{
                    box-sizing: border-box;
                    padding: 0 20px;
                    overflow: hidden;
                    li{
                        float: left;
                        padding-right: 30px;
                        margin-bottom: 6px;
                        span{
                            display: inline-block;
                            width:8px;
                            height:8px;
                            border-radius: 50%;
                            background: #fff;
                            margin-right: 5px;
                        }
                    }
                }
                
            }
            .task_car{
                height: 26vh;
                background: url(../assets/images/background6.png) left center no-repeat;
                background-size: 100% 100%;
                overflow: hidden;
                .task_car_echarts{
                    display: flex;
                    margin-top: 1vh;
                    .yesterday{
                        margin-top: -10px;
                        margin-bottom: 10px;
                    }
                    .task_car_echarts_l{
                        flex: 1;
                        text-align: center;
                        color: #fff;
                        font-size: 12px;
                        .task_car_echarts_map_l{
                             height: 18vh;
                        }
                    }
                    .task_car_echarts_r{
                        flex: 1;
                         color: #fff;
                        font-size: 12px;
                        text-align: center;
                        .task_car_echarts_map_r{
                             height: 18vh;
                        }
                    }
                }
                ul{
                    overflow: hidden;
                    padding: 0 32px;
                    li{
                        float: left;
                        color: #fff;
                        padding-right: 20px;
                        span{
                            display: inline-block;
                            width: 12px;
                            height: 12px;
                            background: #ff5a00;
                            border-radius: 2px;
                            margin-right: 5px;
                        }
                        &:nth-child(2){
                            span{
                             background: #ffc500;   
                            }
                        }
                        &:nth-child(3){
                            span{
                             background: #1dd58f;   
                            }
                        }

                        &:nth-child(4){
                            padding-right: 0px;
                             span{
                             background: #00beff;   
                            }
                        }
                        &:nth-child(5){
                            padding-right: 38px;
                            span{
                             background: #7bbed5;   
                            }
                        }
                        &:last-child{
                            span{
                             background: #6d45ee;   
                            }
                        }
                    }
                }
            }
            .wash_status{
                height: 23vh;
                color: #fff;
                font-size: 12px;
                background: url(../assets/images/background7.png) left center no-repeat;
                background-size: 100% 100%;
                padding: 0 12px;
                overflow: hidden;
                p{
                    margin-botom: 10px;
                }
                h4{
                    color: #fff;
                    padding-left: 15px;
                    font-size: 14px;
                    margin-top: 1vh;
                }
                dl{
                    display: flex;
                    
                }
                dt{
                    width: 100px;
                    background: #161e31;
                    text-align: center;
                    margin-right: 10px;
                    img{
                        display: inline-block;
                        margin-top: 5vh;
                    }
                }
                dd{
                    flex: 1;
                }
            }
        }

        .monitor_display_map{
             height: 88vh;
             margin: 0 15px;
             .car_num_box{
                 overflow: hidden;
                 li{
                     float: left;
                     width: 20.5%;
                     height: 9.3vh;
                     background: url(../assets/images/background2.png) left center no-repeat;
                     background-size: 100% 100%;
                     color: #fff;
                     font-size: 12px;
                     text-align: center;
                     margin-right: 6%;
                     color: #24b4ff;
                     &:last-child{
                         margin-right: 0;
                     }
                     p{
                        font-size: 14px;
                        margin-top: 1vh;
                        em{
                            font-style: normal;
                            font-size: 24px;
                        }
                     }
                 }
             }
             .map_box{
                 background:url(../assets/images/background3.png) left center no-repeat;
                background-size: 100% 100%;
                padding: 2px;
             }
            .bm-view{
                height: 76vh;
                
            }
        }
        
    }
    .livePlayer_box{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        top: 0;
        left: 0;
        .livePlayer{
            width: 825px;
            margin: 15vh auto;
            height: 600px;
            background:url(../assets/images/dpplay.jpg) left center no-repeat;
            background-size: 100% 100%;
            position: relative;
            padding: 73px 13px;
            .close_livePlayer{
                position: absolute;
                right: 20px;
                top: 20px;
                color: #1acee8;
                border: 2px solid #1acee8;
                font-size: 12px;
                padding: 0 6px;
                cursor: pointer;
            }
        }
        .livePlayer_1{
            position: relative;
            width: 100%;
            height: 497px;
        }
        .livePlayer_t{
            position: absolute;
            color: #fff;
            font-size: 16px;
            top: 7px;
            left: 40px;
        }
        .livePlayer_list{
            width: 100%;
        }
        .slider_box{
            width: 419px;
            height: 237px;
            background:url(../assets/images/slider.png) left center no-repeat;
            background-size: 100% 100%;
            margin: 30vh auto 0;
            padding: 20px;
            .congxzk{
                color: #fff;
                font-size: 14px;
                
                img{
                    padding-right: 5px;
                }
            }
            .slider_area{
                margin-top: 60px;
                ul{
                    display: flex;
                    color: #fff;
                    overflow: hidden;
                    justify-content: space-between;
                    margin-bottom: 0;
                    margin-top: 10px;
                }
            }
            .slider_btn_box{
                display: flex;
                color: #fff;
                align-items: center;
                justify-content: center;
                margin-top: 30px;
                .slider_btn{
                    width: 75px;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 4px;
                    background: #18709e;
                    text-align: center;
                    margin: 0 24px;
                    cursor: pointer;
                    &:first-child{
                        background: #1a5776;
                    }
                }
            }
        }
    }
    .set_big_video{
        color: #fff;
        margin-top: 4px;
        i{
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
        }
    }
</style>

<style>
    .slider_area .ant-slider-handle{
        background: #24b4ff;
        width: 26px !important;
        height: 26px;
        margin-top: -10px;
    }
    .slider_area .ant-slider-track{
         background: #24b4ff;
    }
</style>