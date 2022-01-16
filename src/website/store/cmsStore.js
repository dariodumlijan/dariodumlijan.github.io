// @flow
import { merge } from "lodash";
import * as API from "../api";
import type { ReduxAction } from "../types";

export type State = {};

export const types = {
  CMS_FETCH: "CMS/FETCH",
  CMS_FETCH_PENDING: "CMS/FETCH_PENDING",
  CMS_FETCH_REJECTED: "CMS/FETCH_REJECTED",
  CMS_FETCH_FULFILLED: "CMS/FETCH_FULFILLED",
};

export const selectors = {
  getCMS: (state: ReduxState): State => state.cms,
};

export const actions = {
  fetchCMS: (query: string): ReduxAction => ({
    type: types.CMS_FETCH,
    payload: API.fetchCMS(query),
  }),
};

export const reducer = (state: ReduxState, action: any): any => {
  switch (action.type) {
    case types.CMS_FETCH_FULFILLED:
      return merge({}, state, action.payload);

    default:
      return state || {};
  }
};
