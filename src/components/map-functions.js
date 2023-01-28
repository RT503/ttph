import { MUTATION_PROFILE_EDIT_OWNER } from '@/store/const-mutations';

export function mapGet (name) {
  return {
    get: function () {
      return this.$store.state.profile.owner[name];
    }
  };
}

export function mapSet (name) {
  return {
    set: function (value) {
      this.$store.commit(MUTATION_PROFILE_EDIT_OWNER, { [name]: value });
    }
  };
}
