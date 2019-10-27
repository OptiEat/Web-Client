import React, {useState, useEffect} from 'react';
import useForm from "react-hook-form";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './index.scss';
import Layout from '../Layout';
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

function List(props){
    const { handleSubmit, register, errors } = useForm();
    const [selectedDate, setSelectedDate] = useState(
        props.foods && props.foods.Products.map((val) => {
            val = JSON.parse(val); 
            return new Date((new Date()).getTime() + 1000 * 60 * 60 * 24 * val.expiration);
        })
    );
    const onSubmit = values => {
        console.log(values);
        console.log(selectedDate);
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

    };
    var ls = window.localStorage;
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="listul">
            <li className="listli">
                <p>Product Name</p>
                <p>Quantity</p>
                <p>Expiration Date</p>
            </li>
            {props.foods && props.foods.Products.map((val, index)=>{
              val=JSON.parse(val);
              var quantity = val.quantity;
              var date = new Date();
              if(!selectedDate[index]){
                date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * val.expiration);
              }
             
             return <li className="listli" key={index}>
                    <input
                        name={`foodname[${index}]`}
                        className = "foodname"
                        ref={register({
                        required: 'Required'
                        })}
                        defaultValue = {val.shortName}
                    />
                    <div className = "quantitycontainer">
                        <input
                            type="number"
                            name={`foodquantity[${index}]`}
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
                    </div>
                    <input 
                        type = "date"
                        className = "expirationdate"
                        value={selectedDate[index] ? formatDate(selectedDate[index]) : formatDate(date) }
                        onChange={e => {
                                var date = e.target.value;
                                var stateBuf = JSON.parse(JSON.stringify(selectedDate));
                                stateBuf[index] = new Date(date);
                                setSelectedDate(stateBuf);
                            }}

                    />
                </li>
            }
            )
            }
            </ul>
            <input type="submit" className="submitButton"/>
        </form>
    )

}
function formatDate(date) {
    date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
  
    return year.toString() + '-' + month.toString().padStart(2, 0) + '-' + day.toString().padStart(2, 0);
  }
export default ScannedList;
