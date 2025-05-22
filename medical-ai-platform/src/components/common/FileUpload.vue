<template>
  <div class="file-upload-container">
    <input
      type="file"
      ref="fileInputRef"
      @change="handleFileChange"
      multiple
      style="display: none"
      :accept="allowedTypes.join(',')"
    />
    <el-button type="primary" @click="triggerFileInput">
      <el-icon class="el-icon--left"><UploadFilled /></el-icon>
      Select Files
    </el-button>
    <p v-if="selectedFiles.length === 0" class="upload-placeholder">
      Drag files here or click "Select Files" to upload.
    </p>

    <div v-if="selectedFiles.length > 0" class="file-list">
      <h4>Selected Files:</h4>
      <el-table :data="selectedFiles" style="width: 100%" size="small">
        <el-table-column prop="name" label="Name" />
        <el-table-column label="Size" width="120">
          <template #default="scope">
            {{ formatFileSize(scope.row.size) }}
          </template>
        </el-table-column>
        <el-table-column label="Type" prop="type" width="150" />
        <el-table-column label="Actions" width="100" align="center">
          <template #default="scope">
            <el-button
              type="danger"
              :icon="Delete"
              size="small"
              circle
              @click="removeFile(scope.$index)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElButton, ElMessage, ElIcon, ElTable, ElTableColumn } from 'element-plus';
import { UploadFilled, Delete } from '@element-plus/icons-vue';

interface Props {
  allowedTypes?: string[]; // e.g., ['image/jpeg', 'application/pdf']
  maxSize?: number; // Max size in bytes
  maxFiles?: number; // Max number of files
}

const props = withDefaults(defineProps<Props>(), {
  allowedTypes: () => [], // Default to allow all types
  maxSize: Infinity,
  maxFiles: Infinity,
});

const emit = defineEmits(['files-updated']);

const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<File[]>([]);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const filesToAdd: File[] = [];
    for (const file of Array.from(target.files)) {
      // Check max files limit
      if (selectedFiles.value.length + filesToAdd.length >= props.maxFiles) {
        ElMessage.warning(`Maximum number of files (${props.maxFiles}) reached.`);
        break;
      }

      // Validate file type
      if (props.allowedTypes.length > 0 && !props.allowedTypes.includes(file.type)) {
        ElMessage.error(`File type "${file.type}" is not allowed for ${file.name}. Allowed: ${props.allowedTypes.join(', ')}`);
        continue;
      }

      // Validate file size
      if (file.size > props.maxSize) {
        ElMessage.error(`File "${file.name}" (${formatFileSize(file.size)}) exceeds the max size limit of ${formatFileSize(props.maxSize)}.`);
        continue;
      }

      // Prevent duplicates by name (simple check)
      if (selectedFiles.value.some(existingFile => existingFile.name === file.name)) {
        ElMessage.info(`File "${file.name}" is already selected.`);
        continue;
      }
      filesToAdd.push(file);
    }
    selectedFiles.value = [...selectedFiles.value, ...filesToAdd];
    emit('files-updated', selectedFiles.value);
  }
  // Reset the input value to allow selecting the same file again if removed and re-added
  if (target) target.value = '';
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
  emit('files-updated', selectedFiles.value);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
</script>

<style scoped>
.file-upload-container {
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
}

.upload-placeholder {
  margin-top: 15px;
  color: #909399;
  font-size: 0.9rem;
  text-align: center;
}

.file-list {
  margin-top: 20px;
}

.file-list h4 {
  margin-bottom: 10px;
  color: #303133;
}
</style>
