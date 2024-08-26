import './style.scss';

import { Link } from 'react-router-dom';

import { useTranslation } from '../../contexts/TranslationContext';
import { Character } from '../../interfaces/Character';

interface CharactersProps {
    data: Character[];
}

export function Characters({data}: CharactersProps) {
    const { translate } = useTranslation();
    
    return (
        <div className="characters mt-5 md:mt-0">

            <div className="w-full">
                <div className="w-full flex flex-wrap">
                    {data.length > 0 && data.map((character) => (
                    <div className="characters__column mb-3 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2" key={character.id}>
                        <div className="card rounded shadow-lg overflow-hidden">
                        <Link to={`/character/${character.id}`}>
                            <figure className='flex justify-center items-center'>
                                <img
                                    className="w-full h-auto text-center"
                                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                    alt={character.name}
                                />
                            </figure>
                            <div className="card__body flex flex-col justify-between p-4">
                                <h5 className="card__body__title text-lg text-center font-semibold">{character.name}</h5>
                            </div>
                        </Link>
                        </div>
                    </div>
                    ))}
                    {data.length === 0 && (
                        <p>{translate('characters_empty')}</p>
                    )}
                </div>
            </div>
        </div>
    )
}