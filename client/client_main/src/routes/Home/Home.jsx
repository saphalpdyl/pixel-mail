import EmailSection from './lib/Email_Section/EmailSection';
import './Home.css';

import EmailProvider from '@providers/EmailProvider';
import InfoMenuProvider from '@providers/InfoMenuProvider';

const Home = () => {
  return (
    <EmailProvider>
      <InfoMenuProvider>
        <div className="home">
          <div className="app_main">
            <section className="app_section_options"></section>
            <EmailSection />
          </div>
        </div>
      </InfoMenuProvider>
    </EmailProvider>
  );
};

export default Home;
