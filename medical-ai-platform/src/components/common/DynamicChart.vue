<template>
  <div ref="chartContainerRef" class="dynamic-chart-echarts-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// Register necessary ECharts components
echarts.use([
  TitleComponent, TooltipComponent, GridComponent, LegendComponent,
  BarChart, LineChart, PieChart,
  CanvasRenderer
]);

const props = defineProps({
  chartOptions: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const chartContainerRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (chartContainerRef.value) {
    chartInstance = echarts.init(chartContainerRef.value);
    if (props.chartOptions && Object.keys(props.chartOptions).length > 0) {
      chartInstance.setOption(props.chartOptions);
    }
  }
};

const updateChart = (newOptions: echarts.EChartsOption) => {
  if (chartInstance && newOptions && Object.keys(newOptions).length > 0) {
    chartInstance.setOption(newOptions, true); // true for notMerge
  } else if (chartInstance && (!newOptions || Object.keys(newOptions).length === 0)) {
    chartInstance.clear(); // Clear chart if options are empty
  }
};

// Basic resize handling
const handleResize = () => {
  chartInstance?.resize();
};

onMounted(() => {
  // Call nextTick to ensure DOM is ready for chart init
  nextTick(() => {
    initChart();
  });
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  chartInstance?.dispose();
  window.removeEventListener('resize', handleResize);
});

watch(() => props.chartOptions, (newOptions) => {
  // Ensure chart is initialized before trying to set options
  if (chartInstance) {
    updateChart(newOptions as echarts.EChartsOption);
  } else {
    // If chart is not yet initialized (e.g. options came in very fast)
    // try initializing it. This might also happen if onMounted's nextTick
    // hasn't fired before options are available.
    nextTick(() => {
      if (!chartInstance && chartContainerRef.value) {
        initChart(); // This will also call setOption if props.chartOptions is valid
      } else {
        updateChart(newOptions as echarts.EChartsOption);
      }
    });
  }
}, { deep: true });

</script>

<style scoped>
.dynamic-chart-echarts-container {
  width: 100%;
  min-height: 300px; /* Default height, can be overridden by parent or specific styles */
  /* max-width: 600px; /* Example, adjust as needed or make it responsive */
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
