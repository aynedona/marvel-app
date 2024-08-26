import { ResponsiveCirclePacking } from '@nivo/circle-packing';

import { Character } from '../../interfaces/Character';

interface ComicChartProps {
  data: Character[];
}

export function ComicChart({ data }: ComicChartProps) {
  const imgUrlMap = new Map<string, string>();

  const chartData = {
    name: 'Comics',
    children: data.map((character, characterIndex) => {
      const characterImgUrl = character.thumbnail 
        ? `${character.thumbnail.path}.${character.thumbnail.extension}` 
        : '';
      
      if (character.thumbnail) {
        imgUrlMap.set(`character-${characterIndex}-${character.name}`, characterImgUrl);
      }

      return {
        id: `character-${characterIndex}-${character.name}`,
        name: character.name,
        value: character.comics.available,
        children: character.comics.items.map((comic, comicIndex) => {
          const comicImgUrl = comic.thumbnail 
            ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` 
            : '';

          if (comic.thumbnail) {
            imgUrlMap.set(`comic-${characterIndex}-${comicIndex}-${comic.title}`, comicImgUrl);
          }

          return {
            id: `comic-${characterIndex}-${comicIndex}-${comic.title}`,
            name: comic.title,
            value: 1,
          };
        }),
      };
    }),
  };

  return (
    <div style={{ height: 400 }}>
      <ResponsiveCirclePacking
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="id"
        value="value"
        colors={{ scheme: 'reds' }}
        childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
        padding={5}
        enableLabels={true}
        label={(node) => `${node.data.name} (${node.value})`}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
        defs={[
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 5,
            spacing: 10,
          },
        ]}
        fill={[
          { match: { id: 'nivo' }, id: 'lines' },
        ]}
        animate={true}
        onClick={(node) => {
          const imgUrl = imgUrlMap.get(node.id);
          if (imgUrl) {
            window.open(imgUrl, '_blank');
          }
        }}
      />
    </div>
  );
};