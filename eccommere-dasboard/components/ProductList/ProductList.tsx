import { Table } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { IProductInfo } from '../../interface/products'
import { getProductsService } from '../../services/productService';

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
    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'productId',
            // sorter: true,
            render: (name: string) => <div className='element-link' onClick={() => router.push({
                pathname: '/admin/dashboard/products/[id]',
                query: { id: name }

            })}>{name}</div>,
            // width: '20%',
        }, {
            title: 'Product Name',
            dataIndex: 'productName',
        }, {
            title: 'Description',
            dataIndex: 'description',
            // render: (name: string) => <div className='one-line'>{name}</div>
        },

        {
            title: 'Price',
            dataIndex: 'price',
        }, {
            title: 'Quantity',
            dataIndex: 'quantity'
        },

    ];
    const getProducts = async () => {
        const result = await getProductsService({
            page: 1,
            pageSize: 5,
            search: ""
        })
        console.log("🚀 ~ file: ProductList.tsx ~ line 47 ~ getProducts ~ result", result)
        if (result && result.itemCount > 0) {
            setProducts(result.items)
            setResponse({
                current: result.currentPage,
                pageSize: result.pageCount ?? 1,
            })

            console.log("🚀 ~ file: ProductList.tsx ~ line 16 ~ ProductList ~ response", response)
        }
    }

    const loadMoreProducts = async ({ page }: { page: number }) => {
        const result = await getProductsService({
            page: page,
            pageSize: 5,
            search: ""
        })
        if (result && result.itemCount > 0) {
            setProducts(result.items)
        }
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        loadMoreProducts({ page: pagination.current })
        console.log("🚀 ~ file: ProductList.tsx ~ line 60 ~ handleTableChange ~ pagination: any, filters: any, sorter: any", pagination, filters, sorter)

    };
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div style={{ marginTop: 50 }}>
            {
                products.length > 0 &&
                <Table
                    columns={columns}
                    // rowKey={record => record.login.uuid}
                    dataSource={products}
                    pagination={{ total: response.pageSize * 10 }}
                    // loading={loading}
                    onChange={handleTableChange}
                />
            }
        </div>
    )
}

export default ProductList