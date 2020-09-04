<template>
    <div style="overflow:hidden">
        <a-row :gutter="20">
            <a-col :md="12" :sm="24">
                <div class="layout_card_content lr_layout">
                    <div class="table-operator">
                    <a-row :gutter="10">
                        <a-col :md="8">
                            <div class="layout_card_search layout_card_search_w">
                                    <a-form-model layout="inline" :model="form">
                                    <a-row :gutter="24">
                                        <a-col :md="24" :sm="24">
                                        <a-form-model-item>
                                            <a-input placeholder="" allow-clear/>
                                        </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                    </a-form-model>
                            </div>
                        </a-col>

                        <a-col :md="5">
                        <span class="table-page-search-submitButtons">
                            <a-button type="primary" class="search_btn">查询</a-button>
                        </span>
                        </a-col>

                        <a-col :md="11" class="right_operator_btn">
                            <a-button type="primary" icon="plus" @click="addDepart">
                            新增地区
                            </a-button>
                        </a-col>
                    </a-row>
                        
                    </div>


                    <div>
                        <a-tree :tree-data="treeData" checkable show-line @select="onSelect" @check="onCheck">
                            <template slot="custom" slot-scope="item">
                                <span>{{ item.title }}</span>
                                <span class="tree_btn">
                                    <a>编辑</a>
                                    <a-divider type="vertical" />
                                    <a>删除</a>
                                    <a-divider type="vertical" />
                                    <a>添加下级</a>
                                </span>
                               
                            </template>
                        </a-tree>
                    </div>
                    
                </div>
            </a-col>

            <a-col :md="12" :sm="24">
                <div class="lr_layout right_layout">
                    <div class="right_layout_t"><a>已选</a></div>
                    <div class="creat_account">
                         <a-tree :tree-data="treeData" show-line>
                        </a-tree>
                    </div>
                </div>
            </a-col>
        </a-row>


        <a-modal v-model="depsartVisible" title="新增部门" :maskClosable="false" width="800px">
           <div>
               <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-model-item label="地区名称">
                                <a-input v-model="form.name" />
                            </a-form-model-item>


                            <a-form-model-item label="地区级别">
                                <a-radio-group v-model="form.resource">
                                    <a-radio value="1">
                                    省级
                                    </a-radio>
                                    <a-radio value="2">
                                    市级
                                    </a-radio>
                                    <a-radio value="3">
                                    区级
                                    </a-radio>
                                    <a-radio value="4">
                                    县级/街道
                                    </a-radio>
                                </a-radio-group>
                            </a-form-model-item>

                            <a-form-model-item label="所属省">
                                <a-input v-model="form.name" />
                            </a-form-model-item>

                            <a-form-model-item label="所属市">
                                <a-input v-model="form.name" />
                            </a-form-model-item>

                            <a-form-model-item label="所属区">
                                <a-input v-model="form.name" />
                            </a-form-model-item>
                            
                        </a-form-model>
           </div>
            <template slot="footer">
                <a-button key="back">
                取消
                </a-button>
                <a-button key="submit" type="primary">
                保存
                </a-button>
            </template>
        </a-modal>
    </div>
   
</template>

<script>


const treeData = [
  {
    title: '江苏省',
    key: '0-0',
    scopedSlots: { title: 'custom' },
    children: [
      { title: '南京市', key: '0-0-0',scopedSlots: { title: 'custom' } },
      { title: '苏州市', key: '0-0-1' ,scopedSlots: { title: 'custom' }},
    ],
  },
];


export default {
  data() {
     
    return {
        depsartVisible:false,
        dialog:true,
      form: {
        fieldA: '',
        fieldB: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      treeData,
    }
  },
  created(){},
  mounted(){

  },
  methods:{
    onSubmit() {
        console.log('submit!', this.form);
    },
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys);
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
    },
    addDepart(){
        this.depsartVisible = true;
    }
  }
}
</script>