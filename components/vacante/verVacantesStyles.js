import styled from "styled-components";

const StyledVacante = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80vw;
    min-height: 60vh;
    padding: 2rem 0;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    margin: 0 auto;
    max-height: 80vh;
    .mason{
        position: relative;
    }
    .vacante{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem 0;
        background-color: #fff;
        border-radius: 25px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        flex-wrap: wrap;
        margin: 0 1rem;
        
`

export default StyledVacante;