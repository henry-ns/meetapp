export function getMeetupsRequest(date, page) {
  return {
    type: '@meetups/GET_MEETUPS_REQUEST',
    payload: {
      date,
      page,
    },
  };
}

export function getMeetupsSuccess(meetups, page) {
  return {
    type: '@meetups/GET_MEETUPS_SUCCESS',
    payload: {
      meetups,
      page,
    },
  };
}

export function subscriberRequest(id) {
  return {
    type: '@meetups/SUBSCRIBER_REQUEST',
    payload: { id },
  };
}

export function subscriberSuccess(meetup) {
  return {
    type: '@meetups/SUBSCRIBER_SUCCESS',
    payload: meetup,
  };
}
