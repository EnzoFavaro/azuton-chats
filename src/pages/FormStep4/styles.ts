import styled from "styled-components";
export const Container = styled.div`


section{
    display:flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap:wrap ;
    }

p {
    font-size: 13px;
    color: #B8B8D4;
}
h1 {
    margin: 0;
    padding: 0;
    font-size: 26px;
}
hr {
    height: 1px;
    border: 0;
    background-color: #16195C;
    margin: 30px 0;
}

div{
    border: 35px solid #0984e3;
    border-radius: 15px;
    background-color:#FFFF;
    padding: 20px 70px 20px;
    max-width: 350px;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 50px;
    img{
        width: 350px;
        max-height: 210px;

    }
    p{
        margin-top:20px;
        color: #636e72;
    }

}


label{
    font-size: 19px;
    font-weight: bold;
    color: #fff;
    input{
        display: block;
        margin-top:11px;
        box-sizing: border-box;
        width: 100%;
        border: 0;
        border-radius: 10px;
        outline: 2px solid #2d3436;
        height: 50px;
        font-size: 15px;
        background-color: #FFF;
        outline-offset: 3px;
        padding: 10px 1rem;
        transition: 0.25s;

    }
    input:focus{
        outline-offset: 5px;
        background-color: #fff
    }
}

button{
    background: #0984e3;
    color: white;
    font-family: inherit;
    padding-left: 1.0em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    width:170px;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    height: 2.8em;
    padding-right: 20px;
    margin-top: 30px;
    cursor: pointer;
    }
      
    button:hover {
        transform: translate(-0.05em, -0.05em);
        box-shadow: 0.15em 0.15em #5566c2;
    }
      
    button:active {
        transform: translate(0.05em, 0.05em);
        box-shadow: 0.05em 0.05em #5566c2;
    }

    .backButton {
        font-size: 16px;
        text-decoration: none;
        padding: 20px 40px;
        color: #B8B8D4;
    }
`;