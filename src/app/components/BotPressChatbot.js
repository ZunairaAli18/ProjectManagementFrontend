"use client"; // If you're using Next.js App Router

import { useEffect } from "react";

export default function BotpressChatbot({ user }) {
  useEffect(() => {
    console.log("BotpressChatbot component mounted with user:", user);
    // Inject Botpress Webchat script
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    injectScript.defer = true;
    document.body.appendChild(injectScript);

    // Inject your hosted Botpress configuration script
    const configScript = document.createElement("script");
    configScript.src =
      "https://files.bpcontent.cloud/2025/07/29/04/20250729045753-JVRYGCXN.js";
    configScript.defer = true;
    document.body.appendChild(configScript);

    // Optional cleanup if needed
    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(configScript);
    };
  }, []);

  return null; // Nothing is rendered to the page
}
