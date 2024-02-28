import * as C from './styles';
import LogoAzuton from './logo.svg'


export const Header = () => {
    return(
        <C.Container>
            <img style={{width:230, height: 90}} src={LogoAzuton} alt="logo-azuton" />
            <div>
                <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Preencha os dados de sua empresa</h1>
                <span style={{ fontFamily: 'Roboto, sans-serif' }}>receba a sua proposta personalizada e sob demanda</span>
            </div>
        </C.Container>
    )
}