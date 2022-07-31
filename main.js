import {createElement,Component} from './lib'


class MyComponent extends Component{
    constructor(){
        super()
        this.state.value = 1
    }
    render(){
        return <div>
            {this.state.value}
            {this.children}
            <Button onClick={()=>this.setState({value:this.state.value +1})}>add</Button>
        </div>
    }
}


class Button extends Component{
    render(){
        return <button>{this.children}</button>
    }
}

let jsx = <div>
    <span>Hello:</span>
    <MyComponent>
        <span>A</span>
    </MyComponent>
    <MyComponent>
        <span>B</span>
    </MyComponent>
</div>

document.body.appendChild(jsx)