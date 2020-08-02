const SET_USER = 'LOGIN/SET_USER';

const initialState = {
  user: null
};

export const setUser = value => ({ type: SET_USER, value });

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.value };

    default:
      return state;
  }
};

export default LoginReducer;
