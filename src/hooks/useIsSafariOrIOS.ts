import { useEffect, useState } from "react";

export function useIsSafariOrIOS() {
  const [isSafariOrIOS, setIsSafariOrIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    setIsSafariOrIOS(isIOS || isSafari);
  }, []);

  return isSafariOrIOS;
}
