<template>
    <div>
        <!-- <baidu-map class="map_view" ref="map_view" :scroll-wheel-zoom="true" :ak="$store.getters.ak" :center="center" :zoom="zoom" @ready="handler">
          <mapOverlay>
              <div class="pegional_search">
                 <a-row type="flex" justify="start" align="middle">
                    <a-col >
                        <label class="pegional_label">设定时间区域:</label>
                    </a-col>
                    <a-col >
                         <a-range-picker show-time>
                            <template slot="renderExtraFooter">
                                extra footer
                            </template>
                        </a-range-picker>
                    </a-col>

                    <a-col class="pegional_btn">
                       <a-button type="primary">
                            <i class="iconhuizhi iconfont"></i>绘制违章区域
                        </a-button>
                    </a-col>
                    <a-col class="pegional_btn">
                       <a-button>
                            重绘
                        </a-button>
                    </a-col>
                </a-row> 
              </div>
          </mapOverlay>
        </baidu-map> -->
         <div id = "container" class="map_view"></div>

         <div class="pegional_search">
                 <a-row type="flex" justify="start" align="middle">
                    <a-col >
                        <label class="pegional_label">设定时间区域:</label>
                    </a-col>
                    <a-col >
                         <a-range-picker show-time>
                            <template slot="renderExtraFooter">
                                extra footer
                            </template>
                        </a-range-picker>
                    </a-col>

                    <a-col class="pegional_btn">
                       <a-button type="primary" @click="draw()">
                            <i class="iconhuizhi iconfont"></i>绘制违章区域
                        </a-button>
                    </a-col>
                    <a-col class="pegional_btn">
                       <a-button @click="clearAll()">
                            重绘
                        </a-button>
                    </a-col>
                </a-row> 
        </div>
    </div>
</template>


<script>



export default {
    data() {
        return {
           drawingManager:'',
           overlays:[],
           map:''
        }
    },
    components:{


    },
    mounted(){
          this.map = new BMap.Map("container"); 

    var poi = new BMap.Point(116.307852,40.057031);
    this.map.centerAndZoom(poi, 16);
    this.map.enableScrollWheelZoom();  
    this.overlays = [];
    let that = this
	var overlaycomplete = function(e){
        that.overlays.push(e.overlay);
    };
    var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }
    //实例化鼠标绘制工具
    this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
        },
        circleOptions: styleOptions, //圆的样式
        polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
    });  
	 //添加鼠标绘制工具监听事件，用于获取绘制结果
    this.drawingManager.addEventListener('overlaycomplete', overlaycomplete);
     
    },
    methods: {
       clearAll() {
            for(var i = 0; i < this.overlays.length; i++){
                this.map.removeOverlay(this.overlays[i]);
            }
            this.overlays.length = 0   
        },
        draw(type){
            this.drawingManager.open();
            this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
        }   
    },
}
</script>