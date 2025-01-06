import Button from "@/components/Shared/Button";
import Input from "@/components/Shared/Input";
import Navbar from "@/components/Shared/Navbar";
import { checkMember, login } from "@/utils/api/auth";
import { isValidEmail } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Enter: NextPage = () => {
  const router = useRouter();
  const [enterValues, setEntervalues] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "", show: false },
  });

  const { mutate: loginMutate, isPending: loginPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.data.access_token) {
        toast(res.message);
        Cookies.set("access_token", res.data.access_token);
        Cookies.set("refresh_token", res.data.refresh_token);

        if (router.query?.redirect)
          return router.replace(`${router.query.redirect}`);
        router.replace("/");
      }
    },
    onError: () => {
      toast("Email or password incorrect!");
    },
  });

  const { mutate: checkMemberMutate, isPending: checkMemberPending } =
    useMutation({
      mutationFn: checkMember,
      onSuccess: (res) => {
        if (res.data.exists) {
          setEntervalues((val) => ({
            ...val,
            church: res.data.church,
          }));

          return loginMutate({
            email_address: enterValues.email.value,
            password: enterValues.password.value,
            church: res.data.church,
          });
        }

        if (!res.data.exists) {
          toast("Email or password incorrect!");
        }
      },
    });

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    return checkMemberMutate(enterValues.email.value);
  };

  return (
    <>
      <Head>
        <title>Login | Tabanacle</title>
        <meta name="description" content="Login page" />
      </Head>

      <Navbar />

      <main className="lg:pt-10 lg:pb-8">
        <div className="bg-white md:w-[68rem] md:mx-auto md:rounded-2.4 py-[8.7rem]">
          <form
            onSubmit={submitForm}
            className="px-1.2 max-w-[41.6rem] mx-auto flex flex-col items-center gap-2.8"
          >
            <div className="flex flex-col items-center gap-0.8">
              <h2 className="text-black text-1.8 lg:text-2.4 leading-2.8 lg:leading-3.2 font-semibold text-center">
                Login
              </h2>
              <p className="text-black-40 text-1.4 leading-2 font-normal">
                Enter your email and password
              </p>
            </div>

            {/* <div className="flex flex-col md:flex-row md:items-center gap-1.6">
              <Button
                size="md"
                style="outline"
                text="Enter with Google"
                className="flex items-center gap-0.8"
                onClick={() => null}
                textClass="text-1.4 leading-2"
              />
            </div>

            <div className="flex items-center justify-between gap-1.6 w-full">
              <div className="h-0.1 bg-black-10 w-full" />
              <p className="text-black-40 text-1.2 leading-1.6 font-normal min-w-fit">
                Or with Email
              </p>
              <div className="h-0.1 bg-black-10 w-full" />
            </div> */}

            <Input
              label="Email address*"
              type="email"
              placeholder="example@email.com"
              value={enterValues.email.value}
              inputMode="email"
              onChange={(e) =>
                setEntervalues((val) => ({
                  ...val,
                  email: { ...val.email, value: e.target.value },
                }))
              }
              onBlur={(e) => {
                if (e.target.value && !isValidEmail.test(e.target.value))
                  setEntervalues((val) => ({
                    ...val,
                    email: { ...val.email, error: "Email is invalid" },
                  }));
              }}
              onFocus={() => {
                if (enterValues.email.error)
                  setEntervalues((val) => ({
                    ...val,
                    email: { ...val.email, error: "" },
                  }));
              }}
              className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              required
              errorMessage={enterValues.email.error}
            />

            <div className="flex flex-col gap-1.6 items-end w-full">
              <Input
                label="Password*"
                password
                type={enterValues.password.show ? "text" : "password"}
                placeholder="**********"
                value={enterValues.password.value}
                onChange={(e) =>
                  setEntervalues((val) => ({
                    ...val,
                    password: { ...val.password, value: e.target.value },
                  }))
                }
                onFocus={() => {
                  if (enterValues.password.error)
                    setEntervalues((val) => ({
                      ...val,
                      password: { ...val.password, error: "" },
                    }));
                }}
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                errorMessage={enterValues.password.error}
                passwordClick={() =>
                  setEntervalues((val) => ({
                    ...val,
                    password: { ...val.password, show: !val.password.show },
                  }))
                }
              />
              <Link
                className="w-fit inline-block text-1.4 leading-2 font-normal text-indigo-light hover:text-indigo-dark
                focus:text-indigo-dark focus:outline-none"
                href="/"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="md"
              style="filled"
              text="Login"
              onClick={() => null}
              className="w-full"
              loading={checkMemberPending || loginPending}
              disabled={
                checkMemberPending ||
                loginPending ||
                !enterValues.email.value ||
                !enterValues.password.value
              }
            />

            <p className="text-black-40 text-1.4 leading-2 font-normal text-center">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-light hover:text-indigo-dark focus:text-indigo-dark focus:outline-none"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Enter;
