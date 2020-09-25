<template>
  <div class="desion_box">
    
     <a-row type="flex" justify="space-between">
        <a-col flex="320px" class="desion_left">
            <h3 class="desion_left_t">控件库</h3>
            <h4 class="desion_left_t1">基本信息</h4>
             
            <ul class="desion_left_l">
                <draggable
                class="dragArea list-group"
                :sort="false"
                :list="list1"
                :move='allow'
                :group="{ name: 'people', pull: 'clone', put: false }"
                @change="log"
            >
                <li v-for="element in list1" :key="element.name">{{ element.name }}</li>
                </draggable>
            </ul>
        </a-col>

        <a-col flex="auto" class="desion_middle">
                
                   
                        <div>
                            <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
                                 <draggable
                                    class="dragArea list-group"
                                    :list="list2"
                                    group="people"
                                    @change="log"
                                >
                                <a-form-model-item :label="element.name" v-for="(element,index) in list2" :key="element.name" class="widget_form_list" :class="{'widget_form_list_c':element.isSelect}" @click.native="selFrom(index)">
                                    <a-input v-model="element.content" :placeholder="element.placeholder"   />
                                    <a-icon type="minus-circle" class="del_from"/>
                                </a-form-model-item>
                                  </draggable>
                            </a-form-model>
                          
                        </div>
                    
               
        </a-col>

        <a-col flex="320px" class="desion_right">
            <h3 class="desion_right_t">证件编号</h3>
            <div class="desion_right_c">
                <h4>控件名称 <span>最多20个字</span></h4>
                 <a-input  placeholder=""   />
            </div>
            <div class="desion_right_c">
            <h4>控件规则 <span>如：NJ-20191202-320100-0013</span></h4>
            <a-input  placeholder=""   />
            </div>
            <div class="desion_right_c">
            <h4>提示文字 <span>最多20字</span></h4>
            <a-input  placeholder=""   />
            </div>
            <div class="desion_right_c">
            <h4>预览</h4>
            <a-input  placeholder=""   />
            </div>
        </a-col>
        
     </a-row>


    <!-- <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="element in list1"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group"
        :list="list2"
        group="people"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="element in list2"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div> -->

    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />

    <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
    labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      list1: [
        { name: "证件编号",content:'', placeholder:'请输入',id: 1 },
        { name: "申报有效期范围",content:'', placeholder:'请输入', id: 2 },
        { name: "准行时段",content:'', placeholder:'请输入', id: 3 },
        { name: "禁行日期",content:'',  placeholder:'请输入',id: 4 }
      ],
      list2: []
    };
  },
  methods: {
    allow(evt){
    //     console.log(evt.draggedContext.index)
    // console.log(evt.draggedContext.element)
    // console.log(evt.draggedContext.futureIndex)
    // console.log(evt.relatedContext.index)
    // console.log(evt.relatedContext.element)
    // console.log(evt.relatedContext.list)

       let x = this.list2.some(ele=>{
            console.log(evt.draggedContext.element.id)
            console.log(ele.id)
            return ele.id == evt.draggedContext.element.id
        })
        return  !x
    },
    log: function(evt) {
      window.console.log(evt);
    },
    selFrom(i){
        this.list2.forEach(cur=>{
            this.$set(cur,'isSelect',false) 
        })
       this.$set(this.list2[i],'isSelect',true) 
    }
  }
};
</script>
<style scoped></style>