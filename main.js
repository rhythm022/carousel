import {createElement,Component} from './lib'


class MyComponent extends Component{
    render(){
        return <div>
            {this.attributes.text}
            {this.children}
        </div>
    }
}

let jsx = <div>
    <span>Hello:</span>
    <MyComponent text="showMe:">
        <span>1</span>
    </MyComponent>
    <MyComponent text="showYou:">
        <span>2</span>
    </MyComponent>
    <span></span>
</div>

document.body.appendChild(jsx)