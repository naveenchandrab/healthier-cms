import { connect } from 'react-redux';
import Cardio from '../../../modules/Exercises/Cardio';
import { setExercise, setExercises } from './index.duck';
import { setLoading, setDialogue, setSnackbar } from '../../common.duck';

const mapStateToProps = ({ cardio }) => ({
  exercises: cardio.exercises,
  exercise: cardio.exercise
});

const mapDispatchToProps = dispatch => ({
  setExercise: value => dispatch(setExercise(value)),
  setExercises: value => dispatch(setExercises(value)),
  setLoading: value => dispatch(setLoading(value)),
  showDialogueBox: value => dispatch(setDialogue(value)),
  showSnackbar: value => dispatch(setSnackbar(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cardio);
