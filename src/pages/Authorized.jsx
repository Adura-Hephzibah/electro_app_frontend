import React from 'react'
import Storage from '../utils/storage'

function Authorized ({ permission, children }) {
  const userPermissions =
    Storage.get('electr3k_UserPermissions') &&
    JSON.parse(Storage.get('electr3k_UserPermissions'))

  return userPermissions.includes(permission) ? children : null
}

export default Authorized
