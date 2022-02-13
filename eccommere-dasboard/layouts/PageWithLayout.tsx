import { NextPage } from "next"
import type { ReactElement } from "react"
import AuthLayout from "./auth/AuthLayout"
import DefaultLayout from "./default/DefaultLayout"

export type PageWithAuthLayoout = NextPage & { layout: typeof AuthLayout, canAuth: boolean | null }
export type PageWithDefaultLayout = NextPage & { layout: typeof DefaultLayout, canAuth: boolean | null }
export type PageWithLayoutType =
    | PageWithAuthLayoout
    | PageWithDefaultLayout
export type LayoutProps = ({
    children,
}: {
    children: ReactElement
}) => ReactElement
export default PageWithLayoutType