export function getSubscriptionsRequest(page) {
  return {
    type: '@subscriptions/GET_SUBSCRIPTIONS_REQUEST',
    payload: { page },
  };
}

export function getSubscriptionsSuccess(subscriptions, page) {
  return {
    type: '@subscriptions/GET_SUBSCRIPTIONS_SUCCESS',
    payload: {
      subscriptions,
      page,
    },
  };
}

export function unsubscriberRequest(id) {
  return {
    type: '@subscriptions/UNSUBSCRIBER_REQUEST',
    payload: { id },
  };
}

export function unsubscriberSuccess(id) {
  return {
    type: '@subscriptions/UNSUBSCRIBER_SUCCESS',
    payload: { id },
  };
}
