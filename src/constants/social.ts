export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/YuvrajGora", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yuvraj-gora-b4735a367/", icon: "linkedin" },
  { label: "Email", href: "mailto:yuvrajgora10mar@gmail.com", icon: "mail" },
];

export const contactEmail = "yuvrajgora10mar@gmail.com";
export const location = "New Delhi, India";
