<template>
    <div class="process_box" v-if="current==2">
      
       
      <processTree ref="processTree" :progressList="progressList" :depth="0"  @configurePermissions="configurePermissions" @changeProcessDesign="changeProcessDesign"></processTree>
        
      <a-row type="flex" justify="center">
          <a-col flex="200px">
                <div class="process_single">
                  <div class="end-node-circle"></div>
                  <div>流程结束</div>
                </div>
          </a-col>
        </a-row>


         <a-drawer
            title="选择发起人"
            width="520"
            :visible="permissionsVisible"
            :closable="false"
            :zIndex='zindex'
          >
            <div>
                 <a-checkbox-group v-model="checkDepList" v-if="isApproved==1">
                      <div v-for="item in deptList" :key="item.id" class="base_dep">
                          <a-checkbox :value="item.id" >
                          {{item.name}}
                          </a-checkbox>
                      </div>
                  </a-checkbox-group>

                  <a-radio-group v-model="checkDepRadioList" v-if="isApproved==2">
                      <div v-for="item in deptList" :key="item.id" class="base_dep">
                          <a-radio :value="item.id">
                          {{item.name}}
                          </a-radio>
                      </div>
                  </a-radio-group> 
            </div>
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
              <a-button type="primary" @click="sureData">
                确定
              </a-button>
            </div>
          </a-drawer>
 
    </div>    
</template>

<script>
// progressList:[
//         {id:'',workflowId:'',progressType:1,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
//           {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
//         ]},//发起人
//         {id:'',workflowId:'',progressType:2,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
//           {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
//         ]},//审批人
//         {id:'',workflowId:'',progressType:3,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
//           {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[
//              {id:'',workflowId:'',progressType:3,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
//                 {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]},
//                 {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]},
//               ]}
//           ]},
//           {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
//         ]},//条件
//         {id:'',workflowId:'',progressType:4,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
//           {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
//         ]},//会签人
//         {id:'',workflowId:'',progressType:5,preProgressId:'',nextProgressId:'',progressDetailList:[
//           {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
//         ]},//第三方调用
//         {id:'',workflowId:'',progressType:6,preProgressId:'',nextProgressId:'',progressDetailList:[
//           {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
//         ]},//并行
//       ],

import processTree from './processLoopTree.vue'
import {GetId,GetDeptBaseInfo} from '@/network/api'
export default {
  data () {
    return {
      checkDepRadioList:'',
      zindex:1200,
      checkDepList:[],
      progressList:[
        {id:'',workflowId:'',progressType:1,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
          {id:'',workflowId:'',progressId:'',nodeType:1,nodeProgressType:1,preNode:'',nextNode:'',limitDepts:'',limitDeptName:'',show:false,progressDetailList:[],sort:''}
        ]},//发起人
      ],
      permissionsVisible:false,
      childrenDrawer:false,
      deptList:[],
      nodeSelect:[],
      checkUseList:[],
      isApproved:1,
    }
  },
  props:{
    workflowId:String,
    current:Number
  },
  created(){

  },
  components:{
    processTree
  },
  methods:{
    init(deptId,name,isEdit,id,progressContent){

      if(isEdit==1){
         this.progressList[0].progressDetailList[0].id = this.workflowId;
         this.progressList[0].progressDetailList[0].limitDepts = deptId;
         this.progressList[0].progressDetailList[0].limitDeptName = name;
         this.getId(1);
      }
    },
    initProcess(progressContent){
      this.progressList = JSON.parse(progressContent);
      this.progressList.forEach(cur=>{
          this.getNumId(cur.progressDetailList.length,cur)
      })
    },
    getDeptBaseInfo(){
            GetDeptBaseInfo().then(res=>{
                if(res.data.code == 0){
                    this.deptList = res.data.data;
                }else{
                    this.$message.warning('加载失败')
                };
                
            });
    },
    getNumId(num,cur){
      let params = {
          number:num
        }
        GetId(params).then(res=>{
            if(res.data.code == 0){
              res.data.data.forEach((ele,index)=>{
                cur.progressDetailList[index].id = res.data.data[index]
              })
              
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getId(num){
      let params = {
          number:num
        }
        GetId(params).then(res=>{
            if(res.data.code == 0){
              this.progressList[0].progressDetailList[0].id = res.data.data[0]
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    configurePermissions(item,val){
      console.log(item)
      this.isApproved = val
      this.nodeSelect = item;
      this.getDeptBaseInfo();
      this.permissionsVisible = true;
      this.checkDepList = [];
      this.checkUseList = [];
      this.checkDepRadioList = '';
    },
    sureData(){
      console.log(this.checkDepList);
      this.permissionsVisible = false;
      if(this.isApproved == 1){
        let name = [];
        if(this.checkDepList.length>0){
                  this.checkDepList.forEach(cur=>{
                      this.deptList.forEach(ele=>{
                          if(cur == ele.id){
                              name.push(ele.name)
                          }
                      })
                  })
              };
        this.nodeSelect.progressDetailList[0].limitDepts = this.checkDepList.length>0 ? this.checkDepList.join(',') :'';
        this.nodeSelect.progressDetailList[0].limitDeptName = name.length>0 ? name.join(',') :'';
        console.log(this.progressList)
        this.$emit('getValue',this.checkDepList,this.checkUseList,name)
      }else{
        let radioName = ''
        this.deptList.forEach(ele=>{
                          if(this.checkDepRadioList == ele.id){
                              radioName = ele.name
                          }
                      })
        if( this.nodeSelect.nodeProgressType==6){
          this.nodeSelect.limitDepts = this.checkDepRadioList
          this.nodeSelect.limitDeptName = radioName
        }else{
          this.nodeSelect.progressDetailList[0].limitDepts = this.checkDepRadioList
          this.nodeSelect.progressDetailList[0].limitDeptName = radioName
        }
        
      }
      
    },
    showChildrenDrawer(){
      this.childrenDrawer = true
    },
    changeProcessDesign(arr){
     this.progressList = arr;
    },
    getProcessDesign(){
      this.$emit('getProcessDesign',this.progressList)
    }
  }
}
</script>