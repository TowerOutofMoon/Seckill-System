import { Col, Row } from 'antd'
import React, { Component } from 'react'
import sxbank from '../images/sxbank.jpg'
import carousel_2 from '../images/Carousel-1.png'
import carousel_3 from '../images/Carousel-2.jpg'
import carousel_4 from '../images/Carousel-3.png'
import carousel_5 from '../images/Carousel-4.png'
import carousel_6 from '../images/Carousel-5.png'
import { Carousel } from 'antd'
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export default class introduction extends Component {
    render() {
        return (
            <Row>
                <Col span={3}/>
                <Col span={21}>
                    <Carousel autoplay dotPosition="left" style={{ height: '500px' }}>
                        <div className="sxbank">
                            <img src={sxbank} alt="三湘银行" className='sxbank-img' />
                            <h1 className='title'>三湘银行</h1>
                            <span style={{ letterSpacing: '0.1em' }}>
                                湖南三湘银行股份有限公司是中部地区首家开业的民营银行，由三一集团联合汉森制药等9家湖南省内知名民营企业共同发起设立，于2016年12月26日正式开业，注册资本金30亿元，注册地湖南长沙。三湘银行以“让银行成为一种随时可得的服务”为使命，紧紧围绕目标产业生态圈和消费金融，着力打造Best银行，即：产业银行(Business Bank)、便捷银行(Easy Bank)、数字银行(Smart Bank)、财富管理银行(Treasury Bank)，成为目标客户的首选银行、优质体验银行和最信赖银行。
                            </span>
                        </div>
                        <div className="sxbank">
                            <img src={carousel_2} alt="三湘银行" className='sxbank-img' />
                        </div>
                        <div className="sxbank">
                            <img src={carousel_3} alt="三湘银行" className='sxbank-img' />
                        </div>
                        <div className="sxbank">
                            <img src={carousel_4} alt="三湘银行" className='sxbank-img' />
                        </div>
                        <div className="sxbank">
                            <img src={carousel_5} alt="三湘银行" className='sxbank-img' />
                        </div>
                        <div className="sxbank">
                            <img src={carousel_6} alt="三湘银行" className='sxbank-img' />
                        </div>
                    </Carousel>
                </Col>
            </Row>
        )
    }
}
