<template>
<div>
  <a-modal v-model="bmpVisible" :title="title" class="approval_modal" :maskClosable="false" :keyboard="false" width="1200px" v-dialogDrag="dialog">
     <a-spin :spinning="spinning">
      <div id="printTest">

          <a-descriptions bordered>
            <template v-for="(item,index) in fromList">
              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 1 || item.controlFormType == 3 || item.controlFormType == 5 || item.controlFormType == 13 || item.controlFormType == 22">
                {{item.content}}
              </a-descriptions-item>

              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 2">
                {{item.content[0]}} ~ {{item.content[1]}}
              </a-descriptions-item>

              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 4">
                {{item.content}}
              </a-descriptions-item>

              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 6">
                {{item.content}}
              </a-descriptions-item>

              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 7">
                {{item.content}}
              </a-descriptions-item>

              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.associateDept == 1&&item.controlFormType == 7">
                {{item.content}}
              </a-descriptions-item>

              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 8">
                {{item.content}}
              </a-descriptions-item>

              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 9">
                {{item.content}}
              </a-descriptions-item>

              <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 10">
                {{item.content}}
              </a-descriptions-item>

              <!-- <a-descriptions-item :label="item.controlName" :key="'a' + index" v-if="item.controlFormType == 11">
                {{item.content}}
              </a-descriptions-item> -->
            </template>
            
          </a-descriptions>


          
      </div>
     </a-spin>
      <template slot="footer">
          <a-button key="back" @click="bmpVisible=false">
          取消
          </a-button>
          <a-button key="submit" type="primary" v-print="'#printTest'">
          打印
          </a-button>
          
      </template>
  </a-modal>
  <drawFence ref="draw_fence" @getPosion="getPosion"></drawFence>
</div>
</template>

<script>
/*!
  @param {Boolean} dialog - 弹框是否拖动
  @param {Boolean} bmpVisible - 弹框显示隐藏
  @method addRole - 弹框显示方法
*/

import {GetFormInfo,AddInst,DepartmentList,EditRole,GetInstTmpl,WorkflowComment,ListByVehicleTypes,uploadOne,GetBaseInfoWorkflow} from '@/network/api'
import debounce from 'lodash/debounce'
import drawFence from './drawFence.vue'
import pathUrl from "@/network/requestUrl";

