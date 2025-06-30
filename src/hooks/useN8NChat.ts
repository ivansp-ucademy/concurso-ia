import { useEffect } from "react";

export function useN8NChat() {
  useEffect(() => {
    const existingScript = document.getElementById("n8n-chat-widget");
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://call-center.app.n8n.cloud/webhook/6b13b9a0-f409-471c-a1ba-5ae3caeb93d4/chat";
    script.id = "n8n-chat-widget";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
}
