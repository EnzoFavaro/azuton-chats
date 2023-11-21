import styled from "styled-components";
export const Container = styled.div`
section{
    display:flex;
    flex-direction: row;
    justify-content: center;
}

p {
    font-size: 13px;
    color: #636e72;
}
h1 {
    margin: 0;
    padding: 0;
    font-size: 43px;
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
    margin-left: 100px;
    margin-right: 100px;
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


`;