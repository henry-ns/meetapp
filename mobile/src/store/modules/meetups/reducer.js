import produce from 'immer';

const INITIAL_STATE = {
  meetups: [],
  page: 1,
};

export default function meetups(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetups/GET_MEETUPS_SUCCESS': {
        draft.page = action.payload.page;
        draft.meetups =
          action.payload.page === 1
            ? action.payload.meetups
            : [...draft.meetups, ...action.payload.meetups];
        break;
      }
      case '@meetups/SUBSCRIBER_SUCCESS': {
        draft.meetups = draft.meetups.map(meetup =>
          action.payload.id === meetup.id
            ? {
                ...meetup,
                subscriber: true,
              }
            : meetup
        );
        break;
      }
      default:
    }
  });
}