export default {
  data() {
    return {
      pathUrl,
      transportList:[],
      vehicleList1:[],
      visible:false,
      visible1:false,
      moment:this.$moment,
      spinning:false,
      loading:false,
      title:'新增审批',
      dialog:true,
      bmpVisible:false,
      addForm: {
        id:'',
        deptId: undefined,
        roleName: '',
        roleCode: '',
        roleDescribe: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      depData:[],
      isEdit:0,
      fromList:[],
      workflowId:'',
      flag:false,
      comments:'',
      tmplId:'',
      tmplStatus:'',
      nodeId:'',
      vehicleList:[],
      curIndex:-1,
      fileList1:[],
      contentImg1:[],
      fileList2:[],
      contentImg2:[],
      fileList3:[],
      contentImg3:[],
      fileList4:[],
      contentImg4:[],
      fileList5:[],
      contentImg5:[],
      fileList6:[],
      contentImg6:[],
      fileList7:[],
      contentImg7:[],
      fileList8:[],
      contentImg8:[],
      workflowOpinionRequire:'',
      workflowOpinion:''
    }
  },
  components:{
    drawFence
  },
  created(){
     this.save = debounce(this.save,500)//保存防止重复点击
  },
  methods:{
    addBpm(record){
      console.log(record)
      //val 0 新增 1 编辑
      this.bmpVisible = true;

      this.$nextTick(()=>{

        
          this.title = '查看审批';
          this.tmplId = record.tmplId;
          this.tmplStatus = record.tmplStatus;
          if(record.nodeId){
            this.nodeId = record.nodeId;
          };
          this.getInstTmpl(record.tmplId);
          this.getBaseInfoWorkflow(record.workflowId);
        
         document.querySelector('.ant-modal-body').scrollTop = 0;
      });
      
      this.getDepart(84);
     
    },
   getBaseInfoWorkflow(id){
            
            let params={
                workflowId:id
            }
            GetBaseInfoWorkflow(params).then(res=>{
                if(res.data.code==0){
                    let data = res.data.data;
          
                    this.workflowOpinionRequire=data.workflowOpinionRequire;
                    this.workflowOpinion=data.workflowOpinion;
                    
                }
            });
    },
    getDepart(type){
         let params = {
            deptName: '',
            pageNum:1,
            pageSize:999,
            deptType:3,
            deptBusinessType:type
         };
         this.spinning = true;
         DepartmentList(params).then(res=>{
             this.spinning = false;
            if(res.data.code == 0){
                if(type == 84){
                     this.transportList = res.data.data.records
                }
               
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getVehicle(type,val){
         let params = {
            typesStr: type,
         };
         ListByVehicleTypes(params).then(res=>{
            if(res.data.code == 0){
              if(val==9){
                this.vehicleList = res.data.data
              }else{
                this.vehicleList1 = res.data.data
              }
                  
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getInstTmpl(id){

            this.spinning = true;      
          GetInstTmpl(id).then(res=>{
            this.spinning = false;
            if(res.data.code == 0){
               this.fromList = res.data.data;
              //  this.fromListLength = Math.ceil(this.fromList.length/2)
               this.fromList.forEach(cur=>{
                  if(cur.controlFormType == 2){
                    
                    if(cur.content){
                      cur.content =  cur.content.split(',');
                    }else{
                       cur.content = [];
                    }
                    
                  };

                  if(cur.controlFormType == 7 && cur.associateDept == 1){
                    if(cur.ids){
                      cur.ids =  cur.ids.split(',');
                    }else{
                       cur.ids = [];
                    }
                  };

                  if(cur.controlFormType==14){
                    this.fileList1 = [];
                    this.contentImg1 = [];
                    if(cur.content){
                        cur.content =  cur.content.split(',');
                        cur.content.forEach((cur,index)=>{
                          this.fileList1.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: pathUrl.imgurl + cur
                          });
                          this.contentImg1.push(cur);
                        })
                    }
                  };

                  if(cur.controlFormType==15){
                    this.fileList2 = [];
                    this.contentImg2 = [];
                    if(cur.content){
                        cur.content =  cur.content.split(',');
                        cur.content.forEach((cur,index)=>{
                          this.fileList2.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: pathUrl.imgurl + cur
                          });
                          this.contentImg2.push(cur);
                        })
                    }
                  };

                  if(cur.controlFormType==16){
                    this.fileList3 = [];
                    this.contentImg3 = [];
                    if(cur.content){
                        cur.content =  cur.content.split(',');
                        cur.content.forEach((cur,index)=>{
                          this.fileList3.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: pathUrl.imgurl + cur
                          });
                          this.contentImg3.push(cur);
                        })
                    }
                  };

                  if(cur.controlFormType==17){
                    this.fileList4 = [];
                    this.contentImg4 = [];
                    if(cur.content){
                        cur.content =  cur.content.split(',');
                        cur.content.forEach((cur,index)=>{
                          this.fileList4.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: pathUrl.imgurl + cur
                          });
                          this.contentImg4.push(cur);
                        })
                    }
                  };
                  if(cur.controlFormType==18){
                    this.fileList5 = [];
                    this.contentImg5 = [];
                    if(cur.content){
                        cur.content =  cur.content.split(',');
                        cur.content.forEach((cur,index)=>{
                          this.fileList5.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: pathUrl.imgurl + cur
                          });
                          this.contentImg5.push(cur);
                        })
                    }
                  };

                  if(cur.controlFormType==19){
                    this.fileList6 = [];
                    this.contentImg6 = [];
                    if(cur.content){
                        cur.content =  cur.content.split(',');
                        cur.content.forEach((cur,index)=>{
                          this.fileList6.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: pathUrl.imgurl + cur
                          });
                          this.contentImg6.push(cur);
                        })
                    }
                  };

                  if(cur.controlFormType==20){
                    this.fileList7 = [];
                    this.contentImg7 = [];
                    if(cur.content){
                        cur.content =  cur.content.split(',');
                        cur.content.forEach((cur,index)=>{
                          this.fileList7.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: pathUrl.imgurl + cur
                          });
                          this.contentImg7.push(cur);
                        })
                    }
                  };

                  if(cur.controlFormType==21){
                    this.fileList8 = [];
                    this.contentImg8 = [];
                    if(cur.content){
                        cur.content =  cur.content.split(',');
                        cur.content.forEach((cur,index)=>{
                          this.fileList8.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: pathUrl.imgurl + cur
                          });
                          this.contentImg8.push(cur);
                        })
                    }
                  };

                  
               });

              this.flag = res.data.flag
              
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    getFormInfo(){
            let params = {
              workflowId:this.workflowId
            };
            this.spinning = true;      
          GetFormInfo(params).then(res=>{
            this.spinning = false;
            if(res.data.code == 0){
               this.fromList = res.data.data;
               this.fromList.forEach(cur=>{
                  if(cur.controlFormType == 2){
                    cur.controlCode = [];
                  };

                  

                  this.$set(cur,'formId', cur.id)
                  this.$set(cur,'content', cur.controlCode)

                  if(cur.controlFormType == 3){
                    cur.content = cur.permitTime
                  }; //准行时段

                  if(cur.controlFormType == 7 && cur.associateDept == 1){
                    cur.ids = []
                  }; //申报工地

                  if(cur.controlFormType == 9){
                     cur.content = undefined;
                    this.getVehicle(cur.vehicleTypeSelect,9)
                  };//申报车辆或戒掉车辆
                  if(cur.controlFormType == 10){
                     cur.content = undefined;
                    this.getVehicle(cur.vehicleTypeSelect,10)
                  };//申报车辆或戒掉车辆
               });

              
              
            }else{
                this.$message.warning('加载失败')
            };
            
        });
    },
    save(){
      
          this.onSubmit();
         
      
    },
    onSubmit(){
      

      let list = JSON.parse(JSON.stringify(this.fromList))
      console.log(list)

      list.forEach(cur=>{
        cur['vehicleCommit'] = 0;
        if(cur.controlFormType == 2){
            cur.content = cur.content.length>0 ? cur.content.join(',') : ''
        }; //申报有效期范围

        if(cur.controlFormType == 7 && cur.associateDept == 1){
            cur.ids = cur.ids.length>0 ? cur.ids.join(',') : ''
        }; //申报工地

        if(cur.controlFormType == 9){
            cur['vehicleCommit'] = 1;
        }; //申报车辆

        if(cur.controlFormType == 14){
            cur.content = this.contentImg1.length>0 ? this.contentImg1.join(',') : ''
        }; //上传图片
        if(cur.controlFormType == 15){
            cur.content = this.contentImg2.length>0 ? this.contentImg2.join(',') : ''
        }; //上传图片
        if(cur.controlFormType == 16){
            cur.content = this.contentImg3.length>0 ? this.contentImg3.join(',') : ''
        }; //上传图片
        if(cur.controlFormType == 17){
            cur.content = this.contentImg4.length>0 ? this.contentImg4.join(',') : ''
        }; //上传图片
        if(cur.controlFormType == 18){
            cur.content = this.contentImg5.length>0 ? this.contentImg5.join(',') : ''
        }; //上传图片
        if(cur.controlFormType == 19){
            cur.content = this.contentImg6.length>0 ? this.contentImg6.join(',') : ''
        }; //上传图片
        if(cur.controlFormType == 20){
            cur.content = this.contentImg7.length>0 ? this.contentImg7.join(',') : ''
        }; //上传图片
        if(cur.controlFormType == 21){
            cur.content = this.contentImg8.length>0 ? this.contentImg8.join(',') : ''
        }; //上传图片

        
        

      })

      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if(element.required == 1){
            if(element.content == '' || element.content == null){
              this.$message.warning('请输入' + element.controlName);
              return false
            };
        };
      };


      console.log(this.fromList)



      let params = {
        workflowId:this.workflowId,
        insts:list
      };

      this.spinning = true;
      AddInst(params).then(res=>{
        this.spinning = false;
          if(res.data.code == 0){
            this.bmpVisible = false;
            this.$message.success('发起审批成功');
            this.$emit('triggerData');
          }else{
            this.$message.warning('发起审批失败')
          };
      });
    },
    approval(status){
    
          if(this.workflowOpinionRequire ==1){
            if(this.comments == ''){
              this.$message.warning('请输入审批意见')
              return false
            }
            
          };
        
        

       let params = {
        comments:this.comments,
        id:this.tmplId,
        tmplStatus:status,
        nodeId:this.nodeId
      };
      this.spinning = true;
      WorkflowComment(params).then(res=>{
          this.spinning = false;
            if(res.data.code == 0){
              this.bmpVisible = false;
              if(status==1){
                this.$message.success('审批通过');
              }else{
                this.$message.success('审批拒绝');
              };
              this.visible = false;
              this.visible1 = false;
              this.$emit('triggerData');
            }else{
              this.$message.warning('审批失败')
            };
        });
      },
      onDraw(value,index){
        console.log(index)
        this.curIndex = index;
        this.$refs.draw_fence.drawDence(value)
      },
      getPosion(arr){
        
        let position = JSON.parse(arr);
       
        let s = '';
        position[0].forEach(cur=>{
          s += cur.lat + ',' + cur.lng + ';'
        });
        this.fromList[this.curIndex].content = s


      },
      uploadOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList1.push(list)
              this.contentImg1.push(res.data.data.path)
            };
        })
        return false
      },
      uploadTwo(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList2.push(list)
              this.contentImg2.push(res.data.data.path)
            };
        })
        return false
      },
      uploadThree(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList3.push(list)
              this.contentImg3.push(res.data.data.path)
            };
        })
        return false
      },
      uploadFour(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList4.push(list)
              this.contentImg4.push(res.data.data.path)
            };
        })
        return false
      },
      uploadFive(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList5.push(list)
              this.contentImg5.push(res.data.data.path)
            };
        })
        return false
      },
      uploadSix(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList6.push(list)
              this.contentImg6.push(res.data.data.path)
            };
        })
        return false
      },
      uploadSeven(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList7.push(list)
              this.contentImg7.push(res.data.data.path)
            };
        })
        return false
      },
      uploadEight(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            this.loading = false;
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList8.push(list)
              this.contentImg8.push(res.data.data.path)
            };
        })
        return false
      },
     
      
      
    },
}
</script>