import '../App.css';
import './Layout.css';
import logoUrl from '../../assets/logo.svg';
import { Link } from '../components/Link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        margin: 'auto',
        maxWidth: 900
      }}
    >
      <Sidebar>
        <Logo />
        <Link href="/igoristan/">Welcome</Link>
        <Link href="/igoristan/todo">Todo</Link>
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRight: '2px solid #eee',
        flexDirection: 'column',
        lineHeight: '1.8em',
        display: 'flex',
        flexShrink: 0,
        padding: 20
      }}
      id="sidebar"
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div
        style={{
          minHeight: '100vh',
          paddingBottom: 50,
          padding: 20
        }}
        id="page-content"
      >
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        marginBottom: 10,
        marginTop: 20
      }}
    >
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
