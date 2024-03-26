import React, { createContext, useReducer } from "react";
export const Context = createContext();
export const DispatchContext = createContext();
export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
}
const INITIAL_STATE = {
  products: [],
  transaction: [],
  activeProducts: [],
  user: JSON.parse(sessionStorage.getItem("user")),
};
function reducer(state, action) {
  switch (action.type) {
    case "products":
      return {
        ...state,
        products: action.payload,
      };
    case "transactions":
      return {
        ...state,
        transactions: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    default:
      throw new Error("The action type is invalid");
  }
}
