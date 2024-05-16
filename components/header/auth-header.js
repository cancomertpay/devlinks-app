// next.js
import Image from "next/image";
import Link from "next/link";

// devlinks logos
import devlinks_logo_large from "../../public/images/logo-devlinks-large.svg";

function AuthHeader() {
  return (
    <header className="box-border w-full pt-8 pb-4 px-6 md:flex md:justify-center md:mb-8">
      <Link href="/">
        <Image className="md:w-[182.5px] md:h-[40px]" src={devlinks_logo_large} alt="devlinks logo" priority />
      </Link>
    </header>
  );
}

export default AuthHeader;
