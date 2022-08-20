
import { Component, createElement } from './lib.js'
console.log(123)
class Carousel extends Component {
    constructor() {
        super()
    }
    render() {
        const element = <div class="carousel">
            <img src="https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg" />
            <img src="https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg" />
            <img src="https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg" />
            <img src="https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg" />
            <img src="https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg" />
            <img src="https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg" />
        </div>

        element.addEventListener("dragstart", event => event.preventDefault());

        let x = 0; // 横向移动位置
        let width = element.children[0].width;
        let startX = x;// 元素在移动之前的位置
        let downX = 0;// 手指按下时的位置
        let index = 1;// 应该停在哪一张
        let picListLen = element.children.length
        let animateTimer;
        let autoTimer;
        x = -width;
        let setTransform = () => {
            element.style.transform = `translateX(${x}px)`;
        }
        let resetLayout = ()=>{
            let dx = -index * width - x
            if(index === 0){
                index = picListLen - 2
            }else if( index === picListLen - 1){
                index = 1
            }
            x = -index * width - dx
            setTransform()
        }
        let down = (e) => { 
            downX = e.clientX
            if(index === 0 || index === picListLen - 1){
                resetLayout()
            }
            clearInterval(animateTimer);
            clearInterval(autoTimer);
            // 一定要放在重置布局后
            startX = x
        }
        let move = (e)=>{
            const dx = e.clientX - downX
            x = startX + dx
            
            setTransform()
        }
        let up = (e)=>{
            // 第一张就是负的，往右划更是负的，所以取反
            index = Math.round(-x/width);
            let targetX = -index * width
            animate(targetX);
            
            autoPlay()
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        }
        element.addEventListener('mousedown',(e)=>{
            down(e)
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })

        let autoPlay = () => {
            clearInterval(autoTimer)
            autoTimer = setInterval(()=>{
                if( index === picListLen - 1){
                    resetLayout()
                }
                index++;
                animate(-index*width)
            },6000)
        }

        let animate = (targetX) => {
            let c = targetX - x;
            if(Math.abs(c) < 20){
                x = targetX;
                setTransform();
                return;
            }
            let interval = 1000/30;
            let t = 0;
            let b = x;
            let time = Math.min(Math.abs(c),500);
            let d = Math.ceil(time/interval);
            clearInterval(animateTimer);
            animateTimer = setInterval(() => {
                 t++;
                 if(t>=d){
                    clearInterval(animateTimer);
                 }   
                 x = easeOut(t, b, c, d);
                 setTransform();
            }, interval);
        }
        let easeOut = (t, b, c, d) => {
            return -c*(t/=d)*(t-2) + b;
        }
        setTransform()
        autoPlay()
        return element
    }
}
let jsx = <div>
    <Carousel>
    </Carousel>
</div>

document.body.appendChild(jsx)