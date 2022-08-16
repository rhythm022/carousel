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


        element.addEventListener('dragstart', (e) => e.preventDefault())

        let startX = 0
        let endX = 0
        const mod = (b) => (a) => ((a % b) + b) % b
        const m = mod(element.children.length)

        const mousemove = (e) => {
            // console.log(e)
            [...element.children].forEach(ele => {
                ele.style.zIndex = 0
            })
            // 分为两种情况：图片向左移动、图片向右移动。向左移动的情况简单。
            let x = endX + e.clientX - startX;// x 为图片移动的累计距离
            x = -x // 定义图片向左移动是正方向，这样，可以定义 left 和 right
            let left = Math.floor(x / 1142);
            let right = left + 1;
            const offset = x - Math.floor(x / 1142) * 1142// x 减去它的地板，offset 一定是正数（即使是当 x 是负数的情况）
            left = m(left)
            right = m(right)
            let leftPosition = - left * 1142 - offset;// + (- offset) 一定左移
            let rightPosition = (- right + 1) * 1142 - offset;
            element.children[left].style.transform = `translateX(${leftPosition}px)`
            element.children[right].style.transform = `translateX(${rightPosition}px)`
            element.children[left].style.zIndex = 2
            element.children[right].style.zIndex = 2
            // element.children[m(left)].style.transition = ''
            // element.children[m(right)].style.transition = ''



        }
        const mouseup = (e) => {
            // console.log(e)
            endX = endX + e.clientX - startX

            // const index = Math.round(endX / 1142)
            // const offset = index * 1142;

            // let left = Math.ceil(endX/1142);
            // let right = Math.floor(endX/1142);
            // left = m(left)
            // right = m(right);// 得到两张图

            // [...element.children].forEach(ele => {
            //     ele.style.transform = `translateX(${offset}px)`;
            //     ele.style.transition = ''
            // })
            // endX = offset
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
        }
        element.addEventListener('mousedown', (e) => {
            // console.log(e)
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