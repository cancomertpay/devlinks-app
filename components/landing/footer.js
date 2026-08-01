import Image from "next/image";
import Link from "next/link";

function LandingFooter() {
  return (
    <footer className="border-t border-neutral-borders px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Image
          src="/images/logo-devlinks-small.svg"
          alt="devlinks logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <nav className="flex items-center gap-6 text-sm text-neutral-grey">
          <Link
            href="/login"
            className="transition-colors duration-300 ease-in-out hover:text-primary-index"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="transition-colors duration-300 ease-in-out hover:text-primary-index"
          >
            Create account
          </Link>
          <a
            href="https://github.com/cancomertpay/devlinks-app"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-300 ease-in-out hover:text-primary-index"
          >
            Source
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default LandingFooter;
