"use client";

// react
import { useDevlinksContext } from "@/context/devlink-context";

// next.js
import Image from "next/image";

// illustration
import phone_illustration from "../../public/images/illustration-phone-mockup.svg";
import DevLink from "../customize-links/dev-link";
import { useUserProfileContext } from "@/context/user-profile-context";
import { usePathname } from "next/navigation";

function PhoneMockup() {
  const { devlinksList } = useDevlinksContext();
  const { userObject, userProfilePicMockup } = useUserProfileContext();

  const pathname = usePathname();

  return (
    <>
      <div className="w-[307px] h-[631px] relative">
        <Image
          src={phone_illustration}
          alt="Phone mockup illustration"
          width={307}
          height={631}
        />
        <div className="absolute top-16 flex flex-col items-center justify-center w-full ">
          {userProfilePicMockup || userObject.profile_picture ? (
            <div>
              {!userProfilePicMockup ? (
                <Image
                  src={userObject.profile_picture}
                  alt="User's profile photo"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-primary-index duration-200 hover:border-primary-hover"
                />
              ) : (
                <Image
                  src={userProfilePicMockup}
                  alt="User's photo preview"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-primary-index duration-200 hover:border-primary-hover"
                />
              )}
            </div>
          ) : (
            ""
          )}

          {userObject.first_name || userObject.last_name || userObject.email ? (
            <>
              <p className="text-neutral-dark-grey text-center font-semibold text-lg w-[90%] mt-5 bg-white overflow-hidden">
                {userObject.first_name} {userObject.last_name}
              </p>
              <a
                href={`mailto:${userObject.email}`}
                className="text-sm text-neutral-grey text-center w-[90%] bg-white overflow-hidden hover:text-neutral-dark-grey/50 transition-colors cursor-pointer duration-300 ease-in-out"
              >
                {userObject.email}
              </a>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-center">
          <ul
            className={`absolute top-[17.3rem] w-[90%] max-h-[320px] flex flex-col items-center overflow-auto bg-white rounded-b-3xl ${
              pathname === "/profile-details" ? "h-[320px]" : ""
            }`}
          >
            {devlinksList?.map((link) => (
              <DevLink key={link.id} link={link} mockup />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default PhoneMockup;
