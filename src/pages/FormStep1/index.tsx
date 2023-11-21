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

    useEffect(() => {
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 1
        });
    }, []);


    const handleNextStep = () => {
        if(state.fullName !== '' && state.whatsapp !== '') {
            if(state.whatsapp.length == 18){
                history.push('/step2');
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