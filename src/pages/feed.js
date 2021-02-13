import React from "react";
import { useFeedPageStyles } from "../styles";
import Layout from "../components/shared/Layout";

function FeedPage() {
 const classes =  useFeedPageStyles();

  return <Layout><div className={classes.container}>
    
    </div></Layout>;
}

export default FeedPage;
