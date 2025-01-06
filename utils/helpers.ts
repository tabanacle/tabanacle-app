export const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const numberOnly = /^[0-9.\b]+$/;
export const password =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export const buildUrl = (
  baseUrl: string,
  params?: Array<
    string | number | { [key: string]: string | number | undefined }
  >
) => {
  let namedParams = "";
  params?.forEach((item) => {
    if (typeof item === "string" || typeof item === "number") {
      baseUrl += `/${item}`;
    } else {
      Object.keys(item).forEach((key) => {
        if (item[key] === "remove") {
          namedParams += `&${key}=`;
        } else if (item[key]) namedParams += `&${key}=${item[key]}`;
      });
    }
  });
  if (namedParams) {
    // url += `?${trimStart(namedParams, "&")}`;
    baseUrl += `?${namedParams.replace("&", "")}`;
  }

  return baseUrl;
};
