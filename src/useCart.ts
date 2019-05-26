import { useEffect, useReducer, useState, Reducer, Dispatch } from 'react'
import createUseContext from 'constate'

export type CartAction =
  | { type: 'fetch' }
  | { type: 'set'; payload: Cart }
  | { type: 'error'; payload: Error }

export type CartReducer = Reducer<CartState, CartAction>

export interface Cart {}

export interface CartState {
  cart: Cart | null
  error: Error | null
  fetching: boolean
}
export type CartContextValue = [CartState, Dispatch<CartAction>]

export const initialCartState = { cart: null, error: null, fetching: false }

export const cartReducer: CartReducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      return { ...state, fetching: true }
    case 'set':
      return { ...initialCartState, cart: action.payload }
    case 'error':
      return { ...state, error: action.payload, fetching: false }
  }
}

export const useCart = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState)
  const [shouldFetch, setShouldFetch] = useState()

  useEffect(() => {
    if (!cartState.cart) {
      dispatch({ type: 'fetch' })
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
            throw new Error('Bad response from server')
          }

          return response.json()
        })
        .then((json: CartState) => dispatch({ type: 'set', payload: json }))
        .catch((error: Error) => dispatch({ type: 'error', payload: error }))
    }
  }, [shouldFetch])

  return cartState
}

export const useCartContext = createUseContext(useCart)
