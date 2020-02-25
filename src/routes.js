import Dashboard from './components/Dashboard';
import Home from './screens/Home'
import Today from './screens/Today'
import New from './screens/New'
import Done from './screens/Done'

import SignIn from './screens/Sign/SignIn';

var routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: SignIn
    },
    {
        path: '/today',
        component: Today
    },
    {
        path: '/new',
        component: New
    },
    {
        path: '/done',
        component: Done
    },
];

export default routes;