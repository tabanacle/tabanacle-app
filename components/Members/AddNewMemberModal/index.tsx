import { FC, useState } from "react";
import ModalUI from "../../Shared/ModalUI";
import Button from "../../Shared/Button";
import User from "../../Shared/Icons/User";
import Input from "../../Shared/Input";
import Dropdown from "../../Shared/Dropdown";
import useDisclosure from "@/utils/hooks/useDisclosure";
import DropdownItem from "../../Shared/Dropdown/DropdownItem";
import { isValidEmail, numberOnly } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/utils/api/countries";
import {
  useCities,
  useCountries,
  useStates,
} from "@/utils/hooks/useAppQueries/useCountries";
import { getRoles } from "@/utils/api/church";
import { getDepartments } from "@/utils/api/departments";
import { getCells } from "@/utils/api/cells";
import Close from "../../Shared/Icons/Close";
import { getGroups } from "@/utils/api/groups";
import { getEvents } from "@/utils/api/events";
import DatePicker from "react-date-picker";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import Calendar from "@/components/Shared/Icons/Calendar";
import { getParseTreeNode } from "typescript";
import { getTrainings } from "@/utils/api/trainings";

interface AddNewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MembersValuesTypes {
  firstName: { value: string; error: string };
  lastName: { value: string; error: string };
  otherNames: string;
  gender: string;
  dob: Date | null | [Date, Date] | Value;
  email: { value: string; error: string };
  occupation: string;
  maritalStatus: string;
  country: { search: boolean; id: number; country: string };
  state: { id: number; state: string };
  city: { id: number; city: string };
  phoneCode: { search: boolean; value: string };
  number: string;
  street: string;
  nearestStop: string;
  postalCode: string;
  role: { id: string; name: string };
  department: { id: string; name: string };
  cell: { id: string; name: string };
  group: Array<{ id: string; name: string }>;
  firstTimer: "yes" | "no";
  event: { id: string; name: string };
  ministryTrainings: Array<{ id: string; name: string }>;
}

