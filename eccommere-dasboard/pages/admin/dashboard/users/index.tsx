import Head from 'next/head'
import React from 'react'
import UserList from '../../../../components/admin/users/UserList'
import DefaultLayout from '../../../../layouts/default/DefaultLayout'

const UsersIndex = () => {
    return (
        <div>
            <Head>
                <title>UsersIndex</title>
            </Head>

            <UserList/>
        </div>
    )
}

UsersIndex.layout = DefaultLayout
export default UsersIndex