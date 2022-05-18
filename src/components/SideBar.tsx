import { Button } from "./Button";
import { Icon } from "./Icon";

interface SideBarProps {
  isFetching: boolean
  genres: Array<{
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }>;
  selectedGenreId: number;
  buttonClickCallback: (args: any) => void;
  buttonHover: (id: number) => void
}

const loadingButtons = ['1','2','3','4','5','6']



export function SideBar({
  genres,
  isFetching,
  selectedGenreId,
  buttonClickCallback,
  buttonHover
}: SideBarProps) {

  console.log(genres)

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {
        isFetching && genres.length === 0 ? 
          <div className="loading-div">
            {
            loadingButtons.map( (skeletonButton, index) => {
             return <button key={index} className="loading-button">
                      Carregando...
                      <div className="spinner">
                        <Icon color='#FBFBFB' name='loading'/>
                      </div>
                    </button>
              })              
            }
          </div>
        :
        genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => buttonClickCallback(genre.id)}
            onMouseEnter={() => buttonHover(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}