import React from 'react'
import Header from '../components/header/Header'
import "./layout.css"
const Layout = (props) => {
    const { children } = props;
    return (
        <>
            <div className="layout-header-container">

                <Header />
            </div>
            <div>{children}</div>
        </>
    )
}

export default Layout
