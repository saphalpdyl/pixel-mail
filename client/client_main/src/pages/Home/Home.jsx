import EmailSection from './lib/Email_Section/EmailSection';

const Home = () => {
  return (
    <div className="home">
      <div className="nav"></div>
      <div className="app_main">
        <EmailSection />
        <section className="app_section_options"></section>
      </div>
    </div>
  );
};

export default Home;
