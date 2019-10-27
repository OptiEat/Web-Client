import React, {useState, useEffect} from 'react';
import {Input,  Row, Col, Button , Collapse, Icon} from 'antd';

import 'antd/dist/antd.css';
import DatePicker from 'react-datepicker';
import './index.scss';
import Layout from '../Layout';
const { Panel } = Collapse;

let fridgeContents = [
  {name:"Milk", expiration:"10/29/2019"}, {name:"Chicken", expiration:"10/29/2019"}, {name:"Lettuce", expiration:"10/29/2019"},{name:"Olive Oil", expiration:"12/02/2019"},
  {name:"Kale", expiration:"10/31/2019"}, {name:"Oranges", expiration:"10/28/2019"}, {name:"Kimchi", expiration:"11/25/2019"},{name:"Salmon", expiration:"11/22/2019"}
];

function Fridge(props){
    let ls = window.localStorage;
    let keys = Object.keys(ls);

    return(
      <Layout>
          <div className="Fridge">
            <h1>What's in your fridge?</h1>
            <Row>
            {

            }
            {keys.map((val, index) => {
              return <Col span ={12} className="fridgeItem">
                <div class='fridgeInnerItem'>
                <h3>{val.substring(0,1).toUpperCase() + val.substring(1)}</h3>
                <span>Expiration:</span>
                <p>{val.expiration}</p>
                <p>Amount: {val.quantity}</p>
                </div>
              </Col>
            })}
            </Row>
          </div>
      </Layout>
    )

}

function Meals(props) {
console.log(props.meals);
  return (
    <Collapse accordion>
      {props.meals.map((val, index) =>
        {
          return <Panel header={val.name} key={"" + index}>
              <center>
              <img className='mealImage' src={val.image} />
              <p>Ingredients: {val.ingredients}</p>
              <a href={val.link}><Button>Try the recipe!</Button></a></center>
            </Panel>
        })

      }
    </Collapse>
  )
}

export default Fridge;
