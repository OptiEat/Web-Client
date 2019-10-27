import React from "react";
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';
function Header() {

  return (
    <header className="Header">
    <a href="/"><h1 id='HeaderTitle'>OptiEat</h1></a>
      <Menu mode="horizontal">
        <Menu.Item>
          <a href="fridge">
          <Icon type="appstore" />
          Fridge
          </a>
        </Menu.Item>
        <Menu.Item>
          <a href="scan">
          <Icon type="search" />
          Scan
          </a>
        </Menu.Item>
        <Menu.Item>
          <a href="plan">
          <Icon type="calendar" />
          Plan
          </a>
        </Menu.Item>
      </Menu>
    </header>
  )
}

export default Header;
