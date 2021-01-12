import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { Role } from '../services/role';
import { getUser } from '../auth';

const AdminRoute = ({ component: Component, ...rest }) => {

  return (
   
    <Route {...rest} render={props => (

      ( getUser() !== null && getUser().role === Role.Admin) ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
      
    )} />

  )

}

export default AdminRoute