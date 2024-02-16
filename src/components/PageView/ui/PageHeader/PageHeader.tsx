import React from "react";

interface HeaderProps {
  text: string;
  className?: string;
}

const PageHeader = (props: HeaderProps) => {
  const { text, className } = props;

  return <h1>{text}</h1>;
};

export default PageHeader;
