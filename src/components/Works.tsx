import './styles/works.css';
const Works = () => {
  // Sample works data
  const works = [
    {
      id: 1,
      title: 'Urban Landscapes',
      category: 'Photography',
      image: '/placeholder.svg?height=400&width=600',
      description:
        'A series of urban landscape photographs capturing the essence of modern city life.',
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      category: 'Web Development',
      image: '/placeholder.svg?height=400&width=600',
      description:
        'A full-stack e-commerce platform built with React, Node.js, and MongoDB.',
    },
    {
      id: 3,
      title: 'Portrait Series',
      category: 'Photography',
      image: '/placeholder.svg?height=400&width=600',
      description:
        'A collection of portrait photographs exploring human emotions and expressions.',
    },
    {
      id: 4,
      title: 'Task Management App',
      category: 'Web Development',
      image: '/placeholder.svg?height=400&width=600',
      description:
        'A task management application built with React and Django REST framework.',
    },
    {
      id: 5,
      title: 'Nature Exploration',
      category: 'Photography',
      image: '/placeholder.svg?height=400&width=600',
      description:
        'A series of nature photographs capturing the beauty of natural landscapes.',
    },
    {
      id: 6,
      title: 'Portfolio Website',
      category: 'Web Development',
      image: '/placeholder.svg?height=400&width=600',
      description: 'A responsive portfolio website built with React and CSS.',
    },
  ];

  return (
    <section className="works-section" id="works">
      <div className="content-column">
        <h2 className="section-title">Portfolio Works</h2>
        <div className="works-filter">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Photography</button>
          <button className="filter-btn">Web Development</button>
        </div>
        <div className="works-grid">
          {works.map((work) => (
            <div className="work-item" key={work.id}>
              <div className="work-image">
                <img src={work.image || '/placeholder.svg'} alt={work.title} />
                <div className="work-overlay">
                  <h3>{work.title}</h3>
                  <p className="work-category">{work.category}</p>
                  <p className="work-description">{work.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
