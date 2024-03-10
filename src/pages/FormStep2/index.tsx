import { useHistory, Link } from 'react-router-dom';
import * as C from './styles';
import { useForm, FormActions } from '../../contexts/FormContext';
import { Theme } from '../../components/Theme';
import { ChangeEvent, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMask } from '@react-input/mask';



export const FormStep2 = () => {


    const history = useHistory();
    const { state, dispatch } = useForm();

    const inputRef = useMask({ mask: '__.___.___/____-__', replacement: { _: /\d/ } });

    useEffect(() => {
        if(state.fullName === '') {
            history.push('/');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 2
            });
            window.dataLayer.push({
                event: 'event',
                eventProps: {
                  form: 'step 2',
                  title: 'company'
                }
              });
        }
    }, []);

    

    const handleNextStep = () => {
        if(state.cnpj !== '' && state.company !== '' && state.email !== '') {
            if(verifyCNPJ(state.cnpj) == true){
                if(state.email.includes("@") && state.email.includes(".") ){
                    history.push('/step3');
                }else{
                    toast.error("E-mail inválido", {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
            }else{
                toast.error("CNPJ inválido", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }
        } else {
            toast.error("Preencha todos os dados", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
    }

    const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setCompany,
            payload: e.target.value
        });
    }
    const handleCnpjChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setCNPJ,
            payload: e.target.value
        });
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setEmail,
            payload: e.target.value
        });
    }

    return (
        <Theme>
            <ToastContainer />
            <C.Container>
                <p>Etapa 2</p>
                <h1>{state.fullName}, diga mais sobre sua empresa</h1>
                <p>Precisamos de seus dados para gerar a melhor proposta possível</p>
                <hr/>

                <div>
                    <label>
                        Nome da minha empresa:
                        <input type="text" placeholder="Digite o nome da empresa" value={state.company} onChange={handleCompanyChange} />
                        <br></br>
                        CNPJ da empresa:
                        <input type="text" ref={inputRef} placeholder="00.000.000/0001-00" value={state.cnpj} onChange={handleCnpjChange}></input>
                        <br></br>
                        E-mail:
                        <input type="text" placeholder="email@empresa.com.br" value={state.email} onChange={handleEmailChange}></input>
                    </label>
                </div>

                <Link to="/" className="backButton">Voltar</Link>
                <button onClick={handleNextStep}>Próximo</button>
            </C.Container>
        </Theme>
    );
}

function verifyCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cnpj.length !== 14) {
        return false;
    }

    // Verifica se todos os dígitos são iguais, o que tornaria o CNPJ inválido
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let tamanho: number = cnpj.length - 2;
    let numeros: string = cnpj.substring(0, tamanho);
    let digitos: string = cnpj.substring(tamanho);
    let soma: number = 0;
    let pos: number = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += +numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    let resultado: number = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != +digitos.charAt(0)) {
        return false;
    }

    // Calcula o segundo dígito verificador
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += +numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != +digitos.charAt(1)) {
        return false;
    }

    return true; // CNPJ válido
}
