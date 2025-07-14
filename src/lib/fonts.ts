import { cn } from "@/utils/cn";
import {
  Geist_Mono as FontMono,
  Geist as FontSans,
  Inter,
} from "next/font/google";

const fontInter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});


export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInter.variable,
);
