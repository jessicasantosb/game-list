import { useEffect, useState } from 'react';

import { Header } from '../../components/header/Header';
import { HomeCard } from '../../components/homeCard/HomeCard';
import { useUser } from '../../hooks/useUser';
import { category, game, platform, starHome } from '../../utils/icons';
import { NewCategory } from '../category/forms/create/CreateCategories';
import { CreateGame } from '../games/forms/create/Create';
import { NewPlatform } from '../platform/forms/create/CreatePlatform';

import { useFetchSummary } from '../../hooks/data/useStatsQueries';
import styles from './Home.module.css';

export function Home() {
  const [summary, setSummary] = useState({
    gamesCount: 0,
    favoriteGamesCount: 0,
    categoriesCount: 0,
    platformCount: 0,
  });

  const stats = useFetchSummary();
  const { user } = useUser();

  useEffect(() => {
     if (!stats.data) {
      setSummary({
        gamesCount: 0,
        favoriteGamesCount: 0,
        categoriesCount: 0,
        platformCount: 0,
      });
      return;
    }

    setSummary(stats.data);
  }, []);

  return (
    <main className='container'>
      <Header hiddenButton hiddenLine>
        <div className={styles.textHome}>
          <h1>Hello, {user?.full_name}!</h1>
          <p>Choose one of options below.</p>
        </div>
      </Header>

      <div className={styles.cardGrid}>
        <HomeCard
          to='/games'
          haveButton
          icon={game}
          title='Games'
          count={summary.gamesCount}
          createForm={<CreateGame />}
        />

        <HomeCard
          to='/categories'
          haveButton
          icon={category}
          title='Categories'
          count={summary.categoriesCount}
          createForm={<NewCategory />}
        />

        <HomeCard
          to='/platforms'
          haveButton
          icon={platform}
          title='Platforms'
          count={summary.platformCount}
          createForm={<NewPlatform />}
        />

        <HomeCard
          to='/games'
          icon={starHome}
          title='Favorite Games'
          count={summary.favoriteGamesCount}
        />
      </div>
    </main>
  );
}
