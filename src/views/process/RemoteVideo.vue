<template>
  <div>
      <a-row type="flex" >
        <a-col :flex="leftWidth" class="left_content" ref="left_content">
          <a-form-model :model="formParmas" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item>
              <a-input
                v-model="formParmas.vehicleNo"
                placeholder="请输入车牌号"
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

          <div class="remote_cx">
            <a-button type="primary" block>查询</a-button>
          </div>

          <!-- <a-button type="primary" block @click="startPlayback">播放</a-button> -->
        </a-col>


        <a-col flex="auto" ref="right_map" class="right_map">
          <div id="cmsv6flash" class="ttx-video-h5">
              <div data-index="0" class="ttx-video-h5-item video-basis-2 ttx-video-h5-item-check" id="TtxH5Video-0">
                </div><div data-index="1" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-1"></div>
                <div data-index="2" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-2"></div>
                <div data-index="3" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-3"></div>
          </div>
        </a-col>


      </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryValue:1,
      formParmas:{
        devIdno:'',
        vehicleNo:'',
        begintime:'',
        endtime:'',
        currentPage:1,
        pageRecords :999,
        day:''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      leftWidth:'280px',
      labelCol_1: { span: 6 },
      wrapperCol_1: { span: 18 },
      isInitFinished:false,
    }
  },
  mounted(){
    this.$nextTick(()=>{
      let h1 = this.$refs.right_map.$el.offsetHeight;
      this.initVideo(h1)
    });
    this.$once('hook:beforeDestroy', () => {
      this.stopPlayback();
    })
  },
  methods:{
    initVideo(h1){
      let params = {
          allowFullscreen: "true",
          allowScriptAccess: "always",
          bgcolor: "#FFFFFF"
        };
      ttxVideoAll.init("cmsv6flash", '100%', h1, params);
      setTimeout(this.initFlash, 50);
      
    },
    initFlash(){

        if (typeof swfobject == "undefined" || typeof swfobject == undefined || swfobject.getObjectById("cmsv6flash") == null ||
              typeof swfobject.getObjectById("cmsv6flash").setWindowNum == "undefined" ) {
              setTimeout(this.initFlash, 50);
            
        } else {
              //设置视频插件的语言('playerType=flash'时生效)
              swfobject.getObjectById("cmsv6flash").setLanguage("cn.xml");
              //先将全部窗口创建好
              swfobject.getObjectById("cmsv6flash").setWindowNum(4);
              //再配置当前的窗口数目
              swfobject.getObjectById("cmsv6flash").setWindowNum(4);
              //设置视频插件的服务器
              swfobject.getObjectById("cmsv6flash").setServerInfo("221.231.140.166",6605);
              this.isInitFinished = true;
      }
    },
    startPlayback() {
      		if (!this.isInitFinished){
	          	return;
	      	} else {
            
            
	      		//回放url
	      		var url ='http://221.231.140.166:6604/3/5?DownType=5&DevIDNO=018118883001&FILELOC=1&FILESVR=0&FILECHN=0&FILEBEG=1&FILEEND=100000&PLAYIFRM=0&PLAYFILE=/mnt/hgfs/linux/libdvrnet/jni/demo/bin/record/H20121123-112931P3A1P0.avi&PLAYBEG=0&PLAYEND=0&PLAYCHN=0';

	      		//回放之前先停止
	      		swfobject.getObjectById('cmsv6flash').stopVideo(1);
	      		//开始回放
	          	swfobject.getObjectById("cmsv6flash").startVod(1, url);
	      	}
    },
    stopPlayback(){
      swfobject.getObjectById("cmsv6flash").stopVideo(0);
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
  }
}
</script>