import { redirect } from "next/navigation";

// `/` に来たら即座に `/ja` へリダイレクトする
export default function RootPage() {
  redirect("/ja");
}
