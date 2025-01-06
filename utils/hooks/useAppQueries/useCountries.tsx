import { getCities, getCountries, getStates } from "@/utils/api/countries";
import { useQuery } from "@tanstack/react-query";

const useCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: Infinity,
  });

const useStates = (countryId: number) =>
  useQuery({
    queryKey: ["states", countryId],
    queryFn: () => getStates(countryId),
    enabled: !!countryId,
  });

const useCities = (countryId: number, stateId: number) =>
  useQuery({
    queryKey: ["cities", countryId, stateId],
    queryFn: () => getCities(stateId),
    enabled: !!countryId && !!stateId,
  });

export { useCountries, useStates, useCities };
