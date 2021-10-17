import { Switch, Route, Redirect } from "react-router";
//import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useRef, useState } from "react";
import themes from "devextreme/ui/themes";
import { useStores } from ".";
import {authRoutes,withoutAuthRoutes} from "./app-routes";
import {HomePage} from "./pages";
import MainLayout from './components/mainLayout/mainLayout';


export const App = () => {
    const { layoutStore, authStore , locationInfo } = useStores();

    return (

        <MainLayout>
        {
            authStore.isLogin ?
            <Switch>
                {
                    authRoutes.map((obj) => (
                        <Route
                            exact
                            path={obj.path}
                            component={obj.component}
                            key={obj.path}
                        />
                    ))
                }
            </Switch> 
            :
            <Switch>
                {
                    withoutAuthRoutes.map((obj) => (
                        <Route
                            exact
                            path={obj.path}
                            component={obj.component}
                            key={obj.path}
                        />
                    ))
                }
                <Route exact={true} path="/home" component={HomePage} />
                <Redirect from='/' to='/home' />
            </Switch>
        }
        </MainLayout>
    )
};
