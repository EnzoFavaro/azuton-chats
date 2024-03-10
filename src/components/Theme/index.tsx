import { ReactNode } from 'react';
import * as C from './styles';
import { Header } from '../Header';
import { SidebarItem } from '../SidebarItem';
import { useForm } from '../../contexts/FormContext';
import MediaQuery from 'react-responsive'
type Props = {
    children: ReactNode;
}

export const Theme = ({ children }: Props) => {
    const { state } = useForm();


    return (
        <C.Container>
            <C.Area>
                <Header />

                <C.Steps>
                <MediaQuery minWidth={1224}>
                    <C.Sidebar>
                        
                        <SidebarItem
                            title="Pessoal"
                            description="Whatsapp"
                            icon="whatsapp"
                            path="/"
                            active={state.currentStep === 1}
                        />

                        <SidebarItem
                            title="Empresa"
                            description="Empresa"
                            icon="company"
                            path="/step2"
                            active={state.currentStep === 2}
                        />

                        <SidebarItem
                            title="Usuários"
                            description="Usuários"
                            icon="user"
                            path="/step3"
                            active={state.currentStep === 3}
                        />

                        <SidebarItem
                            title="Módulos"
                            description="Módulos"
                            icon="modules"
                            path="/step4"
                            active={state.currentStep === 4}
                        />
                        <SidebarItem
                            title="Final"
                            description="Final"
                            icon="final"
                            path="/step5"
                            active={state.currentStep === 5}
                        />
                        
                    </C.Sidebar>
                    </MediaQuery>
                    <C.Page>
                        {children}
                    </C.Page>
                </C.Steps>
            </C.Area>
        </C.Container>
    );
}