<template>
  <div class="mi_box" ref="big_screen">
    <div class="mi_top">
      <img src="../assets/images/mipic1.png">
       <div class="mi_display_time">
                <span>{{today}}</span>
                <img src="../assets/images/quanp.png" @click="fullScreen">
        </div>
    </div>
     <a-row>
      <a-col class="mi_box_left" :span="5">
        <div class="left_list">
            <ul class="left_list_nav">
              <li class="left_list_nav_cur">工地出土量</li>
              <li>工地回填量</li>
            </ul>

            <ul class="mi_left_content">
                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5698/7456*100+'%'}">
                          
                        </div>
                        <span>5698m3（7456m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5000/10000*100+'%'}">
                          
                        </div>
                        <span>5000m3（10000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:4000/6000*100+'%'}">
                          
                        </div>
                        <span>4000m3（6000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:3000/9900*100+'%'}">
                          
                        </div>
                        <span>3000m3（9000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5000/8000*100+'%'}">
                          
                        </div>
                        <span>5000m3（8000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:1000/2000*100+'%'}">
                          
                        </div>
                        <span>1000m3（2000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:4000/4000*100+'%'}">
                          
                        </div>
                        <span>4000m3（4000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:1000/9000*100+'%'}">
                          
                        </div>
                        <span>1000m3（9000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:2000/6000*100+'%'}">
                          
                        </div>
                        <span>2000m3（6000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:4000/22222*100+'%'}">
                          
                        </div>
                        <span>4000m3（22222m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:2000/44444*100+'%'}">
                          
                        </div>
                        <span>2000m3（44444m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:8000/50000*100+'%'}">
                          
                        </div>
                        <span>8000m3（50000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5050/10250*100+'%'}">
                          
                        </div>
                        <span>5050m3（10250m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:3560/9582*100+'%'}">
                          
                        </div>
                        <span>3560m3（9582m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某工地</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5000/15500*100+'%'}">
                          
                        </div>
                        <span>5000m3（15500m3）</span>
                    </div>
                </li>

               
            </ul>
        </div>
      </a-col>
     
      <a-col class="mi_box_middle" :span="14">
        <div class="mi_map">
          <div ref="mapChart" id="mapChart" class="mapChart"></div>
          <div class="qhtj_box">
              <div class="qhtj_sel" @click="selStatistical(1)" :class="{'qhtj_sel_cur':statisticalMethods==1}"><em><span class="qhtj_quan"></span></em>按日统计</div>
              <div class="qhtj_sel"  @click="selStatistical(2)" :class="{'qhtj_sel_cur':statisticalMethods==2}"><em><span class="qhtj_quan"></span></em>按月统计</div>
              <div class="qhtj_date">
                  <a-date-picker v-if="statisticalMethods==1" v-model="date" format="YYYY-MM-DD" :allowClear="false"  valueFormat="YYYY-MM-DD"/>
                  <a-month-picker v-else v-model="mouth" format="YYYY-MM" :allowClear="false"  valueFormat="YYYY-MM" />
              </div>
          </div>

          <div class="legend">
              <span>图例：</span>
              <div class="legend_l"><em></em>工地</div>
              <div class="legend_l legend_l1"><em></em>消纳场</div>
              <div class="legend_l legend_l2"><em></em>疑似消纳场</div>
              <div class="legend_l legend_l3"><em></em>疑似黑工地</div>
          </div>
        </div>
      </a-col>

       <a-col class="mi_box_right mi_box_left" :span="5">
        <div class="left_list">
            <ul class="left_list_nav">
              <li>消纳场收土量</li>
            </ul>

            <ul class="mi_left_content">
                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress mi_progress_red" :style="{width:100+'%'}">
                          
                        </div>
                        <span>15254m3（9582m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5000/10000*100+'%'}">
                          
                        </div>
                        <span>5000m3（10000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:4000/6000*100+'%'}">
                          
                        </div>
                        <span>4000m3（6000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:3000/9900*100+'%'}">
                          
                        </div>
                        <span>3000m3（9000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5000/8000*100+'%'}">
                          
                        </div>
                        <span>5000m3（8000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:1000/2000*100+'%'}">
                          
                        </div>
                        <span>1000m3（2000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:4000/4000*100+'%'}">
                          
                        </div>
                        <span>4000m3（4000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:1000/9000*100+'%'}">
                          
                        </div>
                        <span>1000m3（9000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:2000/6000*100+'%'}">
                          
                        </div>
                        <span>2000m3（6000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:4000/22222*100+'%'}">
                          
                        </div>
                        <span>4000m3（22222m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:2000/44444*100+'%'}">
                          
                        </div>
                        <span>2000m3（44444m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:8000/50000*100+'%'}">
                          
                        </div>
                        <span>8000m3（50000m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5050/10250*100+'%'}">
                          
                        </div>
                        <span>5050m3（10250m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:3560/9582*100+'%'}">
                          
                        </div>
                        <span>3560m3（9582m3）</span>
                    </div>
                </li>

                <li class="mi_left_content_list">
                    <label>某某消纳场</label>
                    <div class="mi_progress_box">
                        <div class="mi_progress" :style="{width:5000/15500*100+'%'}">
                          
                        </div>
                        <span>5000m3（15500m3）</span>
                    </div>
                </li>

               
            </ul>
        </div>
      </a-col>
    </a-row>

    <div class="mi_tips_box" v-show="showTip" :style="{top:tipsTop+'px',left:tipsLeft+'px'}">
          <div class="mi_tips_title">{{detailsList.name}}</div>
          <ul>
              <li v-if="detailsList.backfill">可回填总量：{{detailsList.backfill}}m3</li>
              <li v-if="detailsList.excavated">出土量：{{detailsList.excavated}}m3</li>
              <li v-if="detailsList.backfilled">回填量：{{detailsList.backfilled}}m3</li>
              <li v-if="detailsList.trainNumber">车次：{{detailsList.trainNumber}}</li>
          </ul>
           <img class="mipic5" src="../assets/images/mipic5.png">
    </div>
    
  </div>
