import React from "react";
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';
function Header() {


  return (
    <header className="Header">
    <h1 id='HeaderTitle'>OptiEat</h1>
      <Menu mode="horizontal">
        <Menu.Item>
          <a href="fridge">
          Fridge
          </a>
        </Menu.Item>
        <Menu.Item>
          <a href="plan">
          Plan
          </a>
        </Menu.Item>
      </Menu>
    </header>
  )
}
function handleClick(e) {
console.log('click ', e);
this.setState({
  current: e.key,
});
};

export default Header;
