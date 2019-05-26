import { useEffect, useState } from 'react'
import createUseContext from 'constate'

export interface Cart {}

export interface CartState {
  cart: Cart | null
  error: Error | null
  fetching: boolean
}

export const initialCartState: CartState = { cart: null, error: null, fetching: false }

export const useCart = () => {
  const [cartState, setCartState] = useState<CartState>(initialCartState)
  const [shouldFetch, setShouldFetch] = useState(false)

  useEffect(() => {
    if (!cartState.cart) {
      setCartState({ ...cartState, fetching: true })
      setShouldFetch(true)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false)

      fetch('http://www.mocky.io/v2/5cea8301330000501c7c383f')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Bad response from server ${response.status}`)
          }

          return response.json()
        })
        .then((json: CartState) => setCartState({ cart: json, error: null, fetching: false }))
        .catch((error: Error) => setCartState({ error, cart: null, fetching: false }))
    }
  }, [shouldFetch])

  return cartState
}

export const useCartContext = createUseContext(useCart)
