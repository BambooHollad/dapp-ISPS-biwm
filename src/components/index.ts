import type { App, Component } from "vue";
import * as MyComponents from './components';
interface componentObjectConfig {
    [x: string]: Component
}
const componentObject: componentObjectConfig = {
    //自定义组件
    ...MyComponents,
}
const regComponents = (app: App): void => {
    Object.entries(componentObject).forEach(([key, value]) => {
        app.component(key, value);
    })
}
export default regComponents;