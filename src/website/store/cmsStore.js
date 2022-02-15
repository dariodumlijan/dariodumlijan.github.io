// @flow
import { merge, orderBy } from "lodash";
import * as API from "../api";
import type { ReduxAction, ReduxState } from "../types";

export type State = {
  general: Object,
  team: Object[],
  apps: Object[],
};

export const types = {
  CMS_FETCH_WEB: "CMS/FETCH_WEB",
  CMS_FETCH_WEB_PENDING: "CMS/FETCH_WEB_PENDING",
  CMS_FETCH_WEB_REJECTED: "CMS/FETCH_WEB_REJECTED",
  CMS_FETCH_WEB_FULFILLED: "CMS/FETCH_WEB_FULFILLED",
};

export const selectors = {
  getCMS: (state: ReduxState): State => state.cms,
};

export const actions = {
  fetchWeb: (query: string): ReduxAction => ({
    type: types.CMS_FETCH_WEB,
    payload: API.fetchCMS(query),
  }),
};

const _fetchWeb = (state: State, payload: any) => {
  const newState = {
    general: payload.webCollection.items[0],
    team: orderBy(payload.teamMembersCollection.items, "order"),
    apps: orderBy(payload.featuredAppCollection.items, "order"),
  };

  return merge({}, state, newState);
};

export const reducer = (state: State, action: any): any => {
  switch (action.type) {
    case types.CMS_FETCH_WEB_FULFILLED:
      return _fetchWeb(state, action.payload);

    default:
      return state || {};
  }
};