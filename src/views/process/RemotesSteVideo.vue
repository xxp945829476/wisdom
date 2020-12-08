<template>
  <div>
      <a-row type="flex" >       
        <a-col :flex="leftWidth" class="left_content" ref="left_content">
          <a-spin :spinning="spinning">
     
         
          
          <a-form-model :model="formParmas" layout="inline" class="left_search" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item>
      
              <a-select placeholder="请选择工地设备" 
              show-search option-filter-prop="children"
              @change="changeVehicle"
              :filter-option="false" @search="filterOption" allowClear>
              
              <div slot="dropdownRender" slot-scope="menu">
                  <v-nodes :vnodes="menu" />
                  <a-divider style="margin: 4px 0;" />
                  <div
                      style="padding: 4px 8px; cursor: pointer;"
                      @mousedown="e => e.preventDefault()"
                  >
                  <a-pagination size="small" :total="total"  @change="changeVehiclePage" :pageSize='formParmas.pageSize' :show-total="total => `共 ${total} 条`"/>
                  </div>
                  </div>
                  <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                  <template v-for="item in vehicleList">
                      <a-select-option  :key="item.id">
                          {{item.deviceName}}
                      </a-select-option>
                  </template>
              </a-select>
            </a-form-model-item>

           
          </a-form-model>

         
          <div class="remote_calendar">
                <a-date-picker v-model="day" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" :allowClear="false"/>
          </div>
         <div class="selSecond">
           <a-row :gutter="16">
             <a-col :span="12">
               <a-time-picker :open="open" @openChange="handleOpenChange" v-model="startTime" format="HH:mm:ss"  valueFormat="HH:mm:ss" :allowClear="false">
                <a-button slot="addon" slot-scope="panel" size="small" type="primary" @click="handleClose">
                  Ok
                </a-button>
              </a-time-picker>
              </a-col>

              <a-col :span="12">
                <a-time-picker :open.sync="open2"  v-model="endTime" format="HH:mm:ss"  valueFormat="HH:mm:ss" :allowClear="false">
                  <a-button slot="addon" size="small" type="primary" @click="handleClose">
                    Ok
                  </a-button>
                </a-time-picker>
              </a-col>
           </a-row>
         </div>
          <h2 class="all_car">文件位置：</h2>
          <div class="loc_wenjian">
            <a-radio-group name="radioGroup" v-model="urlParmas.loc">
              <a-radio :value="1">
                终端设备
              </a-radio>
              <a-radio :value="2">
                存储服务器
              </a-radio>
            </a-radio-group>
          </div>
           
              

              
            
        

          <div class="remote_cx">
            <a-button type="primary" block @click="search">查询</a-button>
          </div>

          </a-spin>
         
        </a-col>


        <a-col flex="auto" ref="right_map" class="right_map">
          <div class="bm-view" ref="bm_view">
             <div id="cmsv6flash" class="ttx-video-h5">
              <div data-index="0" class="ttx-video-h5-item video-basis-2 ttx-video-h5-item-check" id="TtxH5Video-0">
                </div><div data-index="1" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-1"></div>
                <div data-index="2" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-2"></div>
              <div data-index="3" class="ttx-video-h5-item video-basis-2" id="TtxH5Video-3"></div>
              </div>
          </div>

          <div class="status_list" ref="status_list">
          <a-row type="flex" justify="start" class="status_list_nav" ref="status_list_nav">
              <a-col flex="100px" :class="{'cur_statue':curStatue==1}">文件</a-col>
              <a-col flex="auto" class="export_locust"><a @click="openTask">任务列表</a></a-col>
              
              <i class="iconzuidahua1 iconfont enlarge_icon" @click="enlarge" v-if="!isEnlarge"></i>
              <i class="iconzuixiaohua1 iconfont enlarge_icon" @click="enlarge" v-else></i>
          </a-row>
          <div class="status_list_content">
            <a-table :columns="columns" :rowKey='record' :data-source="tableData" :pagination="false" :scroll="{y:height}" size="small" :loading='loading' v-show="curStatue==1">
                <template slot="time" slot-scope="text,record">
                  <span :title="record.timeBeg+ '-' + record.timeEnd">{{day}} {{record.timeBeg}} - {{record.timeEnd}}</span>
              </template>
               <template slot="chn" slot-scope="text">
                  <span>CH{{text+1}}</span>
              </template>
               <template slot="loc" slot-scope="text">
                  <span v-if="text==1">设备</span>
                  <span v-else-if="text==2">存储服务器</span>
                  <span v-else>下载服务器</span>
              </template>
              <template slot="type" slot-scope="text">
                  <span v-if="text==0">常规</span>
                  <span v-else>报警</span>
              </template>
              <template slot="len" slot-scope="text">
                  <span>{{lenConvert(text)}}</span>
              </template>
              <span slot="action" slot-scope="text,record,index">
                
                      <a @click="startPlayback(record.PlaybackUrl,index)">
                        <a-icon type="play-circle" v-if="record.play"/>
                        <a-icon type="pause-circle" v-else/>
                      </a>
                       <a-divider type="vertical" />
                      <a @click="uploadVideo(record)" v-if="urlParmas.loc==1">
                        <a-icon type="upload" title="上传FTP"/>
                      </a>
                      <a @click="downLoad1(record)" v-else>
                        <a-icon type="vertical-align-bottom" title="下载"/>
                      </a>
                </span>
            </a-table>

            
          </div>
          
        </div>
        <div class="drag_status_list_nav" ref="drag"></div>
         
        </a-col>


      </a-row>


       <a-modal v-model="uploadVisible" title="上传服务器" :maskClosable="false" width="700px" v-dialogDrag="dialog" class="upload_visible">
       
          <a-form-model :model="uploadForm" ref="ruleForm" :label-col="labelCol3" :wrapper-col="wrapperCol3">
            <a-form-model-item label="设备名称">
                  <a-input :value="formParmas.vehicleNo" disabled/>
            </a-form-model-item>
            <a-form-model-item label="逻辑通道号" prop="chn">
                  <a-input :value="'CH' + uploadForm.chn" disabled/>
            </a-form-model-item>
            <a-form-model-item label="开始时间" prop="pid">
                  <a-date-picker show-time v-model="uploadForm.begintime" disabled format="YYYY-MM-DD HH:mm:ss" :allowClear="false"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
            </a-form-model-item>
            <a-form-model-item label="结束时间" prop="pid">
                  <a-date-picker show-time v-model="uploadForm.endtime" disabled format="YYYY-MM-DD HH:mm:ss" :allowClear="false"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
            </a-form-model-item>
            <a-form-model-item label="任务执行网络" prop="netmask">
 
                 <a-checkbox-group v-model="taskList">
                    <a-row>
                      <a-col :span="8">
                        <a-checkbox value="1">
                          无线网络(WIFI)
                        </a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="2">
                          有线网络(LAN)
                        </a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="4">
                          移动网络(3G/4G)
                        </a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

            </a-form-model-item>
          </a-form-model>

           <template slot="footer">
            <a-button key="back" @click="uploadVisible=false">
            取消
            </a-button>
            <a-button key="submit" type="primary" @click="uploadSave">
            上传
            </a-button>
        </template>
       </a-modal>

       <!-- 任务列表 -->
       <a-modal v-model="taskVisible" title="上传服务列表" :maskClosable="false" :footer="null" width="1100px" v-dialogDrag="dialog" class="upload_visible model_table">
         <div class="modal_search">
            <a-form-model layout="inline" :model="taskForm" @submit="modalSearch" @submit.native.prevent>
              <a-row :gutter="10">
                <a-col :md="8">
                  <a-form-model-item label="开始时间">
                     <a-date-picker show-time v-model="taskForm.begintime" format="YYYY-MM-DD HH:mm:ss" :allowClear="false" :disabled-date="disabledStartDate"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
                  </a-form-model-item>
                </a-col>

                <a-col :md="8">
                  <a-form-model-item label="结束时间">
                    <a-date-picker show-time v-model="taskForm.endtime" format="YYYY-MM-DD HH:mm:ss" :allowClear="false" :disabled-date="disabledEndDate"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
                  </a-form-model-item>
                </a-col>

                <a-col :md="8">
                  <a-form-model-item label="任务状态">
                   <a-select v-model="taskForm.status">
                      <!-- <a-select-option value="0">
                        暂停
                      </a-select-option> -->
                      <a-select-option value="1">
                        正在上传
                      </a-select-option>
                      <!-- <a-select-option value="2">
                        取消
                      </a-select-option> -->
                      <a-select-option value="3">
                        失败
                      </a-select-option>
                      <a-select-option value="4">
                        成功
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>

                <a-col :md="8">
                  <a-form-model-item label="工地设备">
                    <a-select placeholder="请选择工地设备" 
                      show-search option-filter-prop="children"
                      @change="changeVehicle1"
                      v-model="taskForm.deviceNo"
                      :filter-option="false" @search="filterOption">
                      
                      <div slot="dropdownRender" slot-scope="menu">
                          <v-nodes :vnodes="menu" />
                          <a-divider style="margin: 4px 0;" />
                          <div
                              style="padding: 4px 8px; cursor: pointer;"
                              @mousedown="e => e.preventDefault()"
                          >
                          <a-pagination size="small" :total="total"  @change="changeVehiclePage" :pageSize='formParmas.pageSize' :show-total="total => `共 ${total} 条`"/>
                          </div>
                          </div>
                          <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                          <template v-for="item in vehicleList">
                              <a-select-option  :key="item.simNo">
                                  {{item.deviceName}}
                              </a-select-option>
                          </template>
                      </a-select>
                  </a-form-model-item>
                </a-col>

                <a-col :md="8">
          
                     <a-button type="primary" class="search_btn" @click="modalSearch">查询</a-button>
                     
              
              </a-col>
              </a-row>
            </a-form-model>

              <a-table :columns="columns1" bordered :data-source="taskUploadList" @change="changeTable" :rowKey='record1' size="middle" :pagination="pagination1" :loading="loading1" :scroll="{y:height1}">
                 <template slot="chn" slot-scope="text">
                  <span>CH{{text+1}}</span>
                  </template>
                  <template slot="taskStatus" slot-scope="text">
                  <span v-if="text==1">正在上传</span>
                  <span v-else-if="text==4">成功</span>
                  <span v-else>失败</span>
                  <a-spin v-if="text==1" />
                  </template>
                 <template slot="fileSize" slot-scope="text">
                  <span>{{lenConvert(text)}}</span>
                  </template>
                  <span slot="action" slot-scope="text,record">
                
                    <a @click="downLoad(record)" v-if="record.taskStatus==4">
                      <a-icon type="vertical-align-bottom" title="下载"/>
                    </a>
                    <span v-else>
                      <a-icon type="vertical-align-bottom" title="下载"/>
                    </span>
                </span>
              </a-table>
          </div>
       </a-modal>

       
  </div>
