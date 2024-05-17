"use client"

import React from 'react';
import Header from './common/header';

const IndexPage = () => {
return(
  <>
  <Header />
   <video src="../../assets/video/cafe.mp4" autoPlay loop muted style={{ width: '100%', height: 'auto' }} />
  <section className="page-section" id="about">
  <div className="container">
      <div className="text-center">
          <h2 className="section-heading text-uppercase">Best Seller</h2>
      </div>
      <ul className="timeline">
          <li><a href="../../assets/img/1.jpg" target="_blank">
                  <div className="timeline-image"><img className="rounded-circle img-fluid" src="../../assets/img/1.jpg"
                          alt="..." /></div>
              </a>
              <div className="timeline-panel">
                  <div className="timeline-heading">
                      <h4>Pizza</h4>
                  </div>
                  <div className="timeline-body">
                      <p className="text-muted">Pizza is an Italian dish consisting of a usually round, flattened base of
                          leavened wheat-based dough topped with tomatoes, cheese, and often various other
                          ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven.
                          A small pizza is sometimes called a pizzetta.</p>
                  </div>
              </div>
          </li>
          <li className="timeline-inverted">
              <a href="../../assets/img/2.jpg" target="_blank">
                  <div className="timeline-image"><img className="rounded-circle img-fluid" src="../../assets/img/2.jpg"
                          alt="..." /></div>
              </a>
              <div className="timeline-panel">
                  <div className="timeline-heading">
                      <h4>Biryani</h4>
                  </div>
                  <div className="timeline-body">
                      <p className="text-muted">Biryani is a mixed rice dish. It is made with Indian spices, rice, and
                          meat usually that of chicken, fish, and sometimes, in addition, eggs or vegetables such as
                          potatoes in certain regional varieties.</p>
                  </div>
              </div>
          </li>
          <li>
              <a href="../../assets/img/3.jpg" target="_blank">
                  <div className="timeline-image"><img className="rounded-circle img-fluid" src="../../assets/img/3.jpg"
                          alt="..." /></div>
              </a>
              <div className="timeline-panel">
                  <div className="timeline-heading">
                      <h4>Pasta</h4>
                  </div>
                  <div className="timeline-body">
                      <p className="text-muted">Pasta is a type of food typically made from an unleavened dough of wheat
                          flour mixed with water or eggs, and formed into sheets or other shapes, then cooked by
                          boiling or baking.</p>
                  </div>
              </div>
          </li>
          <li className="timeline-inverted">
              <a href="../../assets/img/4.jpg" target="_blank">
                  <div className="timeline-image"><img className="rounded-circle img-fluid" src="../../assets/img/4.jpg"
                          alt="..." /></div>
              </a>
              <div className="timeline-panel">
                  <div className="timeline-heading">
                      <h4>Molten chocolate cake</h4>
                  </div>
                  <div className="timeline-body">
                      <p className="text-muted">Molten chocolate cake is a popular dessert that combines the elements of a
                          chocolate cake and a soufflé. Its name derives from the dessert's liquid chocolate center,
                          and it is also known as chocolate moelleux, chocolate lava cake, or simply lava cake.</p>
                  </div>
              </div>
          </li>
          <li className="timeline-inverted">
              <div className="timeline-image">
                  <h4>
                      Be Part
                      <br />
                      Of Our
                      <br />
                      Cafe!
                  </h4>
              </div>
          </li>
      </ul>
  </div>
</section>
</>)

}

export default IndexPage;
