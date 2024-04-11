import MarkdownIt from "markdown-it";
import MarkdownItHighlight from "markdown-it-highlightjs"
import "highlight.js/styles/github-dark-dimmed.css"

class MarkdownUtil {

    private md = new MarkdownIt({
        html: true
    });

    constructor() {
        // 绑定高亮插件
        this.md.use(MarkdownItHighlight);
    }

    public parse(content: string): string {
        return this.md.render(content);
    }


}

const markdown = new MarkdownUtil();

export default markdown