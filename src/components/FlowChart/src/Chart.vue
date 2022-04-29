<template>
	<div class="flex">
		<div class="left" ref="leftDomRef">LeftBar</div>
		<div class="content" ref="domRef">Content</div>
	</div>
</template>
<script setup lang="ts">
import { Graph, Addon, Shape } from '@antv/x6';
import { DagreLayout } from '@antv/layout';
import { onMounted, ref } from 'vue';

// import { chart as data, options } from './data1';
// import { chart as data, options } from './data2';
import { chart as data, options } from './data3';

const baseWidth = 140;
const baseHeight = 40;
const basePadding = 5;

const { Rect } = Shape;
const domRef = ref<HTMLElement>(null);
const leftDomRef = ref<HTMLElement>(null);

const layoutParentNode = (parent) => {
	let originPosition = parent.prop('originPosition');
	if (!originPosition) {
		originPosition = parent.prop('position');
		parent.prop('originPosition', originPosition);
	}
	const childrenCount = parent.children?.length || 0;
	const parentX = childrenCount
		? originPosition.x - (baseWidth * (childrenCount - 1)) / 2 - basePadding
		: originPosition.x;
	const parentY = childrenCount ? originPosition.y - basePadding : originPosition.y;
	parent.prop({
		position: {
			x: parentX,
			y: parentY,
		},
		size: {
			width: childrenCount
				? baseWidth * childrenCount + basePadding * 2 + (childrenCount - 1) * basePadding
				: baseWidth,
			height: childrenCount ? baseHeight + basePadding * 2 : baseHeight,
		},
	});

	parent.children?.forEach((node, index) => {
		node.prop({
			position: {
				x: parentX + index * baseWidth + basePadding * (index + 1),
				y: parentY + basePadding,
			},
		});
	});

	parent.label = childrenCount ? '' : '???';
};

onMounted(() => {
	const graph = new Graph({
		container: domRef.value,
		grid: {
			size: 10,
			visible: true,
		},
		embedding: {
			enabled: true,
			findParent({ node }) {
				const bbox = node.getBBox();
				return this.getNodes().filter((node) => {
					// 只有 data.parent 为 true 的节点才是父节点
					const data = node.getData<any>();
					if (data && data.parent) {
						const targetBBox = node.getBBox();
						return bbox.isIntersectWithRect(targetBBox);
					}
					return false;
				});
			},
		},
		autoResize: true,
		panning: false,
	});

	const layout = new DagreLayout();

	data.nodes.forEach((item) => (item.data = { ...item.data, builtin: true }));
	const newData = layout.layout(data);
	graph.fromJSON(newData);
	graph.centerContent();

	graph.on('node:embedded', ({ node }) => {
		const parent = node.getParent();
		if (!parent) {
			if (!node.data || !node.data.builtin) {
				node.remove();
			}
		} else {
			layoutParentNode(parent);
		}
	});

	graph.on('cell:change:children', ({ cell }) => {
		layoutParentNode(cell);
	});

	const stencil = new Addon.Stencil({
		title: '条件',
		target: graph,
		stencilGraphWidth: 320,
		stencilGraphHeight: options.length * 60,
		groups: [
			{
				name: 'group1',
				title: '条件',
				collapsable: false,
			},
		],
		layoutOptions: {
			columns: 2,
			columnWidth: 'compact',
		},
	});

	leftDomRef.value.appendChild(stencil.container);

	stencil.load(options, 'group1');
});
</script>
<style lang="less">
.flex {
	height: 100vh;
	display: flex;
}

.left {
	position: relative;
	width: 320px;
}

.content {
	flex: 1;
}
</style>
