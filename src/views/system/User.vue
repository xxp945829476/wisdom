<template>
  <div class="about">
    <a-button type="primary" @click="changeTheme('#13c2c2')">
      Primary
    </a-button>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
   methods: {
    changeTheme(primaryColor) {
      window.less.modifyVars({
        "@primary-color": primaryColor
      });
      this.$setStorage('themeColor',primaryColor)
    }
  }
}
</script>