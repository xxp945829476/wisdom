<template>
   <div class="layout_card_content">

       <div class="table-operator">
           <div class="left_button">
               <a-button type="primary" icon="reload">
                  刷新
                </a-button>
           </div>

            <div class="right_btn">
                 <a-button type="primary" class="search_btn" @click="searchData">查询</a-button>
                  <a-button class="reload_btn" @click="resetData">重置</a-button>
            </div>

           <div class="layout_card_search">
                <a-form-model layout="inline" :model="formParmas" @submit="searchData" @submit.native.prevent>
                    <a-row :gutter="24">
                        <a-col :md="12">
                            <a-form-model-item label="所属企业">
                                 <a-select v-model="formParmas.deptBusinessType" allowClear @change="changeCompany">
                                    <a-select-option v-for="item in depList" :key="item.id">
                                        {{item.deptName}}
                                    </a-select-option>
                                  </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="12">
                            <a-form-model-item label="车牌号">
                                  <a-select
                                    show-search option-filter-prop="children"
                                    :value="formParmas.vehicleNo"
                                    @change="changeVehicle"
                                    :filter-option="false" @search="filterOption" allowClear>
                                    
                                    <div slot="dropdownRender" slot-scope="menu">
                                        <v-nodes :vnodes="menu" />
                                        <a-divider style="margin: 4px 0;" />
                                        <div
                                            style="padding: 4px 8px; cursor: pointer;"
                                            @mousedown="e => e.preventDefault()"
                                        >
                                        <a-pagination size="small" :total="total"  @change="changeVehiclePage" :pageSize='vehicleParmas.pageSize' :show-total="total => `共 ${total} 条`"/>
                                        </div>
                                        </div>
                                        <a-spin :spinning="fetching" slot="notFoundContent" size="small" />
                                        <template v-for="item in vehicleList">
                                            <a-select-option  :key="item.id">
                                                {{item.vehicleNo}}
                                            </a-select-option>
                                        </template>
                                    </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
           </div>
       </div>

       <div class="real_box">
            <a-row class="real_content">
                <a-col :md="4" >
                    <div class="real_list">
                        <i class="iconfont iconhuoche"></i>
                        <div>
                            <h3>1</h3>
                            <p>车载设备总数</p>
                        </div>
                    </div>
                </a-col>

                <a-col :md="4" >
                    <div class="real_list">
                        <i class="iconfont iconshebei1"></i>
                        <div>
                            <h3>1</h3>
                            <p>车载设备异常</p>
                        </div>
                    </div>
                </a-col>

                <a-col :md="4" >
                    <div class="real_list">
                        <i class="iconfont iconzaixianshuai"></i>
                        <div>
                            <h3>0%</h3>
                            <p>在线率</p>
                        </div>
                    </div>
                </a-col>

                <a-col :md="4" >
                    <div class="real_list">
                        <i class="iconfont icontongxunyichang"></i>
                        <div>
                            <h3>1</h3>
                            <p>通讯异常</p>
                        </div>
                    </div>
                </a-col>

                <a-col :md="4" >
                    <div class="real_list">
                        <i class="iconfont icondingweiweizhi1"></i>
                        <div>
                            <h3>0</h3>
                            <p>定位异常</p>
                        </div>
                    </div>
                </a-col>

                <a-col :md="4" >
                    <div class="real_list" style="border-right:none">
                        <i class="iconfont icontms-cheliangzaizhong"></i>
                        <div>
                            <h3>0</h3>
                            <p>载重数据异常</p>
                        </div>
                    </div>
                </a-col>

                <a-col :md="4" >
                    <div class="real_list" style="border-bottom:none">
                        <i class="iconfont iconchexiang"></i>
                        <div>
                            <h3>0</h3>
                            <p>货箱检测异常</p>
                        </div>
                    </div>
                </a-col>

                <a-col :md="4" >
                    <div class="real_list" style="border-bottom:none">
                        <i class="iconfont iconmibiyunshu"></i>
                        <div>
                            <h3>1</h3>
                            <p>翻盖检测正常</p>
                        </div>
                    </div>
                </a-col>

                <a-col :md="4" >
                    <div class="real_list" style="border-bottom:none">
                        <i class="iconfont icondianyuan1"></i>
                        <div>
                            <h3>1</h3>
                            <p>电源异常</p>
                        </div>
                    </div>
                </a-col>
            </a-row>


            <a-row type="flex" justify="space-between">
                <a-col :span="14" class="real_legend_box">
                    <div class="real_legend">
                        <label>设备<em>正常</em>图例：</label>
                        <span><i class="iconfont icontongxunyichang"></i>通讯</span>
                        <span><i class="iconfont icondingweiweizhi1"></i>定位</span>
                        <span><i class="iconfont icontms-cheliangzaizhong"></i>载重</span>
                        <span><i class="iconfont iconchexiang"></i>货箱</span>
                        <span><i class="iconfont iconmibiyunshu"></i>翻盖</span>
                        <span><i class="iconfont icondianyuan1"></i>电源</span>
                    </div>

                    <div class="real_legend real_legend_red">
                        <label>设备<em>异常</em>图例：</label>
                        <span><i class="iconfont icontongxunyichang"></i>通讯</span>
                        <span><i class="iconfont icondingweiweizhi1"></i>定位</span>
                        <span><i class="iconfont icontms-cheliangzaizhong"></i>载重</span>
                        <span><i class="iconfont iconchexiang"></i>货箱</span>
                        <span><i class="iconfont iconmibiyunshu"></i>翻盖</span>
                        <span><i class="iconfont icondianyuan1"></i>电源</span>
                    </div>
                </a-col>
                <a-col :span="10">
                    <ul class="real_plate">
                        <li><i>正常</i>车辆：<span>车牌号码</span></li>
                        <li><i>异常</i>车辆：<span>车牌号码</span></li>
                        <li><i>停运</i>车辆：<span>车牌号码</span></li>
                    </ul>
                </a-col>
            </a-row>

            <div class="real_legend_show">
                <a-row type="flex" justify="space-between" >
                    <a-col :span="8">
                    <i class="iconfont icontongxunyichang"></i>
                    </a-col>
                    <a-col :span="8">
                    <i class="iconfont icondingweiweizhi1 real_show_red"></i>
                    </a-col>
                    <a-col :span="8">
                        <i class="iconfont icontms-cheliangzaizhong"></i>
                    </a-col>
                    <a-col :span="8">
                        <i class="iconfont iconchexiang"></i>
                    </a-col>
                    <a-col :span="8">
                        <i class="iconfont iconmibiyunshu"></i>
                    </a-col>
                    <a-col :span="8">
                        <i class="iconfont icondianyuan1"></i>
                    </a-col>
                </a-row>

                <div class="real_plate_show" v-if="formParmas.vehicleNo">{{formParmas.vehicleNo}}</div>

            </div>
            



       </div>
        

        

       
   </div>
