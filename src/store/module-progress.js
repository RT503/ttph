import {
  MUTATION_PROGRESS_NONE,
  MUTATION_PROGRESS_ERROR, MUTATION_PROGRESS_OK,
  MUTATION_PROGRESS_IN_PROGRESS,
  MUTATION_PROGRESS_INIT
} from '@/store/const-mutations';
import {
  PROGRESS_STATE_ERROR,
  PROGRESS_STATE_IN_PROGRESS,
  PROGRESS_STATE_NONE,
  PROGRESS_STATE_OK
} from '@/store/const-progress';

function initState () {
  return {
    state: PROGRESS_STATE_NONE,
    tag: null,
    error: null
  };
}

const state = initState();

const mutations = {

  [MUTATION_PROGRESS_INIT] (state) {
    state = Object.assign(state, initState());
  },

  [MUTATION_PROGRESS_NONE] (state, tag) {
    state.state = PROGRESS_STATE_NONE;
    state.tag = tag;
  },
  [MUTATION_PROGRESS_ERROR] (state, payload) {
    state.state = PROGRESS_STATE_ERROR;
    state.tag = payload.tag;
    state.error = payload.error;
  },
  [MUTATION_PROGRESS_OK] (state, tag) {
    state.state = PROGRESS_STATE_OK;
    state.owner = tag;
  },
  [MUTATION_PROGRESS_IN_PROGRESS] (state, tag) {
    state.state = PROGRESS_STATE_IN_PROGRESS;
    state.tag = tag;
  }
};

export default {
  state,
  mutations
};
