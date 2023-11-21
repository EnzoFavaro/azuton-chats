import { useHistory, Link } from 'react-router-dom';
import * as C from './styles';
import { useForm, FormActions } from '../../contexts/FormContext';
import { Theme } from '../../components/Theme';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from '@mui/material/Slider';
import image1 from './undraw_engineering_team_a7n2.svg';
import image2 from './undraw_team_up_re_84ok.svg';


export const FormStep3 = () => {
    const history = useHistory();
    const { state, dispatch } = useForm();

    useEffect(() => {
        if(state.fullName === '') {
            history.push('/');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 3
            });
        }
    }, []);

    const handleNextStep = () => {
        if(state.numberChanels !== 0 && state.numberUsers !== 0) {
            history.push('/step4');
        } else {
            toast.error("Preencha todos os dados", {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
    }

    const handleChanelsChange = (event: Event, newValue: number | number[])  => {
        dispatch({
            type: FormActions.setNumberChanels,
            payload: newValue as number
        });
    }
    const handleUsersChange = (event: Event, newValue: number | number[])  => {
        dispatch({
            type: FormActions.setNumberUsers,
            payload: newValue as number
        });
    }
    const marks = [
        {
            value: 1,
            label: '1 usuário',
        },
        {
            value: 50,
            label: '+50 usuários',
        },
    ];
    const marks2 = [
        {
            value: 1,
            label: '1 canal',
        },
        {
            value: 10,
            label: '+10 canais',
        },
    ];

    return (
        <Theme>
            <ToastContainer />
            <C.Container>
                <p>Etapa 3 </p>
                <h1>Legal {state.fullName}, agora me diga o número de usuários e canais</h1>
                <p>Você sempre poderá expandir seu pacote no futuro, caso precise!</p>

                <hr/>
                
                <section>
                <div>
                    <img src={image1} alt="users-image" />
                    <hr/>
                    <h2>Quantos usuários utilizarão a plataforma?</h2>
                    <br></br>
                  <Slider 
                  defaultValue={5} 
                  aria-label="Default" 
                  valueLabelDisplay="on"
                  min={1}
                  max={50}
                  marks={marks}
                  onChange={handleUsersChange}
                  value={state.numberUsers}
                  sx={{
                    color: '#636e72',
                    height: 8,
                    '& .MuiSlider-track': {
                      border: 'none',
                      color:'#0984e3'
                    },
                    '& .MuiSlider-thumb': {
                      height: 24,
                      width: 24,
                      backgroundColor: '#0984e3',
                      border: '2px solid currentColor',
                      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                        boxShadow: 'inherit',
                      },
                      '&:before': {
                        display: 'none',
                      },
                    },
                    '& .MuiSlider-valueLabel': {
                      lineHeight: 1.2,
                      fontSize: 12,
                      background: 'unset',
                      padding: 0,
                      width: 32,
                      height: 32,
                      borderRadius: '50% 50% 50% 0',
                      backgroundColor: '#0984e3',
                      color: '#FFFF',
                      transformOrigin: 'bottom left',
                      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                      '&:before': { display: 'none' },
                      '&.MuiSlider-valueLabelOpen': {
                        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                      },
                      '& > *': {
                        transform: 'rotate(45deg)',
                      },
                    },
                  }}
                    />

                    <p>Caso você precise mais de 50 usuários, nosso time de especialistas 
                        entrarão em contato para uma proposta mais adequada ao seu cenário.</p>
                </div>

                <div>
                    <img src={image2} alt="users-image" />

                    <h2>Quantos canais de mensagem você precisa?</h2>
                    <br></br>
                  <Slider 
                  defaultValue={1} 
                  aria-label="Default" 
                  valueLabelDisplay="on"
                  min={1}
                  max={10}
                  onChange={handleChanelsChange}
                  value={state.numberChanels}
                  marks={marks2}
                  sx={{
                    color: '#636e72',
                    height: 8,
                    '& .MuiSlider-track': {
                      border: 'none',
                      color:'#0984e3'
                    },
                    '& .MuiSlider-thumb': {
                      height: 24,
                      width: 24,
                      backgroundColor: '#0984e3',
                      border: '2px solid currentColor',
                      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                        boxShadow: 'inherit',
                      },
                      '&:before': {
                        display: 'none',
                      },
                    },
                    '& .MuiSlider-valueLabel': {
                      lineHeight: 1.2,
                      fontSize: 12,
                      background: 'unset',
                      padding: 0,
                      width: 32,
                      height: 32,
                      borderRadius: '50% 50% 50% 0',
                      backgroundColor: '#0984e3',
                      color: '#FFFF',
                      transformOrigin: 'bottom left',
                      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                      '&:before': { display: 'none' },
                      '&.MuiSlider-valueLabelOpen': {
                        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                      },
                      '& > *': {
                        transform: 'rotate(45deg)',
                      },
                    },
                  }}
                    />

                    <p>Canais são, por exemplo, números de Whatsapp que estarão atendendo na plataforma,
                        mas podem ser também contas de Instagram, Facebook, etc.
                    </p>
                </div>

                </section>

                <Link to="/step2" className="backButton">Voltar</Link>
                <button onClick={handleNextStep}>Próximo</button>
            </C.Container>
        </Theme>
    );
}