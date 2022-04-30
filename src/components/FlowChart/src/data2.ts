import { Shape } from '@antv/x6';
const { Rect } = Shape;

export const chart = {
	nodes: [
		{
			id: 'start',
			type: 'rect',
			width: 140,
			height: 40,
			label: '开始',
		},
		{
			id: 'condition-1',
			type: 'rect',
			width: 140,
			height: 40,
			label: '???',
			data: {
				parent: true,
			},
		},
		{
			id: 'result-1',
			type: 'rect',
			width: 140,
			height: 40,
			label: '???',
			data: {
				parent: true,
			},
		},
		{
			id: 'result-2',
			type: 'rect',
			width: 140,
			height: 40,
			label: '???',
			data: {
				parent: true,
			},
		},
	],
	edges: [
		{
			source: 'start',
			target: 'condition-1',
		},
		{
			source: 'condition-1',
			target: 'result-1',
			label: '成立',
		},
		{
			source: 'condition-1',
			target: 'result-2',
			label: '不成立',
		},
	],
};
export const options = [
	new Rect({
		width: 140,
		height: 40,
		attrs: {
			rect: { fill: '#3498db', stroke: '#2980b9' },
			text: { text: '转化率 > 7.5%', fill: 'white' },
		},
	}),
	new Rect({
		width: 140,
		height: 40,
		attrs: {
			rect: { fill: '#3498db', stroke: '#2980b9' },
			text: { text: '收藏人数 > 2000', fill: 'white' },
		},
	}),
	new Rect({
		width: 140,
		height: 40,
		attrs: {
			rect: { fill: '#3498db', stroke: '#2980b9' },
			text: { text: '加购人数 > 50000', fill: 'white' },
		},
	}),

	new Rect({
		width: 140,
		height: 40,
		attrs: {
			rect: { fill: '#3498db', stroke: '#2980b9' },
			text: { text: '爆款', fill: 'white' },
		},
	}),
	new Rect({
		width: 140,
		height: 40,
		attrs: {
			rect: { fill: '#3498db', stroke: '#2980b9' },
			text: { text: '非爆款', fill: 'white' },
		},
	}),
];
