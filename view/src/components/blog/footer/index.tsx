import {Link} from "react-router-dom";

const BlogViewFooter = ({sourceAuthor, sourceWebsite, createTime, modifyTime}: {sourceAuthor?: string, sourceWebsite?: string, createTime: string, modifyTime: string}) => {
    return <div className={'ui attached positive message'}>
        <ol className={'list'}>
           <li>
               作者：<Link to={sourceWebsite ? sourceWebsite : '/about'}>{sourceAuthor ? sourceAuthor : 'VICI-策君丶'}</Link>
           </li>
            <li>
                创建时间：{createTime.replace('T', ' ')}
            </li>
            <li>
                修改时间：{modifyTime && modifyTime.replace('T', ' ')}
            </li>
            {sourceAuthor ?
                <li>
                    已获取原作者转载授权，如需转载请询问原作者!
                </li>
                :
                <li>
                本站点采用 <Link to={'https://creativecommons.org/licenses/by/4.0/'}>署名 4.0 国际 (CC BY 4.0)</Link> 创作共享协议。可自由转载、引用，并且允许商业性使用。但需署名作者且注明文章出处。
                </li>
            }
        </ol>
    </div>
}

export default BlogViewFooter;