import React from "react";
import { Route, Routes } from 'react-router-dom'

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/loginPage";
import Register from "./components/Register/registerPage";

import AdminRegister from "./components/Admin/adminRegister";
import AdminLogin from "./components/Admin/adminLogin";
import AdminIndex from "./components/Admin/adminIndex";

import FlashMessageList from "./components/Flash/flashMessageList";

import Backstage from "./components/BackStage/backstage";
import MyUsers from "./components/BackStage/myUsers"
import MyApply from "./components/BackStage/myApply"
import MyOrder from "./components/Order/myOrder";
import UserProducts from "./components/UserProducts/myProducts"

import ProductSale from "./components/Products/ProductSale";
import ProductDisplay from "./components/Products/ProductDisplay";

import Introduction from "./components/Introduction/introduction";

import requireAuth from "./utils/validations/requireAuth";
import MyProducts from "./components/BackStage/myProducts";
import ProductInfo from "./components/Products/productInfo";
import MyAdd from "./components/BackStage/myAdd";
import MyCompany from "./components/BackStage/myCompany";
import MyUsersInfo from "./components/BackStage/myUsersInfo";
import MyUsersControl from "./components/BackStage/myUsersControl";
import MyProductsInfo from "./components/BackStage/myProductsInfo";
import MyAccount from "./components/BackStage/myAccount";
import MyCompanyProfit from "./components/BackStage/myCompanyProfit";
import MyCompanySeason from "./components/BackStage/myCompanySeason";



const ProductsSale = requireAuth(ProductSale)

export default (
    <div>
        <Routes>
            <Route path='/' element={<Navbar />} >
                <Route path='/' element={<Introduction />} />
                <Route path='/flash-message' element={<FlashMessageList />}/>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/product-sale' element={<ProductsSale />} />
                <Route path='/product-display' element={<ProductDisplay />} />
                <Route path='/product-intro/:seckillProductName' element={<ProductInfo />} />
                <Route path='/introduction' element={<Introduction />} />
                <Route path='/my-order' element={<MyOrder />} />
                <Route path='/my-product' element={<UserProducts/>} />
            </Route>
            <Route path='/admin' element={<Backstage />} >
                <Route path='/admin' element={<MyCompanyProfit />} />
                <Route path='/admin/user' element={<MyUsers />} />
                <Route path='/admin/product' element={<MyProducts />} />
                <Route path='/admin/product-info' element={<MyProductsInfo />} />
                <Route path='/admin/apply' element={<MyApply />} />
                <Route path='/admin/add' element={<MyAdd />} />
                <Route path={'/admin/company-account'} element={<MyCompany />} />
                <Route path={'/admin/company-profit'} element={<MyCompanyProfit />} />
                <Route path={'/admin/company-season'} element={<MyCompanySeason />} />
                <Route path='/admin/account' element={<MyAccount />} />
                <Route path={'/admin/user-info'} element={<MyUsersInfo />} />
                <Route path={'/admin/user-info-control/:identityNumber'} element={<MyUsersControl />} />
            </Route>
            <Route path='/admin-use' element={<AdminIndex />} >
                <Route path='/admin-use' element={<AdminLogin />} />
                <Route path='/admin-use/admin-register' element={<AdminRegister />} />
                <Route path='/admin-use/admin-login' element={<AdminLogin />} />
            </Route>
        </Routes>
    </div>
)