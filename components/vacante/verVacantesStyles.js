import styled from "styled-components";

const StyledVacante = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85vw;
    min-height: 60vh;
    padding: 2rem 0;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: 10rem;
    
    .mason{
        margin: 2vh auto;
        position: relative;
    }
    .vacante{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem ;
        background-color: #fff;
        border-radius: 25px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        flex-wrap: wrap;
        margin: 1rem 0;
        width: 32%;
        position: relative;
        .delete{
            curson: pointer;
            position: absolute;
            top: -10px;
            right: -10px;

        }
        Button{
            margin: 1rem 0;
        }
    }
                
`

export default StyledVacante;