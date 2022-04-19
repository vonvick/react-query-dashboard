import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomTable } from '../CustomTable';
import TextInput from "../TextInput";
import Navbar from "../Navbar";
import PaginationLoader from "../PageLoader";
import {
  PatientsDataInterface,
  TableHeaderInterface
} from "../../typings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import usePatientsData from "../../hooks/usePatientsData";
import { dateFormatter } from "../../helpers";

const DashboardContainer = styled.div`
  width: 100%;
`;

const DashboardWrapper = styled.div`
  max-width: 1300px;
  margin: 150px auto 30px auto;
  
  .sort-button-wrapper {
    display: flex;
    justify-content: end;
    align-items: end;
    margin-bottom: 12px;
  }
`;

const SearchWrapper = styled.div`
  margin-right: 12px;
  position: relative;
  input {
    padding-right: 20px;
  }
  .search-icon {
    position: absolute;
    right: 10px;
    top: 20%;
    color: grey;
    cursor: pointer;
  }
`;

const PatientsTable = styled(CustomTable)`
  width: 100%;
  border-collapse: collapse;
  
  .id-column {
    width: 800px;
  }
  
  thead td {
    padding: 5px;
    border-left: 1px solid #808585;
    height: 70px;
    font-weight: bold;
    .table-header-column {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-right: 8px;
      height: 100%;
      align-items: center;
      cursor: pointer;
    }
  }
  
  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: #54c5c1;
    }
    cursor: pointer;
  }
  
  tbody td {
    padding: 5px;
    border-left: 1px solid #808585;
    height: 50px;
  }
`;

const PatientsTableRow = styled(CustomTable.Tr)`
  border: 1px solid #282c34;
  width: 100%;
`;

const PatientsTableHeader = styled(CustomTable.Th)`
  width: 100%;
`;

const tableHeaders: TableHeaderInterface[] = [
  {
    className: 'id-column',
    columnName: 'Patient ID',
    columnId: 'id'
  },
  {
    className: 'name-column',
    columnName: 'Patients Name',
    columnId: ''
  },
  {
    className: 'nhs-column',
    columnName: 'NHS Number',
    columnId: 'nhsNumber'
  },
  {
    className: 'vaccine-column',
    columnName: 'Vaccine Type',
    columnId: 'vaccineType'
  },
  {
    className: 'vaccine-date-column',
    columnName: 'Vaccine Date',
    columnId: 'vaccineDate'
  },
];


const DashboardPage = () => {
  const [sortDirection, setSortDirection] = useState("DESC");
  const [ searchText, setSearchText ] = useState("");

  const { isLoading, error, data } = usePatientsData(searchText);

  const searchTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setSearchText(value)
    setSortDirection("DESC");
  }

  const sortPatientsData = () => {
    if (sortDirection === 'DESC') {
      setSortDirection('ASC')
    } else {
      setSortDirection('DESC')
    }
  };

  const changeSearchIcon = () => {
    if (searchText) {
      setSearchText('');
    }
  }

  const ResultPage = () => {
    if (isLoading) return (
      <PaginationLoader paginationState="loading" />
    );

    if (error) return (
      <PaginationLoader paginationState="error" />
    )

    if (typeof data !== 'undefined' && data.length < 1)  {
      return (
        <PaginationLoader paginationState="empty" />
      )
    } else {
      const formattedData = () => {
        let modifier = 1

        return data?.sort((a: PatientsDataInterface, b: PatientsDataInterface) => {
          if (sortDirection === 'DESC') modifier = -1
          if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return modifier
          if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return -1 * modifier
          return 0
        })
      }
      return (
        <PatientsTable>
          <PatientsTableHeader>
            <PatientsTableRow>
              {
                tableHeaders.map((header: TableHeaderInterface, index: number) => {
                  if (header.columnId) {
                    return (
                      <CustomTable.Td key={index}>
                        {header.columnName}
                      </CustomTable.Td>
                    )
                  } else {
                    return (
                      <CustomTable.Td key={index} onClick={sortPatientsData}>
                        <span className="table-header-column">
                          <span>{header.columnName}</span>
                          <FontAwesomeIcon icon={ sortDirection === 'DESC' ? 'sort-down' : 'sort-up' } />
                        </span>
                      </CustomTable.Td>
                    )
                  }
                })
              }
            </PatientsTableRow>
          </PatientsTableHeader>

          <CustomTable.Body>
            {
              formattedData()?.map(patient => {
                return (
                  <PatientsTableRow
                    key={patient.id}
                    data-testid={patient.id}
                  >
                    {
                      tableHeaders.map((header, headerIndex) => {
                        if (header.columnId && header.columnId !== "vaccineDate") {
                          return (
                            <CustomTable.Td key={headerIndex}>
                              {patient[header.columnId as keyof PatientsDataInterface]}
                            </CustomTable.Td>
                          )
                        } else if (header.columnId && header.columnId === "vaccineDate") {
                          return (
                            <CustomTable.Td key={headerIndex} onClick={sortPatientsData}>
                              { dateFormatter(patient.vaccineDate) }
                            </CustomTable.Td>
                          )
                        }
                        return (
                          <CustomTable.Td key={headerIndex}>
                            { header.columnId ? patient[header.columnId as keyof PatientsDataInterface] : `${patient.lastName} ${patient.firstName}` }
                          </CustomTable.Td>
                        )
                      })
                    }
                  </PatientsTableRow>
                )
              })
            }
          </CustomTable.Body>
        </PatientsTable>
      )
    }
  }
  return (
    <DashboardContainer>
      <Navbar>
        <SearchWrapper>
          <TextInput
            value={searchText}
            handler={searchTextHandler}
            inputType="text"
            placeholderText="Enter a text to search"
            ariaLabel="patient-search-input"
          />
          <span className="search-icon">
            <FontAwesomeIcon icon={searchText ? 'times' : 'search'} onClick={changeSearchIcon}/>
          </span>
        </SearchWrapper>
      </Navbar>
      <DashboardWrapper>
        <h1>Patients Vaccine Record</h1>
        { ResultPage() }
      </DashboardWrapper>
    </DashboardContainer>
  );
}

export default DashboardPage;
