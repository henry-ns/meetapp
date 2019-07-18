export function getMeetupsRequest() {
  return {
    type: '@organizing/GET_MEETUPS_REQUEST',
  };
}

export function getMeetupsSuccess(meetups) {
  return {
    type: '@organizing/GET_MEETUPS_SUCCESS',
    payload: { meetups },
  };
}

export function getMeetupsFailure() {
  return {
    type: '@organizing/GET_MEETUPS_FAILURE',
  };
}
