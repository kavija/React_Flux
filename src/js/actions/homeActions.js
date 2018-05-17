import dispatcher from "../dispatcher";

export function updateTerm(term) {
  dispatcher.dispatch({
    type: "UPDATE_TERM",
    term,
  });
}
