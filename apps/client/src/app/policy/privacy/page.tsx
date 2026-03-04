import { Typography } from '@devlog/components';
import { PolicyLayout } from 'components';
import { PolicyTable } from 'components/PolicyTable';

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout>
      <Typography
        semantic='h2'
        variants='display-small'
      >
        개인정보처리방침
      </Typography>
      <Typography
        semantic='h3'
        variants='title-medium'
      >
        1. 개인정보 수집 항목 및 목적과 보유 기간
      </Typography>
      <Typography
        semantic='p'
        variants='body-large'
      >
        "DEVCURATE"는 서비스 이용에 필요한 최소한의 개인정보를 수집합니다.
        이용자의 개인정보와 서비스 방문 및 검색, 서비스 이용을 통해 원하는
        정보를 제공하기 위해 필요한 최소한의 정보를 수집합니다.
      </Typography>
      <Typography
        semantic='h3'
        variants='title-small'
      >
        가. 정보주체의 동의를 받지 않고 처리하는 개인정보 항목
      </Typography>
      <Typography
        semantic='p'
        variants='body-large'
      >
        "DEVCURATE"는 다음의 개인정보 항목을 정보주체의 동의 없이 처리하고
        있습니다.
      </Typography>
      <PolicyTable>
        <thead>
          <tr>
            <th>근거</th>
            <th>목적</th>
            <th>항목</th>
            <th>보유 및 이용기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>「개인정보 보호법」 제15조 제1항 제4호 (계약의 체결·이행)</th>
            <th>회원 가입 및 이용자 식별, 회원관리</th>
            <th>이메일, 이름</th>
            <th>회원탈퇴 시 즉시 파기</th>
          </tr>
        </tbody>
      </PolicyTable>
      <Typography
        semantic='h3'
        variants='title-medium'
      >
        2. 개인정보의 파기 절차 및 방법
      </Typography>
      <Typography
        semantic='p'
        variants='body-large'
      >
        DEVCURATE는 개인정보 보유기간의 경과, 처리목적 달정 등 개인정보가
        불필요하게 되었을 때에는 해당 개인정보를 파기합니다.
      </Typography>
      <Typography
        semantic='p'
        variants='body-large'
      >
        개인정보의 파기 절차 및 방법은 다음과 같습니다.
      </Typography>
      <ul>
        <li>
          <Typography
            semantic='p'
            variants='body-large'
          >
            파기 절차 : 개인정보 목적 달성 후 내부 방침 및 관련 법령에 의한
            의무에 따라 바로 파기합니다.
          </Typography>
        </li>
        <li>
          <Typography
            semantic='p'
            variants='body-large'
          >
            파기 방법 : 전자적 파일 형태로 저장된 개인정보는 기록을 복원이
            불가능한 방법으로 영구 파기하며, 종이문서에 저장된 개인정보는
            분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.
          </Typography>
        </li>
      </ul>
      <Typography
        semantic='h3'
        variants='title-medium'
      >
        3. 개인정보의 안전성 확보조치
      </Typography>
      <Typography
        semantic='p'
        variants='body-large'
      >
        DEVCURATE는 개인정보를 처리함에 있어 개인정보가 도난, 유출, 변조 또는
        훼손되지 않도록 기술적 관리적 보호조치를 강구하고 있습니다.
      </Typography>
      <ul>
        <li>
          <Typography
            semantic='p'
            variants='body-large'
          >
            기술적 보호조치: 해킹시도 및 유출에 대한 실시간 모니터링 및 차단,
            접근통제 적용, 접속기록의 보관 및 위변조 방지 적용, 비밀번호 및
            개인정보 암호화 저장, 전송 시 암호화
          </Typography>
        </li>
        <li>
          <Typography
            semantic='p'
            variants='body-large'
          >
            관리적 보호조치: 개인정보보호 전담조직 운영, 개인정보취급자 대한
            정기적인 교육 수행, 직원을 대상으로 한 인식제고 활동, 규정 준수상태
            정기적 점검
          </Typography>
        </li>
        <li>
          <Typography
            semantic='p'
            variants='body-large'
          >
            물리적 보호조치: 외부로부터 접근이 통제된 구역에 시스템 설치 및
            운영, 안전한 출입통제 절차 수립 및 운영
          </Typography>
        </li>
      </ul>
      <Typography
        semantic='h3'
        variants='title-medium'
      >
        4. 개인정보보호 및 민원처리
      </Typography>
      <Typography
        semantic='p'
        variants='body-large'
      >
        DEVCURATE는 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을
        위하여 아래와 같이 개인정보보호 및 민원처리에 관한 사항을 알려드립니다.
      </Typography>
      <ul>
        <li>
          <Typography
            semantic='p'
            variants='body-large'
          >
            담당자 : 박철우
          </Typography>
        </li>
        <li>
          <Typography
            semantic='p'
            variants='body-large'
          >
            이메일 : dev.cheolubak@gmail.com
          </Typography>
        </li>
      </ul>
    </PolicyLayout>
  );
}
