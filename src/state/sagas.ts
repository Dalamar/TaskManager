import tasksSagas from './sagas/tasksSagas';
import { all } from 'redux-saga/effects';

export default function* sagas() {
  yield all([tasksSagas].reduce((allSagas, saga) => allSagas.concat(saga), []));
}
