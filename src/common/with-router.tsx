import { useLocation, useNavigate, useParams } from "react-router-dom";

type RouterProps = {
  location: any;
  navigate: any;
  params: any;
};
export const withRouter = <P extends {}>(
  Component: React.ComponentType<P>
): React.ComponentType<P & { router: RouterProps }> => {
  function ComponentWithRouterProp(props: P) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};
