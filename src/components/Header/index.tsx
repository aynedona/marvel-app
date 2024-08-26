import { Link } from 'react-router-dom';
import './style.scss';

export function Header() {
  return (
    <>
      <nav className='w-full flex justify-center'>
        <div className='container flex items-center justify-center w-full'>
          <Link to={`/`}>
            <img src="/assets/images/marvel.svg" alt="Marvel Book" />
          </Link>
        </div>
      </nav>
    </>
  );
}
