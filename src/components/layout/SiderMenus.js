import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon} from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const SiderMenus = ({match}) => (
  <div style={{paddingBottom:'120px'}}>
    <Menu theme="dark" defaultSelectedKeys={[match.url]} selectedKeys={[match.url]} defaultOpenKeys={['sub4']} mode="inline">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" />
          <span>首页</span>
        </Link>
      </Menu.Item>
      <SubMenu
        key="sub4"
        title={<span><Icon type="area-chart" /><span>CBDB可视化数据库</span></span>}>
        <Menu.Item key="/simple-force-chart"><Link to="/simple-force-chart">CBDB人物关系网络图</Link></Menu.Item>
        <Menu.Item key="/simple-map-timeline-chart"><Link to="/simple-map-timeline-chart">CBDB历史疆域变化图</Link></Menu.Item>
        <Menu.Item key="/simple-relationship-chart"><Link to="/simple-relationship-chart">CBDB地理与人物关系图</Link></Menu.Item>

      </SubMenu>
    </Menu>  
  </div>
)

SiderMenus.propTypes = {
  match: PropTypes.object.isRequired,
}

export default SiderMenus
