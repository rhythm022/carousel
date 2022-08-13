import { createElement, Component } from './lib'


class Carousel extends Component {
    constructor() {
        super()
    }
    render() {
        const element = <div class="carousel">
            < img src="https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg" />
            < img src="https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg" />
            < img src="https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg" />
            < img src="https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg" />
        </div>


        element.addEventListener('dragstart',(e)=>{
            e.preventDefault()
        })

        let startX =0
        let endX=0
        const mousemove = (e) => {
            console.log(e)
            const offset = endX + e.clientX - startX;
            [...element.children].forEach(ele => {
                ele.style.transform = `translateX(${offset}px)`
                ele.style.transition = 'none'
            })

        }
        const mouseup = (e) => {
            console.log(e)
            endX = endX + e.clientX - startX

            const index = Math.round(endX / 1142)
            const offset = index * 1142;

            [...element.children].forEach(ele => {
                ele.style.transform = `translateX(${offset}px)`;
                ele.style.transition = ''
            })
            endX = offset
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
        }
        element.addEventListener('mousedown', (e) => {
            console.log(e)
            startX = e.clientX
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
        })
        console.log(element)
        return element
    }
}


let jsx = <div>
    <Carousel>
    </Carousel>
</div>

document.body.appendChild(jsx)