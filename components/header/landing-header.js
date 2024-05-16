// next.js
import Image from "next/image";
import Link from "next/link";

// devlinks logos
import devlinks_logo_large from "../../public/images/logo-devlinks-large.svg";

function LandingHeader() {
  return (
    <header className="box-border w-full pt-8 pb-4 px-6">
      <Link href="/">
        <Image src={devlinks_logo_large} alt="devlinks logo" priority />
      </Link>
    </header>
  );
}

export default LandingHeader;
