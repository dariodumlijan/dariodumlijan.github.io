import React from "react";
import { useQuery } from "@apollo/client";
import { GENERAL_QUERY } from "../../api";

import Loading from "./Loading";
import Error from "./Error";

import "../../styles/footer.scss";

function Footer() {
  const { data, loading, error } = useQuery(GENERAL_QUERY);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  return (
    <footer id="footer">
      <span>
        {data.generalCollection.items[0].siteTitle} | Copyright &copy;{" "}
        {new Date().getFullYear()} | All rights reserved
      </span>
    </footer>
  );
}

export default Footer;
