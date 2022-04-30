<template>
	<div class="main-page" :class="[`is-step-${step}`]">
		<div class="cover" @click="next" v-if="step === 0"></div>
		<FlowChart :data-index="0" v-if="step === 1"></FlowChart>
		<FlowChart :data-index="1" v-if="step === 2"></FlowChart>
		<FlowChart :data-index="2" v-if="step === 3"></FlowChart>
		<div class="finish" v-if="step === 4" @click="toHome"></div>
		<!-- <button class="main-button is-left" @click="prev" v-if="showPrev">上一步</button> -->
		<button class="main-button" @click="next" v-if="showNext">{{ buttonText }}</button>
	</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { FlowChart } from './components/FlowChart';
const step = ref(0);
const prev = () => {
	step.value = Math.max(step.value - 1, 0);
};
const next = () => {
	step.value = Math.min(step.value + 1, 4);
};

const toHome = () => {
	step.value = 0;
};

const buttonText = computed(() => {
	return step.value === 0 ? '开始' : step.value === 3 ? '完成' : '下一步';
});

const showPrev = computed(() => {
	return step.value > 0;
});

const showNext = computed(() => {
	return step.value < 4 && step.value > 0;
});
</script>

<style lang="less">
.main-page {
	position: relative;
	height: 100vh;
	overflow: hidden;
	background-image: url('./assets/bg.png');
	background-size: contain;
	background-position: center;
	&.is-step-0 {
		background-image: url('./assets/cover.png');
	}
	&.is-step-4 {
		background-image: url('./assets/finish.png');
	}
}

.cover {
	height: 100vh;
}

.finish {
	height: 100vh;
}

.main-button {
	position: absolute;
	right: 20px;
	bottom: 20px;
	width: 200px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	color: #fff;
	background-color: #3498db;
	border-radius: 4px;
	border: 0;
	&.is-left {
		left: 20px;
		right: auto;
	}
}
</style>
