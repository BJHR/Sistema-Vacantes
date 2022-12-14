import styled from "styled-components";

const StyledNavbar = styled.nav`
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: transparent;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    transition: background-color 0.3s ease-in-out;
        p {
            font-size: 1rem;
            font-weight: 700;
            margin: 0;
            color: #000;
        }
        button {
            max-width: 10vw
        }
        .navbar{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .links{
            display: flex;
            justify-content: space-between;
            
            p{
                cursor: pointer;
                margin: 0 1rem;
            }
        }
`;

export default StyledNavbar;
