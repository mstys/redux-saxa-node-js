import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'

import Api from './Api';

export function* helloSaga() {
    console.log('Hello Sagas!')
  }

export function* incrementAsync() {
    yield call(delay, 1000);
    yield put({ type: 'INCREMENT' });
}



export function* fetchData (action) {
    console.log('Dupa', action);
    try {
        const data = yield call(Api, action.url, action.method);
        yield put({type: 'FETCH_SUCCEEDED', data});
    } catch (err) {
        yield put({type: 'FETCH_FAILED', err});
    }
    
}

function* watchFetchData () {
    yield takeEvery('FETCH_REQUESTED', fetchData)
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
  }

  export default function* rootSaga() {
      yield all([
          helloSaga(), watchIncrementAsync(), watchFetchData()
      ])
  }