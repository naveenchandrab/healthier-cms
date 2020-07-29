const SET_LOADING = 'COMMON/SETLOADING';

const initialState = {
  loading: false
};

export const setLoading = value => ({ type: SET_LOADING, value });

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value };

    default:
      return state;
  }
};

export default CommonReducer;
