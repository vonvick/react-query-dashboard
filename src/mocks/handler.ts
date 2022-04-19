import { rest } from "msw";
import patientsData from "../test-helpers/patients-data.json";
import {PatientsDataInterface} from "../typings";

const apiUrl = process.env.REACT_APP_API_URL;
const patientFields = ['id', 'firstName', 'lastName', 'nhsNumber', 'vaccineType', 'vaccineDate'] as const
type fieldTypes = typeof patientFields[number]

export const handlers = [
  rest.get(`${apiUrl}/patients`, (req, res, ctx) => {
    const searchText = req.url.searchParams.get('search');

    if (typeof searchText !== 'undefined' && searchText && searchText.length > 1) {
      const results = patientsData.filter((patient: PatientsDataInterface) => {
        return patientFields.find((field: fieldTypes ) => {
          return String(patient[field]).toLowerCase().includes(searchText.toLowerCase())
        })
      })

      return res(ctx.json(results))
    }
    return res(ctx.json(patientsData));
  }),

];
