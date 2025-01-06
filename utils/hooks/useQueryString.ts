import { useRouter } from "next/router";

export default function useQueryString() {
  const router = useRouter();

  // const params = (() => {
  //   const url = new URL(window.location.href);
  //   const allParams: { [key: string]: string } = {};
  //   url.searchParams.forEach((val, key) => {
  //     allParams[key] = val;
  //   });
  //   return allParams;
  // })();

  function updateQueryString(
    newParams: { [key: string]: string | string[] },
    { visit = true, preserveState = true, preserveScroll = true } = {
      visit: true,
      preserveState: true,
      preserveScroll: true,
    }
  ) {
    const url = new URL(window.location.href);
    Object.keys(newParams).map((key) => {
      const value = newParams[key];
      if (value === "") {
        console.log(key);
        url.searchParams.delete(key);
      } else if (Array.isArray(value) && value.length === 0) {
        url.searchParams.delete(`${key}[]`);
      } else if (typeof value === "string") {
        url.searchParams.set(key, value);
      } else if (Array.isArray(value)) {
        url.searchParams.delete(`${key}[]`);
        value.forEach((item) => url.searchParams.append(`${key}[]`, item));
      }
      return null;
    });

    if (visit) {
      router.push(url.toString());
    } else {
      window.history.replaceState(null, "", url);
    }
    return url;
  }

  function clearQueryString({ visit = true }) {
    const url = new URL(window.location.href);
    url.searchParams.forEach((val, key) => {
      url.searchParams.delete(key);
    });
    if (visit) {
      router.push(url.toString());
    } else {
      window.history.replaceState(null, "", url);
    }
  }

  return { updateQueryString, clearQueryString };
}
