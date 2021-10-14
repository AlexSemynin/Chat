import { RouteComponentProps } from 'react-router';
import { withNavigationWatcher } from './contexts/navigation';
import {
  HomePage, LoginPage
} from './pages';


type customRoute = {
    path: string,
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined,
};

const _withoutAuthRoutes: customRoute[] = [
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
];

const _authRoutes: customRoute[] = [
    {
        path: '/home',
        component: HomePage,
    },
];

export const authRoutes = _authRoutes.map((route) => ({
  ...route,
  //component: withNavigationWatcher(route.component),
}));

export const withoutAuthRoutes = _withoutAuthRoutes.map((route) => ({
    ...route,
    //component: withNavigationWatcher(route.component),
  }));