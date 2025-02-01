const parseCookie = (cookieString: string) => {
  const cookies = {};

  if (!cookieString) return cookies;

  cookieString.split("; ").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    cookies[name] = rest.join("=");
  });

  return cookies;
};

export default parseCookie;