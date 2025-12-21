'use client';

import { generateHeadingId, parseToc } from '@devlog/utils';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import Markdown from 'react-markdown';

import { PostList } from '@/domains/PostList';

import { Typography } from '../Typography';
import styles from './PostDetail.module.css';

interface PostDetailProps {
  post: PostList;
}

export const PostDetail = ({ post }: PostDetailProps) => {
  const toc = parseToc(post.content);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    );
    const visibleHeadings = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleHeadings.set(entry.target.id, entry.isIntersecting);
        });

        // 현재 화면에 보이는 헤딩들 중 가장 상단에 위치한 것을 찾음
        const activeHeading = headingElements.find((heading) => {
          return visibleHeadings.get(heading.id);
        });

        if (activeHeading) {
          setActiveId(activeHeading.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 1] },
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join('');
    }
    if (typeof node === 'object' && node !== null && 'props' in node) {
      return extractText((node as any).props.children);
    }
    return '';
  };

  const Heading = ({
    children,
    level,
  }: {
    children: ReactNode;
    level: number;
  }) => {
    const text = extractText(children);
    const id = generateHeadingId(text);
    const semantic = `h${level}` as any;

    return (
      <Typography
        id={id}
        semantic={semantic}
        variants={level === 1 ? 'display-large' : 'title-large'}
      >
        {children}
      </Typography>
    );
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
        <Typography
          id={generateHeadingId(post.title)}
          semantic='h1'
          variants='display-large'
        >
          {post.title}
        </Typography>
        <div className='no-tailwind'>
          <Markdown
            components={{
              h1: ({ children }) => <Heading level={1}>{children}</Heading>,
              h2: ({ children }) => <Heading level={2}>{children}</Heading>,
              h3: ({ children }) => <Heading level={3}>{children}</Heading>,
              h4: ({ children }) => <Heading level={4}>{children}</Heading>,
              h5: ({ children }) => <Heading level={5}>{children}</Heading>,
              h6: ({ children }) => <Heading level={6}>{children}</Heading>,
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </main>
      <aside className={styles.toc}>
        <nav>
          <ul>
            {toc.map((item) => (
              <li
                className={activeId === item.id ? styles.active : ''}
                key={item.id}
                style={{ marginLeft: `${(item.level - 1) * 12}px` }}
              >
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};
