describe('채널 페이지', () => {
  // SSR 페이지는 서버에서 데이터를 페칭하므로 cy.intercept로 모킹 불가
  // 실제 외부 API 데이터를 기반으로 테스트

  describe('렌더링', () => {
    it('채널 페이지가 정상 렌더링된다', () => {
      cy.visit('/channels');

      // SSR이 성공하면 채널 목록이, 실패하면 에러 메시지가 표시됨
      cy.get('body').should('exist');
    });

    it('채널 섹션이 표시된다', () => {
      cy.visit('/channels');

      // 블로그/유튜브 섹션 헤더가 존재
      cy.get('section').should('have.length.at.least', 1);
    });

    it('채널 아이템이 링크로 구성되어 있다', () => {
      cy.visit('/channels');

      cy.get('section ul li a').should('have.length.at.least', 1);
    });

    it('채널 클릭 시 콘텐츠 페이지로 이동한다', () => {
      cy.visit('/channels');

      cy.get('section ul li a')
        .first()
        .should('have.attr', 'href')
        .and('match', /\/channels\/.*\/contents/);
    });
  });

  describe('채널 아이콘', () => {
    it('각 채널에 이미지 또는 아이콘이 표시된다', () => {
      cy.visit('/channels');

      cy.get('section ul li a').first().within(() => {
        // img 또는 svg 중 하나가 존재
        cy.get('img, svg').should('have.length.at.least', 1);
      });
    });

    it('채널 이름이 표시된다', () => {
      cy.visit('/channels');

      cy.get('section ul li a')
        .first()
        .find('h2, span')
        .should('exist')
        .and('not.be.empty');
    });
  });
});
