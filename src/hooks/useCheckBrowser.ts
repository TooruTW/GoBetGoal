const useCheckBrowser = () => {
  const isChrome = navigator.userAgent.includes("Chrome");
  const isMobile = navigator.userAgent.includes("Mobile");

  const isDesktopChrome = isChrome && !isMobile;

  return {
    isDesktopChrome,
  };
};

export default useCheckBrowser;