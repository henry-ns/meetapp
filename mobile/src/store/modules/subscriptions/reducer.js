import produce from 'immer';

const INITIAL_STATE = {
  subscriptions: [],
  page: 1,
};

export default function subscriptions(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscriptions/GET_SUBSCRIPTIONS_SUCCESS': {
        draft.page = action.payload.page;
        draft.subscriptions =
          action.payload.page === 1
            ? action.payload.subscriptions
            : [...draft.subscriptions, ...action.payload.subscriptions];
        break;
      }
      case '@subscriptions/UNSUBSCRIBER_SUCCESS': {
        draft.subscriptions = draft.subscriptions.filter(
          meetup => meetup !== action.payload.id
        );
        break;
      }
      default:
    }
  });
}
