import React, {Component} from 'react';
import * as echarts from 'echarts/lib/echarts.js'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

class MyCompanySeason extends Component {
    season = React.createRef()

    componentDidMount() {
        var myChart = echarts.init(this.season);
        myChart.setOption(this.getOption())
    }

    getOption = () => {
        return {
            title: {
                text: '季度账单',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['第一季度', '第二季度', '第三季度', '第四季度']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 万'
                },
            },
            series: [
                {
                    stack: 'Total',
                    data: [15, 23, 24, 21, 13],
                    type: 'line'
                }
            ]
        };
    }

    render() {
        return (
            <div className={'company-season'} ref={(c) => {this.season = c}}/>
        );
    }
}

export default MyCompanySeason;