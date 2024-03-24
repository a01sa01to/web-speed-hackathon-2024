import { Suspense, useEffect, useId, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import { styled } from 'styled-components';
import invariant from 'tiny-invariant';

import { useAuthor } from '../../features/author/hooks/useAuthor';
import { BookListItem } from '../../features/book/components/BookListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { getImageUrl } from '../../lib/image/getImageUrl';

const _HeadingWrapper = styled.section`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  padding-bottom: ${Space * 2}px;
  gap: ${Space * 2}px;
`;

const _AuthorImageWrapper = styled.div`
  width: 128px;
  height: 128px;
  > img {
    border-radius: 50%;
  }
`;

const AuthorDetailPage: React.FC = () => {
  const { authorId } = useParams<RouteParams<'/authors/:authorId'>>();
  invariant(authorId);

  const { data: author } = useAuthor({ params: { authorId } });

  const bookListA11yId = useId();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!author) return;
    setImageUrl(getImageUrl({ format: 'webp', height: 128, imageId: author.image.id, width: 128 }));
  }, [author]);

  return (
    <Box height="100%" px={Space * 2}>
      <_HeadingWrapper aria-label="作者情報">
        {imageUrl != null && (
          <_AuthorImageWrapper>
            {author && imageUrl ? (
              <Image key={author.id} alt={author.name} height={128} objectFit="cover" src={imageUrl} width={128} />
            ) : (
              <div style={{ height: '128px', width: '128px' }} />
            )}
          </_AuthorImageWrapper>
        )}

        <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
          <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
            {author && author.name}
          </Text>
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
            {author && author.description}
          </Text>
        </Flex>
      </_HeadingWrapper>

      <Separator />

      <Box aria-labelledby={bookListA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text as="h2" color={Color.MONO_100} id={bookListA11yId} typography={Typography.NORMAL20} weight="bold">
          作品一覧
        </Text>

        <Spacer height={Space * 2} />

        <Flex align="center" as="ul" direction="column" justify="center">
          {author && author.books.map((book) => <BookListItem key={book.id} book={book} />)}
          {author && author.books.length === 0 && (
            <>
              <Spacer height={Space * 2} />
              <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                この作者の作品はありません
              </Text>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

const AuthorDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <AuthorDetailPage />
    </Suspense>
  );
};

export { AuthorDetailPageWithSuspense as AuthorDetailPage };
