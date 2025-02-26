<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import CardData from './modules/card-data.vue';

const appStore = useAppStore();

const gap = computed(() => (appStore.isMobile ? 0 : 16));
</script>

<template>
  <ElSpace direction="vertical" fill class="pb-0" :size="0">
    <CardData class="mb-16px" />
    <ElRow :gutter="gap">
      <ElCol :lg="14" :sm="24" class="mb-16px">
        <ElCard class="card-wrapper"></ElCard>
      </ElCol>
      <ElCol :lg="10" :sm="24" class="mb-16px">
        <ElCard class="card-wrapper"></ElCard>
      </ElCol>
    </ElRow>
    <ElRow :gutter="gap">
      <ElCol :lg="14" :sm="24" class="mb-16px"></ElCol>
      <ElCol :lg="10" :sm="24" class="mb-16px"></ElCol>
    </ElRow>
  </ElSpace>
</template>

<style scoped></style>
