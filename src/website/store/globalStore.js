// @flow
// import * as API from "../api";
import type { ReduxState } from "../types";

export type State = {
  formSubmitted: boolean,
};

export const types = {
  GS_SEND_FORM_MESSAGE: "GS/SEND_FORM_MESSAGE",
  GS_SEND_FORM_MESSAGE_PENDING: "GS/SEND_FORM_MESSAGE_PENDING",
  GS_SEND_FORM_MESSAGE_REJECTED: "GS/SEND_FORM_MESSAGE_REJECTED",
  GS_SEND_FORM_MESSAGE_FULFILLED: "GS/SEND_FORM_MESSAGE_FULFILLED",

  GS_CLEAR_FORM_STATUS: "GS/CLEAR_FORM_STATUS",
};

export const selectors = {
  getGlobal: (state: ReduxState): State => state.global,
};

export const actions: { ... } = {};

export const reducer = (state: State, action: any): any => {
  switch (action.type) {
    default:
      return state || {};
  }
};
