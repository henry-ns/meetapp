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

export function cancelMeetupRequest(id) {
  return {
    type: '@organizing/CANCEL_MEETUPS_REQUEST',
    payload: { id },
  };
}

export function createMeetupRequest(meetup) {
  return {
    type: '@organizing/CREATE_MEETUP_REQUEST',
    payload: meetup,
  };
}

export function createMeetupSuccess(meetup) {
  return {
    type: '@organizing/CREATE_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function updateMeetupRequest(meetup) {
  return {
    type: '@organizing/UPDATE_MEETUP_REQUEST',
    payload: meetup,
  };
}

export function failure() {
  return {
    type: '@organizing/FAILURE',
  };
}
