import React, { PropsWithChildren } from 'react'
import { render as rtlRender } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { AppStore, RootState } from "../Redux/store"
// As a basic setup, import your same slice reducers
import {PostsSlice} from '../Redux/reducers'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

function renderWithProvider(
  ui: React.ReactElement,
  {
    preloadedState= {PostState:{posts:[{id:1,userId:1,title:"hello",body:"something"}],status:"idle",error:""}},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { PostState: PostsSlice.reducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// re-export everything from RTL
export * from '@testing-library/react'
// Override the `render` export name with our custom function
export { renderWithProvider as render}