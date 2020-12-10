import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// DASHBOARDS

import AnalyticsDashboard from './Analytics/';
import SalesDashboard from './Sales/';
import CommerceDashboard from './Commerce/';
import CRMDashboard from './CRM/';
import MinimalDashboard1 from './Minimal/Variation1';
import MinimalDashboard2 from './Minimal/Variation2';
import Horno from './Minimal/Horno';
import Detalle from './Minimal/DetalleAvanzado';
import Envasadora from './Minimal/Envasadora';
import Analisis from './Minimal/Analisis';
import Scada from './Minimal/Scada';
import Scada2 from './Minimal/Scada2';
import FullScreen from './Minimal/FullScreen';
// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Dashboards = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/analytics`} component={AnalyticsDashboard}/>
                    <Route path={`${match.url}/sales`} component={SalesDashboard}/>
                    <Route path={`${match.url}/commerce`} component={CommerceDashboard}/>
                    <Route path={`${match.url}/crm`} component={CRMDashboard}/>
                    <Route path={`${match.url}/minimal-dashboard-1`} component={MinimalDashboard1}/>
                    <Route path={`${match.url}/minimal-dashboard-2`} component={MinimalDashboard2}/>
                    <Route path={`${match.url}/envasadora`} component={Envasadora}/>
                    <Route path={`${match.url}/horno`} component={Horno}/>
                    <Route path={`${match.url}/DetalleAvanzado`} component={Detalle}/>
                    <Route path={`${match.url}/Analisis`} component={Analisis}/>
                    <Route path={`${match.url}/Scada`} component={Scada}/>
                    <Route path={`${match.url}/Scada2`} component={Scada2}/>
                    <Route path={`${match.url}/FullScreen`} component={FullScreen}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Dashboards;