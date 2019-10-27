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
    var foods = [{
        name: "Chicken",
        quantity: 10,
        expiration: new Date("10/26/2019")
    }];
    return (
        <Layout>
            <List foods={props.foods}/>
        </Layout>
    )
}
let fdata ="[\"{\\\"id\\\": \\\"LGM CHILI OIL SAUCE IN JAR\\\", \\\"description\\\": \\\"Chili oil sauce\\\", \\\"quantity\\\": \\\"1\\\", \\\"quantityType\\\": \\\"Jars\\\", \\\"expiration\\\": \\\"365\\\", \\\"shortName\\\": \\\"chili\\\"}\",\"{\\\"id\\\": \\\"KADOYA SESAME OIL\\\", \\\"description\\\": \\\"Kadoya Sesame Oil\\\", \\\"quantity\\\": \\\"15\\\", \\\"quantityType\\\": \\\"Fl Oz\\\", \\\"expiration\\\": \\\"180\\\", \\\"shortName\\\": \\\"oil\\\"}\",\"{\\\"id\\\": \\\"WU-MU CN BEIJING-NOODLE\\\", \\\"description\\\": \\\"Beijing Noodles\\\", \\\"quantity\\\": \\\"1\\\", \\\"quantityType\\\": \\\"Boxes\\\", \\\"expiration\\\": \\\"60\\\", \\\"shortName\\\": \\\"noodle\\\"}\",\"{\\\"id\\\": \\\"ROSEMARY PASTURE RAISED EGGS\\\", \\\"description\\\": \\\"Rosemary Pasture Raised Eggs\\\", \\\"quantity\\\": \\\"6\\\", \\\"quantityType\\\": \\\"Count\\\", \\\"expiration\\\": \\\"20\\\", \\\"shortName\\\": \\\"egg\\\"}\",\"{\\\"id\\\": \\\"HORIZON\\\", \\\"description\\\": \\\"Horizon Milk\\\", \\\"quantity\\\": \\\"1\\\", \\\"quantityType\\\": \\\"Gallons\\\", \\\"expiration\\\": \\\"10\\\", \\\"shortName\\\": \\\"milk\\\"}\",\"{\\\"id\\\": \\\"HORIZON ORGANIC WHOLE MILK\\\", \\\"description\\\": \\\"Horizon Organic Whole Milk\\\", \\\"quantity\\\": \\\"1\\\", \\\"quantityType\\\": \\\"Gallons\\\", \\\"expiration\\\": \\\"10\\\", \\\"shortName\\\": \\\"milk\\\"}\",\"{\\\"id\\\": \\\"GREEN SEEDLESS GRAPE\\\", \\\"description\\\": \\\"Green Seedless Grapes\\\", \\\"quantity\\\": \\\"15\\\", \\\"quantityType\\\": \\\"Ounces\\\", \\\"expiration\\\": \\\"8\\\", \\\"shortName\\\": \\\"grape\\\"}\",\"{\\\"id\\\": \\\"ORGANIC BABY SPRING MIX\\\", \\\"description\\\": \\\"Organic Baby Spring Vegetables Mix\\\", \\\"quantity\\\": \\\"10\\\", \\\"quantityType\\\": \\\"Ounces\\\", \\\"expiration\\\": \\\"6\\\", \\\"shortName\\\": \\\"salad\\\"}\"]";

function List(props){
  let parsedFoodData = JSON.parse(fdata);
    const { register, handleSubmit, setValue } = useForm();
    const [selectedDate, setSelectedDate] = useState(
        props.foods && props.foods.Products.map((val) => {
            //val = JSON.parse(val);
            return formatDate(new Date((new Date()).getTime() + 1000 * 60 * 60 * 24 * val.expiration));
        })
    );

    console.log(selectedDate);

    const onSubmit = (values) => {
      let n = parsedFoodData.length;
      console.log(values);
      console.log($("#foodname-0"));
      for (let index = 0; index < n; index++) {
        let val = $("#foodname-" + index).val();
        let thisFoodquantity = $("#foodquantity-" + index).val();

        if(ls[val])
        {
            ls[val] = JSON.stringify({
                quantity: (parseInt( (JSON.parse(ls[val]))['quantity'] ) + parseInt(thisFoodquantity)),
                expiration: selectedDate[index]
                });
        }
        else {
            ls[val] = JSON.stringify({
                quantity: parseInt(thisFoodquantity),
                expiration: selectedDate[index]
                });
        }
      }
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
    React.useEffect(() => {
      register({ name: "AntdInput" }); // custom register antd input
    }, [register])
    const handleChange = (e) => {
      console.log(e.target.value);
      register({ name: "AntdInput" }, e.target.value);
    }
    return(
        <form  onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col span={10}>Product Name</Col>
          <Col span={4}>Quantity</Col>
          <Col span={10}>Expiration Date</Col>
          </Row>
            {props.foods && props.foods.Products.map((val, index)=>{
              var quantity = val.quantity;
             return <Row className="listli" key={index}>
                    <Col span={10}><Form.Item>
                        <Input name={`foodname[${index}]`}
                        id={`foodname-${index}`}
                        className = "foodname"
                        ref={register({
                        required: 'Required'
                        })}
                        defaultValue = {val.shortName} />
                    </Form.Item></Col>
                    <Col span={4}><Form.Item className = "quantitycontainer">
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
                    </Form.Item></Col>
                    <Col span={8}>
                    <Form.Item><DatePicker defaultValue={moment(selectedDate[index], dateFormat)}
                    onChange={e => {
                      var stateBuf = JSON.parse(JSON.stringify(selectedDate));
                      stateBuf[index] = formatDate(e._d);
                      setSelectedDate(stateBuf);}
                    }/></Form.Item>
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
