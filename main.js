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



        const m = (a)=>((a%element.children.length)+element.children.length)%element.children.length
        const mousemove = (e) => {
            console.log(e)
            let x = endX + e.clientX - startX;// 鼠标
            x = -x

            let left = Math.floor(x/1142);// 鼠标的左
            let right = Math.ceil(x/1142);// 鼠标的右
          

            const offset= x - left * 1142// 小数部分
            let leftPosition =  m(left)*1142+offset;
            let rightPosition =  (m(right)-1)*1142+offset;

            element.children[m(left)].style.transform = `translateX(${-leftPosition}px)`
            element.children[m(right)].style.transform = `translateX(${-rightPosition}px)`

            // element.children[m(left)].style.transition = ''
            // element.children[m(right)].style.transition = ''



        }
        const mouseup = (e) => {
            console.log(e)
            endX = endX + e.clientX - startX

            // const index = Math.round(endX / 1142)
            // const offset = index * 1142;

            // let left = Math.ceil(endX/1142);
            // let right = Math.floor(endX/1142);
            // left = m(left)
            // right = m(right);

            // [...element.children].forEach(ele => {
            //     ele.style.transform = `translateX(${offset}px)`;
            //     ele.style.transition = ''
            // })
            // endX = offset
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