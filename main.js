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

        let current = 0

        setInterval(() => {
            let next = (current + 1) % element.children.length
            const currentEle = element.children[current]
            const nextEle = element.children[next];

          
            [...element.children].forEach(ele=>{
                ele.style.zIndex = 0

            })
            currentEle.style.zIndex = 2
            nextEle.style.zIndex = 2

            currentEle.style.left = current * -100 + '%'
            nextEle.style.left = (next - 1) * -100 + '%'
            currentEle.style.transition = 'none'
            nextEle.style.transition = 'none'
   

            setTimeout(() => {
                currentEle.style.transition = ''
                nextEle.style.transition = ''
                currentEle.style.left = (current + 1) * -100 + '%'
                nextEle.style.left = next * -100 + '%'

                current = next
            },0)
        }, 2000);

        return element
    }
}


let jsx = <div>
    <Carousel>
    </Carousel>
</div>

document.body.appendChild(jsx)