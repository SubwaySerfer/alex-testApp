<template>
  <router-view class="wrapper" v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component" class="component"></component>
    </transition>
  </router-view>
</template>
<script lang="ts">


export default {
}
</script>
