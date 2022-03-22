import { useEffect } from 'react'
import Astronaut from './Astronaut.glb'
import DefaultNormal from './default_normal.jpg'
import lantern_normal from './lantern_normal.png'
const TextureModule = () => {
    const colorArr = [{ val: '1,0,0,0.9', name: "red" }, { val: '0,0,1,0.9', name: "blue" }, { val: '0,1,0,0.9', name: "green" }]
    useEffect(() => {



    }, [])
    const changeColor = (val = '1,1,1,1') => {
        const color = val.split(',')
        const modalViewer = document.querySelector('model-viewer#animation_demo')
        const [material] = modalViewer.model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(color);

    }
    const changeroughness = (e) => {
        const modalViewer = document.querySelector('model-viewer#animation_demo')
        const [material] = modalViewer.model.materials;
        material.pbrMetallicRoughness.setRoughnessFactor(e.target.value);
    }
    const createAndApplyTexture = async (channel, event) => {
        const modalViewer = document.querySelector('model-viewer#animation_demo')
        const [material] = modalViewer.model.materials;
        const texture = await modalViewer.createTexture(event.target.value);
        if (channel.includes('base') || channel.includes('metallic')) {
            material.pbrMetallicRoughness[channel].setTexture(texture);
        } else {
            material[channel].setTexture(texture);
        }
    }
    const changeMetalic = (e) => {
        const modalViewer = document.querySelector('model-viewer#animation_demo')
        const [material] = modalViewer.model.materials;

        material.pbrMetallicRoughness.setMetallicFactor(e.target.value);
    }
    return (
        <>
            <model-viewer id="animation_demo" camera-controls interaction-prompt="none" src={Astronaut} ar ar-modes="webxr scene-viewer quick-look" alt="A 3D model of an astronaut">
                <div class="controls" id="color-controls">

                    {true &&
                        colorArr.map((data, index) => {
                            return (
                                <button onClick={() => { changeColor(data.val) }} className='modal-btn' style={{ position: "relative", right: "0px", bottom: "0px", margin: "5px" }} key={index}>{data.name}</button>
                            )
                        })
                    }
                    <div>
                        <div htmlFor="">Roughness</div>
                        <input type="range" max={1} min={0} step={0.1} onChange={changeroughness} />
                    </div>
                    <div>
                        <div htmlFor="">Metalic : </div>
                        <input type="range" max={1} min={0} step={0.1} onChange={changeMetalic} />
                    </div>
                    <div>
                    <div htmlFor="">Texture : </div>
                        <select name="normals" id="" onChange={(e) => { createAndApplyTexture('normalTexture', e) }}>
                            <option value={DefaultNormal}>Damaged helmet</option>
                            <option value={lantern_normal}>Lantern Pole</option>
                        </select>
                    </div>

                </div>
            </model-viewer>
        </>
    )
}
export default TextureModule