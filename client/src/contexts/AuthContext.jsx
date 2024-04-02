import {
  createContext, useContext, useReducer, React,
} from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const userReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'SET_DATA':
        return { ...state, data: action.payload };
      case 'CLEAR_USER':
        return { ...state, user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(userReducer, {});

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
