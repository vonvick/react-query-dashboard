import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { PatientsDataInterface } from "../typings";

const fetchPatients = async ({ search }: { search: string }) => {
  let url = `https://61ba219448df2f0017e5a929.mockapi.io/api/patients`

  if (search.length > 1) {
    url += `?search=${search}`
  }
  const { data }: AxiosResponse<Array<PatientsDataInterface>> = await axios.get(url);
  return data;
};

export default function usePatientsData(searchText: string) {
  return useQuery(["patientsData", searchText], () => fetchPatients({ search: searchText }));
}
