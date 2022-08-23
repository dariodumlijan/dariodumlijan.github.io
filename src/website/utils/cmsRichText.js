// @flow
import React from 'react';
import { find, includes } from 'lodash';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const contentfulToReact = (assets?: Object): any => ({
  renderMark: {
    [MARKS.UNDERLINE]: (text: string) => (
      <span className="rich-text" style={{ textDecoration: 'underline' }}>
        {text}
      </span>
    ),
    [MARKS.BOLD]: (text: string) => (
      <span className="rich-text">
        <b>{text}</b>
      </span>
    ),
    [MARKS.ITALIC]: (text: string) => (
      <span className="rich-text">
        <i>{text}</i>
      </span>
    ),
    [MARKS.CODE]: (text: string) => <code>{text}</code>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node: Object) => (
      <a href={node.data.uri} target="_blank" className="rich-link">
        {node.content[0].value}
      </a>
    ),
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="rich-text">{children}</p>
    ),
    [BLOCKS.EMBEDDED_ENTRY]: () => null,
    [BLOCKS.EMBEDDED_ASSET]: (node: Object) => {
      const embeddedId = node.data.target.sys.id;
      const asset = find(assets, ['sys.id', embeddedId]);

      return (
        <>
          {includes(asset.contentType, 'image') ? (
            <img
              className="rich-img"
              alt="embedded-asset"
              src={asset.url || null}
            />
          ) : (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video className="rich-video">
              <source src={asset.url} />
            </video>
          )}
        </>
      );
    },
    [BLOCKS.HEADING_1]: (_node, children) => (
      <h1 className="rich-title">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="rich-title">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="rich-title">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <h4 className="rich-title">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node, children) => (
      <h5 className="rich-title">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node, children) => (
      <h6 className="rich-title">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="rich-list">
        {children.map((child, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i} className="rich-list-item">
            <div className="rich-list-bullet" />
            {child}
          </li>
        ))}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="rich-list">
        {children.map((child, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i} className="rich-list-item">
            <span className="rich-list-index">{Number(i) + 1}</span>
            {child}
          </li>
        ))}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, child) => child,
    [BLOCKS.QUOTE]: (_node, child) => (
      <span className="rich-quote">{child}</span>
    ),
    [BLOCKS.HR]: () => <hr className="rich-line" />,
  },
});

export default contentfulToReact;
