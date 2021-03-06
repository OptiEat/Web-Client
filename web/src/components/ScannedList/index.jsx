import React, {useState, useEffect} from 'react';
import { Upload, message, Button, Form, Icon, Input,Select,Row,Col,DatePicker, TimePicker,InputNumber } from 'antd';
import 'antd/dist/antd.css';
import useForm from "react-hook-form";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import './index.scss';
import Layout from '../Layout';
import $ from 'jquery';
const dateFormat = 'YYYY/MM/DD';
function ScannedList(props) {
    return (
        <Layout>
            <List foods={props.foods} setScannedFoods={props.setScannedFoods} setAutoRun={props.setAutoRun}/>
        </Layout>
    )
}

function List(props){
    const { register, handleSubmit, setValue } = useForm();
    const [selectedDate, setSelectedDate] = useState(
        props.foods && props.foods.Products.map((val) => {
            //val = JSON.parse(val);
            return formatDate(new Date((new Date()).getTime() + 1000 * 60 * 60 * 24 * val.expiration));
        })
    );

    console.log(selectedDate);

    const onSubmit = (values) => {
      let n = props.foods.Products.length;
      console.log(values);
      console.log($("#foodname-0"));
      for (let index = 0; index < n; index++) {
        let val = $("#foodname-" + index).val();
        let thisFoodquantity = $("#foodquantity-" + index).val();

        if(ls[val])
        {
            ls[val] = JSON.stringify({
                quantity: (parseInt( (JSON.parse(ls[val]))['quantity'] ) + parseInt(thisFoodquantity)),
                expiration: selectedDate[index],
                quantityType: props.foods.Products[index].quantityType
                });
        }
        else {
            ls[val] = JSON.stringify({
                quantity: parseInt(thisFoodquantity),
                expiration: selectedDate[index],
                quantityType: props.foods.Products[index].quantityType
                });
        }
      }
      props.setAutoRun(true);
      props.setScannedFoods(props.foods.Products);
    }
      /*
        console.log(values);
        values.foodname.map((val, index)=>{
        if(ls[val])
        {
            ls[val] = JSON.stringify({
                quantity: (parseInt( (JSON.parse(ls[val]))['quantity'] ) + parseInt(values.foodquantity[index])),
                expiration: selectedDate[index]
                });
        }
        else
            ls[val] = JSON.stringify({
                quantity: parseInt(values.foodquantity[index]),
                expiration: selectedDate[index]
                });
        });
*/

    var ls = window.localStorage;
    return(
        <form  onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col xs={5} sm={5} md={6} lg={6} xl={6}>Product Name</Col>
          <Col xs={11} sm={11} md={8} lg={8} xl={8}>Expiration Date</Col>
          <Col span={4}>Quantity</Col>
          </Row>
            {props.foods && props.foods.Products.map((val, index)=>{
              var quantity = val.quantity;
             return <Row className="listli" key={index} gutter={16}>
                    <Col xs={5} sm={5} md={6} lg={6} xl={6}><Form.Item>
                        <Input name={`foodname[${index}]`}
                        id={`foodname-${index}`}
                        className = "foodname"
                        ref={register({
                        required: 'Required'
                        })}
                        defaultValue = {val.shortName} />
                    </Form.Item></Col>

                    <Col xs={11} sm={11} md={8} lg={8} xl={8}>
                    <Form.Item><DatePicker defaultValue={moment(selectedDate[index], dateFormat)}
                    onChange={e => {
                      var stateBuf = JSON.parse(JSON.stringify(selectedDate));
                      console.log(e);
                      stateBuf[index] = formatDate(e._d);
                      setSelectedDate(stateBuf);}
                    }/></Form.Item>
                    </Col>
                    <Col span={4} className="quantityCol"><Form.Item className = "quantitycontainer">
                        <InputNumber
                            type="number"
                            name={`foodquantity[${index}]`}
                            id={`foodquantity-${index}`}
                            className = "foodquantity"
                            ref={register({
                            required: 'Required',
                            pattern: {
                                value: /^[0-9]*$/gm,
                                message: "Numbers Only"
                            }
                            })}
                            defaultValue = {val.quantity}
                        />
                        <label>{
                          val.quantityType == 'Count' ? ' ct' :
                          val.quantityType == 'Pounds' ? ' lb' :
                          val.quantityType == 'Boxes' ? ' bx' :
                          val.quantityType == 'Gallons' ? ' gl' :
                          val.quantityType == 'Fl Oz' ? ' oz' :
                          val.quantityType == 'Ounces' ? ' oz' :
                          val.quantityType == 'Packs' ? ' pk' :
                          val.quantityType == 'Jars' ? ' jr' : ""
                          }</label>
                    </Form.Item>

                    </Col>
                </Row>
            }
            )
            }


            <Button type="primary" htmlType="submit">
           Submit
         </Button>
        </form>
    )

}
/*
type = "date"
className = "expirationdate"
value={selectedDate[index]}
onChange={e => {
        var newDate = e.target.value;
        var stateBuf = JSON.parse(JSON.stringify(selectedDate));
        stateBuf[index] = newDate;
        setSelectedDate(stateBuf);
    }}
    */
/*
<DatePicker/>
*/
function formatDate(date) {
    date = new Date(date);

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    month++;
    return year.toString() + '-' + month.toString().padStart(2, 0) + '-' + day.toString().padStart(2, 0);
  }
export default ScannedList;
