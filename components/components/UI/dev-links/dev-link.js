import {
  Devto,
  Facebook,
  FrontendMentor,
  Github,
  Linkedin,
  Youtube,
  Email,
  Twitch,
  Codewars,
  FreeCodeCamp,
  Gitlab,
  Hashnode,
  StackOverflow,
  RightArrow,
} from "../icons";

function DevLink({ type, title, href }) {
  if (!type) {
    throw new Error("DevLink component must have a type prop");
  } else if (!href) {
    throw new Error("DevLink component must have an href prop");
  }

  let icon;
  let bgColor;

  switch (type) {
    case "github":
      icon = <Github color="#FFFFFF" />;
      bgColor = "bg-icons-github";
      break;
    case "frontend-mentor":
      icon = <FrontendMentor />;
      bgColor = "bg-icons-frontend-mentor";
      break;
    case "linkedin":
      icon = <Linkedin color="#FFFFFF" />;
      bgColor = "bg-icons-linkedin";
      break;
    case "youtube":
      icon = <Youtube color="#FFFFFF" />;
      bgColor = "bg-icons-youtube";
      break;
    case "facebook":
      icon = <Facebook color="#FFFFFF" />;
      bgColor = "bg-icons-facebook";
      break;
    case "twitch":
      icon = <Twitch color="#FFFFFF" />;
      bgColor = "bg-icons-twitch";
      break;
    case "email":
      icon = <Email />;
      bgColor = "bg-icons-email";
      break;
    case "devto":
      icon = <Devto color="#FFFFFF" />;
      bgColor = "bg-icons-devto";
      break;
    case "codewars":
      icon = <Codewars color="#FFFFFF" />;
      bgColor = "bg-icons-codewars";
      break;
    case "free-code-camp":
      icon = <FreeCodeCamp color="#FFFFFF" />;
      bgColor = "bg-icons-free-code-camp";
      break;
    case "gitlab":
      icon = <Gitlab color="#FFFFFF" />;
      bgColor = "bg-icons-gitlab";
      break;
    case "hashnode":
      icon = <Hashnode color="#FFFFFF" />;
      bgColor = "bg-icons-hashnode";
      break;
    case "stack-overflow":
      icon = <StackOverflow color="#FFFFFF" />;
      bgColor = "bg-icons-stack-overflow";
      break;
    default:
      icon = <Email color="#FFFFFF" />;
      bgColor = "bg-icons-email";
      break;
  }
  return (
    <a
      className={`rounded-lg p-4 text-white flex items-center justify-between w-[237px] h-[56px] hover:bg-opacity-50 transition-colors duration-300 cursor-pointer ${
        type === "frontend-mentor" || type === "email"
          ? "!text-neutral-dark-grey"
          : ""
      } ${bgColor}`}
      href={href}
      target="_blank"
    >
      <span className="flex items-center gap-2">
        <span>{icon}</span>
        <span>{title}</span>
      </span>
      <span>
        <RightArrow
          color={
            type === "frontend-mentor" || type === "email" ? "#333333" : "#fff"
          }
        />
      </span>
    </a>
  );
}

export default DevLink;
