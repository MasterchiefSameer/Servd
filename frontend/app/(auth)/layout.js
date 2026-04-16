// WANT TO APPLY SIMILIAR TYPE CHANGES IN BOTH SIGN-IN AND SIGN-UP

import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="flex justify-center pt-40">{children}</div>
  )
}

export default AuthLayout