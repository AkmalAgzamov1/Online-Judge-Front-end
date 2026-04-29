import { Link } from "react-router-dom";

export default function DefaultLayout({ title, children }) {
  return (
    <div className="oj-layout">
      <header className="oj-header">
        <Link to="/" className="oj-logo">YZU OJ</Link>
        <nav className="oj-nav">
          <Link to="/">Home</Link>
          <Link to="/problems">Problems</Link>
        </nav>
      </header>

      <main className="oj-main">
        {title && <h1 className="oj-title">{title}</h1>}
        {children}
      </main>

      <footer className="oj-footer">
        © {new Date().getFullYear()} YZU Online Judge
      </footer>
    </div>
  );
}
