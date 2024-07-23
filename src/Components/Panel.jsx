import classNames from "classnames";
import React from "react";
import styles from "./panel.module.css"; // Import the CSS module

const Panel = ({ className, children, height, width, ...props }) => {
  const inlineStyles = {
    height,
    width,
  };
  const classes = classNames(styles.panel, className);
  return (
    <div className={classes} style={inlineStyles} {...props}>
      {children}
    </div>
  );
};

export default Panel;