</template>

<script>
import {GetJsession,GetVideoFileInfo,FacilityList,QueryDownloadReplay,QueryFtpStatus,FtpUpload,SubVideoDownload} from "@/network/api"
export default {
  data () {
    const columns = [
      { title: '序号', width: 80, fixed: 'left',customRender:(text, row, index)=>{
        return <a href="javascript:;">{index}</a>;
      },align:'center'},
      { title: '时间',width:320, dataIndex: 'time', key: 'time',ellipsis:true,align:'center',scopedSlots: { customRender: 'time' },},
      
      { title: '类型',dataIndex: 'type', key: 'type',ellipsis:true,align:'center',scopedSlots: { customRender: 'type' },},
      
      { title: '通道', dataIndex: 'chn', key: 'chn',ellipsis:true, align:'center',scopedSlots: { customRender: 'chn' },},
      { title: '文件位置',dataIndex: 'loc', key: 'loc',ellipsis:true, align:'center',scopedSlots: { customRender: 'loc' }},
      { title: '大小',    dataIndex: 'len', key: 'len',ellipsis:true,align:'center',scopedSlots: { customRender: 'len' },},
      {
            title: '操作',
            key: 'action',
            width:'100px',
            align:'center',
            scopedSlots: { customRender: 'action' },
      },
      
    ];

    const columns1 = [
        { title: '序号', width: 80, fixed: 'left',customRender:(text, row, index)=>{
          return <a href="javascript:;">{index}</a>;
        },align:'center'},
        { title: '设备号',width:'120px',dataIndex: 'devIDNO', key: 'devIDNO',ellipsis:true,align:'center'},
        
       
        
        { title: '逻辑通道号', dataIndex: 'chnMask', key: 'chnMask',ellipsis:true, align:'center',scopedSlots: { customRender: 'chn' },},
        { title: '开始日期',width:'180px',dataIndex: 'fileBegTime', key: 'fileBegTime',ellipsis:true, align:'center',},
        { title: '结束日期',dataIndex: 'fileEndTime',width:'180px', key: 'fileEndTime',ellipsis:true,align:'center',},
        { title: '上传状态',dataIndex: 'taskStatus', key: 'taskStatus',ellipsis:true,align:'center',scopedSlots: { customRender: 'taskStatus' },},
        { title: '文件大小',width:'180px',dataIndex: 'fileSize', key: 'fileSize',ellipsis:true,align:'center',scopedSlots: { customRender: 'fileSize' }},
        {
            title: '操作',
            key: 'action',
            width:'100px',
            align:'center',
            scopedSlots: { customRender: 'action' },
      },
        
      ];

    

    
    return {
      spinShow:true,
      curStatue:1,
      loading1:false,
      columns1,
      labelCol3: { span: 5 },
      wrapperCol3: { span: 16 },
      dialog:true,
      uploadVisible:false,
      spinning:false,
      loading:false,
      columns,
      isEnlarge:false,
      fetching:false,
      open: false,
      open2: false,
      queryValue:1,
      urlParmas:{
        arm1:0,
        arm2:0,
        beg:'',
        chn:-1,
        day:'',
        devIdNo:'',
        end:'',
        fileAttr:2,
        label:'',
        loc:1,
        mon:'',
        recType:-1,
        res:0,
        store:0,
        stream:0,
        year:'',
      },
      day:'',
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      leftWidth:'280px',
      labelCol_1: { span: 6 },
      wrapperCol_1: { span: 18 },
      isInitFinished:false,
      jsession:'',
      formParmas: {
        pageNum:1,
        pageSize:20,
        id:'',
        areaId:'',
        facilityName:'',
        deviceName:'',
        fieldId:'',
        vehicleNo:'',
        devIdNo:'',
        bindStatus:1
      },
      vehicleList:[],
      total:0,
      tableData:[],
      height:100,
      startTime:'00:00:00',
      endTime:'23:59:59',
      uploadForm:{
        arm1:0,
        arm2:0,
        begDay:'',
        begMon:'',
        begSec:'',
        begYear:'',
        chn:'',
        deviceNo:'',
        endDay:'',
        endMon:'',
        endSec:'',
        endYear:'',
        netmask:7,
        res:2,
        store:1,
        stream:0,
        begintime:'',
        endtime:''
      },
      taskList:['1','2','4'],
      taskVisible:false,
      taskForm:{
        begintime:'',
        currentPage:1,
        deviceNo:'',
        endtime:'',
        pageRecords:10,
        status:'',
      },
      taskUploadList:[],
      pagination1:{
        total:0,
        size:'middle',
        showLessItems:true,
        current:1,
        pageSize:10,
        showTotal:total => `共 ${total} 条`
      },
      setTtatusCur:'',
      height1:'',
      
    }
  },
  created(){
    
    this.init();
  },
  mounted(){
    this.$nextTick(()=>{
      let h1 = this.$refs.right_map.$el.offsetHeight;
      let h2 = this.$refs.bm_view.offsetHeight;
      this.height = h1 - h2 - 92;//计算列表最大高度
      this.h1 = h1;
      this.dragLine()//上下拖动列表
      setTimeout(()=>{
        this.initVideo(h1)
      },200)
    });
    this.$once('hook:beforeDestroy', () => {
      this.stopPlayback();
      clearInterval(this.setTtatusCur)
    })
  },
  components:{
      VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  methods:{
    init(){
      this.day = this.$moment().format("YYYY-MM-DD");
      this.getJsession();
      this.getData();
    },
    dragLine(){
      // 上下拖动列表
      let that = this;
      let oLine = this.$refs.drag;
        let oBox = this.$refs.right_map.$el;
        let oTop = this.$refs.bm_view;
        let oBottom = this.$refs.status_list;
        let maxHeight = oBox.clientHeight;
        oLine.onmousedown = function(e){
          let disY = (e || event).clientY;
          oLine.top = oLine.offsetTop;
          
          document.onmousemove = function(e){
            let iT = oLine.top + ((e || event).clientY - disY);
            var e=e||window.event,tarnameb=e.target||e.srcElement;
            let maxT = oBox.clientHeight - oLine.offsetHeight;
            oLine.style.margin = 0;
            iT < 0 && (iT = 0);
            iT > maxT && (iT = maxT);
            oLine.style.top = oTop.style.height = iT + "px";
            oBottom.style.height = maxHeight - iT + "px"
            that.height = oBox.offsetHeight - oTop.offsetHeight - 92;
          }

          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null; 
            oLine.releaseCapture && oLine.releaseCapture()
          };
          oLine.setCapture && oLine.setCapture();
          return false
        }

        
        // document.querySelector('.ant-table-body').addEventListener('scroll',this.scrollLoad);
    },
    getData(){
         this.fetching = true;
        FacilityList(this.formParmas).then(res=>{
             this.fetching = false;
            if(res.data.code == 0){
                let data = res.data.data.records;
                this.vehicleList = data;
                this.total = res.data.data.total;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    record(key){
          return key.file
    },
    lenConvert(val){
      let num =  val/(1024*1024)
      return num.toFixed(3) +'MB'
    },
    changeVehiclePage(page){
        this.formParmas.pageNum = page;
        this.getData();
    },
    filterOption(val) {
      this.formParmas.pageNum = 1;
      this.formParmas.deviceName = val;
      this.getData();
    },
    changeVehicle(val){
      console.log(val)
      this.vehicleList.forEach(cur=>{
        if(val==cur.id){
          this.formParmas.vehicleNo = cur.deviceName;
          this.formParmas.devIdNo = cur.simNo;
        };
      })
    },
    changeVehicle1(val){
      console.log(val)
      // this.vehicleList.forEach(cur=>{
      //   if(val==cur.id){
      //     this.taskForm.deviceNo = cur.simNo;
      //   };
      // })
    },
    handleOpenChange(open) {
      console.log('open', open);
      this.open = open;
    },
    handleClose() {
      this.open = false;
      this.open2 = false;
    },
    getJsession(){

      let params = {
            };
           GetJsession(params).then(res=>{
             if(res.data.code == 0){
                this.jsession = res.data.data;
             }else{

             };
           })
    },
    initVideo(h1){
      let params = {
          allowFullscreen: "true",
          allowScriptAccess: "always",
          bgcolor: "#FFFFFF"
        };
      ttxVideoAll.init("cmsv6flash",'50vw', '100%', params);
      setTimeout(this.initFlash, 200);
      
    },
    initFlash(){
        this.spinning = true
        if (typeof swfobject == "undefined" || typeof swfobject == undefined || swfobject.getObjectById("cmsv6flash") == null ||
              typeof swfobject.getObjectById("cmsv6flash").setWindowNum == "undefined" ) {
                this.isInitFinished = false;
              setTimeout(this.initVideo(), 50);
            
        } else {
              //设置视频插件的语言('playerType=flash'时生效)
              swfobject.getObjectById("cmsv6flash").setLanguage("cn.xml");
              //先将全部窗口创建好
              swfobject.getObjectById("cmsv6flash").setWindowNum(1);
              //再配置当前的窗口数目
              swfobject.getObjectById("cmsv6flash").setWindowNum(1);
              //设置视频插件的服务器
              swfobject.getObjectById("cmsv6flash").setServerInfo(playVideoUrl,6605);
              this.isInitFinished = true;
              this.spinning = false
      }
    },
    startPlayback(val,index) {
 console.log(index)
      		if (!this.isInitFinished){
	          	return;
	      	} else {

            this.tableData.forEach((cur,i)=>{
              if(index != i){
                 cur['play'] = true;
              }
            })
           this.tableData[index].play = !this.tableData[index].play

           
	      		//回放url
            var url =val;
              	//回放之前先停止
	      		swfobject.getObjectById('cmsv6flash').stopVideo(0);
            if(!this.tableData[index].play){
              //开始回放
              swfobject.getObjectById("cmsv6flash").startVod(0, url);
            }
	      	
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
    changeBeg(val){
      this.urlParmas.beg = this.$moment.duration(val)._milliseconds/1000
    },
    changeEnd(val){
       this.urlParmas.end = this.$moment.duration(val)._milliseconds/1000
    },

    search(){

      

      if(this.urlParmas.loc==1){
        this.urlParmas.devIdNo= this.formParmas.devIdNo;
      }else{
        this.urlParmas.devIdNo= this.formParmas.vehicleNo;
      };
      this.urlParmas.year = this.$moment(this.day).get('year');
      this.urlParmas.mon = this.$moment(this.day).get('month')+1;
      this.urlParmas.day = this.$moment(this.day).get('date');
      this.urlParmas.beg = this.$moment.duration(this.startTime)._milliseconds/1000;
      this.urlParmas.end = this.$moment.duration(this.endTime)._milliseconds/1000;
      if(this.urlParmas.devIdNo == ''){
        this.$message.warning('请选择工地设备')
        return false
      };
      this.loading = true;
      GetVideoFileInfo(this.urlParmas).then(res=>{
        this.loading = false;
             if(res.data.code == 0){
                this.tableData = res.data.data.files;
                this.tableData.forEach(cur=>{
                  this.$set(cur,'timeBeg',this.format(cur.beg));
                  this.$set(cur,'timeEnd',this.format(cur.end));
                  this.$set(cur,'play',true)

                })
                console.log(this.tableData)
             }else{
               this.tableData = []
               if(this.urlParmas.loc==1){
                 this.$message.warning('获取不到视屏文件信息')
               }else{
                 this.$message.warning('无文件信息')
               }
                
             };
      }).catch(error=>{
          this.tableData = []
          this.$message.warning('无文件信息')
        
         this.loading = false;
      })
    },
    format(s){
      console.log(s)
      let h = Math.floor(s/(60*60));
      let m = Math.floor((s - h*3600)/60)
      let sen = s - h*3600 - m*60
      
      if(parseInt(h)<10){
        h = '0' + h
      };
      if(parseInt(m)<10){
        m = '0' + m
      };
      if(parseInt(sen)<10){
        sen = '0' + sen
      };
      

      return h + ':' + m + ':' + sen
    },
    getRequest(url)
      {
        
          var theRequest = new Object();
          if (url.indexOf("?") != -1) 
          {
              var str = url.substr(1);
              var strs = str.split("&");
              for (var i = 0; i < strs.length; i++) 
              {
                  theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
              }
          }
          console.log(theRequest)
          return theRequest;
      },
    enlarge(){
      this.isEnlarge = !this.isEnlarge;

      if(this.isEnlarge){
        this.$refs.bm_view.style.height = 0;
        this.$refs.status_list.style.height = '100%'
        this.height = this.$refs.right_map.$el.offsetHeight - 92;
        this.$refs.drag.style.top = 0;

       

      }else{
        this.$refs.bm_view.style.height = 'calc(50vh + 40px)';
        this.$refs.status_list.style.height = 'auto';
        this.height = this.$refs.right_map.$el.offsetHeight - this.$refs.bm_view.offsetHeight - 92;
         this.$refs.drag.style.top = 'calc(50vh + 39px)';

      }
    },
    uploadVideo(record){
      this.uploadVisible = true;
      console.log(record)
      this.uploadForm.deviceNo =record.devIdno;
      this.uploadForm.chn = record.chn + 1;
      this.uploadForm.begintime = this.day + ' ' + record.timeBeg;
      this.uploadForm.endtime = this.day + ' ' +record.timeEnd;
    },
    uploadSave(){
     
      let num = 0;
      if(this.taskList.length>0){
         this.taskList.forEach(cur=>{
           num = num + parseInt(cur)
         })
      };
      this.uploadForm.netmask = num;
      let dateBeg = this.$moment(this.uploadForm.begintime).format("YYYY-MM-DD");
      let dateBegTime = this.$moment(this.uploadForm.begintime).format("hh:mm:ss");
      let dateEnd = this.$moment(this.uploadForm.endtime).format("YYYY-MM-DD");
      let dateEndTime = this.$moment(this.uploadForm.endtime).format("hh:mm:ss");

      console.log(this.$moment(this.uploadForm.begintime).format("YYYY-MM-DD"))
       console.log(this.$moment(this.uploadForm.begintime).format("hh:mm:ss"))
      this.uploadForm.begYear = this.$moment(dateBeg).get('year');
      this.uploadForm.begMon = this.$moment(dateBeg).get('month')+1;
      this.uploadForm.begDay = this.$moment(dateBeg).get('date');
      this.uploadForm.begSec = this.$moment.duration(dateBegTime)._milliseconds/1000;

      this.uploadForm.endYear = this.$moment(dateEnd).get('year');
      this.uploadForm.endMon = this.$moment(dateEnd).get('month')+1;
      this.uploadForm.endDay = this.$moment(dateEnd).get('date');
      this.uploadForm.endSec = this.$moment.duration(dateEndTime)._milliseconds/1000;
      this.uploadVisible = false;

      console.log(this.uploadForm)
      this.ftpUpload();
    },
    ftpUpload(){
       
        FtpUpload(this.uploadForm).then(res=>{
 
            if(res.data.code == 0){
                this.taskVisible = true;
                this.taskForm.deviceNo = this.uploadForm.deviceNo;
                this.taskForm.begintime = this.uploadForm.begintime;
                this.taskForm.endtime = this.uploadForm.endtime;
                this.pagination1.current = 1;
                this.taskForm.currentPage = 1;
                this.getUploadData();

                this.setTtatusCur = setInterval(()=>{
                  this.getUploadData(1)
                },20000);
            }else{
              
            };
            
        });
    },
    ftpStatus(sequence){
       let params = {
         deviceNo:this.uploadForm.deviceNo,
         seq:sequence,
       }
        QueryFtpStatus(params).then(res=>{
 
            if(res.data.code == 0){
                
            }else{
              
            };
            
        });
    },
    
    openTask(){
      this.taskVisible = true;
      let day = this.$moment().format("YYYY-MM-DD");
      this.taskForm.begintime = day + ' ' + '00:00:00';
      this.taskForm.endtime = day + ' ' + '23:59:59';
      this.formParmas.pageNum = 1;
      this.$nextTick(()=>{
        this.height1 = parseFloat($('.ant-modal-body').css('maxHeight'))-240
      })
    },
   
    getUploadData(val){
        if(!this.taskForm.deviceNo){
          this.$message.warning('请选择工地设备')
          return false
        };
        this.loading1 = true;
        QueryDownloadReplay(this.taskForm).then(res=>{
          this.loading1 = false;
            if(res.data.code == 0){
                this.taskUploadList = res.data.data.infos;
                
                if(res.data.data.infos){

                  this.taskUploadList.forEach(cur=>{
                    cur.fileBegTime = this.$moment.unix(cur.fileBegTime/1000).format('YYYY-MM-DD hh:mm:ss');
                    cur.fileEndTime = this.$moment.unix(cur.fileEndTime/1000).format('YYYY-MM-DD hh:mm:ss') 
                  });
                  this.pagination1.total =  res.data.data.pagination.totalRecords;
                  if(val==1){
                    this.spinShow = true;
                    if(res.data.data.infos[0].taskStatus != 1){
                      this.spinShow = false;
                      clearInterval(this.setTtatusCur)
                    } 
                  }
                };
                
            }else{
                this.taskUploadList = [];
                this.pagination1.total = 0;
                this.$message.warning('无上传记录')
            };
            
        });
    },
    modalSearch(){
      clearInterval(this.setTtatusCur);
      this.getUploadData();
    },
    record1(key){
      return key.id
    },
    changeTable(pagination){
      this.pagination1.current = pagination.current;
      this.taskForm.currentPage = pagination.current;
      this.taskForm.pageRecords = pagination.pageSize;
      this.pagination1.pageSize = pagination.pageSize;
      this.getUploadData()
    },
    downLoad(record){
      
      let url = this.changeUrlArg(record.downloadUrl,'SAVENAME',record.devIDNO+'.avi')
      window.open(url)
    },
    downLoad1(record){
      let url = this.changeUrlArg(record.DownUrl,'SAVENAME',record.devIdno+'.avi')
      window.open(url)
    },
    changeUrlArg(url, arg, val){
        var pattern = arg+'=([^&]*)';
        var replaceText = arg+'='+val;
        return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
    },
    filterData(val){
        this.curStatue = val
    },
    disabledStartDate(startValue) {
      
      const endValue = this.$moment(this.taskForm.endtime);
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.$moment(this.taskForm.begintime);
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },

  }
}
</script>