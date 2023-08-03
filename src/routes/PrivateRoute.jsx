import React from 'react'
import { Navigate } from 'react-router-dom'
import Storage from '../utils/storage'
import UnAuthorized from '../pages/UnAuthorized';

function PrivateRoute ({ permission, children }) {
  const userInstorage = Storage.get('electr3k_User');
  const userToken = Storage.get("electr3k_UserToken") && JSON.parse(Storage.get("electr3k_UserToken"));
  const userPermissions = Storage.get("electr3k_UserPermissions") && JSON.parse(Storage.get("electr3k_UserPermissions"));
  const isAuthorized = userPermissions?.includes(permission);

  console.log('userPermissions', userPermissions)

  if (userInstorage && userToken) {

    if (isAuthorized) {
      return children;
    } else {
      return <UnAuthorized />
    }
  } else {
    return <Navigate to="/" />
  }

  // return (userInstorage && userToken) ? children : <Navigate to="/" />
}

export default PrivateRoute
