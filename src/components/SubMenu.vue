<template functional>
  <a-sub-menu :key="props.menuInfo.path" v-if="props.menuInfo.hidenMenu==0">
    <span slot="title">
      <i class="iconfont menuicon" :class="props.menuInfo.meta.icon"></i>
      <span>{{ props.menuInfo.name }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <template v-if="item.children">
        <a-menu-item v-if="!item.children" :key="item.path">
          <span>{{ item.name }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>

      <template v-else>
        <a-menu-item :key="item.path" v-if="item.hidenMenu == 0">
          <span>{{ item.name }}</span>
        </a-menu-item>
      </template>
      
    </template>
  </a-sub-menu>
</template>


<script>
export default {
  props: ["menuInfo"]
};
</script>