// Small, uniform glyphs rather than the brand icon set: the share menu wants
// one visual weight down the whole list, and the existing icons are sized and
// coloured for the link cards instead.
const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
};

const XIcon = () => (
  <svg {...iconProps}>
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg {...iconProps}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg {...iconProps}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.66-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.76 9.76 0 0 1-4.97-1.36l-.36-.21-3.7.97.99-3.6-.23-.37a9.73 9.73 0 0 1-1.5-5.21c0-5.38 4.4-9.76 9.79-9.76a9.73 9.73 0 0 1 9.78 9.77c0 5.38-4.4 9.76-9.79 9.76ZM20.5 3.49A11.85 11.85 0 0 0 12.05 0C5.5 0 .18 5.31.17 11.84c0 2.09.55 4.13 1.6 5.93L.07 24l6.37-1.66a11.9 11.9 0 0 0 5.67 1.44h.01c6.55 0 11.88-5.31 11.88-11.84 0-3.16-1.23-6.14-3.48-8.38Z" />
  </svg>
);

const TelegramIcon = () => (
  <svg {...iconProps}>
    <path d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-1.99.93l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56l.38-5.56 10.09-9.13c.44-.39-.1-.61-.68-.22L6.34 13.6.5 11.77c-1.27-.4-1.29-1.27.27-1.88L22.27 1.5c1.05-.4 1.98.24 1.64 2.29Z" />
  </svg>
);

const EmailIcon = () => (
  <svg {...iconProps}>
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 5-8-5V6l8 5 8-5v2.24Z" />
  </svg>
);

const encode = encodeURIComponent;

// Plain intent URLs — no SDK, no tracking script, and nothing to load before
// the menu can open
export const buildShareTargets = (url, text) => [
  {
    id: "x",
    label: "X",
    icon: <XIcon />,
    href: `https://x.com/intent/post?url=${encode(url)}&text=${encode(text)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <LinkedInIcon />,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encode(url)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
    href: `https://wa.me/?text=${encode(`${text} ${url}`)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: <TelegramIcon />,
    href: `https://t.me/share/url?url=${encode(url)}&text=${encode(text)}`,
  },
  {
    id: "email",
    label: "Email",
    icon: <EmailIcon />,
    href: `mailto:?subject=${encode(text)}&body=${encode(url)}`,
  },
];
