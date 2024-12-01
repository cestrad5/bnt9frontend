import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

/**
 * Component to conditionally render its children only if the user is logged in.
 * @param {Object} props - React component props.
 * @param {ReactNode} props.children - React components to be rendered conditionally.
 * @returns {JSX.Element | null} - Rendered component or null if the user is not logged in.
 */
export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

/**
 * Component to conditionally render its children only if the user is logged out.
 * @param {Object} props - React component props.
 * @param {ReactNode} props.children - React components to be rendered conditionally.
 * @returns {JSX.Element | null} - Rendered component or null if the user is logged in.
 */
export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};