</template>

<script>


import {DepartmentList,Vehiclelist} from '@/network/api'



export default {
  data() {
     
      
    return {
     loading:false,
     fetching:false,
     depList:[],
     vehicleList:[],
     total:0,
    formParmas: {
       vehicleNo:'',
       deptBusinessType:''
    },
    vehicleParmas: {
        simNo :'',
        vehicleNo:'',
        pageNum:1,
        pageSize:20,
        distributor:'',
        permitStatus:'',
        deptId:'',
        realAreaId:'',
        devIdNo:'',
    },
    vehicleNo:'车牌号'
     
      
    
      
    
    }
  },
  components:{
       VNodes: {
        functional: true,
        render: (h, ctx) => ctx.props.vnodes,
        },
  },
  created(){
    this.init();
  },
  mounted(){
  
  },
  methods:{
   
    init(){
        this.getDepart()
        this.getVehicleData()
    },
    getDepart(){
         let params = {
            deptName: '',
            pageNum:1,
            pageSize:999,
            deptType:3
         };
         this.spinning = true;
         DepartmentList(params).then(res=>{
             this.spinning = false;
            if(res.data.code == 0){
                this.depList = res.data.data.records;
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
     getVehicleData(){
        this.fetching = true;
        Vehiclelist(this.vehicleParmas).then(res=>{
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
    filterOption(val) {
      this.vehicleParmas.pageNum = 1;
      this.vehicleParmas.vehicleNo = val;
      this.getVehicleData();
    },
    changeVehiclePage(page){
        this.vehicleParmas.pageNum = page;
        this.getVehicleData();
    },
    changeVehicle(val){
      console.log(val)
      this.vehicleList.forEach(cur=>{
        if(val==cur.id){
          this.formParmas.vehicleNo = cur.vehicleNo;
          // this.vehicleParmas.devIdNo = cur.simNo;
        };
      })
    },
    changeCompany(val){
        console.log(val)
        this.vehicleParmas.deptId = val;
        this.getVehicleData()
    },
    searchData(){
 
    },
    resetData(){
      
    },
    
  }
}
</script>