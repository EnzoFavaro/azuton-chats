import * as C from './styles';
import { useHistory, Link } from 'react-router-dom';
import { Theme } from '../../components/Theme';
import { useForm, FormActions } from '../../contexts/FormContext';
import { useEffect } from 'react';


export const FormFinal = () => {
    const { state, dispatch } = useForm();
    const history = useHistory();
    const whatsapp = state.whatsapp.replace(/[-() ]/g, "");
    const cnpj = state.cnpj.replace(/[-/. ]/g, "");
    const userPrice = state.numberUsers *50
    const chanelPrice = state.numberChanels *298

    var message = `
    *Orçamento - Azuton Chats*\n
    Esse orçamento é válido por 7 dias\n
    \n
    Nome: ${state.fullName}\n
    E-mail: ${state.email}\n
    Empresa: ${state.company}\n
    CNPJ: ${cnpj}\n
    \n
    ${state.numberUsers} usuários: R$ ${userPrice}\n
    ${state.numberChanels} canais: R$ ${chanelPrice}\n
    \n
    Módulos:\n
    \n
    `;
    if(state.chatbot === true){
        message += "Chatbot: ✅\n"
    }else{
        message += "Chatbot: ❌\n"
    }


    if(state.api === true){
        message += "API: ✅\n"
    }else{
        message += "API: ❌\n"
    }


    if(state.campanhas === true){
        message += "Campanhas: ✅\n"
    }else{
        message += "Campanhas: ❌\n"
    }


    if(state.internChat === true){
        message += "Chat interno: ✅\n"
    }else{
        message += "Chat interno: ❌\n"
    }

    var myHeaders = new Headers();
    myHeaders.append("access-token", "63da926fdd79a4cd5a5cea97");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var myHeadersGET = new Headers();
    myHeadersGET.append("access-token", "63da926fdd79a4cd5a5cea97");
    myHeadersGET.append("Accept", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: ''
    };
    var requestOptionsGET = {
        method: 'GET',
        headers: myHeadersGET
    };

    function cadastraNovoContato(){
        requestOptions.body = JSON.stringify({
            "number": whatsapp,
            "updateIfExists": "false"
        })

        fetch("https://api.azutomatize.com.br/core/v2/api/contacts", requestOptions);
    }

    function buscaContato(){
        fetch("https://api.azutomatize.com.br/core/v2/api/contacts/number/"+whatsapp, requestOptionsGET)
        .then(response => response.json())
        .then(response => {
            const contatoId = response.id
            console.log(contatoId);
            requestOptions.body = JSON.stringify({
                "contactId": contatoId,
                "number": whatsapp,
                "message": message,
                "sectorId": "63d417b7e24e68b1d85f09a3",
              })
              fetch("https://api.azutomatize.com.br/core/v2/api/chats/create-new", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
    }
    
    

    useEffect(() => {
        if(state.fullName === '') {
            history.push('/');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 5
            });
            cadastraNovoContato();
            buscaContato();
        }
    }, []);

    return(
        <Theme>
            <C.Container>
            <p>Pronto!</p>
                <h1>Parabéns, {state.fullName} logo você receberá sua proposta!</h1>
                <p>Fique atento pois a proposta tem uma duração fixa de <b>7 dias</b></p>

                
            </C.Container>
        </Theme>
        
    )
}