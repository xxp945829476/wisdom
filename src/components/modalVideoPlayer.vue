<template>
  <a-modal v-model="videoVisible" title="视屏取证" :maskClosable="false" :keyboard="false" width="700px" v-dialogDrag="dialog">
     <a-spin :spinning="spinning">
       <div>
          <video-player class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions">
          </video-player>
       </div>
     </a-spin>
      <template slot="footer">
          <a-button key="back" @click="roleVisible=false">
          取消
          </a-button>
          <a-button key="submit" type="primary" @click="save">
          下载
          </a-button>
      </template>
  </a-modal>
</template>

<script>


import {GetAlarmFile} from '@/network/api'
import debounce from 'lodash/debounce'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  data() {
    return {
      spinning:false,
      dialog:true,
      videoVisible:false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4", // 类型
          src: '' // url地址
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    }
  },
  components: {
    videoPlayer
  },
  created(){
     this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    playVideo(record,deviceNo,begintime){
      this.videoVisible = true;
      this.getVideo(record,deviceNo,begintime);
    },
    getVideo(record,deviceNo,begintime){
      let params = {
        deviceNo:deviceNo,
        begintime:begintime,
        armType:record.alarmType,
        toMap:2,
        guid:record.guid
      };
      this.spinning = true;
      GetAlarmFile(params).then(res=>{
         this.spinning = false;
        if(res.data.code==0){
          this.playerOptions.sources[0].src = res.data.data
        }else{
          this.$message.warning('无法获取视屏')
        }
      }).catch(error=>{
         this.$message.warning('无法获取视屏')
      });
    },
    save(){
      window.open(this.playerOptions.sources[0].src)
      
    },
  }
}
</script>