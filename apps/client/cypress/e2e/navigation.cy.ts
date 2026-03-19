describe('네비게이션', () => {
  describe('헤더', () => {
    it('로고가 홈페이지로 연결된다', () => {
      cy.visit('/');
      cy.get('header a[href="/"]').should('exist');
      cy.get('header img[alt="Dev Curate"]').should('be.visible');
    });

    it('로고 클릭 시 홈으로 이동한다', () => {
      cy.visit('/channels');
      cy.get('header a[href="/"]').first().click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('하단 네비게이션', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('4개의 네비게이션 항목이 표시된다', () => {
      cy.get('footer ul li').should('have.length', 4);
    });

    it('글 목록 링크가 있다', () => {
      cy.get('footer a[href="/"]').should('exist');
      cy.get('footer a[aria-label="글 목록"]').should('exist');
    });

    it('채널 링크가 있다', () => {
      cy.get('footer a[href="/channels"]').should('exist');
      cy.get('footer a[aria-label="채널"]').should('exist');
    });

    it('북마크 링크가 있다', () => {
      cy.get('footer a[href="/bookmarks"]').should('exist');
      cy.get('footer a[aria-label="북마크"]').should('exist');
    });

    it('마이페이지 링크가 있다', () => {
      cy.get('footer a[href="/mypage"]').should('exist');
      cy.get('footer a[aria-label="마이페이지"]').should('exist');
    });

    it('현재 페이지의 네비게이션 항목이 활성화 상태이다', () => {
      cy.get('footer a[href="/"]').should(
        'have.attr',
        'aria-current',
        'page',
      );
    });

    it('채널 페이지로 이동하면 채널 항목이 활성화된다', () => {
      cy.get('article a').should('have.length.at.least', 1);
      cy.get('footer a[href="/channels"]').click();
      cy.url().should('include', '/channels');

      cy.get('footer a[href="/channels"]').should(
        'have.attr',
        'aria-current',
        'page',
      );
    });
  });

  describe('페이지 간 네비게이션', () => {
    it('홈 → 채널 → 홈 이동이 정상 동작한다', () => {
      cy.visit('/');
      cy.get('article a').should('have.length.at.least', 1);

      cy.get('footer a[href="/channels"]').click();
      cy.url().should('include', '/channels');

      cy.get('footer a[href="/"]').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});
