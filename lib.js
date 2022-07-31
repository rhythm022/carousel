
export class Component{// 在constructor setAttribute appendChild 时 render
    constructor(){
        console.log('MyComponent')
        this.root = document.createElement('div')
        this.children = []
        this.attributes = {}
        this.requestQuest = false
        this.requestRender()

    }
    setAttribute(name,value){
        this.attributes[name] = value
        this.requestRender()

    }
    appendChild(child){
        this.children.push(child)
        this.requestRender()

    }
    mount(parent){
        parent.appendChild(this.root)

    }
    requestRender(){
        if(this.requestQuest){
            return
        }

        this.requestQuest = true
        Promise.resolve().then(
            ()=>{
                console.log('!')
                this.requestQuest = false
                this.root.innerHTML = ''
                this.root.appendChild(this.render())// 异步：render 微任务 === 执行  this.render 来更新自己(this.root)
            }
        )
    }
    render(){
        console.error('must extended')
    }
}


export function createElement(type,attibutes,...children){
    let element
    if(typeof type === 'string'){
        element = document.createElement(type)

    }else{
        element = new type()
    }

    for(let name in attibutes){
        element.setAttribute(name,attibutes[name])
    }
    let appendChildren = (children)=>{
        for(let child of children){
            if(child === null || child === undefined)continue
            if(typeof child === 'object' && child !== null && child instanceof Array){
                appendChildren(child)
                continue
            }
            if(typeof child === 'string'){
                child = document.createTextNode(child)
            }
            if(child.mount){
                child.mount(element)// 不好// todo// appendTo//
            }else{
                element.appendChild(child)

            }
        }
    }
    appendChildren(children)// 同步：父子形成链接

    return element
}