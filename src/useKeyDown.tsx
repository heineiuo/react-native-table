import { useEffect } from "react";
import { Platform } from "react-native";

export function useKeyDown(
  key: string | string[],
  callback: (event: KeyboardEvent) => void
) {
  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    function handler(event: any) {
      let match = false;
      if (typeof key === "string" && event.key === key) {
        match = true;
      } else if (key.includes(event.key)) {
        match = true;
      }
      if (match) {
        callback(event);
      }
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [key, callback]);
}
