<template>
  <div>
    <h2 class="case_title">案件信息：</h2>
    <a-row type="flex" justify="space-between" :gutter="16">
      <a-col :span="6">
        <label class="case_lable">违章类型：</label>
        <span class="case_span">{{saveData.violationTypeName}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">车辆：</label>
        <span class="case_span">{{saveData.vehicleNo}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">违章时间：</label>
        <span class="case_span">{{saveData.checkTime}}</span>
      </a-col>
      <a-col :span="6">
        <label class="case_lable">驾驶员：</label>
        <span class="case_span">{{saveData.driverName}}</span>
      </a-col>
      <a-col :span="24" style="margin-top:15px">
       <label class="case_lable">运输公司：</label>
        <span class="case_span">{{saveData.deptName}}</span>
      </a-col>
    </a-row>
    <h2 class="case_title case_title_top">执法人员：</h2>
    <div>
      <label class="case_lable">执法人员：</label>
      <a-input style="width:30%" v-model="saveData.enforceLawerName" placeholder="请输入执法人员"/>
    </div>
    <h2 class="case_title case_title_top">处理意见：</h2>
    <div>
       <a-textarea
        v-model="saveData.enforceDealOpinion"
        placeholder="请输入考核内容"
        :auto-size="{ minRows: 5 }"
        />
    </div>
    <h2 class="case_title case_title_top">现场照片：</h2>
    <div>
      <a-upload
        name="avatar"
        list-type="picture-card"
        :file-list="fileList"
        :before-upload="uploadOne"
        :remove="removeFile"
      >
        <div>
          <a-icon type="camera" />
          <div class="ant-upload-text">
            添加照片
          </div>
        </div>
      </a-upload>
    </div>
  </div>
</template>

<script>
import {uploadOne,EditCase} from '@/network/api'
import pathUrl from "@/network/requestUrl";
export default {
  data() {
    return {
      pathUrl,
      remark:'',
      fileList:[],
      enforceLawerName:'',
      contentImg:[]
    }
  },
  props:{
    saveId:{
      type: String,
      default: ''
    },
    saveData:{
      type:Object,
      default: {}
    }
  },
  created(){
    console.log(this.saveData)
    if(this.saveData.enforceScenePhoto){
      let photo = this.saveData.enforceScenePhoto.split(',');
      this.contentImg = photo;
      photo.forEach((cur,index)=>{
        this.fileList.push({
                  uid: index,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  cur
              })
      })
    }
  },
  methods:{
   uploadOne(file, fileList){
        let param = new FormData()
        param.append('file',file);
        console.log(fileList)
        uploadOne(param).then(res=>{
            
            if(res.data.code == 0){
              let list = {
                  uid: fileList[0].uid,
                  name: 'image.png',
                  status: 'done',
                  url: pathUrl.imgurl +  res.data.data.path
              }
              this.fileList.push(list)
              this.contentImg.push(res.data.data.path)
            };
        })
        return false
      },
      removeFile(val){
        console.log(val)
        this.fileList.forEach((cur,index)=>{
            if(cur.uid == val.uid){
              this.fileList.splice(index,1)
              this.contentImg.splice(index,1)
            }
        })
      },
      saveOpinion(val){
        let params = {
          id:this.saveId,
          enforceDealOpinion:this.saveData.enforceDealOpinion,
          enforceScenePhoto:this.contentImg.join(','),
          enforceLawerName:this.saveData.enforceLawerName,
          status:1
        };

        if(this.saveData.status&&this.saveData.status>1){
          params.status = this.saveData.status
        }
        
         EditCase(params).then(res=>{
          this.spinning = false;
          if(res.data.code == 0){
           if(val==1){
              this.$emit('closeOpinion');
            }else{
              this.$emit('stepCurrent');
            }
          }
        });
      }
  }
}
</script>