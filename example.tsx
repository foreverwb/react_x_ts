import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import IconDemo from './examples/Icon.demo';
import InputExample from './examples/Input.example';
import ButtonExample from './examples/Button.example';
import DialogExample from './examples/Dialog.example';
import LayoutExample from './examples/Layout.example';
import FormExample from './examples/Form.example';
import ScrollExample from './examples/Scroll.example';
import PagerExample from './examples/Pager.example';
import TableExample from './examples/Table.example';
import BlankExample from './examples/ClickOutSide.example';
import SlidesExample from './examples/Slides.example';
import Content from './lib/Layout/Content';
import Aside from './lib/Layout/Aside';
import Header from './lib/Layout/Header';
import Layout from './lib/Layout/Layout';
import Footer from './lib/Layout/Footer';

import './example.scss';

ReactDOM.render((
  <Router>
    <Layout className="site-page">
      <Header className="site-header">UI</Header>
      <Layout style={{ marginBottom: '40px' }}>
        <Aside className="site-aside">
          <h2>组件</h2>
          <ul>
            <li>
              <NavLink to="/icon">Icon</NavLink>
            </li>
            <li>
              <NavLink to="/button">Button</NavLink>
            </li>
            <li>
              <NavLink to="/dialog">Dialog</NavLink>
            </li>
            <li>
              <NavLink to="/layout">Layout</NavLink>
            </li>
            <li>
              <NavLink to="/input">Input</NavLink>
            </li>
            <li>
              <NavLink to="/form">Form</NavLink>
            </li>
            <li>
              <NavLink to="/scroll">Scroll</NavLink>
            </li>
            <li>
              <NavLink to="/table">Table</NavLink>
            </li>
            <li>
              <NavLink to="/pager">Pager</NavLink>
            </li>
            <li>
              <NavLink to="/blank">ClickOutSide</NavLink>
            </li>
            <li>
              <NavLink to="/slides">Slides</NavLink>
            </li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Switch>
            <Route path="/icon" component={IconDemo}/>
            <Route path="/button" component={ButtonExample}/>
            <Route path="/dialog" component={DialogExample}/>
            <Route path="/layout" component={LayoutExample}/>
            <Route path="/form" component={FormExample}/>
            <Route path="/input" component={InputExample}/>
            <Route path='/scroll' component={ScrollExample}/>
            <Route path='/pager' component={PagerExample}/>
            <Route path='/blank' component={BlankExample}/>
            <Route path='/table' component={TableExample}/>
            <Route path="/slides" component={SlidesExample}/>
            <Redirect to="/icon"/>
          </Switch>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; ui
      </Footer>
    </Layout>

  </Router>
), document.querySelector('#root'));

