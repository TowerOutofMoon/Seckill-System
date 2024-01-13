import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'antd'
import {connect} from "react-redux";
import withRouter from "../../withRouter";
import image from "../images/product-display.jpg"

class productDisplay extends Component {

    handleSkip = (siftState,isAuthenticated) => {
        if(!isAuthenticated) {
            alert('您还未登录,请登陆后重试');
            this.props.navigate('/login')
        }
        else if (siftState === "500") {
            // 如果没有通过
            console.log('没有通过');
            alert('您还没有满足参与此次活动的条件');
            return -1;
        } else {
            this.props.navigate('/product-sale')
        }
    }

    render() {
        const {siftState} = this.props.user.user
        const {isAuthenticated} = this.props.user
        // console.log(isAuthenticated);
        // console.log(siftState);
        return (
            <Row className='products-list'>
                <Col span={3} className={"products-left"}/>
                <Col span={18}>
                    <div className='titles'>
                        <i/><h2>优质产品</h2><i/>
                    </div>
                    {/*渲染产品*/}
                    <Row className='products'>
                        <ul>
                            <li>
                                <div className='info'>
                                    <h3 className='product-name'>2022潍坊滨城城投债权</h3>
                                    <h3 className='product-rate'>9.6%</h3>
                                    <h4 className='product-add'>(业绩比较基准)</h4>
                                    <h5 className='product-pay'>付息方式：季度付息</h5>
                                    <span className='product-tag'>投资期限：12~24个月</span>
                                    <span className='product-tag'>投资门槛：30万起</span>
                                    <a onClick={() => this.handleSkip(siftState,isAuthenticated)} style={{color: "#FF0000"}}>
                                        <p>进入秒杀</p></a>
                                </div>
                            </li>
                            <li>
                                <div className='info'>
                                    <h3 className='product-name'>天津武清国投债权项目</h3>
                                    <h3 className='product-rate'>9.0%</h3>
                                    <h4 className='product-add'>(业绩比较基准)</h4>
                                    <h5 className='product-pay'>付息方式：季度付息</h5>
                                    <span className='product-tag'>投资期限：12个月</span>
                                    <span className='product-tag'>投资门槛：30万起</span>
                                    <a onClick={() => this.handleSkip(siftState,isAuthenticated)} style={{color: "#FF0000"}}>
                                        <p>进入秒杀</p></a>
                                </div>
                            </li>
                            <li>
                                <div className='info'>
                                    <h3 className='product-name'
                                        title='国企山西信托-晋信永达1号成都经开集合信托'>国企山西信托-晋信永达1号成都经开集合信托</h3>
                                    <h3 className='product-rate'>7.9%</h3>
                                    <h4 className='product-add'>(业绩比较基准)</h4>
                                    <h5 className='product-pay'>付息方式：按年付息</h5>
                                    <span className='product-tag'>投资期限：24个月</span>
                                    <span className='product-tag'>投资门槛：100万起</span>
                                    <a onClick={() => this.handleSkip(siftState,isAuthenticated)} style={{color: "#FF0000"}}>
                                        <p>进入秒杀</p></a>
                                </div>
                            </li>
                            <li>
                                <div className='info'>
                                    <h3 className='product-name'
                                        title='平安养老富盈360天'>平安养老富盈360天</h3>
                                    <h3 className='product-rate'>6.7%</h3>
                                    <h4 className='product-add'>(业绩比较基准)</h4>
                                    <h5 className='product-pay'>付息方式：按年付息</h5>
                                    <span className='product-tag'>投资期限：24个月</span>
                                    <span className='product-tag'>投资门槛：10万起</span>
                                    <a to={'/product-display'} onClick={() => this.handleSkip(siftState)} style={{color: "#FF0000"}}>
                                        <p>进入秒杀</p></a>
                                </div>
                            </li>
                            <li>
                                <div className='info'>
                                    <h3 className='product-name'
                                        title='易方达易理财'>易方达易理财</h3>
                                    <h3 className='product-rate'>8.3%</h3>
                                    <h4 className='product-add'>(业绩比较基准)</h4>
                                    <h5 className='product-pay'>付息方式：按年付息</h5>
                                    <span className='product-tag'>投资期限：24个月</span>
                                    <span className='product-tag'>投资门槛：60万起</span>
                                    <a onClick={() => this.handleSkip(siftState,isAuthenticated)} style={{color: "#FF0000"}}>
                                        <p>进入秒杀</p></a>
                                </div>
                            </li>
                            <li>
                                <div className='info'>
                                    <h3 className='product-name'
                                        title='建信养老飞益鑫'>建信养老飞益鑫</h3>
                                    <h3 className='product-rate'>7.7%</h3>
                                    <h4 className='product-add'>(业绩比较基准)</h4>
                                    <h5 className='product-pay'>付息方式：按年付息</h5>
                                    <span className='product-tag'>投资期限：24个月</span>
                                    <span className='product-tag'>投资门槛：70万起</span>
                                    <a onClick={() => this.handleSkip(siftState,isAuthenticated)} style={{color: "#FF0000"}}>
                                        <p>进入秒杀</p></a>
                                </div>
                            </li>
                        </ul>
                    </Row>
                </Col>
                <Col span={3} className={"products-right"}/>
            </Row>
        )
    }
}

export default connect(
    state => ({user: state.auth})
)(withRouter(productDisplay))
