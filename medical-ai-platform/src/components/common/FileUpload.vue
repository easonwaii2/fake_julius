<template>
  <div class="file-upload-container">
    <el-button type="primary" @click="triggerFileUpload">Upload File</el-button>
    <p class="upload-placeholder">Drag files here or click "Upload File" to select.</p>
    <!-- Hidden file input, to be triggered programmatically -->
    <!-- <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" /> -->
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
// import { ref } from 'vue';

// const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileUpload = () => {
  // fileInput.value?.click();
  console.log('File upload triggered (no actual input yet)');
};

// const handleFileChange = (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   if (target.files) {
//     console.log('Files selected:', target.files);
//     // Handle file processing here
//   }
// };

// Props (can be uncommented and used later)
// interface Props {
//   allowedTypes?: string[];
//   maxSize?: number; // in bytes
// }
// defineProps<Props>();
</script>

<style scoped>
.file-upload-container {
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  text-align: center;
  background-color: #f9fafb;
}

.upload-placeholder {
  margin-top: 10px;
  color: #666;
  font-size: 0.9rem;
}
</style>
