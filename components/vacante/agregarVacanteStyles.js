import styled from "styled-components";

const StyledAddVacante = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    min-height: 60vh;
    padding: 2rem 0;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    margin: 0 auto;
    max-height: 80vh;
    justify-content: center;    
    h4{
        width: 100%;
    }
    form {
        margin: 0 auto;
        display: flex;
        width: 85%;
        flex-wrap: wrap;
        .doable{
            width: 70%;
            display: flex;
            flex-wrap: wrap;
        }
        .MuiFormControl-root {
            margin: 1rem 0;
            width: 20vw;
            margin:  1vw;
        }
        .sendBtn{
            width: 70%;
        }
    }
`
export default StyledAddVacante;