</template>
<script>

import echarts from "echarts";
import 'echarts/extension/bmap/bmap';
import {launchFullscreen,exitfullscreen} from '@/utils/utils.js'
export default {
  data() {
      return {
          tipsTop:100,
          tipsLeft:500,
        showTip:false,
        mapStyle: {
                              styleJson: [{
    "featureType": "land",
    "elementType": "geometry",
    "stylers": {
        "color": "#05316dff",
        "visibility": "on"
    }
}, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#002860ff",
        "visibility": "on"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#0016470a",
        "visibility": "on"
    }
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": {
        "color": "#0a4694ff",
        "visibility": "on"
    }
}, {
    "featureType": "village",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "town",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "district",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "country",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#f5a623ff",
        "visibility": "on"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9eb0c8ff",
        "visibility": "on"
    }
}, {
    "featureType": "poilabel",
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
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#6989b8ff",
        "visibility": "on"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#3e567aff",
        "visibility": "on"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "weight": 3
    }
}, {
    "featureType": "green",
    "elementType": "geometry",
    "stylers": {
        "color": "#2a5281ff",
        "visibility": "on"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "geometry",
    "stylers": {
        "color": "#2d6ab1ff",
        "visibility": "off"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text.stroke",
    "stylers": {
        "weight": 1,
        "color": "#5180c300",
        "visibility": "on"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c3ff",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "country",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c30f",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "city",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "railway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry",
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
    "featureType": "tertiarywaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "tertiarywaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
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
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on",
        "weight": 90
    }
}, {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "shopping",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "manmade",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "manmade",
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
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#769bcf00",
        "visibility": "on"
    }
}, {
    "featureType": "road",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "road",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "road",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "road",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#5c79a2ff",
        "visibility": "on"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#1c4f7eff"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "weight": 3
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#5c79a2ff",
        "visibility": "on"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#1c4f7eff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "weight": 3
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#5c79a2ff",
        "visibility": "on"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#5c79a2ff",
        "visibility": "on"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#5c79a2ff",
        "visibility": "on"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#5c79a2ff",
        "visibility": "on"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#5c79a2ff",
        "visibility": "on"
    }
}, {
    "featureType": "local",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#5c79a2ff",
        "visibility": "on"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#3e567aff",
        "visibility": "on"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#3e567aff",
        "visibility": "on"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#3e567aff",
        "visibility": "on"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#3e567aff",
        "visibility": "on"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#3e567aff",
        "visibility": "on"
    }
}, {
    "featureType": "local",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#3e567aff",
        "visibility": "on"
    }
}, {
    "featureType": "local",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "local",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff",
        "visibility": "on"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#5180c300",
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry",
    "stylers": {
        "weight": 1
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry",
    "stylers": {
        "weight": 1
    }
}, {
    "featureType": "local",
    "elementType": "geometry",
    "stylers": {
        "weight": 1
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry",
    "stylers": {
        "weight": 3
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "weight": 3
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry",
    "stylers": {
        "weight": 3
    }
}, {
    "featureType": "highway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "highway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "highway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "highway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "provincialway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "8,10",
        "level": "8"
    }
}, {
    "featureType": "provincialway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "8,10",
        "level": "9"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "8,10",
        "level": "8"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "8,10",
        "level": "9"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "8,10",
        "level": "8"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "8,10",
        "level": "9"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "6"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "7"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "8"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "6,9",
        "level": "9"
    }
}, {
    "featureType": "arterial",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "9,9",
        "level": "9"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "9,9",
        "level": "9"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "9,9",
        "level": "9"
    }
}, {
    "featureType": "scenicspotsway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "universityway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "vacationway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
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
        "color": "#ffffffff"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
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
        "color": "#ffffffff"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00",
        "weight": 0
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.topfill",
    "stylers": {
        "color": "#2ff8ffff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.sidefill",
    "stylers": {
        "color": "#2ff8ffff"
    }
}, {
    "featureType": "subwaystation",
    "elementType": "geometry",
    "stylers": {
        "color": "#f5a623ff",
        "visibility": "off"
    }
}, {
    "featureType": "education",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "education",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "entertainment",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "estate",
    "elementType": "geometry",
    "stylers": {
        "color": "#8b572aff",
        "visibility": "off"
    }
}, {
    "featureType": "transportation",
    "elementType": "geometry",
    "stylers": {
        "color": "#417505ff",
        "visibility": "off"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff03"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "carservicelabel",
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
    "featureType": "subway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiarywaysign",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "tertiarywaysign",
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
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
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
    "featureType": "hotellabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 16
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "building",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "education",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "medical",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "playground",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "parkinglot",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "medical",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "education",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}]
                            },
          geoCoordMap: {
            工地1: [120.6574945536216, 31.179529646317082],
            工地2: [120.59655350782471, 31.46382608319382],
            消纳场: [120.39899816007035, 31.352814309873935],
            工地4: [120.63320437263181, 31.54085830668408],
            工地5: [120.29698658635726, 31.534856899786686],
            疑似黑工地: [120.451962,31.553476],
            疑似黑消纳场: [120.149557,31.604665]
        },
        detailsList:{},
        today:'',
        date:'',
        mouth:'',
        statisticalMethods:2
        
      }
  },
  mounted(){


      // var map = new BMap.Map('mapChart');
      // map.centerAndZoom(new BMap.Point(116.404269,39.916042), 12);
     
        this.setTime = setInterval(()=>{
                this.today = this.$moment().format("YYYY-MM-DD hh:mm:ss");
            },1000)

            this.date = this.$moment().format("YYYY-MM-DD");
             this.mouth = this.$moment().format("YYYY-MM")
        this.$once('hook:beforeDestroy', () => {
            clearInterval(this.setTime)
          
        });
   
      this.mapChart = echarts.init(this.$refs.mapChart);

       const BJData = [
        [{ name: "工地1" }, { name: "工地2", value: 95, excavate:2080,backfill:1000}],//excavate出土总量 backfill回填总量
        [{ name: "工地1" }, { name: "消纳场", value: 90, excavate:0,backfill:10000 }],
        [{ name: "工地1" }, { name: "工地4", value: 95, excavate:2080,backfill:1000 }],
        [{ name: "工地1" }, { name: "工地5", value: 95, excavate:2080,backfill:1000 }],
        [{ name: "工地1" }, { name: "疑似黑工地", value: 80, excavate:2080,backfill:1000 }],
        [{ name: "工地1" }, { name: "疑似黑消纳场", value: 70, excavate:2080,backfill:1000 }],
      ];
      const SHData = [
        [{ name: "工地2" }, { name: "工地1", value: 95, excavate:2080,backfill:9000,trainNumber:10, excavated:800,backfilled:5000}],
        [{ name: "工地2" }, { name: "消纳场", value: 90, excavate:0,backfill:10000,trainNumber:50,excavated:0,backfilled:5000 }],
        [{ name: "工地2" }, { name: "工地4", value: 95 , excavate:3080,backfill:8000,trainNumber:10,excavated:1000,backfilled:6000}],
        [{ name: "工地2" }, { name: "工地5", value: 95 , excavate:4080,backfill:5000,trainNumber:10,excavated:2000,backfilled:3000}],
        [{ name: "工地2" }, { name: "疑似黑工地", value: 80, excavate:'',backfill:'',trainNumber:2, excavated:1600,backfilled:4000}],
        [{ name: "工地2" }, { name: "疑似黑消纳场", value: 70, excavate:'',backfill:'',trainNumber:20, excavated:0,backfilled:8000}],
      ];

      const color =['#7eff00', '#00f0ff', '#ff0012', '#f97b12'];
     
      const series = [];

      [
        [ {name: "工地2", excavate:2080,backfill:9000,trainNumber:10, excavated:800,backfilled:5000}, SHData]
      ].forEach((item, i) => {
        series.push(
          {
            name: item[1][0].name + " Top10",
            type: "lines",
            coordinateSystem: 'bmap',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.02,
              symbol: 'arrow',
              symbolSize: 10
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: 1, //尾迹线条透明度
                curveness: 0.2,
                color: function(params){
                  let num = params.data.numValue; //这是数据中的参数，可改
                                if(num == 95){
                                    return color[0];
                                }else if(num == 90){
                                    return color[1];
                                }else if(num == 80){
                                    return color[3];
                                }else if(num == 70){
                                    return color[2];
                                }

                },
              }
            },
            data: this.convertData(item[1])
          },
           //被攻击点
        {
            type: 'effectScatter',
             coordinateSystem: 'bmap',
            zlevel: 2,
            rippleEffect: {
                period: 4,
                brushType: 'stroke',
                scale: 4
            },
            label: {
                normal: {
                    show: true,
                    position: 'right', //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: function(params) { //圆环显示文字
                        return params.data.name;
                    },
                    fontSize: 16
                },
                emphasis: {
                    show: true
                }
            },
            symbol: 'circle',
            symbolSize: function(val) {
                return val[2] / 4 //圆环大小
            },
            itemStyle: {
                normal: {
                    show: false,
                    color: color[0]
                }
            },
            data: [{
                name: item[0].name,
                value: this.geoCoordMap[item[0].name].concat([95]),
                 excavate:item[0].excavate,
                backfill:item[0].backfill,
                trainNumber:item[0].trainNumber,
                excavated: item[0].excavated,
                backfilled:item[0].backfilled
            }],
        },
          {
            name: item[1][0].name + " Top10",
            type: "effectScatter",
            coordinateSystem: "bmap",
            zlevel: 2,
            rippleEffect: {
                period: 4, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: function(params) { //圆环显示文字
                        return params.data.name;
                },
                fontSize: 16
              }
            },
            symbolSize: function(val) {
              return val[2] / 4
            },
            itemStyle: {
              normal: {
                 color: function(params){
                  let num = params.value[2]; //这是数据中的参数，可改
                                if(num == 95){
                                    return color[0];
                                }else if(num == 90){
                                    return color[1];
                                }else if(num == 80){
                                    return color[3];
                                }else if(num == 70){
                                    return color[2];
                                }

                },
              }
            },
            data: item[1].map(dataItem => {
              return {
                name: dataItem[1].name,
                value: this.geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value
                ]),
                excavate:dataItem[1].excavate,
                backfill:dataItem[1].backfill,
                trainNumber:dataItem[1].trainNumber,
                excavated: dataItem[1].excavated,
                backfilled:dataItem[1].backfilled
              };
            })
          }
        );
      });
      const option = {
                    tooltip: {
                            trigger: 'item',
                            formatter:function (params) {
                                
                                return ''
                                
                            }
                        },
                        bmap: {
                            zoom: 12,
                            center: [120.596553507824711, 31.46382608319382],
                            roam: true,
              
                              
                        },

                        
                       
                        animation: false,
        series: series
      };


      this.$nextTick(()=>{
        
          var bmap =  this.mapChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                // LARGE类型
                type: BMAP_NAVIGATION_CONTROL_LARGE,
            }));
              bmap.setMapStyleV2({styleJson:this.mapStyle.styleJson}); 
            bmap.enableScrollWheelZoom(true)
      })

        this.mapChart.setOption(option);
        let that = this;
        this.mapChart.on('mousemove', function (params) {
            console.log(params)
            if (params.componentType === 'series') {
                if(params.seriesType == "effectScatter"){
                    that.detailsList = params.data;
                    that.showTip = true;
                    that.tipsTop = params.event.event.pageY;
                    that.tipsLeft = params.event.event.pageX + 30
                }
                
            }
        })

        this.mapChart.on('mouseout', function (params) {
            if (params.componentType === 'series') {
                
                that.showTip = false
            }
        })
       
  },
  methods:{
      convertData(data) {
        const res = [];
        for (let i = 0; i < data.length; i++) {
            const dataItem = data[i];
            const fromCoord = this.geoCoordMap[dataItem[0].name];
            const toCoord = this.geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                numValue : dataItem[1].value,
            });
            }
        }
        return res;
      },
      fullScreen(){
            launchFullscreen(this.$refs.big_screen)
      },
      selStatistical(val){
          this.statisticalMethods = val;
          if(val==1){
              this.date = this.$moment().format("YYYY-MM-DD");
              this.mouth = ''
          }else{
               this.mouth = this.$moment().format("YYYY-MM");
               this.date = ''
          }
      }
  }
};
</script>
<style scoped lang="less">
  .mi_box{
    height: 100vh;
    background: url('../assets/images/mibg.jpg') center center no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .mi_top{
    width: 100%;
    margin-bottom: 1vh;
    position: relative;
  }
  .mi_top img{
    width: 100%;
    display: block;
  }
  
  .mi_box_left{
   .left_list{
        padding: 0 10%;
    }
    .left_list_nav{
        color: #fff;
        overflow:hidden;
        margin-bottom: 3.6vh;
    }

    .left_list_nav li {
        width: 49%;
        height: 4.4vh;
        line-height: 4.4vh;
        padding-left: 4.5%;
        font-size: 21px;
        background: url('../assets/images/mipic2.png') center center no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
    }
    .left_list_nav li.left_list_nav_cur{
        color: #00d8ff;
    }
    .left_list_nav li:first-child{
        float: left;
    }
    .left_list_nav li:last-child{
        float: right;
    }
    .mi_left_content{
        color: #fff;
        height: 78vh;
        overflow: hidden;
    }
    .mi_left_content_list{
        display: flex;
        margin-bottom: 2.5vh;
    }
    .mi_left_content_list label{
        width: 28%;
        margin-right: 1%;
        font-size: 18px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .mi_progress_box{
        background: #0f428d;
        flex: 1;
        position: relative;
        span{
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 50%;
            transform: translateY(-50%);
            padding-left: 5%;
        }
    }
    .mi_progress{
        width: 80%;
        height: 100%;
        background: #2b8cf2;
        font-size: 14px;
        display: flex;
       align-items: center;
    }
    .mi_progress_red{
        background: #bb0f0f;
    }
  }
  .mi_box_right{
   .left_list_nav li:last-child{
       float:left;
       width: 55%;
   }
   .mi_left_content_list label{
       width: 34%;
   }
   
   
  }
  .mi_map{
       background: url('../assets/images/mipic3.png') center center no-repeat;
       background-size: 100% 100%;
       padding: 7vh 3vh 2vh;
       box-sizing: border-box;
       height:86vh;
       position: relative;
   }
   
   .mapChart{
    width:100%;
    height:100%;
    box-shadow: 0 0 5px 3px #125994;
  }

  .qhtj_box{
      position: absolute;
      width: 100%;
      top: 0px;
      left: 20%;
      color: #fff;
      display: flex;
      align-items: center;
  }
  .qhtj_sel{
      margin-right: 20px;
      cursor: pointer;
  }
  .qhtj_sel em{
      display: inline-block;
      width: 10px;
      height: 10px;
      border:1px solid #fff;
      border-radius: 50%;
      padding: 1px;
      margin-right: 5px;
      .qhtj_quan{
          display: block;
          background: #fff;
          width: 100%;
          height: 100%;
          border-radius: 50%;
      }
  }
    .qhtj_sel_cur{
        color: #00d8ff;
    }
  .qhtj_sel_cur em{
      border-color: #00d8ff;
       .qhtj_quan{
        background: #00d8ff;  
      }
  }
  .legend{
      display: flex;
      position: absolute;
      width: 100%;
      bottom: 3vh;
      color: #fff;
      z-index: 88;
      background: rgba(102,159,236,0.29);
     left: 4%;
     width: 54%;
     padding: 5px 10px;
     border: 2px solid #2e71cb;
     align-items: center;
     span{
         font-size: 18px;
     }
     .legend_l{
         margin-right: 4%;
         font-size: 16px;
         em{
             display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #7eff00;
            margin-right: 5px;
         }
         
     }
     .legend_l1 em{
        background: #00f0ff;
     }
     .legend_l2 em{
        background: #ff0012;
     }
     .legend_l3 em{
        background: #f97b12;
     }
  }

 .mi_tips_box{
     position: fixed;
     background: rgba(35,97,182,0.7);
     z-index: 99;
     color: #fff;
     border: 2px solid #669fec;
     padding: 15px 10px 20px;
     .mi_tips_title{
         font-size: 20px;
         padding-right: 40px;
     }
     ul{
         margin-bottom: 0;
         margin-top: 15px;
     }
     .mipic5{
         position: absolute;
         right: 10px;
         top: 10px;
     }
 }
  
  
  
@media (max-width: 1680px){ 
   .mi_box_left .left_list_nav li{
     font-size: 16px;
   }
   .mi_box_left .mi_left_content_list label{
        font-size: 15px;
   }
   .mi_box_left .mi_progress{
       font-size: 12px;
   }
    .qhtj_box{
        top: -5px;
    }
    .legend span{
        font-size: 15px;
    }
    .legend .legend_l{
        font-size: 13px;
    }
     .mi_tips_box .mi_tips_title{
         font-size: 15px;
         color: #7eff00;
     }
 }

 .mi_display_time{
     position: absolute;
     color: #fff;
     right: 20px;
     top: 3vh;
     img{
         width: 17px;
         display: inline-block;
         margin-left: 18px;
     }
 }


</style>

<style>
 .qhtj_date .ant-input{
      background: #0669ac !important;
      border: 1px solid #02bee2;
      color: #fff;
  }
  .qhtj_date .ant-calendar-picker-icon{
      color: #fff;
  }



</style>