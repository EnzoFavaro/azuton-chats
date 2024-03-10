import { Link } from 'react-router-dom';
import * as C from './styles';
import { ReactComponent as CompanyIcon } from '../../svgs/company.svg';
import { ReactComponent as UserIcon } from '../../svgs/users.svg';
import { ReactComponent as WhatsappIcon } from '../../svgs/whatsapp.svg';
import { ReactComponent as ModulesIcon } from '../../svgs/modules.svg';
import { ReactComponent as FlagIcon } from '../../svgs/flag.svg';

type Props = {
    title: string;
    description: string;
    icon: string;
    path: string;
    active: boolean;
}

export const SidebarItem = ({ title, description, icon, path, active }: Props) => {
    return (
        <C.Container>
            <Link to={path}>
                <C.Info>
                    <C.Title>{title}</C.Title>
                    <C.Description>{description}</C.Description>
                </C.Info>
                <C.IconArea active={active}>
                    {icon === 'whatsapp' &&
                        <WhatsappIcon fill="white" width={30} height={30} />
                    }
                    
                    {icon === 'company' &&
                        <CompanyIcon  width={32} height={32} />
                    }
                    {icon === 'user' &&
                        <UserIcon  width={32} height={32} />
                    }
                    {icon === 'modules' &&
                        <ModulesIcon  width={32} height={32} />
                    }
                    {icon === 'final' &&
                        <FlagIcon  width={30} height={30} />
                    }
                </C.IconArea>
                <C.Point active={active}></C.Point>
            </Link>
        </C.Container>
    );
}