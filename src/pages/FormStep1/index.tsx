import { useHistory } from 'react-router-dom';
import * as C from './styles';
import { useForm, FormActions } from '../../contexts/FormContext';
import { Theme } from '../../components/Theme';
import { ChangeEvent, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMask } from '@react-input/mask';

export const FormStep1 = () => {
    const history = useHistory();
    const { state, dispatch } = useForm();

    const inputRef = useMask({ mask: '55 (__) _____-____', replacement: { _: /\d/ } });

    var myHeaders = new Headers();
    myHeaders.append("access-token", "656cf577991a54728a88e983");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders
    };
   
    

    useEffect(() => {
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 1
        });
    }, []);

    const number = state.whatsapp.replace(/[^\d]/g, '')
    const handleNextStep = () => {
        if(state.fullName !== '' && state.whatsapp !== '') {
            if(state.whatsapp.length == 18){
                fetch("https://api.azutomatize.com.br/core/v2/api/wa-number-check/"+number, requestOptions)
                .then(response => response.json())
                .then(response =>{
                    const resposta = response.status
                    if(resposta == "INVALID_WA_NUMBER"){
                        toast.error("Esse número não possui whatsapp", {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                    }else{
                        history.push('/step2');
                    }
                })
            }else{
                toast.error("Número inválido", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }
        }else {
            toast.error("Preencha todos os dados corretamente", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setFullName,
            payload: e.target.value
        });
    }

    const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setWhatsapp,
            payload: e.target.value
        });
    }

    return (
        <Theme>
            <ToastContainer />
            <C.Container>
                <p>Etapa 1 </p>
                <h1>Vamos começar com o seu nome completo e número de Whatsapp</h1>
                <p>Você receberá sua proposta por esse número!</p>

                <hr/>
                
                <div>
                    <label>
                        Meu nome completo:
                        <input type="text" placeholder="Digite seu nome" value={state.fullName}  onChange={handleNameChange}/>
                        <br></br>
                        Meu Whatsapp:
                        <input type="text" ref={inputRef} placeholder="(11) 91234-5678" value={state.whatsapp}  onChange={handleWhatsappChange}></input>
                    </label>
                </div>
                

                <button onClick={handleNextStep}>Próximo</button>
                
            </C.Container>
        </Theme>
    );
}