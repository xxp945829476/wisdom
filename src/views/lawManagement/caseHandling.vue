<template>
  <div>
    <h2 class="case_title">案件信息：</h2>
    <a-row type="flex" justify="space-between" :gutter="16">
      <a-col :span="6">
        <label class="case_lable">违章类型：</label>
        <span class="case_span">无证运输</span>
      </a-col>
      <a-col :span="6">
        <label>车辆：</label>
        <span>苏B 12345 </span>
      </a-col>
      <a-col :span="6">
        <label>违章时间：</label>
        <span>2020-01-26  05:26:19 </span>
      </a-col>
      <a-col :span="6">
        <label>驾驶员：</label>
        <span>孟春</span>
      </a-col>
      <a-col :span="24" style="margin-top:15px">
       <label>运输公司：</label>
        <span>江苏通信运输有限责任公司</span>
      </a-col>
    </a-row>
    <h2 class="case_title case_title_top">执法人员：</h2>
    <div>
      <label>违章类型：</label>
      <span>无证运输</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>