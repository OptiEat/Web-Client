import React from 'react';

import Layout from '../Layout';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import './index.scss';
function ScanPage() {
    return (
        <Layout>
            <div className ="ScanPage">
                <section className="ScannedImage">

                </section>
                <Button id='ScanReceiptButton'>Scan</Button>
            </div>
        </Layout>
    )
}
export default ScanPage;
