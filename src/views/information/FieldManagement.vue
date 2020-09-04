<template>
  <div>
    <div id="cmsv6flash" class="ttx-video-h5" style="width: 1516px; height: 686px;"><div data-index="0" class="ttx-video-h5-item video-basis-2 ttx-video-h5-item-check" id="TtxH5Video-0"></div><div data-index="1" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-1"></div><div data-index="2" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-2"></div><div data-index="3" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-3"></div></div>
    <div @click="previewVideo">sdsd</div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      isInitFinished:false,
      maxChnCount:6,
      devIdno:'',
      vehiIdno:'沪A0001',
      jsession:'10b3573b03cf45a1a5ba2efaa5eecd49',
      abbr:'',
      closeSecond:0
    }
  },
  created(){},
  mounted(){
   
     let params = {
                allowFullscreen: "true",
                allowScriptAccess: "always",
                bgcolor: "#FFFFFF"
            };
    ttxVideoAll.init("cmsv6flash", 600, 600, params);
    setTimeout(this.initFlash, 50);
    this.loadDeviceInfo()
  },
  methods:{
    initFlash(){

       if (typeof swfobject == "undefined" || swfobject.getObjectById("cmsv6flash") == null ||
            typeof swfobject.getObjectById("cmsv6flash").setWindowNum == "undefined" ) {
            setTimeout(this.initFlash, 50);
           
      } else {
            //设置视频插件的语言('playerType=flash'时生效)
            swfobject.getObjectById("cmsv6flash").setLanguage("cn.xml");
            //先将全部窗口创建好
            swfobject.getObjectById("cmsv6flash").setWindowNum(36);
            //再配置当前的窗口数目
            swfobject.getObjectById("cmsv6flash").setWindowNum(6);
            //设置视频插件的服务器
            swfobject.getObjectById("cmsv6flash").setServerInfo("www.dzkjbd.com",6605);
            this.isInitFinished = true;
    }
    },
    previewVideo() {
            //视频插件初始化完成
            if (this.isInitFinished) {
                //再一次设置flash窗口数量
                this.loadFlashWindowNum(this.maxChnCount);
                // if (this.closeSecond != 0) {
                //     $("#closeTip").show();
                //     setTimeout(closeVideo, 1000);
                // }
                var vehiName = this.abbr == "" ? this.devIdno : this.abbr;
                for (var i = 0; i < 6; ++i) {
                    swfobject.getObjectById('cmsv6flash').setBufferTime(i, 4);
                    swfobject.getObjectById('cmsv6flash').setVideoInfo(i, vehiName + " - CH" + (i + 1));
                    swfobject.getObjectById('cmsv6flash').startVideo(i, this.jsession, this.devIdno, i, 1, true);
                }
            } else {
                setTimeout(this.previewVideo, 500);
            }
        },
         loadFlashWindowNum(num) {
            if (num == 1) {
                swfobject.getObjectById('cmsv6flash').setWindowNum(1);
            } else if (num > 1 && num <= 4) {
                swfobject.getObjectById('cmsv6flash').setWindowNum(6);
            } else {
                swfobject.getObjectById('cmsv6flash').setWindowNum(6);
            }
        },
        loadDeviceInfo() {
          let that = this;
            var param = [];
            param.push({name: 'jsession', value: this.jsession});
            param.push({name: 'devIdno', value: this.devIdno});
            param.push({name: 'vehiIdno', value: this.vehiIdno});

            this.doAjaxSubmit('http://dzkjbd.com/StandardApiAction_getVideoDevice.action', param, function (json, action, success) {
                if (success) {
                    //不是视频设备
                    if (!json.isVideoDevice) {
                        alert(lang.errorVideoDevice);
                    } else {
                        that.devIdno = json.devIdno;
                        // this.chnCount = json.chnCount;
                        // if (json.abbr != null) {
                        //     this.abbr = devIdno;
                        // }
                        //加载完成再加载其他信息
                        // loadOtherInfo();
                    }
                } else {
                    // //没有操作权限
                    // if (json) {
                    //     if (json.result == 5) {
                    //         alert(lang.jsessionError);
                    //     } else if (json.result == 8) {
                    //         alert(lang.vehicleNotOperate);
                    //     } else {
                    //         alert(lang.deviceNoExist);
                    //     }
                    // } else {
                    //     alert(lang.deviceNoExist);
                    // }
                }
            });
        },
        doAjaxSubmit(action, params, callback) {
            $.ajax({
                type: 'POST',
                url: action,
                data: params,
                cache: false,
                //contentType:'application/json',
                dataType: 'json',
                success: function (json) {
                    if (json.result == 0) {
                        callback.call(this, json, action, true);
                    } else {
                        callback.call(this, json, action, false);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    try {
                        if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown);
                    } catch (e) {
                    }
                    callback.call(this, null, action, false);
                }
            });
        }
        
  }
}
</script>