<template>
  <el-card class="dynamic-table-container">
    <template #header>
      <div>
        <span>Dynamic Table</span>
      </div>
    </template>
    <div v-if="isLoading" class="loading-placeholder">
      <p>Loading data...</p>
      <el-skeleton :rows="5" animated />
    </div>
    <el-table v-else :data="data" style="width: 100%" border stripe>
      <el-table-column
        v-for="col in columns"
        :key="col.key"
        :prop="col.key"
        :label="col.label"
        :width="col.width"
        sortable
      />
    </el-table>
    <el-empty v-if="!isLoading && (!data || data.length === 0)" description="No data available" />
  </el-card>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElCard, ElEmpty, ElSkeleton } from 'element-plus';

interface ColumnDefinition {
  key: string;
  label: string;
  width?: string | number;
}

interface Props {
  columns: Array<ColumnDefinition>;
  data: Array<object>;
  isLoading?: boolean;
}

defineProps<Props>();
</script>

<style scoped>
.dynamic-table-container {
  margin-top: 10px;
  margin-bottom: 10px;
}
.loading-placeholder {
  padding: 20px;
  text-align: center;
}
.loading-placeholder p {
  margin-bottom: 15px;
  color: #666;
}
</style>
