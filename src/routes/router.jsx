import { createBrowserRouter } from 'react-router-dom'; 
import MainLayout from '../Layout/MainLayout';
import AuthLayout from './../Layout/AuthLayout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import AddTeacher from '../Pages/AddTeacher';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Layout/Dashboard';
import AllUsers from '../dashboard/AllUsers';

import TeacherReq from './../dashboard/TeacherReq';
import AdminRoute from './AdminRoutes';
import AddClass from '../dashboard/AddClass';
import MyClass from '../dashboard/MyClass';
import ClassDetails from '../dashboard/ClassDetails';
import AllClassesPage from '../dashboard/AllClassesPage';
import Profile from '../dashboard/Profile';
import AllClassesPublic from '../Pages/AllClassesPublic';
import ClassDetailsPublic from '../Pages/ClassDetailsPublic';
import MyEnrolledClass from '../dashboard/MyEnrolledClass';
import MyEnrolledClassDetails from '../dashboard/MyEnrolledClassDetails';
import TeacherRoute from './TeacherRoutes';

import Payment from '../Pages/Payment';



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
    },
    {

      path:"/allclassespublic",
      element:<PrivateRoute><AllClassesPublic/>
</PrivateRoute>
    },
    {

      path:"/classdetailspublic/:classId",
      element:<ClassDetailsPublic/>

    }
    ,
    {
      path:'/payment',
      element:<Payment></Payment>
    },
    {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: '/addteacher',
        element: <PrivateRoute><AddTeacher></AddTeacher></PrivateRoute>,
    },
  {
    path:'dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:'users',
        element:<AdminRoute><AllUsers/></AdminRoute>
      },
    
      {
        path:'teacher-req',
        element:<AdminRoute><TeacherReq/></AdminRoute>
      }
      ,{
        path:'addclass',
        element:<AddClass></AddClass>
      }
      ,{
        path:'myclass',
        element:<MyClass></MyClass>
      }
      ,{
        path:'classdetails',
        element:<ClassDetails></ClassDetails>
      }
      ,{
        path:'allclass',
        element:<AdminRoute><AllClassesPage></AllClassesPage></AdminRoute>
      }
      ,{
        path:'profile',
        element:<Profile></Profile>
      }
      ,{
        path: 'seedetails/:classId', 
        element: <ClassDetails></ClassDetails>
      },
      ,{
        path: 'myenrolledclass', 
        element: <MyEnrolledClass></MyEnrolledClass>
      },
      {
        path: "enrolleddetails/:classId", 
        element: <MyEnrolledClassDetails />,
      },
    ]
  }
    
  
 

 
]);

export default router;
