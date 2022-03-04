import React, { FC }  from "react";

interface Props {
  // any props that come into the component
}

const ClientOnly: FC<Props> = ({ children, ...delegated })=> {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <React.Fragment {...delegated}>{children}</React.Fragment>;
};

export default ClientOnly;
