import { z } from "zod";

const envConfigSchema = z.object({
  NEXT_PUBLIC_SITE_NAME: z.string().nonempty(),
  NEXT_PUBLIC_SITE_DESC: z.string().nonempty(),
  NEXT_PUBLIC_SITE_URL: z.string().nonempty(),
});

export const envConfig = envConfigSchema.parse(process.env);

export const siteConfig = {
  name: envConfig.NEXT_PUBLIC_SITE_NAME || "nonempty",
  description: envConfig.NEXT_PUBLIC_SITE_DESC || "nonempty",
  url: envConfig.NEXT_PUBLIC_SITE_URL || "nonempty",
  links: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  navLinks: [
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Cara Kerja",
      href: "/tutorial",
    },
    {
      label: "Komunitas",
      href: "/community",
    },
    {
      label: "Harga",
      href: "/pricing",
    },
    {
      label: "FAQ",
      href: "/faq",
    },
  ],
  sidebarLinks: {
    mainLinks: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: "dashboard",
        isActive: true,
        items: [
          {
            title: "Pusat kendali interview",
            url: "/dashboard/interview/create",
          },
          {
            title: "Jadwal Interview",
            url: "/dashboard/interview/schedule",
          },
        ],
      },
      {
        title: "Cari Pekerjaan",
        url: "/dashboard/work",
        icon: "work",
        isActive: false,
        items: [],
      },
      {
        title: "Pengaturan",
        url: "/dashboard/setting",
        icon: "setting",
        isActive: false,
        items: [],
      },
    ] as const,
  } as const,
} as const;
