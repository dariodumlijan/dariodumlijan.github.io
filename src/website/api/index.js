// @flow
import axios from "axios";
// import { database } from "./firebase.config";
import cmsHeader from "./cms.config";

export const fetchCMS = async (destination: string, query: string): any => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_CMS_GRAPHQL_URL || "",
      {
        query,
      },
      cmsHeader
    );
    if (response.status === 200) {
      return { destination, data: response.data.data };
    }
  } catch (err) {
    return null;
  }
};

export const sendForm = async (form: Object): any => {
  const formatEmail = {
    from: "hello@dariodumlijan.com",
    to: process.env.REACT_APP_EMAIL_TO_ADDRESS || "",
    subject: "Dario Dumlijan - Website",
    body: `Name: ${form.name}\nE-mail: ${form.email}\nJob type: ${form.job_type}\nDetails: ${form.details}\nReferences: ${form.references}\nBudget: ${form.budget}\nDeadline: ${form.deadline}`,
  };

  try {
    const response = await axios.post("/mail", JSON.stringify(formatEmail), {
      headers: {
        "Access-Control-Allow-Origin": "https://staging.dariodumlijan.com",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_EMAIL_API_KEY || ""}`,
      },
      baseURL: process.env.REACT_APP_EMAIL_ENDPOINT || "",
    });
    if (response.status === 200) {
      return null;
    }
  } catch (err) {
    return null;
  }
};

/*
export const fetchFirebaseDoc = async (
  collection: string,
  doc: string
): any => {
  const response = await database.collection(collection).doc(doc).get();

  return response;
};
*/
