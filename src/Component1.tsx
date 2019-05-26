import React, { FunctionComponent } from 'react'
import { useCartContext } from './useCart'

export const Component1: FunctionComponent = () => {
  const cartState = useCartContext()

  return (
    <>
      <h1>
        Hello from <pre>Component1!</pre>
      </h1>
      <pre>{JSON.stringify(cartState)}</pre>
    </>
  )
}
