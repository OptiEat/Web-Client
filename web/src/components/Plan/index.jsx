import React, {useState, useEffect} from 'react';
import {Input,  Row, Col, Button , Collapse, Icon, message} from 'antd';

import 'antd/dist/antd.css';
import DatePicker from 'react-datepicker';
import './index.scss';
import Layout from '../Layout';
const { Panel } = Collapse;
const runAgain = 1;
const listOfFunnyMessages = ["Cooking the chicken breast", "Marinating the meats", "Salting the eggs", "Dicing the onions and tomatoes", "Stirring the pots and using pans",
"Watching Gordon Ramsey videos", "Grating cheese and drinking wine", "Adding mozzarella on that pizza", "Tasting the lentil soup", "Cutting open watermelons", "Taking a water break",
"Looking for inspiration"];
const request = require('request');
function Plan(props){
    const [loading, setLoading] = useState(false);
    const [regenMealText, setRegenMealText] = useState("Regenerate Meal Plan");
    //console.log(props.foods.Products);
    const [funText, setFunText] = useState("Cooking the chicken breast");
    const [recipes, setRecipes] = useState();
    let funnyMessageTimer = "";
    const handleClick = (e) => {
      //use localstorage to handle this click
      setLoading(true);
      setRegenMealText("Generating");
      funnyMessageTimer=setInterval(function(){
        setFunText(listOfFunnyMessages[Math.floor(Math.random() * listOfFunnyMessages.length)]);
      }, 3000);

      // get data from localStorage
      let ls = window.localStorage;
      let foodKeys = Object.keys(ls);
      let productsData = [];
      for (let key of foodKeys) {
        if (key != 'mealPlan') {
          let foodItemData = JSON.parse(ls[key]);
          foodItemData.shortName = key;
          const date1 = new Date();
          const date2 = new Date(foodItemData.expiration);
          const diffTime = Math.abs(date2 - date1);
          foodItemData.expiration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          productsData.push(foodItemData);
        }
      }
      console.log(productsData);
      var options = {
        url: "https://optieat.herokuapp.com/api/query/compute/",
        // url:"http://localhost:5000/api/query/compute",
        method: "POST",
        json: {"Products": productsData}
      };
      request(options, (err, resp, body) => {
        console.log(body);
        console.log(resp);
        if (resp) {
          message.success(`Successfully Created Meal Plan!`);
          setLoading(false);
          if(body.body)
            setRecipes(resp.body.body.Recipes);
            localStorage.setItem('mealPlan', JSON.stringify(resp.body.body.Recipes));
          console.log(err);
        }
        else {
          message.error("Scan failed");
        }
        setLoading(false);
        setRegenMealText("Regenerate Meal Plan");
      });

    }

    var days = [];

  if(recipes){
    for(var i = 0; i < recipes.length/3; i++){
      days.push([]);
      for(var j = 0; j < 3 && recipes[i*3+j]; j++){
        days[i].push(recipes[i*3+j]);
      }
    }
  }
  useEffect(() => {
    // Update the document title using the browser API
    let storedRecipes = JSON.parse(localStorage.getItem('mealPlan'));
    console.log(storedRecipes);
    setRecipes(storedRecipes);
  }, [runAgain]);
    return(
      <Layout>
          <div className="Plan">
            <div>
<h1 id='PlanTitle'>Your meal plan </h1><Icon type="smile" theme="twoTone" twoToneColor="#88d657" id='smileIcon'/>
            </div>

            {recipes && days.map((val, index)=>
              <div className='mealBlock'>
                <h2>Day {index + 1} suggested meals</h2>
                <Meals meals={days[index]}/>
            </div>
            )}
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
          return <Panel header={val.label} key={"" + index}>
              <center>
              <img className='mealImage' src={val.image} />
              <p className='ingredientsInfo'>Ingredients: {val.ingredientLines}</p>
              <a href={val.shareAs} target="_blank"><Button className="tryRecipeButton">Try the recipe!</Button></a></center>
            </Panel>
        })

      }
    </Collapse>
  )
}

export default Plan;
