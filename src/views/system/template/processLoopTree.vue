<template>

   <div>
      <template v-for="(item,index) in progressList" >
        <div :key="'a'+index">
           <a-row type="flex" justify="center"  v-if="item.progressType==1">
              <a-col flex="200px">
                    <div class="process_single" @click="configurePermissions">
                      <img src="@/assets/images/fqr.svg">
                      <div class="sel_val">选择发起人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <div class="add-node-btn-box-b">
                      <i class="iconfont icontianjia1" @click="addProess(item)"></i>
                      </div>
                      <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li>
                      </ul>
                    </div>
              </a-col>
            </a-row>

            <a-row type="flex" justify="center"  v-if="item.progressType==2">
              <a-col flex="200px">
                    <div class="process_single process_arrow">
                      <img src="@/assets/images/spr.svg">
                      <div class="sel_val">选择审批人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <div class="add-node-btn-box-b">
                      <i class="iconfont icontianjia1" @click="addProess(item)"></i>
                      </div>
                      <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li>
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
                                  <li @click="addProessType(index,4,list,'branch')">条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,5,list,'branch')">并行<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,6,list,'branch')">第三方调用<i class="iconfont icontianjia1"></i></li>
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
                          <i class="iconfont icontianjia1" @click="addProess(item)"></i>
                          </div>
                                                          <!-- 选择内容 -->
                        <ul class="design_sel_box" v-if="item.show">
                          <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                          <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                          <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li>
                          <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                          <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li>
                        </ul>
                        </div>
                  </a-col>
                </a-row>
            
              </div>
            

            <a-row type="flex" justify="center" v-if="item.progressType==4">
              <a-col flex="200px">
                    <div class="process_single process_arrow">
                      <img src="@/assets/images/hqr.svg">
                      <div class="sel_val">选择会签人<a-icon type="right" /></div>
                    </div>
                    <div class="add-node-btn-box">
                      <div class="add-node-btn-box-b">
                      <i class="iconfont icontianjia1" @click="addProess(item)"></i>
                      </div>
                       <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li>
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
                      <i class="iconfont icontianjia1" @click="addProess(item)"></i>
                      </div>
                       <!-- 选择内容 -->
                      <ul class="design_sel_box" v-if="item.show">
                        <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                        <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li>
                      </ul>
                    </div>
              </a-col>
            </a-row>

             <div class="multiple_box" v-if="item.progressType==6">
                
                <a-row type="flex" justify="center" class="add_condition_box">
                    <a-button type="primary" shape="round" class="condition_btn" @click="parallel(item)">添加并行</a-button>
                    <a-col>
                      <a-row type="flex" justify="center" class="add_condition">
                        

                          <a-col  :key="'b'+index1" class="condition_content" v-for="(list,index1) in item.progressDetailList">

                            <div class="left_top_line" v-if="index1==0"></div>
                            <div class="right_top_line" v-if="index1==item.progressDetailList.length-1"></div>
                            <div class="left_bottom_line" v-if="index1==0"></div>
                            <div class="right_bottom_line" v-if="index1==item.progressDetailList.length-1"></div>

                            <div class="process_multiple_b">
                              <div class="process_single process_multiple">
                                <div class="condition_tip"><i class="iconfont iconshaixuan-youtiaojian"></i>请选择审批人<a-icon type="right" /></div>
                              </div>
                              <div class="add-node-btn-box">
                                <div class="add-node-btn-box-b">
                                <i class="iconfont icontianjia1" @click="addProess(list)"></i>
                                <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="list.show">
                                  <li @click="addProessType(index,2,list,'branch')">审批人<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,3,list,'branch')">会签人<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,4,list,'branch')">条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,5,list,'branch')">并行<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,6,list,'branch')">第三方调用<i class="iconfont icontianjia1"></i></li>
                                </ul>
                                </div>
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
                          <i class="iconfont icontianjia1"  @click="addProess(item)"></i>
                          </div>
                                <!-- 选择内容 -->
                                <ul class="design_sel_box" v-if="item.show">
                                  <li @click="addProessType(index,2,item)">审批人<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,3,item)">会签人<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,4,item)">条件分支<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,5,item)">并行<i class="iconfont icontianjia1"></i></li>
                                  <li @click="addProessType(index,6,item)">第三方调用<i class="iconfont icontianjia1"></i></li>
                                </ul>
                        </div>
                  </a-col>
                </a-row>
            
              </div>

           
        </div>
        
    
      </template>

       
          
   <a-drawer
      title="Multi-level drawer"
      width="520"
      :visible="permissionsVisible"
      :closable="false"
      :zIndex='zindex'
    >
      <a-button type="primary" @click="showChildrenDrawer">
        Two-level drawer
      </a-button>
      <a-drawer
        title="Two-level Drawer"
        width="320"
        :zIndex='zindex'
        :visible="childrenDrawer"
        
      >
        <a-button type="primary" @click="showChildrenDrawer">
          This is two-level drawer
        </a-button>
      </a-drawer>
      <div class="drawer_btn">
        <a-button style="marginRight: 8px" @click="permissionsVisible=false">
          取消
        </a-button>
        <a-button type="primary">
          确定
        </a-button>
      </div>
    </a-drawer>
 
   
</div>
    
</template>

<script>
export default {
  name:'processTree',
  data () {
    return {
      permissionsVisible:false,
      childrenDrawer:false,
      zindex:1200
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
      console.log(item.show)
      item.show = !item.show;
    },
    addProessType(index,type,item,branch){
      console.log(branch)
      let obj = {};
      if(type==2){
        obj = {id:'',workflowId:'',progressType:2,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
            ]}
          }else if(type==3){
            obj = {id:'',workflowId:'',progressType:4,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
            ]}//会签人
          }else if(type==4){
            obj = {id:'',workflowId:'',progressType:3,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]},
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
            ]}//条件
          }else if(type==5){
            obj = {id:'',workflowId:'',progressType:6,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]},
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
            ]}//并行
          }else if(type==6){
            obj = {id:'',workflowId:'',progressType:5,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
            ]}///第三方调用
          };
      if(branch == 'branch'){
        item.progressDetailList.push(obj)
      }else{
          this.progressList.splice(index+1,0,obj);
      };
     
      // if(type==4){
      //   item.progressDetailList.push(obj)
      // }else{
      //    this.progressList.splice(index+1,0,obj);
      // }
     
      item.show = false;
      
    },
    addCondition(item){
      let obj = {id:'',workflowId:'',progressType:3,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]},
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
            ]};
      item.progressDetailList.push(obj)  
    },
    parallel(item){
       let  obj = {id:'',workflowId:'',progressType:6,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]},
              {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
            ]}
      item.progressDetailList.push(obj)  
    },
    configurePermissions(){
      this.permissionsVisible = true
    },
    showChildrenDrawer(){
      this.childrenDrawer = true
    }
  },
}
</script>