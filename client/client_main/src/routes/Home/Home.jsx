import EmailSection from './lib/Email_Section/EmailSection';
import OptionsSection from './lib/Options_Section/OptionsSection';
import './Home.css';

import EmailProvider from '@providers/EmailProvider';
import InfoMenuProvider from '@providers/InfoMenuProvider';

const Home = () => {
  return (
    <EmailProvider>
      <InfoMenuProvider>
        <div className="home">
          <div className="app_main">
            <OptionsSection />
            <EmailSection />
          </div>
        </div>
      </InfoMenuProvider>
    </EmailProvider>
  );
};

export default Home;
