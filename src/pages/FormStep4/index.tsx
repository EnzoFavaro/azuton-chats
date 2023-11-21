import { useHistory, Link } from 'react-router-dom';
import { Theme } from '../../components/Theme';
import * as C from './styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, FormActions } from '../../contexts/FormContext';
import { ChangeEvent, useEffect } from 'react';
import Switch from '@mui/material/Switch';


export const FormStep4 = () => {
    const history = useHistory();
    const { state, dispatch } = useForm();

    useEffect(() => {
        if(state.fullName === '') {
            history.push('/');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 4
            });
        }
    }, []);


    const handleNextStep = () => {
        if(state.cnpj !== '' && state.company !== '' && state.email !== '') {
            history.push('/step5');
        } else {
            toast.error("Preencha todos os dados", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
    }

    const handleChatbotChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        dispatch({
            type: FormActions.setChatbot,
            payload: event.target.checked
        });
    }
    const handleCampanhasChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        dispatch({
            type: FormActions.setCampanhas,
            payload: event.target.checked
        });
    }
    const handleChatInternoChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        dispatch({
            type: FormActions.setInternChat,
            payload: event.target.checked
        });
    }
    const handleAPIChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        dispatch({
            type: FormActions.setApi,
            payload: event.target.checked
        });
    }

    

    return(
        <Theme>
            <ToastContainer />
            <C.Container>
                
                <p>Etapa 4 - {state.chatbot} </p>
                <h1>{state.fullName}, diga sobre quais módulos gostaria de utilizar</h1>
                <p>Os módulos são cobrados separadamente e sob demanda, caso precise, você pode ativar/desativar futuramente</p>
                <hr/>
                <section>
                <div>
                    <h2>Chatbot</h2>
                    <hr/>
                    <p>Automatize seu atendimento com o chatbot, criando uma URA de atendimento automático
                    você poderá atender milhares de clientes com muito menos esforço e de maneira simples.                        
                    </p>
                    <Switch
                        onChange={handleChatbotChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        size='medium'
                        value= {state.chatbot}
                    /> 
                </div>

                <div>
                    <h2>Campanhas</h2>
                    <hr/>
                    <p>Com as campanhas você poderá atingir muitos clientes de uma vez só, disparando de maneira automática
                        mensagens pré programadas e atendendo apenas os clientes que responderem.                        
                    </p>
                    <Switch
                        onChange={handleCampanhasChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        size='medium'
                        value= {state.campanhas}
                    /> 
                </div>

                <div>
                    <h2>Chat interno</h2>
                    <hr/>
                    <p>Com o chat interno seu time pode conversar entre si de maneira prática e na mesma plataforma que
                        realizam os atendimentos, aumentando em muito a produtividade, essa funcionalidade é fundamental
                        para times que trabalham em Home Office.                        
                    </p>
                    <Switch
                        onChange={handleChatInternoChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        size='medium'
                        value= {state.internChat}
                    /> 
                </div>

                <div>
                    <h2>API</h2>
                    <hr/>
                    <p>Com a API do sistema você poderá realizar integrações com seu CRM, seu ERP ou qualquer outro sistema
                        que tenha uma API.                        
                    </p>
                    <Switch
                        onChange={handleAPIChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        size='medium'
                        value= {state.api}
                    /> 
                </div>


                </section>
                <Link to="/step3" className="backButton">Voltar</Link>
                <button onClick={handleNextStep}>Próximo</button>
            </C.Container>
        </Theme>
    );
}