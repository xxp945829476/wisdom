<template>
    <div class="process_box">
        <a-row type="flex" justify="center">
          <a-col flex="200px">
                <div class="process_single">
                  <img src="@/assets/images/fqr.svg">
                  <div>选择发起人</div>
                </div>
                <div class="add-node-btn-box">
                  <i class="iconfont icontianjia1"></i>
                </div>
          </a-col>
        </a-row>

        <a-row type="flex" justify="center">
          <a-col flex="200px">
                <div class="process_single process_arrow">
                  <img src="@/assets/images/spr.svg">
                  <div>选择审批人</div>
                </div>
                <div class="add-node-btn-box">
                  <i class="iconfont icontianjia1"></i>
                </div>
          </a-col>
        </a-row>

        <a-row type="flex" justify="center">
          <a-col flex="200px">
                <div class="process_single process_arrow">
                  <img src="@/assets/images/hqr.svg">
                  <div>选择会签人</div>
                </div>
                <div class="add-node-btn-box">
                  <i class="iconfont icontianjia1"></i>
                </div>
          </a-col>
        </a-row>

         <a-row type="flex" justify="center">
          <a-col flex="200px">
                <div class="process_single">
                  <div class="end-node-circle"></div>
                  <div>选择审批人</div>
                </div>
          </a-col>
        </a-row>

    </div>    
</template>

<script>
export default {
  
}
</script>