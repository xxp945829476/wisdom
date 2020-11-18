<template>
    <div>
        <a-row type="flex" justify="center" align="middle" class="no_jurisdiction">
            <a-col class="no_jurisdiction_l"><img src="@/assets/images/403.svg"></a-col>
            <a-col>
                <h2>403</h2>
                <p>抱歉，你无权访问该页面</p>
                <a-button type="primary" @click="backIndex">
                返回上一页
                </a-button>
            </a-col>
        </a-row>
        
    </div>    
</template>

<script>
export default {
    methods:{
        backIndex(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang='less'>
    .no_jurisdiction{
        height: 100vh;
        h2{
            font-size: 40px;
            margin-bottom: 0;
        }
        p{
            font-size: 20px;
        }
    }
    .no_jurisdiction_l{
        padding-right: 30px;
    }
</style>

