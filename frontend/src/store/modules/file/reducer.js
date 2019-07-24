import produce from 'immer';

const INITIAL_STATE = {
  localUrl: '',
};

export default function file(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@file/LOAD_FILE': {
        draft.localUrl = action.payload.file;
        break;
      }
      default:
    }
  });
}
