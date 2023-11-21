// Context, Reducer, Provider, Hook
import { createContext, ReactNode, useContext, useReducer } from 'react';

type State = {
    currentStep: number,
    whatsapp: string,
    fullName: string,
    company: string,
    cnpj: string,
    email: string,
    numberUsers: number,
    numberChanels: number,
    campanhas: boolean,
    chatbot: boolean,
    internChat: boolean,
    api: boolean,
};


type Action = {
    type: FormActions;
    payload: any;
};
type ContextType = {
    state: State;
    dispatch: (action: Action) => void;
}
type FormProviderProps = {
    children: ReactNode
};

const initialData: State = {
    currentStep: 0,
    whatsapp: '',
    fullName: '',
    company: '',
    cnpj: '',
    email: '',
    numberUsers: 5,
    numberChanels: 1,
    chatbot: false,
    campanhas: false,
    internChat: false,
    api: false,

}

// Context
const FormContext = createContext<ContextType | undefined>(undefined);

// Reducer
export enum FormActions {
    setCurrentStep,
    setWhatsapp,
    setFullName,
    setCompany,
    setCNPJ,
    setEmail,
    setNumberUsers,
    setNumberChanels,
    setChatbot,
    setCampanhas,
    setInternChat,
    setApi,
}


const formReducer = (state: State, action: Action) =>{
    switch(action.type){
        case FormActions.setCurrentStep:
            return {...state, currentStep: action.payload};
        case FormActions.setWhatsapp:
            return {...state, whatsapp: action.payload};
        case FormActions.setFullName:
            return {...state, fullName: action.payload};
        case FormActions.setCompany:
            return {...state, company: action.payload};
        case FormActions.setCNPJ:
            return {...state, cnpj: action.payload};
        case FormActions.setEmail:
            return {...state, email: action.payload};
        case FormActions.setNumberUsers:
            return {...state, numberUsers: action.payload};
        case FormActions.setNumberChanels:
            return {...state, numberChanels: action.payload};
        case FormActions.setChatbot:
            return {...state, chatbot: action.payload};
        case FormActions.setCampanhas:
            return {...state, campanhas: action.payload};
        case FormActions.setInternChat:
            return {...state, internChat: action.payload};
        case FormActions.setApi:
            return {...state, api: action.payload};
        default:
            return state;
    }
}

// Provider
export const FormProvider = ({children}: FormProviderProps) => {
    const [state, dispatch] = useReducer(formReducer, initialData);
    const value = { state, dispatch };
    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
}

// Context Hook
export const useForm = () => {
    const context = useContext(FormContext);
    if(context === undefined) {
        throw new Error('useForm precisa ser usado dentro do FormProvider');
    }
    return context;
}