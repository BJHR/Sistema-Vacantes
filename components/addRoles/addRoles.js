import styled from "styled-components";

const StyledAddRoles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    min-height: 70vh;
    padding: 2rem 0;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;

    form {
        display: flex;
        flex-direction: column;
        width: 85%;
        .MuiFormControl-root {
            margin: 1rem 0; 
        }
    }
    .filepicker {
        margin: 1rem 0;
    }
    .MuiTableContainer-root{
        max-height: 70vh;
        overflow-y: auto;
    }
    

`;
export default StyledAddRoles;