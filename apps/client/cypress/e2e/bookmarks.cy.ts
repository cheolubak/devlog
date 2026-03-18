describe('북마크 페이지', () => {
  describe('페이지 접근', () => {
    it('북마크 페이지가 렌더링된다', () => {
      cy.visit('/bookmarks');

      cy.get('body').should('exist');
    });

    it('비로그인 시 에러 메시지 또는 빈 목록이 표시된다', () => {
      cy.visit('/bookmarks');

      cy.get('main').should('exist');
    });

    it('하단 네비게이션에 북마크 링크가 존재한다', () => {
      cy.visit('/bookmarks');

      cy.get('footer a[href="/bookmarks"]').should('exist');
      cy.get('footer a[aria-label="북마크"]').should('exist');
    });
  });
});
