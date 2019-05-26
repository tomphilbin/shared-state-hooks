import React, { FunctionComponent } from 'react'
import { useCartContext } from './useCart'

export const Component2: FunctionComponent = () => {
  const cartState = useCartContext()

  return (
    <>
      <h1>
        Hello from <pre>Component2!</pre>
      </h1>
      <pre>{JSON.stringify(cartState)}</pre>
    </>
  )
}
