<template>

   <div>
     
      <template v-for="(item,index) in progressList" >
        <div :key="'a'+index">
           <a-row type="flex" justify="center"  v-if="item.progressType==1">
              <a-col flex="200px">
                    <div class="process_single" @click="configurePermissions(item,1)">
                      <img src="@/assets/images/fqr.svg">
                      <div class="sel_val" v-if="item.progressDetailList[0].limitDepts">{{item.progressDetailList[0].limitDeptName}}<a-icon type="right" /></div>
                      <div class="sel_val" v-else>选择发起人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <div class="add-node-btn-box-b">
                      <i class="iconfont icontianjia1" @click.stop="addProess(item)" v-if="!item.show"></i>
                      <i class="iconfont iconjianqu" @click.stop="addProess(item)" v-else></i>
                      </div>
                      <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                        <!-- <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li> -->
                        <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                        <!-- <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li> -->
                      </ul>
                    </div>
              </a-col>
            </a-row>

            <a-row type="flex" justify="center"  v-if="item.progressType==2">
              <a-col flex="200px">
                    <div class="process_single process_arrow" @click.stop="configurePermissions(item,2)">
                      <span class="portrait">
                         <img src="@/assets/images/spr.svg">
                         <em @click.stop="removeNode(index)">-</em>
                      </span>
                     
                       <div class="sel_val" v-if="item.progressDetailList[0].limitDepts">{{item.progressDetailList[0].limitDeptName}}<a-icon type="right" /></div>
                      <div class="sel_val" v-else>选择审批人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <div class="add-node-btn-box-b">
                        <i class="iconfont icontianjia1" @click.stop="addProess(item)" v-if="!item.show"></i>
                        <i class="iconfont iconjianqu" @click.stop="addProess(item)" v-else></i>
                      </div>
                      <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                        <!-- <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li> -->
                        <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                        <!-- <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li> -->
                      </ul>
                    </div>
                    
              </a-col>
              
            </a-row>
           

              <div class="multiple_box" v-if="item.progressType==3">
                <a-row type="flex" justify="center" class="add_condition_box">
                    <a-button type="primary" shape="round" class="condition_btn" @click="addCondition(item)">添加条件</a-button>
                    <a-col >
                      <a-row type="flex" justify="center" class="add_condition">
                        

                          <a-col  :key="'b'+index1"  v-for="(list,index1) in item.progressDetailList" class="condition_content">
                      
                            <div class="left_top_line" v-if="index1==0"></div>
                            <div class="right_top_line" v-if="index1==item.progressDetailList.length-1"></div>
                            <div class="left_bottom_line" v-if="index1==0"></div>
                            <div class="right_bottom_line" v-if="index1==item.progressDetailList.length-1"></div>

                            <div class="process_multiple_b">
                              <div class="process_single process_multiple">
                                <div class="condition_tip sel_val"><i class="iconfont iconshaixuan-youtiaojian"></i>请设置条件<a-icon type="right" /></div>
                              </div>
                              <div class="add-node-btn-box">
                                <div class="add-node-btn-box-b">
                                <i class="iconfont icontianjia1" @click="addProess(list)"></i>
                                </div>
                                <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="list.show">
                                  <li @click="addProessType(index,2,list,'branch')">审批人<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,3,list,'branch')">会签人<i class="iconfont icontianjia1"></i></li>
                                  <!-- <li @click="addProessType(index,4,list,'branch')">条件分支<i class="iconfont icontianjia1"></i></li> -->
                                  <li @click="addProessType(index,5,list,'branch')">并行<i class="iconfont icontianjia1"></i></li>
                                  <!-- <li @click="addProessType(index,6,list,'branch')">第三方调用<i class="iconfont icontianjia1"></i></li> -->
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
                          <div class="add-node-btn-box-b">
                         <i class="iconfont icontianjia1" @click.stop="addProess(item)" v-if="!item.show"></i>
                        <i class="iconfont iconjianqu" @click.stop="addProess(item)" v-else></i>
                          </div>
                                                          <!-- 选择内容 -->
                        <ul class="design_sel_box" v-if="item.show">
                          <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                          <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                          <!-- <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li> -->
                          <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                          <!-- <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li> -->
                        </ul>
                        </div>
                  </a-col>
                </a-row>
            
              </div>
            

            <a-row type="flex" justify="center" v-if="item.progressType==4">
              <a-col flex="200px">
                    <div class="process_single process_arrow" @click.stop="configurePermissions(item,2)">
                      <span class="portrait">
                         <img src="@/assets/images/hqr.svg">
                         <em @click.stop="removeNode(index)">-</em>
                      </span>
                      <div class="sel_val" v-if="item.progressDetailList[0].limitDepts">{{item.progressDetailList[0].limitDeptName}}<a-icon type="right" /></div>
                      <div class="sel_val" v-else>选择会签人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <div class="add-node-btn-box-b">
                     <i class="iconfont icontianjia1" @click.stop="addProess(item)" v-if="!item.show"></i>
                        <i class="iconfont iconjianqu" @click.stop="addProess(item)" v-else></i>
                      </div>
                       <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                        <!-- <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li> -->
                        <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                        <!-- <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li> -->
                      </ul>
                    </div>
              </a-col>
            </a-row>

            <a-row type="flex" justify="center" v-if="item.progressType==5">
              <a-col flex="200px">
                    <div class="process_single process_arrow">
                      <img src="@/assets/images/dsf.svg">
                      <div class="sel_val">第三方调用<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <div class="add-node-btn-box-b">
                      <i class="iconfont icontianjia1" @click.stop="addProess(item)" v-if="!item.show"></i>
                        <i class="iconfont iconjianqu" @click.stop="addProess(item)" v-else></i>
                      </div>
                       <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                        <!-- <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li> -->
                        <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                        <!-- <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li> -->
                      </ul>
                    </div>
              </a-col>
            </a-row>

             <div class="multiple_box" v-if="item.progressType==6">
                
                <a-row type="flex" justify="center" class="add_condition_box">
                    <a-button type="primary" shape="round" class="condition_btn" @click.stop="parallel(item)">添加并行</a-button>
                    <i @click.stop="removeNode(index)" class="remove_node"><a-icon  type="delete" /></i>
                    <a-col>
                      <a-row type="flex" justify="center" class="add_condition">
                        

                          <a-col  :key="'b'+index1" class="condition_content" v-for="(list,index1) in item.progressDetailList">

                            <div class="left_top_line" v-if="index1==0"></div>
                            <div class="right_top_line" v-if="index1==item.progressDetailList.length-1"></div>
                            <div class="left_bottom_line" v-if="index1==0"></div>
                            <div class="right_bottom_line" v-if="index1==item.progressDetailList.length-1"></div>

                            <div class="process_multiple_b">
                              <div class="process_single process_multiple" @click="configurePermissions(list,2)">
                                <div class="condition_tip" v-if="list.limitDepts"><i class="iconfont iconshaixuan-youtiaojian"></i>{{list.limitDeptName}}<a-icon type="right" /></div>
                                <div class="condition_tip" v-else><i class="iconfont iconshaixuan-youtiaojian"></i>请选择审批人<a-icon type="right" /></div>
                              </div>
                              <div class="add-node-btn-box">
                                <div class="add-node-btn-box-b">
                                <!-- <i class="iconfont icontianjia1" @click="addProess(list)"></i> -->
                                <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="list.show">
                                  <li @click="addProessType(index,2,list,'branch')">审批人<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,3,list,'branch')">会签人<i class="iconfont icontianjia1"></i></li>
                                  <!-- <li @click="addProessType(index,4,list,'branch')">条件分支<i class="iconfont icontianjia1"></i></li> -->
                                  <li @click="addProessType(index,5,list,'branch')">并行<i class="iconfont icontianjia1"></i></li>
                                  <!-- <li @click="addProessType(index,6,list,'branch')">第三方调用<i class="iconfont icontianjia1"></i></li> -->
                                </ul>
                                </div>
                              </div>
                            </div>
                               <processTree ref="processTree" v-if="list.progressDetailList.length>0" :depth="depth+1" :progressList="list.progressDetailList"></processTree>
                        </a-col>
      

                        
                        
                      </a-row>

                     
                     
                    </a-col>
                </a-row>

                <a-row type="flex" justify="center">
                  <a-col flex="200px">
                        <div class="add-node-btn-box">
                          <div class="add-node-btn-box-b">
                          <i class="iconfont icontianjia1" @click.stop="addProess(item)" v-if="!item.show"></i>
                          <i class="iconfont iconjianqu" @click.stop="addProess(item)" v-else></i>
                          </div>
                                <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="item.show">
                                  <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                                  <!-- <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li> -->
                                  <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                                  <!-- <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li> -->
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
import {GetId} from '@/network/api'
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
    getId(item,index,obj,branch,num){
        let params = {
          number:num
        }
        GetId(params).then(res=>{
            if(res.data.code == 0){
              obj.progressDetailList.forEach((cur,index)=>{
                 obj.progressDetailList[index].id =  res.data.data[index]
                 console.log(obj.progressDetailList[index].id)
              });

              if(branch == 'branch'){
                  item.progressDetailList.push(obj)
                }else{
                    this.progressList.splice(index+1,0,obj);
                };

                this.$emit('changeProcessDesign',this.progressList)
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    addProess(item){
      console.log(item.show)
      item.show = !item.show;
    },
    addProessType(index,type,item,branch){
      // console.log(branch)
      let obj = {};
      if(type==2){
        obj = {id:'',workflowId:'',progressType:2,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:2,preNode:'',nextNode:'',limitDepts:'',limitDeptName:'',show:false,progressDetailList:[],sort:''}
            ]}
          }else if(type==3){
            obj = {id:'',workflowId:'',progressType:4,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:4,preNode:'',nextNode:'',limitDepts:'',limitDeptName:'',show:false,progressDetailList:[],sort:''}
            ]}//会签人
          }else if(type==4){
            obj = {id:'',workflowId:'',progressType:3,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
               {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:3,preNode:'',nextNode:'',limitDepts:'',limitDeptName:'',show:false,progressDetailList:[],sort:''},
               {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:3,preNode:'',nextNode:'',limitDepts:'',limitDeptName:'',show:false,progressDetailList:[],sort:''}
            ]}//条件
          }else if(type==5){
            obj = {id:'',workflowId:'',progressType:6,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:6,preNode:'',nextNode:'',limitDepts:'',show:false,limitDeptName:'',progressDetailList:[],sort:''},
              {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:6,preNode:'',nextNode:'',limitDepts:'',show:false,limitDeptName:'',progressDetailList:[],sort:''}
            ]}//并行
          }else if(type==6){
            obj = {id:'',workflowId:'',progressType:5,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
             {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:5,preNode:'',nextNode:'',limitDepts:'',limitDeptName:'',show:false,progressDetailList:[],sort:''}
            ]}///第三方调用
          };
          let num = 1
          if(type==5){
            num = 2
          };

      this.getId(item,index,obj,branch,num)
      

      


     
      item.show = false;
      
    },
    addCondition(item){
      let  obj = {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:3,preNode:'',nextNode:'',limitDepts:'',limitDeptName:'',show:false,progressDetailList:[],sort:''}

      item.progressDetailList.push(obj)
      this.$emit('changeProcessDesign',this.progressList)
    },
    parallel(item){
      console.log(item)
      this.getOneId(item)
      
    },
    getOneId(item){
        GetId().then(res=>{
            if(res.data.code == 0){
               let  obj = {id:res.data.data[0],workflowId:'',progressId:'',nodeType:1,nodeProgressType:6,preNode:'',nextNode:'',limitDepts:'',limitDeptName:'',show:false,progressDetailList:[],sort:''}
              item.progressDetailList.push(obj)
              this.$emit('changeProcessDesign',this.progressList) 
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    configurePermissions(item,val){
      this.$emit('configurePermissions',item,val)
    },
    removeNode(index){
      this.progressList.splice(index,1);
      this.$emit('changeProcessDesign',this.progressList)
    }
  },
}
</script>