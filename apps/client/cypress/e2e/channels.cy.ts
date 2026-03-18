describe('채널 페이지', () => {
  beforeEach(() => {
    cy.visit('/channels');
  });

  describe('렌더링', () => {
    it('채널 페이지가 정상 렌더링된다', () => {
      cy.contains('오류가 발생했습니다.').should('not.exist');
      cy.get('section').should('have.length.at.least', 1);
    });

    it('블로그와 유튜브 섹션이 구분되어 표시된다', () => {
      cy.get('section').should('have.length', 2);
    });

    it('채널 아이템이 링크로 구성되어 있다', () => {
      cy.get('section ul li a').should('have.length.at.least', 1);
    });

    it('채널 링크가 콘텐츠 페이지 경로를 가진다', () => {
      cy.get('section ul li a')
        .first()
        .should('have.attr', 'href')
        .and('match', /\/channels\/.*\/contents/);
    });
  });

  describe('채널 아이콘', () => {
    it('각 채널에 이미지 또는 아이콘이 표시된다', () => {
      cy.get('section ul li a')
        .first()
        .within(() => {
          cy.get('img, svg').should('have.length.at.least', 1);
        });
    });

    it('채널 이름이 표시된다', () => {
      cy.get('section ul li a')
        .first()
        .find('h2, span')
        .should('exist')
        .and('not.be.empty');
    });
  });
});
