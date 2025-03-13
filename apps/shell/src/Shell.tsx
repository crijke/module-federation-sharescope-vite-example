import { Link, Outlet } from "react-router-dom";

function Shell() {
  return (
    <div className="Shell">
      <h1>Shell</h1>
      <nav>
        <ul>
          <li>
            <Link to="/app-1">App 1</Link>
          </li>
          <li>
            <Link to="/app-2">App 2</Link>
          </li>
          <li>
            <Link to="/app-3">App 3</Link>
          </li>
        </ul>
      </nav>
      <main>
        {/* @ts-ignore */}
        <Outlet />
      </main>
    </div>
  );
}

export default Shell;
