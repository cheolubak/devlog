import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  IconButton,
  PostGrid,
  Typography,
} from '@/packages/components/src';

export default function Home() {
  return (
    <PostGrid>
      {Array.from({ length: 20 }).map((_, idx) => (
        <Card key={idx}>
          <CardHeader>
            <Typography variants='title-medium'>Test Title</Typography>
          </CardHeader>
          <CardContent>
            <Typography
              maxLines={5}
              variants='body-large'
            >
              이것은 테스트를 위한 긴 텍스트 내용입니다. 여러 줄에 걸쳐 표시될
              수 있도록 충분히 긴 문장으로 작성되었습니다. 카드 컴포넌트 내에서
              텍스트가 어떻게 표시되는지 확인하기 위한 샘플 콘텐츠입니다. 최대
              5줄까지 표시되도록 설정되어 있으며, 그 이상은 생략될 것입니다. 이
              텍스트는 레이아웃과 스타일링을 테스트하는 데 사용됩니다. 충분한
              길이의 텍스트를 통해 실제 콘텐츠가 들어갔을 때의 모습을 미리
              확인할 수 있습니다.
            </Typography>
          </CardContent>
          <CardFooter>
            <IconButton
              iconColor='primary'
              iconSize={20}
              name='share'
            />
          </CardFooter>
        </Card>
      ))}
    </PostGrid>
  );
}
