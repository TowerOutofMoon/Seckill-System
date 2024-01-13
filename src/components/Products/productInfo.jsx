import React, {Component} from 'react';
import {connect} from "react-redux";
import {Breadcrumb, Col, PageHeader, Row} from "antd";
import {Link} from "react-router-dom";
import withRouter from "../../withRouter";
import {productSearchReq} from "../../actions/productControlAction";
import moment from "moment";

class ProductInfo extends Component {
    state = {
        productName: '国元信托-安泰08002号山东临淄公有ppn投资',
        productRate: 7.4,
        productPeriod: 16,
        productReleaseDay: '2019年9月26日-2019年9月29日',
        productHarvestDay: '2019年9月30日',
        productExpireDay: '2019年12月30日',
        productDistricts: '全国',
        productScale: '500,000,000',
        productCode: 'LQ19059',
        productAddition: '本行在产品到期日或实际终止日后 3 个工作日内一次性兑付产品本金和收益；\n' +
            '产品到期日或实际终止日至资金到账日期间，产品不计付收益'
    }

    componentDidMount() {
        //拿到对应产品的id
        const {seckillProductName} = this.props.params
        //请求后端接口数据
        this.props.productSearchReq(seckillProductName).then(
            res => {
                console.log(res);
                const {
                    seckillProductName, productRate,
                    productPeriod,
                    productReleaseEndDay, productReleaseStartDay,
                    productHarvestDay, productExpireDay,
                    productScale, productCode,
                    productAddition
                } = res.data.result
                this.setState({
                    productName: seckillProductName, productRate, productPeriod,
                    productReleaseDay: moment(productReleaseEndDay).format('YYYY年MM月DD日') + '-' +
                        moment(productReleaseStartDay).format('YYYY年MM月DD日'),
                    productHarvestDay: moment(productHarvestDay).format('YYYY年MM月DD日'),
                    productExpireDay: moment(productExpireDay).format('YYYY年MM月DD日'),
                    productScale, productCode,
                    productAddition
                })
            },
            error => {
                console.log(error);
            }
        )
    }

    render() {
        const {
            productName, productRate, productPeriod,
            productReleaseDay, productHarvestDay, productExpireDay,
            productDistricts, productScale, productCode, productAddition
        } = this.state
        return (
            <div className="product-intro-page">
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/introduction">首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/product-sale">产品购买</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>产品详情</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col span={4}/>
                            <Col span={16} className="product-info-content">
                                <PageHeader title={productName} onBack={() => window.history.back()}>
                                    <Row className='intro-title'>
                                        <Col span={6}>
                                            <h1 style={{color: '#ED714E'}}>{productRate}<span
                                                className="intro-small">%</span></h1>
                                            <p className="intro-small">产品收益</p>
                                        </Col>
                                        <Col span={12}/>
                                        <Col span={6}>
                                            <h1 style={{color: '#ED714E'}}>{productPeriod}<span
                                                className="intro-small">月</span></h1>
                                            <p className="intro-small">产品期限</p>
                                        </Col>
                                    </Row>
                                    <Row className="intro-title">
                                        <ul className="intro-list">
                                            <li>
                                                <span>发行期:</span>{productReleaseDay}
                                            </li>
                                            <li>
                                                <span>起息日:</span>{productHarvestDay}
                                            </li>
                                            <li>
                                                <span>到期日:</span>{productExpireDay}
                                            </li>
                                            <li>
                                                <span>产品期限:</span>{productPeriod}
                                            </li>
                                            <li>
                                                <span>销售地区:</span>{productDistricts}
                                            </li>
                                            <li>
                                                <span>发行规模:</span>{productScale}
                                            </li>
                                            <li>
                                                <span>产品代码:</span>{productCode}
                                            </li>
                                            <li>
                                                <span>收益说明:</span>{productAddition}
                                            </li>
                                        </ul>
                                    </Row>
                                    <Row>
                                        <p style={{color: '#c20404', fontWeight: '700'}}>投资有风险，选择需谨慎</p>
                                    </Row>
                                </PageHeader>
                            </Col>
                            <Col span={4}/>
                        </Row>
                    </Col>
                    <Col span={4}/>
                </Row>
            </div>
        );
    }
}

export default connect(
    null,
    {
        productSearchReq
    }
)(withRouter(ProductInfo));