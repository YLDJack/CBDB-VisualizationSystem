import React from 'react';
import Home from '../containers/Home';
import { Route, Switch } from 'react-router-dom';
import SimpleForceChart from '../containers/SimpleForceChart';
import NotFound from '../containers/NotFound';
import RootBreadcrumb from '../components/layout/RootBreadcrumb';
import SiderMenus from '../components/layout/SiderMenus';
import SimpleMapTimelineChart from "../containers/SimpleMapTimelineChart";
import SimpleRelationshipChart from "../containers/SimpleRelationshipChart";


 export const SiderMenusRoute = () => 
  <Route path="*" component={SiderMenus}/>

export const RootBreadcrumbRoute = () => 
  <Route path="*" component={RootBreadcrumb}/>

export const ContentRoute = () =>
  <Switch>
      <Route exact path='/' component={Home} />
    <Route exact path='/simple-force-chart' component={SimpleForceChart} />
      <Route exact path='/simple-map-timeline-chart' component={SimpleMapTimelineChart} />
      <Route exact path='/simple-relationship-chart' component={SimpleRelationshipChart} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>

export default ContentRoute
