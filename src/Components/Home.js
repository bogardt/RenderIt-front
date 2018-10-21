import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';

const Home = () => (
  <div>
      {/* -----basic config-----*/}
      {/* <Parallax
          blur={10}
          bgImage={require('../img/arbol.jpg')}
          bgImageAlt="the cat"
          strength={200}
      >
          Put some text content here - even an empty div with fixed dimensions to have a height
          for the parallax.
          <div style={{ height: '200px' }} />
      </Parallax> */}

      {/* -----dynamic blur-----*/}
      {/* <Parallax
          blur={{ min: -15, max: 15 }}
          bgImage={require('../img/arbol.jpg')}
          bgImageAlt="the dog"
          strength={-200}
      >
          Blur transition from min to max
          <div style={{ height: '500px' }} />
      </Parallax> */}

      {/* -----custom background element-----*/}
      {/* <Parallax strength={300}>
          <div>Use the background component for custom elements</div>
          <Background className="custom-bg">
              <img src="https://unsplash.it/1920/1920/?image=1080" alt="fill murray" />
          </Background>
      </Parallax>
 */}
      {/* -----renderProp: "renderLayer"-----*/}
      {/* <Parallax
          bgImage={'../img/arbol.jpg'}
          strength={400}
          renderLayer={percentage => (
              <div
                  style={{
                      position: 'absolute',
                      background: `rgba(255, 125, 0, ${percentage * 1})`,
                      left: '50%',
                      top: '50%',
                      width: percentage * 500,
                      height: percentage * 500,
                  }}
              />
          )}
      >
          <p>... Content</p>
      </Parallax> */}
  </div>
);
// export default MyComponent;
// class Home extends Component {
//   render() {
//     return (
//       <div className="col-md-12">
//         <h1>Home</h1>


//       </div>

//     );
//   }
// }

export default Home;
