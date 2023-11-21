import styled from "styled-components";

export const Container = styled.div`
    p {
        font-size: 13px;
        color: #B8B8D4;
    }
    h1 {
        margin: 0;
        padding: 0;
        font-size: 29px;
    }
    hr{
        height: 1px;
        border: 0;
        background-color:#2d3436;
        margin: 40px 0;
    }

    div{
        border: 5px solid #0984e3;
        border-radius: 15px;
        padding: 20px 20px;
        background-color:#0984e3; 

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

`;