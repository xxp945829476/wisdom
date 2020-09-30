<template>
    <div class="process_box">
      
       
      <processTree :progressList="progressList" :depth="0"></processTree>
        
      <a-row type="flex" justify="center">
          <a-col flex="200px">
                <div class="process_single">
                  <div class="end-node-circle"></div>
                  <div>流程结束</div>
                </div>
          </a-col>
        </a-row>
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
export default {
  data () {
    return {
      progressList:[
        {id:'',workflowId:'',progressType:1,preProgressId:'',nextProgressId:'',show:false,progressDetailList:[
          {id:'',progressId:'',nodeType:'',operateUserIds:'',operateDeptIds:'',operateDeptTypes:'',detailValue:'',show:false,progressDetailList:[]}
        ]},//发起人
      ],
    }
  },
  components:{
    processTree
  }
}
</script>