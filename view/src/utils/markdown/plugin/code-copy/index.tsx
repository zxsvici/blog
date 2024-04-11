import * as _ from "lodash";
import Clipboard from "clipboard"

/**
 * 原插件为 markdown-it-code-copy
 * 但是原插件不支持参数配置复制图标中的显示值，所以这边复制过来加上了
 * button 类型是 string，但是可以可以说html内容, 例如 '<div>temp</div>'
 */

try {

    if(this === window || process.env.NODE_ENV === 'development'){
        new Clipboard('.markdown-it-code-copy');
    }
} catch (_err) {
    // Handle error if needed
    console.error('Clipboard initialization failed:', _err);
}

/**
 * 定义插件参数
 */
interface Options {
    iconStyle: string;
    iconClass: string;
    buttonStyle: string;
    buttonClass: string;
    button: string;
}

/**
 * 定义参数默认值
 */
const defaultOptions = {
    iconStyle: 'font-size: 12px; opacity: 0.4;',
    iconClass: 'mdi mdi-content-code-copy',
    buttonStyle: 'position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none;',
    buttonClass: '',
    button: 'Copy'
};

/**
 * 插件的核心方法
 * 它接受一个 Markdown-it 渲染器函数 origRule 和一个选项对象 options。
 * 它合并默认参数和传入的参数，然后返回一个新的渲染函数。这个渲染函数接受 Markdown-it 渲染器的参数，处理代码块的内容并添加一个复制按钮。
 * @param origRule
 * @param options
 */
function renderCode(origRule: (tokens: any[], idx: number, ...args: any[]) => string, options: Options) {
    options = _.merge(defaultOptions, options);
    return (...args: any[]) => {
        const [tokens, idx] = args;
        const content = tokens[idx].content
            .replaceAll('"', '&quot;')
            .replaceAll("'", "&lt;");
        //@ts-ignore
        const origRendered = origRule(...args);

        if (content.length === 0)
            return origRendered;

        return `
<div style="position: relative">
    ${origRendered}
    <button class="${options.buttonClass}" data-clipboard-text="${content}" style="${options.buttonStyle}" title="Copy">
        <span style="${options.iconStyle}" class="${options.iconClass}">${options.button}</span>
    </button>
</div>
`;
    };
}

/**
 * 在这里接受一个 md 对象、参数，以及限制扩展方法为 code_block、fence
 * @param md
 * @param options
 * @constructor
 */
export default function SelfMarkdownItCopy(md: any, options: Options) {
    md.renderer.rules.code_block = renderCode(md.renderer.rules.code_block, options);
    md.renderer.rules.fence = renderCode(md.renderer.rules.fence, options);
}
