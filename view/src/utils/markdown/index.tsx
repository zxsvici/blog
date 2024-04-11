import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItHighlight from "markdown-it-highlightjs"
import SelfMarkdownItCopy from "@/utils/markdown/plugin/code-copy";
import {BlogViewTocItem} from "@/model/blog";
import "highlight.js/styles/github-dark-dimmed.css"

class MarkdownUtil {

    private md = new MarkdownIt({
        html: true
    });
    private tocItems: BlogViewTocItem[] = [];

    constructor() {
        // 绑定高亮插件
        this.md.use(MarkdownItHighlight);
        // 绑定代码复制插件
        this.md.use(SelfMarkdownItCopy, {
            buttonClass: 'markdown-it-code-copy'
        });
        //绑定标题锚点插件
        this.md.use(MarkdownItAnchor, {
            level: [1, 2, 3, 4, 5],
            permalink: true,
            permalinkClass: 'custom-anchor',
            permalinkSymbol: '#',
            callback: this.addToTocWithHierarchy.bind(this)
        });
    }

    private addToTocWithHierarchy(token, anchor) {
        const level = token.markup.length;
        const newTocItem = { level, anchor, children: [] };

        // Determine the parent item based on level
        let parentItem = null;
        for (let i = this.tocItems.length - 1; i >= 0; i--) {
            if (this.tocItems[i].level < level) {
                parentItem = this.tocItems[i];
                break;
            }
        }

        if (parentItem) {
            parentItem.children.push(newTocItem);
        } else {
            this.tocItems.push(newTocItem);
        }
    }

    private tocClear() {
        this.tocItems = [];
    }

    public parse(content: string): { html: string, tocItems: BlogViewTocItem[] } {
        this.tocClear();

        const parsedHtml = this.md.render(content);

        return {html: parsedHtml, tocItems: this.tocItems};
    }


}

const markdown = new MarkdownUtil();

export default markdown