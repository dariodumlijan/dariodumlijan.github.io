// @flow
import axios from "axios";
import { useEnvironmentInfo } from "../utils";
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isDevelopment } = useEnvironmentInfo();
  const baseURL: string = isDevelopment
    ? "localhost:3000"
    : process.env.REACT_APP_EMAIL_ENDPOINT || "";

  try {
    const response = await axios.post("/form_submit.php", form, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
      baseURL,
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
