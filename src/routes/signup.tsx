import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your workspace — Lume OS" },
      { name: "description", content: "Start your 14-day free trial of Lume OS. No card required." },
    ],
  }),
  component: () => <AuthScreen mode="signup" />,
});
