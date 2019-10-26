import React from 'react';
import useForm from "react-hook-form";
import './index.scss';
import Layout from '../Layout';
function Home(props) {
    var foods = [{
        name: "Chicken",
        quantity: 10,
        expiration: new Date("10/26/2019")
    }];
    return (
        <Layout>
            <List foods={foods}/>
        </Layout>
    )
}

function List(props){
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        console.log(values);
    };
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
            {props.foods && props.foods.map((val, index)=>{
             return <li key={index}>  
                    <input
                        name={`foodname[${index}]`}
                        ref={register({
                        required: 'Required'
                        })}
                        defaultValue = {val.name}
                    />
                    <input
                        type="number"
                        name={`foodquantity[${index}]`}
                        ref={register({
                        required: 'Required',
                        pattern: {
                            value: /^[0-9]*$/gm,
                            message: "Numbers Only"
                        }
                        })}
                        defaultValue = {val.quantity}
                    />
                    <input
                        type="date"
                        name={`expirationdate[${index}]`}
                        ref={register({
                        required: 'Required',
                        pattern: {
                            value: /^[0-9]*$/gm,
                            message: "Numbers Only"
                        }
                        })}
                        defaultValue = {new Date(val.expiration)}
                    />
                </li>
            }  
            )
            }
            </ul>
            <input type="submit"/>
        </form>
    )
    
}

export default Home;
