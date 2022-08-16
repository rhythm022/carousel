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
        let current = 0
        let intervalHandler
        let timeoutHandler
        let startX = 0
        let endX = 0
        let movingEls = []
        const mod = (b) => (a) => ((a % b) + b) % b
        const m = mod(element.children.length)

        element.addEventListener('mousedown', (e) => {
            clearInterval(intervalHandler)
            clearTimeout(timeoutHandler);
            movingEls.forEach(ele => {
                ele.style.transition = 'none'
            })

            startX = e.clientX

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
        })

        function mousemove(e) {
            [...element.children].forEach(ele => {
                ele.style.zIndex = 0
            })

            let x = -(endX + e.clientX - startX);// x 为图片移动的累计距离// 定义图片向左移动是正方向，这样，可以定义 left 和 right
            let left = Math.floor(x / 1142);
            let right = left + 1;
            const offset = x - left * 1142
            left = m(left)
            right = m(right)
            let leftPosition = left * 1142 + offset;// leftPosition 是把 x 分解成 left 和 offset 两部分
            let rightPosition = (right - 1) * 1142 + offset;
            element.children[left].style.transform = `translateX(${-leftPosition}px)`
            element.children[left].style.zIndex = 2
            element.children[right].style.transform = `translateX(${-rightPosition}px)`
            element.children[right].style.zIndex = 2



        }
        function mouseup(e) {
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







        intervalHandler = setInterval(() => {
            let next = (current + 1) % element.children.length
            const currentEle = element.children[current]
            const nextEle = element.children[next];


            [...element.children].forEach(ele => {
                ele.style.zIndex = 0

            })
            currentEle.style.zIndex = 2
            nextEle.style.zIndex = 2
            
            currentEle.style.transform = `translateX(${current * -1142}px)`
            nextEle.style.transform = `translateX(${(next - 1) * -1142}px)`
            currentEle.style.transition = 'none'
            nextEle.style.transition = 'none'


            timeoutHandler = setTimeout(() => {
                movingEls[0] = currentEle
                movingEls[1] = nextEle

                currentEle.style.transform = `translateX(${(current + 1) * -1142}px)`
                nextEle.style.transform = `translateX(${next * -1142}px)`
                currentEle.style.transition = ''
                nextEle.style.transition = ''

                current = next
            }, 16)
        }, 6000);


        return element
    }
} 


let jsx = <div>
    <Carousel>
    </Carousel>
</div>

document.body.appendChild(jsx)