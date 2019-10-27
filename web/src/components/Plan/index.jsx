import React, {useState, useEffect} from 'react';
import {Input,  Row, Col, Button , Collapse, Icon, message} from 'antd';

import 'antd/dist/antd.css';
import DatePicker from 'react-datepicker';
import './index.scss';
import Layout from '../Layout';
const { Panel } = Collapse;
const someFood = [
  {name:"Baked Chicken", ingredients: "Chicken, Olive Oil, Lettuce", link:"https://www.google.com", image:"https://www.skinnytaste.com/wp-content/uploads/2010/02/Roast-Chicken-with-Rosemary-_-Lemon-Finals-15.jpg"}, {name:"Chicken Burger", link:"", image:"https://easychickenrecipes.com/wp-content/uploads/2019/06/fried-chicken-sandwich-4-of-7.jpg", ingredients: "Buns, Chicken, Olive Oil, Lettuce"}
]
const listOfFunnyMessages = ["Cooking the chicken breast", "Marinating the meats", "Salting the eggs", "Dicing the onions and tomatoes", "Stirring the pots and using pans",
"Watching Gordon Ramsey videos", "Grating cheese and drinking wine", "Adding mozzarella on that pizza", "Tasting the lentil soup", "Cutting open watermelons", "Taking a water break",
"Looking for inspiration"];
const request = require('request');
function Plan(props){
    const [loading, setLoading] = useState(false);
    const [regenMealText, setRegenMealText] = useState("Regenerate Meal Plan");
    //console.log(props.foods.Products);
    const [funText, setFunText] = useState("Cooking the chicken breast");
    let funnyMessageTimer = "";
    const handleClick = (e) => {
      //use localstorage to handle this click
      setLoading(true);
      setRegenMealText("Generating");
      funnyMessageTimer=setInterval(function(){
        setFunText(listOfFunnyMessages[Math.floor(Math.random() * listOfFunnyMessages.length)]);
      }, 1000);

      // get data from localStorage
      let ls = window.localStorage;
      let foodKeys = Object.keys(ls);
      let productsData = [];
      for (let key of foodKeys) {
        let foodItemData = JSON.parse(ls[key]);
        foodItemData.shortName = key;
        productsData.push(foodItemData);
      }

      var options = {
        //url: "https://optieat.herokuapp.com/api/query/compute/",
        url:"http://localhost:5000/api/query/compute",
        method: "POST",
        json: {
          "Products": productsData
        }
      };
      request(options, (err, resp, body) => {
        console.log(resp);
        if (resp) {
          message.success(`Successfully Created Meal Plan!`);
          setLoading(false);
          console.log(err);
        }
        else {
          message.error("Scan failed");
        }
      });

    }
    return(
      <Layout>
          <div className="Plan">
            <h1 id='PlanTitle'>Your meal plan </h1><Icon type="smile" theme="twoTone" twoToneColor="#88d657" id='smileIcon'/>
            <div className='mealBlock'>
              <h2>Today's suggested meals</h2>
              <Meals meals={someFood}/>
            </div>
            <div className='mealBlock'>
              <h2>Tomorrow's suggested meals</h2>
              <Meals meals={someFood}/>
            </div>
            {loading ? <p id='funnyMessage'>{funText}</p> : ""}
            <Button className="regenMeal" loading={loading} onClick={handleClick}>{regenMealText}</Button>

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
              <p className='ingredientsInfo'>Ingredients: {val.ingredients}</p>
              <a href={val.link}><Button className="tryRecipeButton">Try the recipe!</Button></a></center>
            </Panel>
        })

      }
    </Collapse>
  )
}

export default Plan;
