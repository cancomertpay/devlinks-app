// next.js
import Image from "next/image";

// devlinks logo small
import devlinks_logo_small from "../../public/images/logo-devlinks-small.svg";
import devlinks_logo_large from "../../public/images/logo-devlinks-large.svg";

function Header() {
  return (
    <header>
      {/* brand-logo */}
      <div>
        <Image src={devlinks_logo_large} alt="devlinks logo" />
      </div>
      <div>{/* .... */}</div>
    </header>
  );
}

export default Header;
