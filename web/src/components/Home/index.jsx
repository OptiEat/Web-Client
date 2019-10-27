import React from 'react';
import './index.scss';
import Layout from '../Layout';
function Home() {
    return (
        <Layout>
        <div className ="Home">
            <section className="Hero">
            <div src="/food.jpg" id='heroImage'>
            <div className='heroText'><h1>OptiEat</h1>
            <p>Optimizing food use with Machine Learning and Advanced Algorithms</p></div>

            </div>
            </section>
            </div>
        </Layout>
    )
}
export default Home;
