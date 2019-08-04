import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer =
    __DEV__ === 'development'
      ? compose(
          applyMiddleware(...middlewares),
          console.tron.createEnhancer()
        )
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
