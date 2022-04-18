import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { ExtendedProps, Status } from "../typings";

interface PaginationProps extends ExtendedProps {
  paginationState: Status,
  handleLoadMore?: () => void
}

const StyledPaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledPaginationLoader = styled.div`
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: -20px;
  
  button {
    border-radius: 8px;
    padding: 10px 15px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    width: 100%;
    background: #54c5c1;
    border: none;
    cursor: pointer;
  }
`;

const PaginationLoader = ({ paginationState, handleLoadMore }: PaginationProps) => {
  const renderedLoader = () => {
    switch(paginationState) {
      case "loading":
        return (
          <StyledPaginationLoader>
            <FontAwesomeIcon icon="circle-notch" size="4x" spin />
          </StyledPaginationLoader>
        );
      case "completed":
        return (
          <StyledPaginationLoader>
            <button>All data fetched!</button>
          </StyledPaginationLoader>
        );
      case "loaded":
        return (
          <StyledPaginationLoader>
            <button onClick={handleLoadMore}>Click to load more</button>
          </StyledPaginationLoader>
        );
      default:
        return (
          <StyledPaginationLoader>
            <button>No data found!</button>
          </StyledPaginationLoader>
        );
    }
  }

  return (
    <StyledPaginationWrapper>
      { renderedLoader() }
    </StyledPaginationWrapper>
  );
};

export default PaginationLoader;
