import React, {Component} from 'react';
import {Collapse, Descriptions, PageHeader, Pagination} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {allProductInfoReq} from "../../actions/productControlAction";
const {Panel} = Collapse;

class MyProductsInfo extends Component {
    state = {
        products: [
            {
                seckillProductName: '国元信托-安泰08001号山东临淄公有ppn投资',
                // productRate: 7.4,
                // productPeriod: 16,
                // productReleaseDay: '2019年9月26日-2019年9月29日',
                // productHarvestDay: '2019年9月30日',
                // productExpireDay: '2019年12月30日',
                // productDistricts: '全国',
                // productScale: '500,000,000',
                // productCode: 'LQ19059',
                // productAddition: '本行在产品到期日或实际终止日后 3 个工作日内一次性兑付产品本金和收益；\n' +
                    // '产品到期日或实际终止日至资金到账日期间，产品不计付收益'
            },
            {
                seckillProductName: '国元信托-安泰08002号山东临淄公有ppn投资',
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
            },
            {
                seckillProductName: '国元信托-安泰08003号山东临淄公有ppn投资',
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
            },
        ]
    }
    componentDidMount() {
        this.setState({products:[]})
        this.props.allProductInfoReq().then(
            res => {
                console.log(res.data);
                let newProducts = [];
                const products = res.data.result;
                products.map((productObj) => {
                    newProducts = [...newProducts,productObj];
                })
                console.log(newProducts);
                this.setState({products:newProducts})
            },
            error => {
                console.log(error);
            }

        )
    }
    render() {
        return (
            <div style={{minHeight:'500px'}}>
                {
                    this.state.products.map((productObj, index) => {
                            return (
                                <Collapse>
                                    <Panel key={index} header={productObj.seckillProductName}>
                                        <PageHeader
                                            ghost={false}
                                            title={productObj.seckillProductName}
                                            subTitle="详情信息"
                                            extra={[
                                                <Link to={`/product-intro/:${productObj.seckillProductName}`}>
                                                    在产品页中查看
                                                </Link>,
                                            ]}
                                        >
                                            <Descriptions size="small" bordered>
                                                <Descriptions.Item label="利率"
                                                                   span={2}>{productObj.productRate || "0"}%</Descriptions.Item>
                                                <Descriptions.Item
                                                    label="产品期限">{productObj.productPeriod || "0"}个月</Descriptions.Item>
                                                <Descriptions.Item label="起息日"
                                                                   span={2}>{productObj.productHarvestDay || "未设置"}</Descriptions.Item>
                                                <Descriptions.Item label="到期日"
                                                                   span={2}>{productObj.productExpireDay || "未设置"}</Descriptions.Item>
                                                <Descriptions.Item label="发行规模"
                                                                   span={2}>{productObj.productScale || "未设置"}</Descriptions.Item>
                                                <Descriptions.Item label="发行期"
                                                                   span={2}>{productObj.productReleaseStartDay || "未设置"}——{productObj.productReleaseEndDay || "未设置"}</Descriptions.Item>
                                                <Descriptions.Item label="发行地区"
                                                                   span={2}>全国</Descriptions.Item>
                                                <Descriptions.Item label="产品代码"
                                                                   span={2}>{productObj.productCode || "未设置"}</Descriptions.Item>
                                                <Descriptions.Item
                                                    label="其他信息">{productObj.productAddition || "未设置"}</Descriptions.Item>
                                            </Descriptions>
                                        </PageHeader>
                                    </Panel>
                                </Collapse>

                            )
                        }
                    )
                }
            </div>
        );
    }
}

export default connect(
    null,
    {
        allProductInfoReq
    }
)(MyProductsInfo);