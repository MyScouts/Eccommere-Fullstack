import { Button, Col, message, Row } from 'antd'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../common/CartContext';
import { IProductInfo } from '../../../interface/products';
import { getProductsService } from '../../../services/productService';
import ProductCard from '../product_card/ProductCard';



interface IPagination {
    // itemCount: number;
    // perPage: number;
    current: number;
    pageSize: number;
}

const ProductList = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProductInfo[]>([]);
    const [response, setResponse] = useState<IPagination>({
        current: 1,
        pageSize: 10
    });
    const {cart, total, addToCart, removeFromCart} = useContext(CartContext)

    const getProducts = async () => {
        const result = await getProductsService({
            page: 1,
            pageSize: 12,
            search: ""
        })
        if (result && result.itemCount > 0) {
            setProducts(result.items)
            setResponse({
                current: result.currentPage,
                pageSize: result.pageCount ?? 1,
            })

        }
    }

    const loadMoreProducts = async ({ page }: { page: number }) => {
        const result = await getProductsService({
            page: page,
            pageSize: 12,
            search: ""
        })
        if (result && result.itemCount > 0) {
            setProducts([...products, ...result.items])
        }else{
            message.info("No more products") 
        }
    }


    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Row style={{ backgroundColor: "white", padding: "1rem" }}>
            <h1 style={{ fontSize: 20, fontWeight: "bolder" }}>PRODUCTS </h1>

            <Col span={20} style={{ marginTop: 50 }}>

                <Row justify='space-around' >
                    {
                        products && products.length > 0 &&
                        products.map((product, index) => <ProductCard product={product} key={index} />)
                    }
                </Row>

                <Row justify='center' style={{ marginTop: 50 }}>
                    <Button onClick={loadMoreProducts}>
                        Load More
                    </Button>
                </Row>
            </Col>
        </Row>
    )
}

export default ProductList