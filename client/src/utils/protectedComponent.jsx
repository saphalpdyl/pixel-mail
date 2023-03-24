const ProtectedComponent = ({authenticated, Component}) => {
  return <>{!authenticated ? <>Not auth</> : <Component />}</>;
};

export default ProtectedComponent;