const AddNewMemberModal: FC<AddNewMemberModalProps> = ({ isOpen, onClose }) => {
  const [memberValues, setMemberValues] = useState<MembersValuesTypes>({
    firstName: { value: "", error: "" },
    lastName: { value: "", error: "" },
    otherNames: "",
    gender: "",
    dob: null,
    email: { value: "", error: "" },
    occupation: "",
    maritalStatus: "",
    country: { search: false, id: 161, country: "Nigeria" },
    state: { id: 0, state: "" },
    city: { id: 0, city: "" },
    phoneCode: { search: false, value: "+234" },
    number: "",
    street: "",
    nearestStop: "",
    postalCode: "",
    role: { id: "", name: "" },
    department: { id: "", name: "" },
    cell: { id: "", name: "" },
    group: [],
    firstTimer: "no",
    event: { id: "", name: "" },
    ministryTrainings: [],
  });

  const { data: countriesData, isLoading: countriesLoading } = useCountries();

  const { data: statesData, isLoading: statesLoading } = useStates(
    memberValues.country.id
  );

  const { data: citiesData, isLoading: citiesLoading } = useCities(
    memberValues.country.id,
    memberValues.state.id
  );

  const { data: rolesData, isLoading: rolesLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: Infinity,
  });

  const { data: departmentsData, isLoading: departmentsLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    staleTime: Infinity,
  });

  const { data: cellsData, isLoading: cellsLoading } = useQuery({
    queryKey: ["cells"],
    queryFn: getCells,
    staleTime: Infinity,
  });

  const { data: groupsData, isLoading: groupsLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    staleTime: Infinity,
  });

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: Infinity,
  });

  const { data: trainingsData, isLoading: trainingsLoading } = useQuery({
    queryKey: ["trainings"],
    queryFn: getTrainings,
    staleTime: Infinity,
  });

  const genderDropdown = useDisclosure();
  const maritalStatusDropdown = useDisclosure();
  const phoneDropdown = useDisclosure();
  const countryDropdown = useDisclosure();
  const stateDropdown = useDisclosure();
  const cityDropdown = useDisclosure();
  const roleDropdown = useDisclosure();
  const departmentsDropdown = useDisclosure();
  const cellsDropdown = useDisclosure();
  const groupsDropdown = useDisclosure();
  const firstTimerDropdown = useDisclosure();
  const trainingsDropdown = useDisclosure();

  const searchPhoneCode =
    memberValues.phoneCode.search &&
    countriesData?.data.filter((country: { phonecode: string }) =>
      `+${country.phonecode}`.includes(memberValues.phoneCode.value)
    );

  const searchCountry =
    memberValues.country.search &&
    countriesData?.data.filter((country: { name: string }) =>
      country.name
        .toLowerCase()
        .includes(memberValues.country.country.toLowerCase())
    );

  const filteredGroups = groupsData?.data.filter(
    (grp: { id: string }) =>
      !memberValues.group.map((g) => g.id).includes(grp.id)
  );

  const filteredTrainings = trainingsData?.data.filter(
    (trn: { id: string }) =>
      !memberValues.ministryTrainings.map((g) => g.id).includes(trn.id)
  );

  return (
    <ModalUI isOpen={isOpen} onClose={onClose} modalBodyClass="md:max-w-[90%]">
      <div className="flex flex-col justify-between gap-1.6 h-full md:h-[80dvh] relative md:px-1.6">
        <div className="flex items-center justify-between gap-1.2 pb-1.6 border-b-0.1 border-black-10">
          <h3 className="text-1.8 leading-3.2 font-semibold text-black">
            Add new member
          </h3>
        </div>

        <div className="h-[calc(100%_-_8rem)] pb-7.2 overflow-y-auto">
          <div className="flex flex-col gap-2 border-b-0.1 border-black-10 pb-3.2">
            <label
              htmlFor="profile-photo"
              className="inline-flex flex-col gap-1.2 cursor-pointer group"
            >
              <span className="w-8 h-8 inline-flex items-center justify-center bg-black-04 rounded-full [&>svg]:w-4 [&>svg]:h-4">
                <User />
              </span>

              <p className="text-1.4 leading-2 font-medium text-black underline group-hover:text-black-40">
                Upload profile photo
              </p>

              <input
                type="file"
                name="profile-photo"
                id="profile-photo"
                accept="image/jpg,image/jpeg,image/png"
                className="hidden"
              />
            </label>

            <div className="grid md:grid-cols-2 gap-1.6 max-w-[70rem]">
              <Input
                label="First name*"
                type="text"
                value={memberValues.firstName.value}
                onChange={(e) =>
                  setMemberValues((val) => ({
                    ...val,
                    firstName: { ...val.firstName, value: e.target.value },
                  }))
                }
                placeholder="First name"
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                errorMessage={memberValues.firstName.error}
                required
              />

              <Input
                label="Last name*"
                type="text"
                value={memberValues.lastName.value}
                onChange={(e) =>
                  setMemberValues((val) => ({
                    ...val,
                    lastName: { ...val.lastName, value: e.target.value },
                  }))
                }
                placeholder="Last name"
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                errorMessage={memberValues.lastName.error}
                required
              />

              <Input
                label="Other names"
                type="text"
                value={memberValues.otherNames}
                onChange={(e) =>
                  setMemberValues((val) => ({
                    ...val,
                    otherNames: e.target.value,
                  }))
                }
                placeholder="Other names"
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              />

              <div className="flex flex-col gap-0.4">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Gender*
                </span>

                <Dropdown
                  isOpen={genderDropdown.isOpen}
                  onClose={genderDropdown.onClose}
                  onOpen={genderDropdown.onOpen}
                  toggle={genderDropdown.toggle}
                  btnText={memberValues.gender || "Select gender"}
                  btnClass="w-full h-4 capitalize"
                  dropListClass="w-full"
                >
                  <DropdownItem
                    value="Male"
                    onClick={() => {
                      setMemberValues((val) => ({ ...val, gender: "male" }));
                      genderDropdown.onClose();
                    }}
                  />
                  <DropdownItem
                    value="Female"
                    onClick={() => {
                      setMemberValues((val) => ({ ...val, gender: "female" }));
                      genderDropdown.onClose();
                    }}
                  />
                </Dropdown>
              </div>

              <div className="flex flex-col gap-0.4">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Date of birth*
                </span>

                <DatePicker
                  onChange={(date) =>
                    setMemberValues((val) => ({ ...val, dob: date }))
                  }
                  value={memberValues.dob}
                  maxDate={new Date()}
                  className="h-4 border-0.05 border-black-20 rounded-1.2 bg-white-80 px-1.2
                  hover:border-black-40 cursor-pointer"
                  clearIcon={memberValues.dob ? <Close /> : ""}
                  calendarIcon={<Calendar />}
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                />
              </div>

              <Input
                label={`Email address${"*"}`}
                type="email"
                placeholder="example@email.com"
                value={memberValues.email.value}
                inputMode="email"
                onChange={(e) =>
                  setMemberValues((val) => ({
                    ...val,
                    email: { ...val.email, value: e.target.value },
                  }))
                }
                onBlur={(e) => {
                  if (e.target.value && !isValidEmail.test(e.target.value))
                    setMemberValues((val) => ({
                      ...val,
                      email: { ...val.email, error: "Email is invalid" },
                    }));
                }}
                onFocus={() => {
                  if (memberValues.email.error)
                    setMemberValues((val) => ({
                      ...val,
                      email: { ...val.email, error: "" },
                    }));
                }}
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                required
                errorMessage={memberValues.email.error}
              />

              <Input
                label="Occupation"
                type="text"
                value={memberValues.occupation}
                onChange={(e) =>
                  setMemberValues((val) => ({
                    ...val,
                    occupation: e.target.value,
                  }))
                }
                placeholder="Engineer, Doctor, Plumber etc."
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                errorMessage={memberValues.occupation}
              />

              <div className="flex flex-col gap-0.4">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Marital status
                </span>

                <Dropdown
                  isOpen={maritalStatusDropdown.isOpen}
                  onClose={maritalStatusDropdown.onClose}
                  onOpen={maritalStatusDropdown.onOpen}
                  toggle={maritalStatusDropdown.toggle}
                  btnText={
                    memberValues.maritalStatus || "Select marital status"
                  }
                  btnClass="w-full h-4 capitalize"
                  dropListClass="w-full"
                >
                  {["single", "married", "divorced", "widowed"].map(
                    (status) => (
                      <DropdownItem
                        key={status}
                        value={`${status.charAt(0).toUpperCase()}${status.slice(
                          1
                        )}`}
                        onClick={() => {
                          setMemberValues((val) => ({
                            ...val,
                            maritalStatus: status,
                          }));
                          maritalStatusDropdown.onClose();
                        }}
                      />
                    )
                  )}
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-b-0.1 border-black-10 pt-1.6 pb-3.2">
            <h5 className="text-1.6 leading-2.4 font-semibold text-black">
              Contact details
            </h5>

            <div className="grid md:grid-cols-2 gap-1.6 max-w-[70rem]">
              <Dropdown
                isOpen={countryDropdown.isOpen}
                onOpen={countryDropdown.onOpen}
                onClose={countryDropdown.onClose}
                width="w-full"
                search
                inputLabel="Country"
                inputValue={memberValues.country.country}
                dropListClass="z-2"
                handleSearch={(e) =>
                  setMemberValues((val) => ({
                    ...val,
                    country: {
                      ...val.country,
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
                {(memberValues.country.search
                  ? searchCountry
                  : countriesData?.data
                )?.map((country: { id: string; name: string }) => (
                  <DropdownItem
                    key={country.id}
                    value={country.name}
                    onClick={() => {
                      setMemberValues((val) => ({
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
                    inputValue={memberValues.phoneCode.value}
                    handleSearch={(e) =>
                      setMemberValues((val) => ({
                        ...val,
                        phoneCode: {
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
                    {(memberValues.phoneCode.search
                      ? searchPhoneCode
                      : countriesData?.data
                    )?.map((country: { id: string; phonecode: string }) => (
                      <DropdownItem
                        key={country.id}
                        value={`+${country.phonecode}`}
                        onClick={() => {
                          setMemberValues((val) => ({
                            ...val,
                            phoneCode: {
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
                    value={memberValues.number}
                    inputMode="tel"
                    onChange={(e) => {
                      if (
                        numberOnly.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        setMemberValues((val) => ({
                          ...val,
                          number: e.target.value,
                        }));
                      }
                    }}
                    containerClass="w-3/4"
                    className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                    required
                  />
                </div>
              </div>

              <Input
                label="Street"
                type="text"
                value={memberValues.street}
                onChange={(e) =>
                  setMemberValues((val) => ({
                    ...val,
                    street: e.target.value,
                  }))
                }
                placeholder="1 somewhere in the world"
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
                containerClass="md:col-[1/3]"
              />

              <Input
                label="Nearest stop"
                type="text"
                value={memberValues.nearestStop}
                onChange={(e) =>
                  setMemberValues((val) => ({
                    ...val,
                    nearestStop: e.target.value,
                  }))
                }
                placeholder="Bus stop"
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              />

              <div className="flex flex-col gap-0.4 w-full">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  State
                </span>
                <Dropdown
                  isOpen={stateDropdown.isOpen}
                  onOpen={stateDropdown.onOpen}
                  onClose={stateDropdown.onClose}
                  toggle={stateDropdown.toggle}
                  btnText={
                    memberValues.state.state.length > 15
                      ? `${memberValues.state.state.slice(0, 15)}...`
                      : memberValues.state.state || "Select state"
                  }
                  dropListClass="z-2 right-0"
                  btnClass="w-full text-left"
                  width="w-full"
                  loading={statesLoading}
                  disabled={statesLoading || !memberValues.country.id}
                >
                  {statesData?.data.map(
                    (state: { id: string; name: string }) => (
                      <DropdownItem
                        key={state.id}
                        value={state.name}
                        onClick={() => {
                          setMemberValues((val) => ({
                            ...val,
                            state: {
                              id: Number(state.id),
                              state: state.name,
                            },
                            city: { id: 0, city: "" },
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
                  City
                </span>
                <Dropdown
                  isOpen={cityDropdown.isOpen}
                  onOpen={cityDropdown.onOpen}
                  onClose={cityDropdown.onClose}
                  toggle={cityDropdown.toggle}
                  btnText={memberValues.city.city || "Select city"}
                  dropListClass="z-2 right-0"
                  btnClass="w-full"
                  width="w-full"
                  loading={citiesLoading}
                  disabled={citiesLoading || !memberValues.state.id}
                >
                  {citiesData?.data.map(
                    (city: { id: string; name: string }) => (
                      <DropdownItem
                        key={city.id}
                        value={city.name}
                        onClick={() => {
                          setMemberValues((val) => ({
                            ...val,
                            city: {
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

              <Input
                label="Postal code"
                type="text"
                placeholder="000000"
                value={memberValues.postalCode}
                onChange={(e) => {
                  setMemberValues((val) => ({
                    ...val,
                    postalCode: e.target.value,
                  }));
                }}
                className="w-full h-4 rounded-1.2 px-1.2 text-1.4 leading-2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 border-b-0.1 border-black-10 pt-1.6 pb-3.2">
            <h5 className="text-1.6 leading-2.4 font-semibold text-black">
              Church details
            </h5>

            <div className="grid md:grid-cols-2 gap-1.6 max-w-[70rem]">
              <div className="flex flex-col gap-0.4 w-full">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Role*
                </span>

                <Dropdown
                  isOpen={roleDropdown.isOpen}
                  onOpen={roleDropdown.onOpen}
                  onClose={roleDropdown.onClose}
                  toggle={roleDropdown.toggle}
                  btnText={memberValues.role.name || "Select role"}
                  dropListClass="z-2 right-0"
                  btnClass="w-full capitalize"
                  width="w-full"
                  loading={rolesLoading}
                  disabled={rolesLoading}
                >
                  {rolesData?.data?.map(
                    (role: { id: string; role_name: string }) => (
                      <DropdownItem
                        key={role.id}
                        value={`${role.role_name
                          .charAt(0)
                          .toUpperCase()}${role.role_name.slice(1)}`}
                        onClick={() => {
                          setMemberValues((val) => ({
                            ...val,
                            role: {
                              id: role.id,
                              name: role.role_name,
                            },
                          }));
                          roleDropdown.onClose();
                        }}
                      />
                    )
                  )}
                </Dropdown>
              </div>

              <div className="flex flex-col gap-0.4 w-full">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  {`Department${
                    ["leader", "worker"].includes(memberValues.role.name)
                      ? "*"
                      : ""
                  }`}
                </span>

                <Dropdown
                  isOpen={departmentsDropdown.isOpen}
                  onOpen={departmentsDropdown.onOpen}
                  onClose={departmentsDropdown.onClose}
                  toggle={departmentsDropdown.toggle}
                  btnText={memberValues.department.name || "Select department"}
                  dropListClass="z-2 right-0"
                  btnClass="w-full capitalize"
                  width="w-full"
                  loading={departmentsLoading}
                  disabled={departmentsLoading}
                >
                  {departmentsData?.data?.map(
                    (dept: { id: string; name: string }) => (
                      <DropdownItem
                        key={dept.id}
                        value={`${dept.name
                          .charAt(0)
                          .toUpperCase()}${dept.name.slice(1)}`}
                        onClick={() => {
                          setMemberValues((val) => ({
                            ...val,
                            department: {
                              id: dept.id,
                              name: dept.name,
                            },
                          }));
                          departmentsDropdown.onClose();
                        }}
                      />
                    )
                  )}
                </Dropdown>
              </div>

              <div className="flex flex-col gap-0.4 w-full">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Cell
                </span>

                <Dropdown
                  isOpen={cellsDropdown.isOpen}
                  onOpen={cellsDropdown.onOpen}
                  onClose={cellsDropdown.onClose}
                  toggle={cellsDropdown.toggle}
                  btnText={memberValues.cell.name || "Select cell"}
                  dropListClass="z-2 right-0"
                  btnClass="w-full capitalize"
                  width="w-full"
                  loading={cellsLoading}
                  disabled={cellsLoading}
                >
                  {cellsData?.data?.map(
                    (cell: { id: string; name: string }) => (
                      <DropdownItem
                        key={cell.id}
                        value={`${cell.name
                          .charAt(0)
                          .toUpperCase()}${cell.name.slice(1)}`}
                        onClick={() => {
                          setMemberValues((val) => ({
                            ...val,
                            cell: {
                              id: cell.id,
                              name: cell.name,
                            },
                          }));
                          cellsDropdown.onClose();
                        }}
                      />
                    )
                  )}
                </Dropdown>
              </div>

              <div className="flex flex-col gap-0.4 w-full">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Groups
                </span>

                <Dropdown
                  isOpen={groupsDropdown.isOpen}
                  onOpen={groupsDropdown.onOpen}
                  onClose={groupsDropdown.onClose}
                  toggle={groupsDropdown.toggle}
                  btnText={
                    memberValues.group
                      .map(
                        (gp: { name: string }) =>
                          `${gp.name.charAt(0).toUpperCase()}${gp.name.slice(
                            1
                          )}`
                      )
                      ?.join(", ") || "Select groups"
                  }
                  dropListClass="z-2 right-0"
                  btnClass="w-full capitalize"
                  width="w-full"
                  loading={groupsLoading}
                  disabled={groupsLoading}
                >
                  {filteredGroups?.map(
                    (group: { id: string; name: string }) => (
                      <DropdownItem
                        key={group.id}
                        value={`${group.name
                          .charAt(0)
                          .toUpperCase()}${group.name.slice(1)}`}
                        onClick={() => {
                          const selectedGroups = [...memberValues.group];
                          selectedGroups.push({
                            id: group.id,
                            name: group.name,
                          });

                          setMemberValues((val) => ({
                            ...val,
                            group: selectedGroups,
                          }));
                          groupsDropdown.onClose();
                        }}
                      />
                    )
                  )}
                </Dropdown>

                <div className="flex items-center flex-wrap gap-0.4">
                  {memberValues.group.map(
                    (gp: { id: string; name: string }, idx: number) => (
                      <div className="flex items-center bg-black-04 h-2.4 pl-0.8 rounded-0.8">
                        <span className="text-1.2 leading-1.6 font-normal text-black-80 pr-0.8">
                          {gp.name.charAt(0).toUpperCase()}
                          {gp.name.slice(1)}
                        </span>

                        <button
                          key={gp.id}
                          type="button"
                          className="h-full inline-flex items-center justify-center [&>svg]:w-1.6 [&>svg]:h-1.6 pl-0.4 pr-0.8 border-l-0.1 border-black-10
                          hover:bg-black-10 rounded-r-0.8"
                          onClick={() => {
                            const selectedGroups = [...memberValues.group];
                            selectedGroups.splice(idx, 1);

                            setMemberValues((val) => ({
                              ...val,
                              group: selectedGroups,
                            }));
                          }}
                        >
                          <Close />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-0.4">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  First timer?
                </span>

                <Dropdown
                  isOpen={firstTimerDropdown.isOpen}
                  onClose={firstTimerDropdown.onClose}
                  onOpen={firstTimerDropdown.onOpen}
                  toggle={firstTimerDropdown.toggle}
                  btnText={memberValues.firstTimer || "First timer?"}
                  btnClass="w-full h-4 capitalize"
                  dropListClass="w-full"
                >
                  <DropdownItem
                    value="Yes"
                    onClick={() => {
                      setMemberValues((val) => ({ ...val, firstTimer: "yes" }));
                      firstTimerDropdown.onClose();
                    }}
                  />
                  <DropdownItem
                    value="No"
                    onClick={() => {
                      setMemberValues((val) => ({ ...val, firstTimer: "no" }));
                      firstTimerDropdown.onClose();
                    }}
                  />
                </Dropdown>
              </div>

              <div className="flex flex-col gap-0.4">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  {`Program${memberValues.firstTimer === "yes" ? "*" : ""}`}
                </span>
                <Button
                  size="md"
                  style="outline"
                  text={memberValues.event.name || "Select program"}
                  onClick={() => null}
                />
              </div>

              <div className="flex flex-col gap-0.4 w-full md:col-[1/3]">
                <span className="text-1.2 leading-1.6 font-medium text-black">
                  Ministry trainings
                </span>

                <Dropdown
                  isOpen={trainingsDropdown.isOpen}
                  onOpen={trainingsDropdown.onOpen}
                  onClose={trainingsDropdown.onClose}
                  toggle={trainingsDropdown.toggle}
                  btnText={
                    memberValues.ministryTrainings
                      .map(
                        (tr: { name: string }) =>
                          `${tr.name.charAt(0).toUpperCase()}${tr.name.slice(
                            1
                          )}`
                      )
                      ?.join(", ") || "Select trainings"
                  }
                  dropListClass="z-2 right-0"
                  btnClass="w-full capitalize"
                  width="w-full"
                  loading={trainingsLoading}
                  disabled={trainingsLoading}
                >
                  {filteredTrainings?.map(
                    (train: { id: string; name: string }) => (
                      <DropdownItem
                        key={train.id}
                        value={`${train.name
                          .charAt(0)
                          .toUpperCase()}${train.name.slice(1)}`}
                        onClick={() => {
                          const selectedTrainings = [
                            ...memberValues.ministryTrainings,
                          ];
                          selectedTrainings.push({
                            id: train.id,
                            name: train.name,
                          });

                          setMemberValues((val) => ({
                            ...val,
                            group: selectedTrainings,
                          }));
                          trainingsDropdown.onClose();
                        }}
                      />
                    )
                  )}
                </Dropdown>

                <div className="flex items-center flex-wrap gap-0.4">
                  {memberValues.group.map(
                    (gp: { id: string; name: string }, idx: number) => (
                      <div className="flex items-center bg-black-04 h-2.4 pl-0.8 rounded-0.8">
                        <span className="text-1.2 leading-1.6 font-normal text-black-80 pr-0.8">
                          {gp.name.charAt(0).toUpperCase()}
                          {gp.name.slice(1)}
                        </span>

                        <button
                          key={gp.id}
                          type="button"
                          className="h-full inline-flex items-center justify-center [&>svg]:w-1.6 [&>svg]:h-1.6 pl-0.4 pr-0.8 border-l-0.1 border-black-10
                          hover:bg-black-10 rounded-r-0.8"
                          onClick={() => {
                            const selectedGroups = [...memberValues.group];
                            selectedGroups.splice(idx, 1);

                            setMemberValues((val) => ({
                              ...val,
                              group: selectedGroups,
                            }));
                          }}
                        >
                          <Close />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.8 justify-end absolute -bottom-1.6 right-0 left-0 bg-white py-1.6">
          <Button
            size="sm"
            style="borderless"
            text="Cancel"
            onClick={onClose}
          />

          <Button
            size="sm"
            style="filled"
            text="Add member"
            onClick={() => {
              onClose();
            }}
          />
        </div>
      </div>
    </ModalUI>
  );
};

export default AddNewMemberModal;
