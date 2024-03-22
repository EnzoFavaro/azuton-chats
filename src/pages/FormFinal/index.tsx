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
    var chanelPrefix = ""
    if (state.numberChanels == 1){
        chanelPrefix = "canal"
    }else{
        chanelPrefix = "canais"
    }

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
    ${state.numberChanels} ${chanelPrefix}: R$${chanelPrice}
    `;
    if(state.chatbot === true){
        message += "\n    Chatbot: ✅ (R$149,99)\n"
        finalPrice = finalPrice + 149.99
    }else{
        message += "\n    Chatbot: ❌\n"
    }


    if(state.api === true){
        message += "    API: ✅ (R$70,00)\n"
        finalPrice = finalPrice + 70
    }else{
        message += "    API: ❌\n"
    }


    if(state.campanhas === true){
        message += "    Campanhas: ✅ (R$149,99)\n"
        finalPrice = finalPrice + 149.99
    }else{
        message += "    Campanhas: ❌\n"
    }


    if(state.internChat === true){
        message += "    Chat interno: ✅ (R$149,99)\n"
        finalPrice = finalPrice + 149.99
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


    async function criaProposta(): Promise<number | undefined> {
        requestOptions.body = JSON.stringify({
            "name": state.company,
            "visible_to": "3",
            "bead21c0ecaf867ea55f5177a4bbdbadf9a7a27a": state.cnpj
        })
    
        try {
            const responseOrg = await fetch("https://api.pipedrive.com/v1/organizations?api_token=e41271d3d29a39b94e98c0236c891d23e2f37c54", requestOptions);
            const orgData = await responseOrg.json();
            
            const id_org: number | undefined = orgData.data?.id;
    
            if (!id_org) {
                throw new Error('ID da organização não encontrado');
            }

            requestOptions.body = JSON.stringify({
                "name": state.fullName,
                "org_id": id_org,
                "email": [
                    {
                        "value": state.email
                    }
                ],
                "phone": [
                    {
                        "value": state.whatsapp
                    }
                ],
                "visible_to": "3"
            });
    
            
            const responsePerson = await fetch("https://api.pipedrive.com/v1/persons?api_token=e41271d3d29a39b94e98c0236c891d23e2f37c54", requestOptions);
            const PersonData = await responsePerson.json();

            const id_Person: number | undefined = PersonData.data?.id;
    
            if (!id_Person) {
                throw new Error('ID da pessoa não encontrado');
            }
            
            try {

                const valor: string = Math.round(finalPrice).toString();
                requestOptions.body = JSON.stringify({
                    "title": "Azuton Chats - " + state.company,
                    "value": valor,
                    "person_id": id_Person,
                    "org_id": id_org,
                    "stage_id": 38,
                    "status": "open",
                    "visible_to": "3"
                });
                
                const responseDeal = await fetch("https://api.pipedrive.com/v1/deals?=&api_token=e41271d3d29a39b94e98c0236c891d23e2f37c54", requestOptions);
                
            }catch (error) {
                console.error('Ocorreu um erro:', error);
            throw error;
            }
            return id_org;
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            throw error;
        }
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