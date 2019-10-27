import React from "react";
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';
function Header() {

  return (
    <header className="Header">
    <a href="/" id='headerTitleWrapper'><img id='logo' src="/optieat.svg"/><h1 id='HeaderTitle'>Opti<strong>Eat</strong></h1></a>
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
