import './style.scss';

interface ComicProps {
    image: string;
    title: string;
  }
  
  export function Comics({ image, title }: ComicProps) {
    return (
        <div className="card rounded overflow-hidden">
            <figure className='flex justify-center items-center'>
                <img
                    className="w-full h-auto text-center"
                    src={`${image}`}
                    alt={`${title}`}
                />
            </figure>
            <div className="card__body flex flex-column justify-between p-4">
                <h5 className="card__body__title text-lg font-semibold text-center">{title}</h5>
            </div>
        </div>
    
    );
  }