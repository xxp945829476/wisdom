<template>
    <a-modal v-model="sponsorVisible"  title="设置发起人" :maskClosable="false" width="500px" v-dialogDrag="dialog" :zIndex="1005" @ok="handleOk">
            <div>
                <a-tabs default-active-key="1" @change="changeTab">
                    <a-tab-pane key="1" tab="选择部门">
                        
                            <a-checkbox-group v-model="checkDepList">
                                <div v-for="item in deptList" :key="item.id" class="base_dep">
                                    <a-checkbox :value="item.id" >
                                    {{item.name}}
                                    </a-checkbox>
                                </div>
                            </a-checkbox-group> 
                       
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="选择用户">
                        <a-checkbox-group v-model="checkUseList">
                                <div v-for="item in userList" :key="item.id" class="base_dep">
                                    <a-checkbox :value="item.id" >
                                    {{item.name}}
                                    </a-checkbox>
                                </div>
                            </a-checkbox-group> 
                    </a-tab-pane>
                </a-tabs>
                
              
            </div>
        </a-modal>
</template>

<script>
import {GetUseBaseInfo,GetDeptBaseInfo} from '@/network/api'
export default {
    data() {
        return {
            dialog:true,
            sponsorVisible:false,
            deptList:[],
            userList:[],
            checkDepList:[],
            checkUseList:[],
        }
    },
    methods:{
        setSponsor(){
            this.sponsorVisible = true;
            this.checkDepList = [];
            this.checkUseList = [];
            this.getUseBaseInfo();
            this.getDeptBaseInfo();
        },
        getUseBaseInfo(){
            GetUseBaseInfo().then(res=>{
                if(res.data.code == 0){
                    this.userList = res.data.data;
                }else{
                    this.$message.warning('加载失败')
                };
                
            });
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
        handleOk(){
            let name = [];
            this.sponsorVisible = false;
             console.log(this.checkDepList)
            if(this.checkDepList.length>0){
                this.checkDepList.forEach(cur=>{
                    console.log('++')
                    this.deptList.forEach(ele=>{
                        if(cur == ele.id){
                            name.push(ele.name)
                        }
                    })
                })
            };
            if(this.checkUseList>0){
                this.checkUseList.forEach(cur=>{
                    this.userList.forEach(ele=>{
                        if(cur == ele.id){
                            name.push(ele.name)
                        }
                    })
                })
            };
            this.$emit('getValue',this.checkDepList,this.checkUseList,name)
        },
        changeTab(key){
            if(key==1){
                this.checkUseList = [];
            }else{
                this.checkDepList = [];
            }
        }
    }
}
</script>