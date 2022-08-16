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
        let manualMovingEls = []
        const mod = (b) => (a) => ((a % b) + b) % b
        const m = mod(element.children.length)

        element.addEventListener('mousedown', (e) => {
            clearInterval(intervalHandler)
            clearTimeout(timeoutHandler);
            if (movingEls.length) {
                movingEls.forEach((ele, i) => {
                    const transform = getComputedStyle(ele).transform
                    ele.style.transition = 'none'
                    ele.style.transform = transform
                    if (i === 0) {
                        const tOffset = transform.match(/matrix\(1, 0, 0, 1, ([\s\S]+), 0\)/)[1]

                        endX = Number(tOffset)
                        console.log('进入自动动画状态后 mousedown:',tOffset)

                    }
                })
                movingEls.length = 0
                manualMovingEls.length = 0
            } 
            if (manualMovingEls.length) {
                manualMovingEls.forEach((ele, i) => {
                    const transform = getComputedStyle(ele).transform
                    ele.style.transition = 'none'
                    ele.style.transform = transform
                    if (i === 0) {
                        const tOffset = transform.match(/matrix\(1, 0, 0, 1, ([\s\S]+), 0\)/)[1]

                        endX = Number(tOffset)
                        console.log('手工:',tOffset)
                    }
                })
                manualMovingEls.length = 0
            } 


            console.log('mousedown')
            startX = e.clientX

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)

        })

        function mousemove(e) {
            [...element.children].forEach(ele => {
                ele.style.zIndex = 0
            })

            let x = -(endX + e.clientX - startX);// x 为图片移动的累计距离// 定义图片向左移动是正方向，这样，可以定义 left 和 right
            //    console.log(endX, e.clientX , startX)
            let left = Math.floor(x / 600);
            let right = left + 1;
            const offset = x - left * 600
            left = m(left)
            right = m(right)
            let leftPosition = left * 600 + offset;// leftPosition 是把 x 分解成 left 和 offset 两部分
            let rightPosition = (right - 1) * 600 + offset;
            element.children[left].style.transform = `translateX(${-leftPosition}px)`
            element.children[left].style.zIndex = 2
            element.children[left].style.transition = 'none'
            element.children[right].style.transform = `translateX(${-rightPosition}px)`
            element.children[right].style.zIndex = 2
            element.children[right].style.transition = 'none'

        }
        function mouseup(e) {
            let x = -(endX + e.clientX - startX);
            let left = Math.floor(x / 600);
            let right = left + 1;
            const offset = x >= 0 ? Math.round(x % 600 / 600) : 1 + Math.round(x % 600 / 600)
            // x 为正数、一点点：0
            //      很多：1
            // x 为负数、一点点：1
            //      很多：0
            left = m(left)
            right = m(right)
            let leftPosition = left * 600 + offset * 600;// leftPosition 是把 x 分解成 left 和 offset 两部分
            let rightPosition = (right - 1) * 600 + offset * 600;
            element.children[left].style.transform = `translateX(${-leftPosition}px)`
            element.children[left].style.transition = ''
            element.children[right].style.transform = `translateX(${-rightPosition}px)`
            element.children[right].style.transition = ''

            manualMovingEls[0] = element.children[left]
            manualMovingEls[1] = element.children[right]

            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)

            current = (left + offset) % element.children.length 
            intervalHandler = setInterval(interval, 3000);
        }





        function interval(){
            let next = (current + 1) % element.children.length
            const currentEle = element.children[current]
            const nextEle = element.children[next];


            [...element.children].forEach(ele => {
                ele.style.zIndex = 0

            })
            currentEle.style.zIndex = 2
            nextEle.style.zIndex = 2

            currentEle.style.transform = `translateX(${current * -600}px)`
            nextEle.style.transform = `translateX(${(next - 1) * -600}px)`
            currentEle.style.transition = 'none'
            nextEle.style.transition = 'none'


            timeoutHandler = setTimeout(() => {
                movingEls[0] = currentEle
                movingEls[1] = nextEle

                currentEle.style.transform = `translateX(${(current + 1) * -600}px)`
                nextEle.style.transform = `translateX(${next * -600}px)`
                currentEle.style.transition = ''
                nextEle.style.transition = ''

                current = next
            }, 16)
        }
        
        intervalHandler = setInterval(interval, 3000);


        return element
    }
}


let jsx = <div>
    <Carousel>
    </Carousel>
</div>

document.body.appendChild(jsx)