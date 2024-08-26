import './style.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Comics } from '../../components/Comics';
import { FullLoading } from '../../components/FullLoading';
import { useTranslation } from '../../contexts/TranslationContext';
import { Character } from '../../interfaces/Character';
import { Comic } from '../../interfaces/Comic';
import { Series } from '../../interfaces/Series';
import api from '../../services/servicesApi';


export function Detail() {
  const { id } = useParams<{ id: string }>();
  const [comicData, setComicData] = useState<Comic[]>([]);
  const [seriesData, setSeriesData] = useState<Series[]>([]);
  const [characterDetails, setCharacterDetails] = useState<Character>();
  const [hasSpinner, setHasSpinner] = useState(true);

  useEffect(() => {
    setHasSpinner(true);

    const fetchData = async () => {
      try {
        const characterResponse = await api.get(`/characters/${id}`);
        setCharacterDetails(characterResponse.data.data.results[0]);
      } catch (error) {
        console.error('Erro ao buscar o personagem', error);
        toast.error("Erro ao buscar o personagem.");
      }

      try {
        const comicsResponse = await api.get(`/characters/${id}/comics`);
        setComicData(comicsResponse.data.data.results);
      } catch (error) {
        console.error('Erro ao buscar os quadrinhos', error);
        toast.error("Erro ao buscar os quadrinhos.");
      }

      try {
        const seriesResponse = await api.get(`/characters/${id}/series`);
        setSeriesData(seriesResponse.data.data.results);
      } catch (error) {
        console.error('Erro ao buscar as séries', error);
        toast.error("Erro ao buscar as séries.");
      } finally {
        setHasSpinner(false);
      }
    };

    fetchData();
  }, [id]);
  
  const { translate } = useTranslation();

  return (
    <>
      {hasSpinner && <FullLoading />}

      {!hasSpinner && (
        <>
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="detail__character w-full md:w-1/3 lg:w-1/3 xl:w-1/4 mb-4 px-2">
                {characterDetails && (
                  <>
                    <img
                      src={`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`}
                      alt={characterDetails.name}
                      className="w-full h-auto"
                    />
                    <h4 className="font-semibold mt-4">{characterDetails.name}</h4>
                    <p className="mt-2">{characterDetails.description}</p>
                  </>
                )}
              </div>
              <div className="detail__comic-series w-full md:w-2/3 lg:w-2/3 xl:w-3/4">
                {comicData && (
                  <div className="detail__comic-series__comic">
                    <div className="w-full">
                      <h2 className="font-bold mb-4">{translate('comics')}</h2>
                    </div>
                    <div className="flex flex-wrap">
                      {comicData.length > 0 &&
                        comicData.map((comic) => (
                          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 flex mb-4 px-2" key={comic.id}>
                            <Comics
                              image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                              title={comic.title}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {seriesData && (
                  <div className="detail__comic-series__series mt-8">
                    <div className="w-full">
                      <h2 className="font-bold mb-4">{translate('movies_series')}</h2>
                    </div>
                    <div className="flex flex-wrap">
                      {seriesData.length > 0 &&
                        seriesData.map((serie) => (
                          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 flex mb-4 px-2" key={serie.id}>
                            <Comics
                              image={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                              title={serie.title}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
