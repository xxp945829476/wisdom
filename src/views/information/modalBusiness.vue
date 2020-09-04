<template>
  <a-modal v-model="businessVisible" :maskClosable="false" width="80%" v-dialogDrag="dialog" v-fullscreen>
    <div slot="title">
      新增企业
      <span class="fullscreen_model">
        <a-icon type="fullscreen" class="fullscreen_icon" />
        <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
      </span>
    </div>
    <div>
        <a-form-model :layout="'Vertical'" :model="form">
            <a-row :gutter="40">
                <a-col :md="8">
                    <a-form-model-item label="企业名称">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业简称">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业类型">
                     
                        <a-select default-value="lucy" @change="handleChange">
                          <a-select-option value="jack">
                            Jack
                          </a-select-option>
                          <a-select-option value="lucy">
                            Lucy
                          </a-select-option>
                          <a-select-option value="disabled" disabled>
                            Disabled
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            yiminghe
                          </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="管辖区">
                        <a-select default-value="lucy" @change="handleChange">
                          <a-select-option value="jack">
                            Jack
                          </a-select-option>
                          <a-select-option value="lucy">
                            Lucy
                          </a-select-option>
                          <a-select-option value="disabled" disabled>
                            Disabled
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            yiminghe
                          </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业地址">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业编号">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="企业法人">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="负责人">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="负责人电话">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="车管联系人">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="车管联系人电话">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="8">
                    <a-form-model-item label="备注">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                </a-col>
                <a-col :md="24">
                    <a-form-model-item label="上传附件">
                        <a-row type="flex" justify="start" class="upload_enclosure">
                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    :before-upload="beforeUpload"
                                    @change="handleChange"
                                >
                                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                <p>法人身份证</p>
                            </a-col>

                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    :before-upload="beforeUpload"
                                    @change="handleChange"
                                >
                                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                  <p>法人身份证</p>
                            </a-col>

                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    :before-upload="beforeUpload"
                                    @change="handleChange"
                                >
                                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                  <p>法人身份证</p>
                            </a-col>

                            <a-col flex="100px">
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    :show-upload-list="false"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    :before-upload="beforeUpload"
                                    @change="handleChange"
                                >
                                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                    <div v-else>
                                        <a-icon :type="loading ? 'loading' : 'plus'" />
                                        <div class="ant-upload-text">
                                            上传
                                        </div>
                                    </div>
                                </a-upload>
                                  <p>法人身份证</p>
                            </a-col>
                            
                        </a-row>
                        
                    </a-form-model-item>
                </a-col>
            </a-row>        
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
</template>

<script>
export default {
  data() {
    return {
      dialog:true,
      businessVisible:false,
      form: {
        fieldA: '',
        fieldB: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    }
  },
  methods:{
    addBusiness(){
      this.businessVisible = true;
    }
  }
}
</script>