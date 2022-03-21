
import './App.css';
import robot from './robot.glb'

import poster from './page.png'
import { useEffect, useState } from 'react';
function App() {
  const [animationList, setAnimationList] = useState([])
  const [currentAnimation, setCurrentAnimation] = useState('')

  const [currentAnmationIndex, setCurrentAnimationIndex] = useState(0)

  useEffect(() => {
    const modalViewer = document.querySelector('model-viewer#animation_demo')

    modalViewer.addEventListener('load', function () {

      if (modalViewer.availableAnimations && modalViewer.availableAnimations.length > 0) {
        setAnimationList(modalViewer.availableAnimations)
      }
    })
  }, [])



  const changeAnimation = (animation_name) => {
    setCurrentAnimation(animation_name)
  }
  const setANimation = (index) => {
    if (animationList.length > 0) { setCurrentAnimationIndex((currentAnmationIndex + 1) % animationList.length) }
  }

  useEffect(() => {
    changeAnimation(animationList[currentAnmationIndex])
  })

  return (
    <div className="App">
      <div style={{}} >
        {/* dropdown */}
        {/* {animationList && animationList.length > 0 &&
          <select name="animation" onChange={(e) => { changeAnimation(e.target.value) }} id="">
            {animationList.map((data, index) => {
              return <option value={data} key={index}>{data}</option>
            })}
          </select>} */}
        <model-viewer id="animation_demo" orientation="0deg 0deg 0deg" style={{ innerWidth: "100%" }} loading="eager" autoplay ar shadow-intensity="1" animation-name={currentAnimation} camera-controls poster={poster} src={robot} alt="A 3D model of a shishkebab">
          <button className='modal-btn' onClick={setANimation}>Change Animation</button>
          <span className='modal-text' >Animation : {currentAnimation}</span>
        </model-viewer>

        <model-viewer ar ar-modes="webxr scene-viewer quick-look" camera-controls src={robot} alt="A 3D model of an astronaut">
          <button slot="ar-button" style="background-color: white; border-radius: 4px; border: none; position: absolute; top: 16px; right: 16px; ">
            👋 Activate AR
          </button>
        </model-viewer>
      </div>

    </div>
  );
}

export default App;
