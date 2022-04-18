import React from "react";

export interface ExtendedProps extends React.HTMLAttributes<HTMLElement> {
  name?: string
}

export type Status = "completed" | "loading" | "loaded" | "empty" | "error";

export interface TableHeaderInterface {
  className?: string
  columnName: string
  columnId: string
}

export interface PatientsDataInterface {
  id: string
  firstName: string
  lastName: string
  nhsNumber: string
  vaccineType: string
  vaccineDate: number
}
