import React, { FunctionComponent } from 'react'
import { Component1 } from './Component1'
import { Component2 } from './Component2'
import { useCartContext } from './useCart'

const App: FunctionComponent = () => {
  return (
    <useCartContext.Provider>
      <Component1 />
      <Component2 />
    </useCartContext.Provider>
  )
}

export default App
