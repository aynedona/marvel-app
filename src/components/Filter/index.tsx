import { useCallback, useEffect, useState } from 'react';

import api from '../../services/servicesApi';

import { Series } from '../../interfaces/Series';

import './style.scss';
import { toast } from 'react-toastify';
import { Loading } from '../Loading';
import { useTranslation } from '../../contexts/TranslationContext';


  interface FilterProps {
    onFilter: (characterName?: string, seriesId?: number) => void;    
    onReset: () => void;
  }

  const Limit = 20; 

  export function Filter({ onFilter, onReset }: FilterProps) {
    const [characterName, setCharacterName] = useState('');
    const [seriesList, setSeriesList] = useState<Series[]>([]);
    const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
    const [hasLoading, setHasLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [totalSeries, setTotalSeries] = useState(0);

    const fetchSeriesList = useCallback(async () => {
      setHasLoading(true);
      try {
        const urlSeries = '/series';

        const params: {limit: number; offset: number;} = {
          limit: Limit,
          offset
        }

        const response = await api.get(urlSeries, {params});
        setSeriesList((prevList) => [...prevList, ...response.data.data.results]);
        setTotalSeries(response.data.data.total);
      } catch (error) {
        console.error('Erro ao buscar as séries', error);
        toast.error("Erro ao buscar as séries!");
      } finally {
        setHasLoading(false);
      }
    }, [offset]);

    useEffect(() => {
      fetchSeriesList();
    }, [fetchSeriesList]);

    const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const seriesId = parseInt(event.target.value, 10);
      setSelectedSeries(seriesId);
    };

    const handleFilterClick = () => {
      onFilter(characterName || undefined, selectedSeries || undefined);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
      if(bottom && seriesList.length < totalSeries) {
        setOffset((prevOffset) => prevOffset + Limit);
      }
    }
    
    const { translate } = useTranslation();

    return (
      <>
        <h2 className='mb-4'>{translate('filter')} </h2>

        <form>
          <div className="filter__name form__group flex flex-col mb-4">
            <label htmlFor="characterName" className="form__label mb-2 text-lg">
              {translate('filter_name')}
            </label>
            <input
              type="text"
              id="characterName"
              className="characterName p-2"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            />
          </div>

          <div className="form__group mb-4">
            <label className="form__label mb-2 text-lg">{translate('filter_serie')}</label>
            <div
              className="filter__list overflow-y-auto p-2"
              onScroll={handleScroll}
            >
              {seriesList && seriesList.map((series, index) => (
                <div className="filter__list__check flex items-center mb-2" key={index}>
                  <input
                    type="checkbox"
                    id={`series-${series.id}`}
                    value={series.id}
                    onChange={handleSeriesChange}
                    className="mr-2"
                  />
                  <label htmlFor={`series-${series.id}`} className="text-sm">
                    {series.title}
                  </label>
                </div>
              ))}

              {hasLoading && (
                <Loading />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <button
              className="filter__button__search mb-3"
              type="button"
              onClick={handleFilterClick}
            >
              {translate('search')}
            </button>
            <button
              className="filter__button__search-all mb-3"
              type="button"
              onClick={onReset}
            >
              {translate('search_all')}
            </button>
          </div>
        </form>
      </>
    );
  }