import Cookies from "js-cookie";
import serverInstance from "./instance";
import { useAppStore } from "@/store";

const checkMember = async (email_address: string) => {
  try {
    const res = await serverInstance.post("/auth/check", {
      email_address,
    });

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

interface SignupTypes {
  email_address: string;
  password: string;
  church?: string;
  first_name?: string;
  last_name?: string;
  church_name?: string;
  church_email?: string;
  church_level?:
    | "Main HQ"
    | "Sub-HQ"
    | "Branch"
    | "Sub-Church"
    | "Satellite"
    | string;
  church_street?: string;
  church_city?: { id: number; city: string };
  church_state?: { id: number; state: string };
  church_country?: { id: number; country: string };
  postal_code?: string;
  phone_code?: string;
  church_phone?: string;
  member_phone?: string;
  // role_id?: string;
}

const signup = async (arg: SignupTypes) => {
  try {
    const body: SignupTypes = arg.church
      ? {
          church: arg.church,
          email_address: arg.email_address,
          password: arg.password,
        }
      : {
          first_name: arg.first_name,
          last_name: arg.last_name,
          email_address: arg.email_address,
          church_name: arg.church_name,
          church_email: arg.church_email,
          church_level: arg.church_level,
          church_street: arg.church_street,
          church_city: {
            id: arg.church_city?.id as number,
            city: arg.church_city?.city as string,
          },
          church_state: {
            id: arg.church_state?.id as number,
            state: arg.church_state?.state as string,
          },
          church_country: {
            id: arg.church_country?.id as number,
            country: arg.church_country?.country as string,
          },
          postal_code: arg.postal_code,
          phone_code: arg.phone_code,
          church_phone: arg.church_phone,
          member_phone: arg.member_phone,
          password: arg.password,
        };

    const res = await serverInstance.post("/auth/register", body);

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

const login = async (arg: {
  email_address: string;
  password: string;
  church: string;
}) => {
  try {
    const res = await serverInstance.post("/auth/login", arg);

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

const logout = async () => {
  try {
    const refreshToken = Cookies.get("refresh_token");

    const res = await serverInstance.post("/auth/logout", {
      refresh_token: refreshToken,
    });

    if (res.status === 204) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      return window.location.replace(
        `/login?redirect=${window.location.pathname}`
      );
    }
  } catch (error) {}
};

const refreshAccess = async () => {
  try {
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken)
      return window.location.replace(
        `/login?redirect=${window.location.pathname}`
      );

    const res = await serverInstance.post("/auth/refresh", {
      refresh_token: refreshToken,
    });

    Cookies.set("access_token", res.data?.data?.access_token);
    useAppStore.setState({ accessTokenState: "updated" });
  } catch (error) {
    if (error) {
      logout();
    }
    throw error;
  }
};

export { checkMember, signup, login, refreshAccess, logout };
