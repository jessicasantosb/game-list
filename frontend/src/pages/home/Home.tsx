import { Header } from '../../components/header/Header';
import { HomeCard } from '../../components/homeCard/HomeCard';
import { category, game, platform, starHome } from '../../utils/icons';
import { CreateCategory } from '../category/forms/Create';
import { CreateGame } from '../games/forms/Create';
import { CreatePlatform } from '../platform/forms/Create';

import { useFetchSummary } from '../../hooks/data/useStatsQueries';
import { getUserName } from '../../services/getUserName';
import styles from './Home.module.css';

export function Home() {
  const { data: stats } = useFetchSummary();
  const user = getUserName();

  return (
    <main className='container'>
      <Header hiddenButton>
        <div className={styles.textHome}>
          <h1>Hello, {user.full_name}!</h1>
          <p>Choose one of options below.</p>
        </div>
      </Header>

      <div className={styles.cardGrid}>
        <HomeCard
          to='/games'
          haveButton
          icon={game}
          title='Games'
          count={stats?.gamesCount}
          createForm={<CreateGame />}
        />

        <HomeCard
          to='/categories'
          haveButton
          icon={category}
          title='Categories'
          count={stats?.categoriesCount}
          createForm={<CreateCategory />}
        />

        <HomeCard
          to='/platforms'
          haveButton
          icon={platform}
          title='Platforms'
          count={stats?.platformCount}
          createForm={<CreatePlatform />}
        />

        <HomeCard
          to='/games'
          icon={starHome}
          title='Favorite Games'
          count={stats?.favoriteGamesCount}
        />
      </div>
    </main>
  );
}
