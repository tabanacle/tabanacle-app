import Button from "@/components/Shared/Button";
import Dropdown from "@/components/Shared/Dropdown";
import DropdownItem from "@/components/Shared/Dropdown/DropdownItem";
import Input from "@/components/Shared/Input";
import { signup } from "@/utils/api/auth";
import { getCities, getCountries, getStates } from "@/utils/api/countries";
import { isValidEmail, numberOnly } from "@/utils/helpers";
import {
  useCities,
  useCountries,
  useStates,
} from "@/utils/hooks/useAppQueries/useCountries";
import useDisclosure from "@/utils/hooks/useDisclosure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const NewSignup: FC = () => {
  const router = useRouter();
  const [enterValues, setEnterValues] = useState({
    step: "personal",
    email: { value: "", error: "" },
    password: { value: "", error: "", show: false, check: 0 },
    first_name: "",
    last_name: "",
    phone_code: { search: false, value: "+234" },
    member_phone: "",
    church_name: "",
    church_email: { value: "", error: "" },
    church_phone: "",
    church_street: "",
    church_city: { id: 0, city: "" },
    church_state: { id: 0, state: "" },
    church_country: { search: false, id: 161, country: "Nigeria" },
    postal_code: "",
    church_level: "",
  });
  const phoneDropdown = useDisclosure();
  const churchPhoneDropdown = useDisclosure();
  const countryDropdown = useDisclosure();
  // const streetDropdown = useDisclosure();
  const stateDropdown = useDisclosure();
  const cityDropdown = useDisclosure();
  const churchLevelDropdown = useDisclosure();

  const { data: countriesData, isLoading: countriesLoading } = useCountries();

  const { data: statesData, isLoading: statesLoading } = useStates(
    enterValues.church_country.id
  );

  const { data: citiesData, isLoading: citiesLoading } = useCities(
    enterValues.church_country.id,
    enterValues.church_state.id
  );

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
    e.preventDefault();

    if (enterValues.step === "personal")
      return setEnterValues((val) => ({ ...val, step: "church" }));

    if (enterValues.step === "church") {
      if (!enterValues.church_country.id)
        return toast("Church country is required");
      if (!enterValues.church_state.id)
        return toast("Church state is required");
      if (!enterValues.church_city.id) return toast("Church city is required");
      if (!enterValues.church_level) return toast("Church level is required");
    }

    return signupMutate({
      email_address: enterValues.email.value,
      password: enterValues.password.value,
      church_city: {
        city: enterValues.church_city.city,
        id: enterValues.church_city.id,
      },
      church_country: {
        country: enterValues.church_country.country,
        id: enterValues.church_country.id,
      },
      church_email: enterValues.church_email.value,
      church_level: enterValues.church_level,
      church_name: enterValues.church_name,
      church_phone: enterValues.church_phone,
      church_state: {
        id: enterValues.church_state.id,
        state: enterValues.church_state.state,
      },
      church_street: enterValues.church_street,
      first_name: enterValues.first_name,
      last_name: enterValues.last_name,
      member_phone: enterValues.member_phone,
      phone_code: enterValues.phone_code.value,
      postal_code: enterValues.postal_code,
    });
  };

  const searchPhoneCode =
    enterValues.phone_code.search &&
    countriesData?.data.filter((country: { phonecode: string }) =>
      `+${country.phonecode}`.includes(enterValues.phone_code.value)
    );

  const searchCountry =
    enterValues.church_country.search &&
    countriesData?.data.filter((country: { name: string }) =>
      country.name
        .toLowerCase()
        .includes(enterValues.church_country.country.toLowerCase())
    );

  return (
    <form
      onSubmit={submitForm}
      className="px-1.2 max-w-[41.6rem] mx-auto flex flex-col items-center gap-2.8"
    >
      <div className="flex flex-col items-center gap-0.8">
        <h2 className="text-black text-1.8 lg:text-2.4 leading-2.8 lg:leading-3.2 font-semibold text-center">
          Sign up
        </h2>
        <p className="text-black-40 text-1.4 leading-2 font-normal">
          {enterValues.step === "personal"
            ? "Get started in a few steps"
            : "Enter your church details to setup your tabanacle"}
        </p>
      </div>

      {/* <div className="flex flex-col md:flex-row md:items-center gap-1.6">
              <Button
                size="md"
                style="outline"
                text="Signup with Google"
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

      <div className="flex flex-col gap-2.8 w-full">
        {enterValues.step === "personal" ? (
          <>
            <Input
              label="Email address*"
              type="email"
              placeholder="example@email.com"
              value={enterValues.email.value}
              inputMode="email"
              onChange={(e) =>
                setEnterValues((val) => ({
                  ...val,
                  email: { ...val.email, value: e.target.value },
                }))
              }
              onBlur={(e) => {
                if (e.target.value && !isValidEmail.test(e.target.value))
                  setEnterValues((val) => ({
                    ...val,
                    email: { ...val.email, error: "Email is invalid" },
                  }));
              }}
              onFocus={() => {
                if (enterValues.email.error)
                  setEnterValues((val) => ({
                    ...val,
                    email: { ...val.email, error: "" },
                  }));
              }}
              className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              required
              errorMessage={enterValues.email.error}
            />

            <div className="flex flex-col xs:flex-row items-center gap-1.6 w-full">
              <Input
                label="First name*"
                type="text"
                placeholder="First name"
                value={enterValues.first_name}
                inputMode="text"
                onChange={(e) =>
                  setEnterValues((val) => ({
                    ...val,
                    first_name: e.target.value,
                  }))
                }
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                required
              />

              <Input
                label="Last name*"
                type="text"
                placeholder="Last name"
                value={enterValues.last_name}
                inputMode="text"
                onChange={(e) =>
                  setEnterValues((val) => ({
                    ...val,
                    last_name: e.target.value,
                  }))
                }
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                required
              />
            </div>

            <div className="flex flex-col gap-0.4">
              <span className="text-1.2 leading-1.6 font-medium text-black">
                Phone*
              </span>
              <div className="flex items-center gap-1.2 w-full">
                <Dropdown
                  isOpen={phoneDropdown.isOpen}
                  onOpen={phoneDropdown.onOpen}
                  onClose={phoneDropdown.onClose}
                  width="w-[25%]"
                  search
                  inputValue={enterValues.phone_code.value}
                  handleSearch={(e) =>
                    setEnterValues((val) => ({
                      ...val,
                      phone_code: {
                        search: true,
                        value: e.target.value,
                      },
                    }))
                  }
                  inputPlaceholder="+123"
                  inputClass="w-full text-1.4 h-4 rounded-1.2 px-1.2 disabled:cursor-not-allowed"
                  loading={countriesLoading}
                  disabled
                >
                  {(enterValues.phone_code.search
                    ? searchPhoneCode
                    : countriesData?.data
                  )?.map((country: { id: string; phonecode: string }) => (
                    <DropdownItem
                      key={country.id}
                      value={`+${country.phonecode}`}
                      onClick={() => {
                        setEnterValues((val) => ({
                          ...val,
                          phone_code: {
                            search: false,
                            value: `+${country.phonecode}`,
                          },
                        }));
                        phoneDropdown.onClose();
                      }}
                    />
                  ))}
                </Dropdown>

                <Input
                  type="text"
                  placeholder="08012345678"
                  value={enterValues.member_phone}
                  inputMode="tel"
                  onChange={(e) => {
                    if (
                      numberOnly.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      setEnterValues((val) => ({
                        ...val,
                        member_phone: e.target.value,
                      }));
                    }
                  }}
                  containerClass="w-3/4"
                  className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                  required
                />
              </div>
            </div>
          </>
        ) : null}

        {enterValues.step === "church" ? (
          <>
            <Input
              label="Church name*"
              type="text"
              placeholder="Heaven's people"
              value={enterValues.church_name}
              inputMode="text"
              onChange={(e) =>
                setEnterValues((val) => ({
                  ...val,
                  church_name: e.target.value,
                }))
              }
              className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              required
            />

            <Input
              label="Church email address*"
              type="email"
              placeholder="example@email.com"
              value={enterValues.church_email.value}
              inputMode="email"
              onChange={(e) =>
                setEnterValues((val) => ({
                  ...val,
                  church_email: {
                    ...val.church_email,
                    value: e.target.value,
                  },
                }))
              }
              onBlur={(e) => {
                if (e.target.value && !isValidEmail.test(e.target.value))
                  setEnterValues((val) => ({
                    ...val,
                    church_email: {
                      ...val.church_email,
                      error: "Email is invalid",
                    },
                  }));
              }}
              onFocus={() => {
                if (enterValues.church_email.error)
                  setEnterValues((val) => ({
                    ...val,
                    church_email: { ...val.church_email, error: "" },
                  }));
              }}
              className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              required
              errorMessage={enterValues.church_email.error}
            />

            <div className="flex flex-col gap-0.4">
              <span className="text-1.2 leading-1.6 font-medium text-black">
                Church phone*
              </span>
              <div className="flex items-center gap-1.2 w-full">
                <Dropdown
                  isOpen={churchPhoneDropdown.isOpen}
                  onOpen={churchPhoneDropdown.onOpen}
                  onClose={churchPhoneDropdown.onClose}
                  width="w-[25%]"
                  search
                  inputValue={enterValues.phone_code.value}
                  handleSearch={(e) =>
                    setEnterValues((val) => ({
                      ...val,
                      phone_code: {
                        search: true,
                        value: e.target.value,
                      },
                    }))
                  }
                  inputPlaceholder="+123"
                  inputClass="w-full text-1.4 h-4 rounded-1.2 px-1.2 disabled:cursor-not-allowed"
                  loading={countriesLoading}
                  disabled
                >
                  {(enterValues.phone_code.search
                    ? searchPhoneCode
                    : countriesData?.data
                  )?.map((country: { id: string; phonecode: string }) => (
                    <DropdownItem
                      key={country.id}
                      value={`+${country.phonecode}`}
                      onClick={() => {
                        setEnterValues((val) => ({
                          ...val,
                          phone_code: {
                            search: false,
                            value: `+${country.phonecode}`,
                          },
                        }));
                        churchPhoneDropdown.onClose();
                      }}
                    />
                  ))}
                </Dropdown>

                <Input
                  type="text"
                  placeholder="08012345678"
                  value={enterValues.church_phone}
                  inputMode="tel"
                  onChange={(e) => {
                    if (
                      numberOnly.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      setEnterValues((val) => ({
                        ...val,
                        church_phone: e.target.value,
                      }));
                    }
                  }}
                  containerClass="w-3/4"
                  className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                  required
                />
              </div>
            </div>

            <Dropdown
              isOpen={countryDropdown.isOpen}
              onOpen={countryDropdown.onOpen}
              onClose={countryDropdown.onClose}
              width="w-full"
              search
              inputLabel="Church country*"
              inputValue={enterValues.church_country.country}
              dropListClass="z-2"
              handleSearch={(e) =>
                setEnterValues((val) => ({
                  ...val,
                  church_country: {
                    ...val.church_country,
                    search: true,
                    country: e.target.value,
                  },
                }))
              }
              inputPlaceholder="+123"
              inputClass="w-full text-1.4 h-4 rounded-1.2 px-1.2 disabled:cursor-not-allowed"
              loading={countriesLoading}
              disabled
            >
              {(enterValues.church_country.search
                ? searchCountry
                : countriesData?.data
              )?.map((country: { id: string; name: string }) => (
                <DropdownItem
                  key={country.id}
                  value={country.name}
                  onClick={() => {
                    setEnterValues((val) => ({
                      ...val,
                      church_country: {
                        search: false,
                        id: Number(country.id),
                        country: country.name,
                      },
                    }));
                    countryDropdown.onClose();
                  }}
                />
              ))}
            </Dropdown>

            {/* Disabling address search for now */}
            {/* <Dropdown
                    isOpen={streetDropdown.isOpen}
                    onOpen={streetDropdown.onOpen}
                    onClose={streetDropdown.onClose}
                    width="w-full"
                    search
                    inputLabel="Church street*"
                    inputValue={enterValues.church_street}
                    dropListClass="z-2"
                    handleSearch={(e) =>
                      setEnterValues((val) => ({
                        ...val,
                        church_street: e.target.value,
                      }))
                    }
                    inputPlaceholder="1 Somewhere in the world"
                    inputClass="w-full text-1.4 h-4 rounded-1.2 px-1.2 disabled:cursor-not-allowed"
                    loading={false}
                  >
                    <DropdownItem
                      value="Smewhere in Ajah"
                      onClick={() => {
                        setEnterValues((val) => ({
                          ...val,
                          church_street: "Somewhere in Ajah",
                        }));
                        streetDropdown.onClose();
                      }}
                    />
                  </Dropdown> */}
            <Input
              label="Church street*"
              type="text"
              placeholder="1 Somewhere in the world"
              value={enterValues.church_street}
              inputMode="tel"
              onChange={(e) => {
                setEnterValues((val) => ({
                  ...val,
                  church_street: e.target.value,
                }));
              }}
              className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              required
            />

            <div className="grid xs:grid-cols-2 items-center gap-y-2.8 gap-x-1.6 w-full">
              <div className="flex flex-col gap-0.4 w-full">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Church state*
                </span>
                <Dropdown
                  isOpen={stateDropdown.isOpen}
                  onOpen={stateDropdown.onOpen}
                  onClose={stateDropdown.onClose}
                  toggle={stateDropdown.toggle}
                  btnText={
                    enterValues.church_state.state.length > 15
                      ? `${enterValues.church_state.state.slice(0, 15)}...`
                      : enterValues.church_state.state || "Select state"
                  }
                  dropListClass="z-2"
                  btnClass="w-full text-left"
                  width="w-full"
                  loading={statesLoading}
                  disabled={statesLoading || !enterValues.church_country.id}
                >
                  {statesData?.data.map(
                    (state: { id: string; name: string }) => (
                      <DropdownItem
                        key={state.id}
                        value={state.name}
                        onClick={() => {
                          setEnterValues((val) => ({
                            ...val,
                            church_state: {
                              id: Number(state.id),
                              state: state.name,
                            },
                            church_city: { id: 0, city: "" },
                          }));
                          stateDropdown.onClose();
                        }}
                      />
                    )
                  )}
                </Dropdown>
              </div>

              <div className="flex flex-col gap-0.4 w-full">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Church city*
                </span>
                <Dropdown
                  isOpen={cityDropdown.isOpen}
                  onOpen={cityDropdown.onOpen}
                  onClose={cityDropdown.onClose}
                  toggle={cityDropdown.toggle}
                  btnText={enterValues.church_city.city || "Select city"}
                  dropListClass="z-2"
                  btnClass="w-full"
                  width="w-full"
                  loading={citiesLoading}
                  disabled={citiesLoading || !enterValues.church_state.id}
                >
                  {citiesData?.data.map(
                    (city: { id: string; name: string }) => (
                      <DropdownItem
                        key={city.id}
                        value={city.name}
                        onClick={() => {
                          setEnterValues((val) => ({
                            ...val,
                            church_city: {
                              id: Number(city.id),
                              city: city.name,
                            },
                          }));
                          cityDropdown.onClose();
                        }}
                      />
                    )
                  )}
                </Dropdown>
              </div>

              <div className="flex flex-col gap-0.4 w-full">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Church level*
                </span>
                <Dropdown
                  isOpen={churchLevelDropdown.isOpen}
                  onOpen={churchLevelDropdown.onOpen}
                  onClose={churchLevelDropdown.onClose}
                  toggle={churchLevelDropdown.toggle}
                  btnText={enterValues.church_level || "Select level"}
                  dropListClass="z-2"
                  btnClass="w-full"
                  width="w-full"
                >
                  {[
                    "Main HQ",
                    "Sub-HQ",
                    "Branch",
                    "Sub-Church",
                    "Satellite",
                  ].map((level) => (
                    <DropdownItem
                      key={level}
                      value={level}
                      onClick={() => {
                        setEnterValues((val) => ({
                          ...val,
                          church_level: level,
                        }));
                        churchLevelDropdown.onClose();
                      }}
                    />
                  ))}
                </Dropdown>
              </div>

              <Input
                label="Postal code"
                type="text"
                placeholder="000000"
                value={enterValues.postal_code}
                onChange={(e) => {
                  setEnterValues((val) => ({
                    ...val,
                    postal_code: e.target.value,
                  }));
                }}
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              />
            </div>

            <div className="flex flex-col gap-1.6">
              <Input
                label="Password*"
                password
                type={enterValues.password.show ? "text" : "password"}
                placeholder="**********"
                value={enterValues.password.value}
                onChange={(e) => {
                  let check = 0;
                  if (
                    /[a-z]/.test(e.target.value) &&
                    e.target.value.length >= 8
                  )
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
                    enterValues.password.check >= 1
                      ? "bg-green-light"
                      : "bg-black-10"
                  } rounded-8 h-0.4`}
                />
                <div
                  className={`${
                    enterValues.password.check >= 2
                      ? "bg-green-light"
                      : "bg-black-10"
                  } rounded-8 h-0.4`}
                />
                <div
                  className={`${
                    enterValues.password.check >= 3
                      ? "bg-green-light"
                      : "bg-black-10"
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
                Use 8 or more characters with a mix of small and capital
                letters, numbers & symbols
              </p>
            </div>
          </>
        ) : null}
      </div>

      <div className="w-full flex flex-col gap-1.6">
        <Button
          type="submit"
          size="md"
          style="filled"
          text={(() => {
            if (enterValues.step === "personal") return "Next";
            return "Sign up";
          })()}
          onClick={() => null}
          className="w-full"
          loading={signupPending}
          disabled={(() => {
            if (signupPending) return true;
            if (enterValues.step === "personal") {
              if (
                !enterValues.email ||
                !enterValues.first_name ||
                !enterValues.last_name ||
                !enterValues.member_phone
              )
                return true;
            }
            return false;
          })()}
        />

        {enterValues.step === "church" ? (
          <Button
            size="md"
            style="outline"
            text="Back"
            onClick={() =>
              setEnterValues((val) => ({ ...val, step: "personal" }))
            }
            className="w-full"
          />
        ) : null}
      </div>

      <p className="text-black-40 text-1.4 leading-2 font-normal text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-indigo-light hover:text-indigo-dark focus:text-indigo-dark focus:outline-none"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default NewSignup;
