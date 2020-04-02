import React from 'react'
import { Layout, Menu} from 'antd';

const { Header } = Layout;

const RootHeader = () => (
  <Header className="header clearfix fixed">
    <div className="logo" >资料库</div>
    <div className="left-menu" style={{float: 'left', width: '50%'}}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
      </Menu>
    </div>
    <div className="right-menu" style={{float: 'right', width: '30%'}}>
      <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px', float: 'right' }}
      >
      </Menu>          
    </div>
  </Header>
)

export default RootHeader
