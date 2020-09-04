<template>
    <a-modal v-model="vehicleVisible" :maskClosable="false" width="80%" v-dialogDrag="dialog" v-fullscreen>
        <div slot="title">
        新增车辆
        <span class="fullscreen_model">
            <a-icon type="fullscreen" class="fullscreen_icon" />
            <a-icon type="fullscreen-exit" class="fullscreen_exit_icon" />
        </span>
        </div>
        <div>
            <a-form-model :layout="'Vertical'" :model="form">
                <a-row :gutter="40">
                    <a-col :md="8">
                        <a-form-model-item label="所属企业">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="车辆类型">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="车牌号码">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="车牌颜色">
                           <a-select default-value="lucy">
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
                        <a-form-model-item label="车辆颜色">
                            <a-input v-model="form.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="设备名称-主">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="设备名称-从">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="货箱体积">
                            <a-input-group compact>
                                <a-select default-value="Zhejiang" style="width: 24%">
                                    <a-select-option value="Zhejiang">
                                    体积
                                    </a-select-option>
                                    <a-select-option value="Jiangsu">
                                    长宽高
                                    </a-select-option>
                                </a-select>
                                <a-input style="width: 76%" placeholder=""/>
                                <!-- <a-input style="width: 16%" placeholder="长" />
                                <a-input style="width: 16%" placeholder="宽"/>
                                <a-input style="width: 16%" placeholder="高"/>
                                <a-input style="width: 20%" placeholder="高"/>
                                m³ -->
                            </a-input-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆简称">
                            <a-input v-model="form.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车主姓名">
                            <a-input v-model="form.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="联系电话">
                            <a-input v-model="form.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆星标">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="车辆品牌">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="车辆型号">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="车架号">
                            <a-input v-model="form.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="车辆新旧">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="经销商">
                            <a-select default-value="lucy">
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
                        <a-form-model-item label="出厂日期">
                            <a-input v-model="form.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="年检时间">
                            <a-input v-model="form.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8">
                        <a-form-model-item label="有效期">
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
                                    <p>车身照片</p>
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
                                        <p>车辆行驶证</p>
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
                                        <p>车辆登记证</p>
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
                                        <p>准运证开关</p>
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
                                        <p>货箱照片</p>
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
                                        <p>其他</p>
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
      vehicleVisible:false,
      form: {
        fieldA: '',
        fieldB: '',
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    }
  },
  methods:{
    addvehicle(){
      this.vehicleVisible = true;
    }
  }
}
</script>