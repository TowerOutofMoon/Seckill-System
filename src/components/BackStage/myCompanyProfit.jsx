import React, {Component} from 'react';
import * as echarts from 'echarts/lib/echarts.js'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

class MyCompanyProfit extends Component {
    company = React.createRef()

    componentDidMount() {
        var myChart = echarts.init(this.company);
        myChart.setOption(this.getOption())
    }

    getOption = () => {
        return {
            legend: {
                data: ['产品1', '产品2', '产品3', '产品4'],
                orient: 'vertical',
                left: 'right'
            },
            title: {
                text: '产品收入',
                subtext: '上周数据',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 元'
                },
            },
            series: [
                {
                    name: '产品1',
                    type: 'bar',
                    data: [5000, 2200, 1900, 6000, 5000, 1200, 3200]
                },
                {
                    name: '产品2',
                    data: [1000, 3000, 1500, 8000, 7000, 1100, 1300],
                    type: 'bar',
                },
                {
                    name: '产品3',
                    data: [0, 3000, 15000, 8000, 7000, 1000, 1300],
                    type: 'bar',
                },
                {
                    name: '产品4',
                    data: [0, 2000, 8000, 6000, 4000, 1400, 1100],
                    type: 'bar',
                },
            ]
        };
    }

    render() {
        return (
            <div className={'company-profit'} ref={(c) => {this.company = c}}/>
        );
    }
}

export default MyCompanyProfit;