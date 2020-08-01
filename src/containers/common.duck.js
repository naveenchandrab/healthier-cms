const SET_LOADING = 'COMMON/SETLOADING';
const SET_DIALOGUE = 'COMMON/SET_DIALOGUE';
const SET_SNACKBAR = 'COMMON/SET_SNACKBAR';

const initialState = {
  loading: false,
  dialogue: {
    open: false,
    title: '',
    description: '',
    cancelButtonText: '',
    onOk: () => {},
    okButtonText: ''
  },
  snackbar: {
    show: false,
    message: '',
    type: 'info'
  }
};

export const setLoading = value => ({ type: SET_LOADING, value });
export const setDialogue = value => ({ type: SET_DIALOGUE, value });
export const setSnackbar = value => ({ type: SET_SNACKBAR, value });

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value };
    case SET_DIALOGUE:
      return { ...state, dialogue: action.value };
    case SET_SNACKBAR:
      return { ...state, snackbar: action.value };

    default:
      return state;
  }
};

export default CommonReducer;
