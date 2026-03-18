describe('정책 페이지', () => {
  describe('개인정보처리방침', () => {
    beforeEach(() => {
      cy.visit('/policy/privacy');
    });

    it('개인정보처리방침 제목이 표시된다', () => {
      cy.contains('개인정보처리방침').should('be.visible');
    });

    it('개인정보 수집 항목 섹션이 표시된다', () => {
      cy.contains('1. 개인정보 수집 항목 및 목적과 보유 기간').should(
        'be.visible',
      );
    });

    it('개인정보 파기 절차 섹션이 표시된다', () => {
      cy.contains('2. 개인정보의 파기 절차 및 방법').should('be.visible');
    });

    it('안전성 확보조치 섹션이 표시된다', () => {
      cy.contains('3. 개인정보의 안전성 확보조치').should('be.visible');
    });

    it('담당자 정보가 표시된다', () => {
      cy.contains('담당자 : 박철우').should('be.visible');
      cy.contains('dev.cheolubak@gmail.com').should('be.visible');
    });

    it('개인정보 수집 항목 테이블이 표시된다', () => {
      cy.get('table').should('exist');
      cy.get('thead th').should('have.length', 4);
      cy.contains('근거').should('be.visible');
      cy.contains('목적').should('be.visible');
      cy.contains('항목').should('be.visible');
      cy.contains('보유 및 이용기간').should('be.visible');
    });
  });

  describe('서비스이용약관', () => {
    beforeEach(() => {
      cy.visit('/policy/services');
    });

    it('서비스이용약관 제목이 표시된다', () => {
      cy.contains('서비스이용약관').should('be.visible');
    });

    it('각 조항이 순서대로 표시된다', () => {
      cy.contains('제 1조(목적)').should('be.visible');
      cy.contains('제 2조(정의)').should('be.visible');
      cy.contains('제 3조(약관의 효력 및 개정)').should('be.visible');
    });

    it('DEVCURATE 서비스 설명이 표시된다', () => {
      cy.contains('여러 기술 블로그의 포스트와 유튜브 채널의 영상을').should(
        'be.visible',
      );
    });

    it('회원가입 관련 조항이 표시된다', () => {
      cy.contains('제 5조(회원가입과 이용계약의 성립)').should('be.visible');
      cy.contains('제 6조(회원가입 유보 및 거절)').should('be.visible');
    });

    it('손해배상 관련 조항이 표시된다', () => {
      cy.contains('제 16조(손해배상책임)').should('be.visible');
      cy.contains('제 17조(규정의 준용)').should('be.visible');
    });
  });
});
