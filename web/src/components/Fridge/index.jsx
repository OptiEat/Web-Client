import React, {useState, useEffect} from 'react';
import {Input,  Row, Col, Button , Collapse, Icon, DatePicker,Form, InputNumber} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './index.scss';
import Layout from '../Layout';
const { Panel } = Collapse;
const dateFormat = 'YYYY/MM/DD';

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
            {keys.map((tval, index) => {
              if(tval != 'mealPlan') {
              let val = JSON.parse(ls[tval]);
              return <Col span ={12} className="fridgeItem" key={index}>
                <div className='fridgeInnerItem'>
                <h3>{tval.substring(0,1).toUpperCase() + tval.substring(1)}</h3>
                <span className='expirationRow'>Expiration: <DatePicker
                    defaultValue={moment(val['expiration'], dateFormat)}
                    onChange={e => {
                      console.log(e);
                      val['expiration'] = formatDate(e._d);
                      ls[tval] = JSON.stringify(val);
                    }
                    }
                  />
                </span> {/*val['expiration']*/}
                <p>Amount: <InputNumber
                            type="number"
                            defaultValue = {val.quantity}
                            onChange = {e => {
                              console.log(e);
                              val['quantity'] = e;
                              ls[tval] = JSON.stringify(val);
                            }}
                        />
                         { val['quantityType'] == 'Count' ? " " + tval + "s" : " " +val['quantityType']}</p>
                </div>
              </Col>
            }})}
            </Row>
          </div>
      </Layout>
    )

}

function Meals(props) {
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

function formatDate(date) {
  date = new Date(date);

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  month++;
  return year.toString() + '-' + month.toString().padStart(2, 0) + '-' + day.toString().padStart(2, 0);
}

export default Fridge;
