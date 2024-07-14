"use client"

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
interface NavbarProps {
  serverSession: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ serverSession }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" href="/">Django NextAuth Template</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {serverSession && serverSession.user ? <Link className="nav-link" href="#" onClick={() => signOut()}>Log out </Link> : <Link className="nav-link" href="/login">Log in</Link> }
            
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;