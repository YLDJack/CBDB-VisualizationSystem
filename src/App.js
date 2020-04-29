import React, { Component } from 'react';
import { Layout } from 'antd';
import RootHeader from './components/layout/RootHeader';
import { SiderMenusRoute, RootBreadcrumbRoute, ContentRoute } from './routes';
import './App.css';

const { Footer, Content, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <RootHeader />
        <Layout style={{paddingTop:'64px'}}>
          <Sider 
            width={200} 
            style={{ background: '#333' }}           
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            className="fixed"
          >
            <SiderMenusRoute />
          </Sider>
          <Layout className={this.state.collapsed ? 'content-normal' : 'content-max'} >
            <RootBreadcrumbRoute />
            <Content style={{ margin: 0, minHeight: 280 }}>
              <ContentRoute />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
               Created by Lin & Xiang & Jack Yu @2019
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

// 注册serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}

export default App;
