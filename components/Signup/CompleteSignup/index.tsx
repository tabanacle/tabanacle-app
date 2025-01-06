import Button from "@/components/Shared/Button";
import Input from "@/components/Shared/Input";
import { signup } from "@/utils/api/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";

const CompleteSignup: FC<{
  first_name: string;
  schema: string;
  church_name: string;
  email: string;
}> = ({ first_name, schema, church_name, email }) => {
  const router = useRouter();
  const [enterValues, setEnterValues] = useState({
    email,
    password: { value: "", error: "", show: false, check: 0 },
  });

  const { mutate: signupMutate, isPending: signupPending } = useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      if (res.data.access_token) {
        Cookies.set("access_token", res.data.access_token);
        Cookies.set("refresh_token", res.data.refresh_token);

        router.replace("/");
      }
    },
  });

  const submitForm = (e: FormEvent) => {
    signupMutate({
      church: schema,
      password: enterValues.password.value,
      email_address: enterValues.email,
    });
  };

  return (
    <form
      onSubmit={submitForm}
      className="px-1.2 max-w-[41.6rem] mx-auto flex flex-col items-center gap-2.8"
    >
      <div className="flex flex-col items-center gap-0.8">
        <h2 className="text-black text-1.8 lg:text-2.4 leading-2.8 lg:leading-3.2 font-semibold text-center capitalize">
          {`Hello, ${first_name}`}
        </h2>
        <p className="text-black-40 text-1.4 leading-2 font-normal">
          {`Complete your signup to join `}
          <span className="font-medium text-black-80">{church_name}</span>
        </p>
      </div>

      <Input
        label="Email address*"
        type="email"
        placeholder="example@email.com"
        value={enterValues.email}
        inputMode="email"
        onChange={() => null}
        className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2 disabled:cursor-not-allowed"
        required
        disabled
      />

      <div className="flex flex-col gap-1.6">
        <Input
          label="Password*"
          password
          type={enterValues.password.show ? "text" : "password"}
          placeholder="**********"
          value={enterValues.password.value}
          onChange={(e) => {
            let check = 0;
            if (/[a-z]/.test(e.target.value) && e.target.value.length >= 8)
              check += 1;
            if (/[A-Z]/.test(e.target.value)) check += 1;
            if (/\d/.test(e.target.value)) check += 1;
            if (/[@.#$!%^&*.?()]/.test(e.target.value)) check += 1;

            setEnterValues((val) => ({
              ...val,
              password: {
                ...val.password,
                value: e.target.value,
                check,
              },
            }));
          }}
          onFocus={() => {
            if (enterValues.password.error)
              setEnterValues((val) => ({
                ...val,
                password: { ...val.password, error: "" },
              }));
          }}
          className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
          errorMessage={enterValues.password.error}
          passwordClick={() =>
            setEnterValues((val) => ({
              ...val,
              password: {
                ...val.password,
                show: !val.password.show,
              },
            }))
          }
        />

        <div className="grid grid-cols-4 gap-0.4">
          <div
            className={`${
              enterValues.password.check >= 1 ? "bg-green-light" : "bg-black-10"
            } rounded-8 h-0.4`}
          />
          <div
            className={`${
              enterValues.password.check >= 2 ? "bg-green-light" : "bg-black-10"
            } rounded-8 h-0.4`}
          />
          <div
            className={`${
              enterValues.password.check >= 3 ? "bg-green-light" : "bg-black-10"
            } rounded-8 h-0.4`}
          />
          <div
            className={`${
              enterValues.password.check === 4
                ? "bg-green-light"
                : "bg-black-10"
            } rounded-8 h-0.4`}
          />
        </div>

        <p className="text-black-40 text-1.4 leading-2 font-normal">
          Use 8 or more characters with a mix of small and capital letters,
          numbers & symbols
        </p>
      </div>

      <Button
        type="submit"
        size="md"
        style="filled"
        text="Continue"
        onClick={() => null}
        className="w-full"
        loading={signupPending}
        disabled={
          signupPending ||
          !enterValues.password.value ||
          enterValues.password.check < 4
        }
      />
    </form>
  );
};

export default CompleteSignup;
