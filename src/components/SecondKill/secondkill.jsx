import React, {Component} from 'react'
import moment from "moment";

/**
 * 秒杀页面设计：
 * 1.从服务器获取开始和结束时间，显示不同页面
 * 2.尚未开始时：等待modal
 * 3.活动期间：购买modal
 * 4.结束时：通知modal
 */
export default class SecondKill extends Component {
    state = {
        interval: '', //距离秒杀的时间
    }

    componentDidMount() {
        this.timer = setInterval(this.setTimeInterval,1000)
    }

    componentWillUnmount() {
        // clearInterval(this.timer)
        // clearInterval(this.stateTimer)
    }

    getInterval = (currTime, seckillTime) => {
        const day = seckillTime.diff(currTime,'days');
        const subTime = seckillTime.subtract({
            years: currTime.year(),
            days: currTime.day(),
            months: currTime.month(),
            hours: currTime.hour(),
            minutes: currTime.minute(),
            seconds: currTime.second(),
        });
        // console.log('currTime:',currTime);
        // console.log('seckillTime:',seckillTime);
        // console.log('subTime:',subTime);

        const year = subTime.year()
        const month = subTime.month()
        const hour = subTime.hour()
        const minute = subTime.minute()
        const second = subTime.second()

        return day + "天" + hour + "时" + minute + "分" + second + "秒"
    }

    setTimeInterval = () => {
        const currTime = moment(new Date());
        // console.log(this.props.seckillTime);
        const seckillTime = moment(this.props.seckillTime);
        // console.log('date@',seckillTime.date());
        const interval = this.getInterval(currTime,seckillTime)
        this.setState({interval})
    }

    render() {
        const {interval} = this.state
        return (
            <p>离秒杀开始还有:<span style={{fontWeight: 'bold', color: 'red'}}>{interval}</span></p>
        )
    }
}
