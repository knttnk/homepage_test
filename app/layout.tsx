import { Metadata } from "next";
import { metadataFrom } from "./metadata";

export async function generateMetadata(
  params: Promise<{
    locale: string;
  }>
): Promise<Metadata> {
  const { locale } = await params;
  return metadataFrom({ locale, root: "/" });
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
