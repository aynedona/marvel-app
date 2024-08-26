import './style.scss';

import { useTranslation } from '../../contexts/TranslationContext';

export function Footer() {
    const { translate } = useTranslation();

    return (
        <footer>
            <p>{translate('developed')} Ayne Doná de Souza</p>
        </footer>
    );
  }
  