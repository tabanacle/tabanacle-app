import Button from "@/components/Shared/Button";
import Dropdown from "@/components/Shared/Dropdown";
import DropdownItem from "@/components/Shared/Dropdown/DropdownItem";
import Input from "@/components/Shared/Input";
import Navbar from "@/components/Shared/Navbar";
import CompleteSignup from "@/components/Signup/CompleteSignup";
import NewSignup from "@/components/Signup/NewSignup";
import { checkMember, login, signup } from "@/utils/api/auth";
import { getCities, getCountries, getStates } from "@/utils/api/countries";
import { isValidEmail, numberOnly } from "@/utils/helpers";
import useDisclosure from "@/utils/hooks/useDisclosure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface QueryProps {
  role: string;
  schema: string;
  first_name: string;
  church: string;
  email: string;
}

const Signup: NextPage<QueryProps> = ({
  role,
  schema,
  first_name,
  church,
  email,
}) => {
  return (
    <>
      <Head>
        <title>Sign up | Tabanacle</title>
        <meta name="description" content="Sign up page" />
      </Head>

      <Navbar />

      <main className="lg:pt-14 lg:pb-[16.8rem]">
        <div className="bg-white md:w-[68rem] md:mx-auto md:rounded-2.4 py-[8.7rem]">
          {role && schema ? (
            <CompleteSignup
              first_name={first_name}
              schema={schema}
              church_name={church}
              email={email}
            />
          ) : (
            <NewSignup />
          )}
        </div>
      </main>
    </>
  );
};

export default Signup;

export const getServerSideProps = async (context: { query: QueryProps }) => {
  const { role, schema, church, first_name, email } = context.query;

  if (!role) return { props: {} };

  return {
    props: {
      role,
      schema,
      church,
      first_name,
      email,
    },
  };
};
