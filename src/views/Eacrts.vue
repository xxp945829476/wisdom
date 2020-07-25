<template>
    <div>
        <div @click="out">地级市覅第三方大萨达</div>
    </div>
</template>

<script>
import { resetRouter } from '@/router';
export default {
    methods:{
        out(){
             resetRouter();
             this.$router.push('/login')
        }
    }
}
</script>