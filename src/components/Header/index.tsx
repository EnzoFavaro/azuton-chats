import * as C from './styles';
import LogoAzuton from './logo.svg'
import MediaQuery from 'react-responsive'


export const Header = () => {
    return(
        
        <C.Container>
            <MediaQuery minWidth={400}>
            <img style={{width:230, height: 90}} src={LogoAzuton} alt="logo-azuton" />
            </MediaQuery>
            
            <div>
                <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Preencha os dados de sua empresa</h1>
                <MediaQuery minWidth={1030}>
                <span style={{ fontFamily: 'Roboto, sans-serif' }}>receba a sua proposta personalizada e sob demanda</span>
                </MediaQuery>
            </div>
        </C.Container>

    )
}