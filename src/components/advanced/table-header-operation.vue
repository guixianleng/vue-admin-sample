<script setup lang="ts">
defineOptions({ name: 'TableHeaderOperation' });

interface Props {
  disabledDelete?: boolean;
  loading?: boolean;
}

defineProps<Props>();

interface Emits {
  (e: 'add'): void;
  (e: 'delete'): void;
  (e: 'refresh'): void;
}

const emit = defineEmits<Emits>();

const columns = defineModel<UI.TableColumnCheck[]>('columns', {
  default: () => []
});

function add() {
  emit('add');
}

function batchDelete() {
  emit('delete');
}

function refresh() {
  emit('refresh');
}
</script>

<template>
  <ElSpace direction="horizontal" wrap justify="end" class="lt-sm:w-200px">
    <slot name="prefix"></slot>
    <slot name="default">
      <ElButton plain type="primary" @click="add">
        <template #icon>
          <icon-ic-round-plus class="text-icon" />
        </template>
        新增
      </ElButton>
      <ElPopconfirm title="确认删除吗？" @confirm="batchDelete">
        <template #reference>
          <ElButton type="danger" plain :disabled="disabledDelete">
            <template #icon>
              <icon-ic-round-delete class="text-icon" />
            </template>
            批量删除
          </ElButton>
        </template>
      </ElPopconfirm>
    </slot>
    <ElButton @click="refresh">
      <template #icon>
        <icon-mdi-refresh class="text-icon" :class="{ 'animate-spin': loading }" />
      </template>
      刷新
    </ElButton>
    <TableColumnSetting v-model:columns="columns" />
    <slot name="suffix"></slot>
  </ElSpace>
</template>

<style scoped></style>
