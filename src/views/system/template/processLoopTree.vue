<template>

   <div>
      <template v-for="(item,index) in progressList" >
        <div :key="'a'+index">
           <a-row type="flex" justify="center"  v-if="item.progressType==1">
              <a-col flex="200px">
                    <div class="process_single">
                      <img src="@/assets/images/fqr.svg">
                      <div>选择发起人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <i class="iconfont icontianjia1" @click="addProess(item)"></i>
                      <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li>会签人<i class="iconfont icontianjia1"></i></li>
                        <li>条件分支<i class="iconfont icontianjia1"></i></li>
                        <li>并行<i class="iconfont icontianjia1"></i></li>
                        <li>第三方调用<i class="iconfont icontianjia1"></i></li>
                      </ul>
                    </div>
              </a-col>
            </a-row>

            <a-row type="flex" justify="center"  v-if="item.progressType==2">
              <a-col flex="200px">
                    <div class="process_single process_arrow">
                      <img src="@/assets/images/spr.svg">
                      <div>选择审批人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <i class="iconfont icontianjia1"></i>
                      <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li>审批人<i class="iconfont icontianjia1"></i></li>
                        <li>会签人<i class="iconfont icontianjia1"></i></li>
                        <li>条件分支<i class="iconfont icontianjia1"></i></li>
                        <li>并行<i class="iconfont icontianjia1"></i></li>
                        <li>第三方调用<i class="iconfont icontianjia1"></i></li>
                      </ul>
                    </div>
                    
              </a-col>
              
            </a-row>
           

              <div class="multiple_box" v-if="item.progressType==3">
                <a-row type="flex" justify="center" class="add_condition_box">
                    <a-button type="primary" shape="round" class="condition_btn">添加条件</a-button>
                    <a-col>
                      <a-row type="flex" justify="center" class="add_condition">
                        

                          <a-col  :key="'b'+index1" class="condition_content" v-for="(list,index1) in item.progressDetailList">

                            <div class="left_top_line" v-if="index1==0"></div>
                            <div class="right_top_line" v-if="index1==item.progressDetailList.length-1"></div>
                            <div class="left_bottom_line" v-if="index1==0"></div>
                            <div class="right_bottom_line" v-if="index1==item.progressDetailList.length-1"></div>

                            <div>
                              <div class="process_single process_multiple">
                                <div class="condition_tip"><i class="iconfont iconshaixuan-youtiaojian"></i>请设置条件<a-icon type="right" /></div>
                              </div>
                              <div class="add-node-btn-box">
                                <i class="iconfont icontianjia1"></i>
                                <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="item.show">
                                  <li>审批人<i class="iconfont icontianjia1"></i></li>
                                  <li>会签人<i class="iconfont icontianjia1"></i></li>
                                  <li>条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li>并行<i class="iconfont icontianjia1"></i></li>
                                  <li>第三方调用<i class="iconfont icontianjia1"></i></li>
                                </ul>
                              </div>
                            </div>
                               <processTree v-if="list.progressDetailList.length>0" :depth="depth+1" :progressList="list.progressDetailList"></processTree>
                        </a-col>
      

                        
                        
                      </a-row>

                     
                     
                    </a-col>
                </a-row>

                <a-row type="flex" justify="center">
                  <a-col flex="200px">
                        <div class="add-node-btn-box">
                          <i class="iconfont icontianjia1"></i>
                                                          <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="item.show">
                                  <li>审批人<i class="iconfont icontianjia1"></i></li>
                                  <li>会签人<i class="iconfont icontianjia1"></i></li>
                                  <li>条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li>并行<i class="iconfont icontianjia1"></i></li>
                                  <li>第三方调用<i class="iconfont icontianjia1"></i></li>
                                </ul>
                        </div>
                  </a-col>
                </a-row>
            
              </div>
            

            <a-row type="flex" justify="center" v-if="item.progressType==4">
              <a-col flex="200px">
                    <div class="process_single process_arrow">
                      <img src="@/assets/images/hqr.svg">
                      <div>选择会签人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <i class="iconfont icontianjia1"></i>
                       <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="item.show">
                                  <li>审批人<i class="iconfont icontianjia1"></i></li>
                                  <li>会签人<i class="iconfont icontianjia1"></i></li>
                                  <li>条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li>并行<i class="iconfont icontianjia1"></i></li>
                                  <li>第三方调用<i class="iconfont icontianjia1"></i></li>
                                </ul>
                    </div>
              </a-col>
            </a-row>

            <a-row type="flex" justify="center" v-if="item.progressType==5">
              <a-col flex="200px">
                    <div class="process_single process_arrow">
                      <img src="@/assets/images/dsf.svg">
                      <div>第三方调用<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <i class="iconfont icontianjia1"></i>
                       <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="item.show">
                                  <li>审批人<i class="iconfont icontianjia1"></i></li>
                                  <li>会签人<i class="iconfont icontianjia1"></i></li>
                                  <li>条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li>并行<i class="iconfont icontianjia1"></i></li>
                                  <li>第三方调用<i class="iconfont icontianjia1"></i></li>
                                </ul>
                    </div>
              </a-col>
            </a-row>

             <div class="multiple_box" v-if="item.progressType==6">
                
                <a-row type="flex" justify="center" class="add_condition_box">
                    <a-button type="primary" shape="round" class="condition_btn">添加并行</a-button>
                    <a-col>
                      <a-row type="flex" justify="center" class="add_condition">
                        

                          <a-col  :key="'b'+index1" class="condition_content" v-for="(list,index1) in item.progressDetailList">

                            <div class="left_top_line" v-if="index1==0"></div>
                            <div class="right_top_line" v-if="index1==item.progressDetailList.length-1"></div>
                            <div class="left_bottom_line" v-if="index1==0"></div>
                            <div class="right_bottom_line" v-if="index1==item.progressDetailList.length-1"></div>

                            <div>
                              <div class="process_single process_multiple">
                                <div class="condition_tip"><i class="iconfont iconshaixuan-youtiaojian"></i>请选择审批人<a-icon type="right" /></div>
                              </div>
                              <div class="add-node-btn-box">
                                <i class="iconfont icontianjia1"></i>
                                <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="item.show">
                                  <li>审批人<i class="iconfont icontianjia1"></i></li>
                                  <li>会签人<i class="iconfont icontianjia1"></i></li>
                                  <li>条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li>并行<i class="iconfont icontianjia1"></i></li>
                                  <li>第三方调用<i class="iconfont icontianjia1"></i></li>
                                </ul>
                              </div>
                            </div>
                               <processTree v-if="list.progressDetailList.length>0" :depth="depth+1" :progressList="list.progressDetailList"></processTree>
                        </a-col>
      

                        
                        
                      </a-row>

                     
                     
                    </a-col>
                </a-row>

                <a-row type="flex" justify="center">
                  <a-col flex="200px">
                        <div class="add-node-btn-box">
                          <i class="iconfont icontianjia1"></i>
                                                          <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="item.show">
                                  <li>审批人<i class="iconfont icontianjia1"></i></li>
                                  <li>会签人<i class="iconfont icontianjia1"></i></li>
                                  <li>条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li>并行<i class="iconfont icontianjia1"></i></li>
                                  <li>第三方调用<i class="iconfont icontianjia1"></i></li>
                                </ul>
                        </div>
                  </a-col>
                </a-row>
            
              </div>

           
        </div>
        
    
      </template>

       
       

        
 
   
</div>
    
</template>

<script>
export default {
  name:'processTree',
  data () {
    return {
    }
  },
  created(){

  },
  props:{
    progressList:Array,
    depth: {
      type: Number,
      default: () => 0
    },
  },
  methods: {
    addProess(item){
      item.show = true;
    },
    addProessType(index,type,item){
      let obj = {};
      if(type==2){
        obj = {id:'',workflowId:'',progressType:2,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
          {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
        ]}
      }
      this.progressList.splice(index+1,0,obj);
      item.show = false;
      
    }
  },
}
</script>