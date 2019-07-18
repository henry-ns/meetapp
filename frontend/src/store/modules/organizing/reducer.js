import produce from 'immer';

const INITIAL_STATE = {
  meetups: [],
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@organizing/GET_MEETUPS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@organizing/GET_MEETUPS_SUCCESS': {
        draft.meetups = action.payload.meetups;
        draft.loading = false;
        break;
      }
      case '@organizing/GET_MEETUPS_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
