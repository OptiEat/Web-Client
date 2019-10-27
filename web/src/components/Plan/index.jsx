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
      var options = {
        url: "https://optieat.herokuapp.com/api/query/compute/",
        // url:"http://localhost:5000/api/query/compute",
        method: "POST",
        json: {"Products": productsData}
      };
      request(options, (err, resp, body) => {
        if (resp) {
          message.success(`Successfully Created Meal Plan!`);
          setLoading(false);
          if(body.body)
          {
            resp.body.body.Recipes.forEach((val) => {val.eaten=false});
            setRecipes(resp.body.body.Recipes);
            localStorage.setItem('mealPlan', JSON.stringify(resp.body.body.Recipes));
          }
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
    let storedRecipes = localStorage.getItem('mealPlan') && JSON.parse(localStorage.getItem('mealPlan'));
    console.log(storedRecipes);
    setRecipes(storedRecipes);
    if (props.autoRun == true) {
      handleClick();
    }
  }, [runAgain]);
    return(
      <Layout>
          <div className="Plan">
            <div>
<h1 id='PlanTitle'>Your meal plan </h1><Icon type="smile" theme="twoTone" twoToneColor="#88d657" id='smileIcon'/>
            </div>

            {recipes && days.map((val, index)=>
              <div className='mealBlock' key={index}>
                <h2>Day {index + 1} suggested meals</h2>
                <Meals meals={days[index]} day={index} setRecipes={setRecipes}/>
            </div>
            )}
            {loading ? <p id='funnyMessage'>{funText}</p> : ""}
            <Button className="regenMeal" loading={loading} onClick={handleClick}>{regenMealText}</Button>

          </div>
      </Layout>
    )

}

function Meals(props) {

  function handleDeduct(index){
    let ls = window.localStorage;
    let foodKeys = Object.keys(ls);
    let productsData = [];
    let mealPlan = JSON.parse(ls['mealPlan']);
    for (let key of foodKeys) {
      mealPlan[index]['effectiveWeight'].forEach((val)=>{
        let newQ;
        console.log(ls[key] + ' ' + val[key]);
        if(val[key]){
           newQ = parseInt(JSON.parse(ls[key]).quantity) - parseInt(val[key]);
           let keyC = JSON.parse(ls[key]);
           keyC.quantity = newQ;
           if(newQ == 0)
            ls.removeItem(key);
          else
           ls[key] = JSON.stringify(keyC);
        }
      });
    }
    mealPlan[index].eaten = true;
    ls['mealPlan'] = JSON.stringify(mealPlan);
    props.setRecipes(mealPlan);
    console.log(index);
  }

  return (
    <Collapse accordion>
      {props.meals.map((val, index) =>
        {
          if(val.eaten == false)
          {
          return <Panel header={val.label} key={"" + index}>
              <center>
              <img className='mealImage' src={val.image} />
              <p className='ingredientsInfo'>Ingredients: {val.ingredientLines}</p>
              <a href={val.shareAs} target="_blank"><Button className="tryRecipeButton">Try the recipe!</Button></a>
              <Button className="deductButton"  type="danger" onClick={() => {handleDeduct(props.day*3+index)}}>Move to Stomach!</Button>
              </center>
            </Panel>
          }
            return "";
        })

      }
    </Collapse>
  )
}

export default Plan;
