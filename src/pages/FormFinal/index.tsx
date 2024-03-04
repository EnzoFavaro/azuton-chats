import * as C from './styles';
import { useHistory, Link } from 'react-router-dom';
import { Theme } from '../../components/Theme';
import { useForm, FormActions } from '../../contexts/FormContext';
import { useEffect } from 'react';


export const FormFinal = () => {
    const { state, dispatch } = useForm();
    const history = useHistory();
    const whatsapp = state.whatsapp.replace(/[-() ]/g, "");
    const userPrice = state.numberUsers *50
    const chanelPrice = state.numberChanels *298
    var finalPrice = userPrice+chanelPrice

    var message = `
    *Orçamento - Azuton Chats*
    Esse orçamento é válido por 7 dias\n
    \n
    *Seus Dados:*
    Nome: ${state.fullName}
    E-mail: ${state.email}
    Empresa: ${state.company}
    CNPJ: ${state.cnpj}
    \n

    ${state.numberUsers} usuários: R$${userPrice}
    ${state.numberChanels} canais: R$${chanelPrice}
    `;
    if(state.chatbot === true){
        message += "\n    Chatbot: ✅\n"
        finalPrice = finalPrice + 149.9
    }else{
        message += "\n    Chatbot: ❌\n"
    }


    if(state.api === true){
        message += "    API: ✅\n"
        finalPrice = finalPrice + 70
    }else{
        message += "    API: ❌\n"
    }


    if(state.campanhas === true){
        message += "    Campanhas: ✅\n"
        finalPrice = finalPrice + 149.9
    }else{
        message += "    Campanhas: ❌\n"
    }


    if(state.internChat === true){
        message += "    Chat interno: ✅\n"
        finalPrice = finalPrice + 149.9
    }else{
        message += "    Chat interno: ❌\n"
    }
    message += `
    ---------------------------------------------
    Mensalidade: R$${Math.round(finalPrice)}
    Setup: R$499
    `;


    var myHeaders = new Headers();
    myHeaders.append("access-token", "656cf577991a54728a88e983");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: ''
    };
    function enviaTexto(){
        requestOptions.body = JSON.stringify({
            "number": whatsapp,
            "message": message,
            "isWhisper": false,
            "forceSend": true,
            "verifyContact": true
          })
        
        fetch("https://api.azutomatize.com.br/core/v2/api/chats/send-text", requestOptions);
    }
    function iniciaAtendimento(){
        requestOptions.body = JSON.stringify({
            "number": whatsapp,
            "sectorId": "63d417b7e24e68b1d85f09a3"
          })

        fetch("https://api.azutomatize.com.br/core/v2/api/chats/create-new", requestOptions)
    }

    function criaProposta(){
        requestOptions.body = JSON.stringify({
            "name": state.company,
            "visible_to": "3",
            "bead21c0ecaf867ea55f5177a4bbdbadf9a7a27a": state.cnpj
        })

        fetch("https://api.pipedrive.com/v1/organizations?api_token=e41271d3d29a39b94e98c0236c891d23e2f37c54", requestOptions)
        .then(response => response.json())
                .then(response =>{
                    const id_org = response.data.id
                    const valor = Math.round(finalPrice).toString();

                    requestOptions.body = JSON.stringify({
                        "title": "Azuton Chats - "+ state.company,
                        "value": valor,
                        "org_id": id_org,
                        "stage_id": 38,
                        "status": "open",
                        "visible_to": "3"
                    })
                    fetch("https://api.pipedrive.com/v1/deals?=&api_token=e41271d3d29a39b94e98c0236c891d23e2f37c54", requestOptions)

                })
    }
    
    

    useEffect(() => {
        if(state.fullName === '') {
            history.push('/');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 5
            });
            window.dataLayer.push({
                event: 'event',
                eventProps: {
                  form: 'step 5',
                  title: 'completed'
                }
              });
            enviaTexto();
            iniciaAtendimento();
            criaProposta();
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