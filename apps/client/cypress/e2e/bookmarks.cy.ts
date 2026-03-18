describe('북마크 페이지', () => {
  describe('페이지 접근', () => {
    beforeEach(() => {
      cy.visit('/bookmarks');
    });

    it('북마크 페이지가 렌더링된다', () => {
      cy.get('main').should('exist');
      cy.contains('오류가 발생했습니다.').should('not.exist');
    });

    it('하단 네비게이션에 북마크 링크가 존재한다', () => {
      cy.get('footer a[href="/bookmarks"]').should('exist');
      cy.get('footer a[aria-label="북마크"]').should('exist');
    });
  });
});
