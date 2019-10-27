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
    const [selectedDate, setSelectedDate] = useState([]);
    const onSubmit = values => {
        console.log(values);
    };

    console.log(props.foods.Products);
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul class="listul">
            {props.foods && props.foods.Products.map((val, index)=>{
              val=JSON.parse(val);
             return <li class="listli" key={index}>
                    <input
                        name={`foodname[${index}]`}
                        className = "foodname"
                        ref={register({
                        required: 'Required'
                        })}
                        defaultValue = {val.shortName}
                    />
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
                    <DatePicker
                        className = "expirationdate"
                        selected={selectedDate[index] ? new Date(selectedDate[index]) : new Date(new Date().setDate(new Date().getDate() + val.expiration))}
                        onChange={date => {
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

export default ScannedList;
