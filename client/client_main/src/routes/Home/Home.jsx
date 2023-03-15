import EmailSection from './lib/Email_Section/EmailSection';

import EmailProvider from '@providers/EmailProvider';
import InfoMenuProvider from '@providers/InfoMenuProvider';

const Home = () => {
  return (
    <EmailProvider>
      <InfoMenuProvider>
        <div className="home">
          <div className="nav"></div>
          <div className="app_main">
            <EmailSection />
            <section className="app_section_options"></section>
          </div>
        </div>
      </InfoMenuProvider>
    </EmailProvider>
  );
};

export default Home;
