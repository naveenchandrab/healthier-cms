/* eslint-disable consistent-return */
const SET_CARDIO_EXERCISES = 'CARDIO/SET_CARDIO_EXERCISES';
const SET_CARDIO_EXERCISE = 'CARDIO/SET_CARDIO_EXERCISE';

const initialState = {
  exercise: {
    name: '',
    category: 0,
    video: '',
    likes: 0
  },
  exercises: null
};

export const setExercise = value => ({ type: SET_CARDIO_EXERCISE, value });
export const setExercises = value => ({ type: SET_CARDIO_EXERCISES, value });

const CardioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARDIO_EXERCISE:
      return { ...state, exercise: action.value };
    case SET_CARDIO_EXERCISES:
      return { ...state, exercises: action.value };

    default:
      return state;
  }
};

export default CardioReducer;
