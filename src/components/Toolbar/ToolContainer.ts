import { connect } from 'react-redux';

import { Tool } from './Tool';
import { AppDispatch, RootState, setActiveTool } from '../../store';

type OwnProps = {
  name: string;
};

type DispatchProps = ReturnType<typeof mapDispatch>;
type StateProps = ReturnType<typeof mapState>;

// TODO typing
const mapState = (state: any, ownProps: OwnProps) => ({
  isActive: state.toolReducer.activeTool === ownProps.name,
});

const mapDispatch = (dispatch: AppDispatch, ownProps: OwnProps) => ({
  setActiveTool: () => dispatch(setActiveTool(ownProps.name)),
});

export default connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(Tool);
