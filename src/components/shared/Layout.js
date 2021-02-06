import React from "react";
import { useLayoutStyles } from "../../styles";
import SEO from "../shared/Seo";

function Layout({ children, title }) {
  const classes = useLayoutStyles();

  return (
    <section className={classes.section}>
      <SEO title={title} />
      <main className={classes.main}>
        <section className={classes.childrenWrapper}>
          <div className={classes.children}>{children}</div>
        </section>
      </main>
    </section>
  );
}

export default Layout;
