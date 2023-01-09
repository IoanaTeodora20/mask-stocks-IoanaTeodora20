import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  // const [userName, setUserName] = useAtom(state.loggedUserName);
  // const [userLogged, setLogged] = useAtom(state.logged);

  return (
    <nav className="nav">
     
      <Link to="/" className="site-title">
        MASK STOCK
      </Link>
      <ul>
        <CustomLink to="/"></CustomLink>

        <CustomLink to="/register">REGISTRATION</CustomLink>
        <CustomLink to="/login">LOGIN</CustomLink>
        <CustomLink to="/">LOGOUT</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
