import './style.scss';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Characters } from '../../components/Characters';
import { ComicChart } from '../../components/ComicChart/ComicChart';
import { Filter } from '../../components/Filter';
import { FullLoading } from '../../components/FullLoading';
import { Pagination } from '../../components/Pagination';
import { useTranslation } from '../../contexts/TranslationContext';
import { Character } from '../../interfaces/Character';
import api from '../../services/servicesApi';

interface RequestInfoPagination {
  total: number;
}

const Limit = 20;

export function List() {
  const [characterData, setCharacterData] = useState<Character[] | null>(null);
  const [requestInfo, setRequestInfo] = useState<RequestInfoPagination>();
  const [hasLoading, setHasLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState<{ seriesId?: number; characterName?: string }>({});
  const [searchMessage, setSearchMessage] = useState<string | null>(null);


  const getCharacterData = async (characterName?: string, seriesId?: number) => {
    setCharacterData(null);
    setHasLoading(true);

    try {
      const urlCharacters = '/characters';

      const params: {limit: number; offset: number; nameStartsWith?: string; series?: number;} = {
        limit: Limit,
        offset
      }

      if(characterName) {params.nameStartsWith = characterName}
      if(seriesId) {params.series = seriesId}

      const response = await api.get(urlCharacters, {params});
      setCharacterData(response.data.data.results);
      setRequestInfo(response.data.data);
      setHasLoading(false);

    } catch (error) {
      console.error('Erro ao consultar os personagens', error);
      toast.error("Erro ao buscar os personagens.");
    } 
  };

  const handleFilter = (characterName?: string, seriesId?: number) => {
    setFilters({ characterName, seriesId });
    setOffset(0);
    const message = translate('search_results');

    setSearchMessage(message);
  }

  const handleReset = () => {
    setFilters({});
    setOffset(0);
    setSearchMessage(null);
    getCharacterData();
  }

  useEffect(() => {
    getCharacterData(filters.characterName, filters.seriesId);
  }, [offset, filters]);

  const { translate } = useTranslation();

  return (
    <>
      {hasLoading && <FullLoading />}

      {!hasLoading && (

        <>
          <div className="container">
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-4/12 lg:w-4/12 xl:w-3/12 px-2">
                <Filter
                  onFilter={handleFilter}
                  onReset={handleReset}
                />
              </div>
              <div className="w-full md:w-8/12 lg:w-8/12 xl:w-9/12 px-2">
                {searchMessage && (
                  <h3 className="list__search">{searchMessage}</h3>
                )}
                {characterData && (
                  <>
                    <section>
                      <Characters data={characterData}  />
                    </section>
                    {filters.characterName || filters.seriesId ? null : (
                      <section>
                        <ComicChart data={characterData} />
                      </section>
                    )}
                  </>
                )}
                {requestInfo && (
                  <Pagination
                    limit={Limit}
                    total={requestInfo.total}
                    offset={offset}
                    setOffset={setOffset}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}