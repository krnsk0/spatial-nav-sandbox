import { Dispatch, createContext, useReducer } from 'react';
import { Action, Store, storeReducer } from './store';

export const StoreContext = createContext<Store>({ shapes: []});
export const StoreDispatchContext = createContext<Dispatch<Action>>(() => {});

export const Provider = (children: React.ReactNode) => {
  const [store, dispatch] = useReducer(storeReducer, { shapes: []});

  return (
    <StoreContext.Provider value={store}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};
