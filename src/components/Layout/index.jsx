import React from 'react';
import './index.scss'
import Header from '../Header';
function Layout(props) {
    return (
        <div className="Layout">
        <Header/>
            <div className="container">
            {props.children}
            </div>
        </div>
    )
}

export default Layout
