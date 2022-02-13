import React from 'react'
import { LayoutProps } from '../PageWithLayout'

const AuthLayout: LayoutProps = ({ children }) => {
    return (
        <div>{children}</div>
    )
}

export default AuthLayout