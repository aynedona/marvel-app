import './style.scss';

export function FullLoading() {
    return(
        <div className="full-loading flex justify-center items-center w-full">
            <div className="loading-container flex justify-center items-center">
                <div className="loading-text flex">
                    <span className="loading-letter">M</span>
                    <span className="loading-letter">A</span>
                    <span className="loading-letter">R</span>
                    <span className="loading-letter">V</span>
                    <span className="loading-letter">E</span>
                    <span className="loading-letter">L</span>
                </div>
            </div>
        </div>
    )
}