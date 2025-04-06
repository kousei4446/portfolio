import './styles/about.css';
import image1 from '/aboutMe.png';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="content-column">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <img src={image1} alt="Daniel Gallego" />
          </div>
          <div className="about-text">
            <p>
              こんにちは！私は関西の大学に通う28卒の学生です。趣味はサウナ、バスケットボール、カラオケ、スノーボードです
            </p>

            <p>
              大学ではWebアプリ開発に興味を持ち、特にReactを中心に学んできました。他にもLaravelやDjangoを扱った経験があり、バックエンド開発にも関心があります。優れたアプリケーションは見た目だけでなく、スムーズな操作性と実用性を兼ね備えているべきだと考えています。
            </p>

            <p>
              研究室では知能情報研究室に所属しており、主にAIのニューラルネットワークについて学んでいます。最近はTransformerに関する論文を読み、その理解を深めています。技術の進化に追いつきながら、より多くの分野に触れていくことを大切にしています。
            </p>

            <p>
              将来的には、フロントエンドやバックエンドにとどまらず、AIの分野にも積極的に関わっていきたいと考えています。新しい技術や挑戦に対して常にオープンな姿勢で取り組んでいますので、興味を持っていただけたらぜひお声がけください！
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
