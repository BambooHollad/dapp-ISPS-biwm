import { App, DirectiveBinding } from "vue";

const regDirective: Function = (app: App<Element>) => {
    /* 設置本地图片 */
    const setImgUrl = (el: any, binding: DirectiveBinding) => {
        let img: string = binding?.arg ? new URL(`../assets/${binding.value}.${binding.arg}`, import.meta.url).href : binding.value;
        !!binding.modifiers?.bg ? el.style.backgroundImage = `url(${img})` : el.src = img;
    }
    app.directive("img", {
        created(el, binding) {
            setImgUrl(el, binding);
        },
        updated(el, binding) {
            if (binding.oldValue !== binding.value) setImgUrl(el, binding);
        }
    })
}
export default regDirective;