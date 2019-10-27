import React from 'react';
import './index.scss';
import { Upload, message, Button } from 'antd';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import Layout from '../Layout';
function Home() {
    return (
        <Layout>
        <div className ="Home">
            <section className="Hero">
            <div src="/food.jpg" id='heroImage'>
            <div className='heroText'><h1>Opti<strong>Eat</strong></h1>
            <p style={{textOverlow: "wrap"}}>Minimizing food waste with Machine Learning and Computer Science</p></div>
            <Link to="/scan">
            <Button id='StartScannignButton'>
                Create <br/>Meal Plan
            </Button>
            </Link>
            </div>
            </section>

            </div>
        </Layout>
    )
}
export default Home;
