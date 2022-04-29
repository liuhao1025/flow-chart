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
			id: 'condition',
			type: 'rect',
			width: 140,
			height: 40,
			label: '???',
			data: {
				parent: true,
			},
		},
		{
			id: 'result1',
			type: 'rect',
			width: 140,
			height: 40,
			label: '???',
			data: {
				parent: true,
			},
		},
		{
			id: 'result2',
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
			target: 'condition',
		},
		{
			source: 'condition',
			target: 'result1',
			label: '成立',
		},
		{
			source: 'condition',
			target: 'result2',
			label: '不成立',
		},
	],
};
export const options = [
	new Rect({
		width: 140,
		height: 40,
		attrs: {
			rect: { fill: '#31D0C6', stroke: '#4B4A67' },
			text: { text: '转化率 > 7.5%', fill: 'white' },
		},
	}),
	new Rect({
		width: 140,
		height: 40,
		attrs: {
			rect: { fill: '#31D0C6', stroke: '#4B4A67' },
			text: { text: '爆款', fill: 'white' },
		},
	}),
	new Rect({
		width: 140,
		height: 40,
		attrs: {
			rect: { fill: '#31D0C6', stroke: '#4B4A67' },
			text: { text: '非爆款', fill: 'white' },
		},
	}),
];
