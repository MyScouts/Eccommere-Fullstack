import React from 'react'
import ProductList from '../../components/user/products/ProductList'
import DefaultLayout from '../../layouts/default/DefaultLayout'
import UserLayout from '../../layouts/user/UserLayout'

const HomeIndex = () => {
    return (
        <div>
            <ProductList />
        </div>
    )
}
HomeIndex.layout = UserLayout
export default HomeIndex
