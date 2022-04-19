import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { PatientsDataInterface } from "../typings";

const apiUrl = process.env.REACT_APP_API_URL;

const fetchPatients = async ({ search }: { search: string }) => {
  let url = `${apiUrl}/patients`

  if (search.length > 1) {
    url += `?search=${search}`
  }
  const { data }: AxiosResponse<Array<PatientsDataInterface>> = await axios.get(url);
  return data;
};

export default function usePatientsData(searchText: string) {
  return useQuery(["patientsData", searchText], () => fetchPatients({ search: searchText }));
}
