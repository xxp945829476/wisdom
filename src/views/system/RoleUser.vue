<template>
   <div class="layout_card_content">
      <div class="layout_card_search">
          <a-form-model layout="inline" :model="form">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="Field A">
                  <a-input v-model="form.fieldA" placeholder="input placeholder" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="Field B">
                  <a-input v-model="form.fieldB" placeholder="input placeholder" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="Field B">
                  <a-input v-model="form.fieldB" placeholder="input placeholder" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="Field B">
                  <a-input v-model="form.fieldB" placeholder="input placeholder" />
                </a-form-model-item>
              </a-col>
               <a-col :md="8" :sm="24">
                <a-form-model-item label="Field B">
                  <a-input v-model="form.fieldB" placeholder="input placeholder" />
                </a-form-model-item>
              </a-col>
               <a-col :md="8" :sm="24">
                <a-form-model-item label="Field B">
                  <a-input v-model="form.fieldB" placeholder="input placeholder" />
                </a-form-model-item>
              </a-col>
  
            
            </a-row>

            
            
          </a-form-model>
      </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fieldA: '',
        fieldB: '',
      },
    }
  },
}
</script>