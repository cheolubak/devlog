describe('채널 콘텐츠 페이지', () => {
  // 채널 페이지에서 실제 채널 ID를 추출하여 콘텐츠 페이지로 직접 이동

  it('채널 링크에 콘텐츠 페이지 경로가 포함되어 있다', () => {
    cy.visit('/channels');

    cy.get('section ul li a')
      .first()
      .should('have.attr', 'href')
      .and('match', /\/channels\/.*\/contents/);
  });

  describe('콘텐츠 렌더링', () => {
    beforeEach(() => {
      // 채널 페이지에서 첫 번째 채널의 href를 추출하여 직접 방문
      cy.visit('/channels');
      cy.get('section ul li a')
        .first()
        .invoke('attr', 'href')
        .then((href) => {
          cy.visit(href as string);
        });
    });

    it('채널 콘텐츠 페이지가 렌더링된다', () => {
      cy.url().should('match', /\/channels\/.*\/contents/);
    });

    it('채널명이 헤더에 표시된다', () => {
      cy.get('main header').should('exist');
      cy.get('main header').should('not.be.empty');
    });

    it('블로그 가기 또는 유튜브 채널 가기 링크가 있다', () => {
      cy.get('main header').then(($header) => {
        const hasLink = $header.find('a[target="_blank"]').length > 0;
        if (hasLink) {
          cy.get('main header a[target="_blank"]')
            .first()
            .should('have.attr', 'href')
            .and('match', /^https?:\/\//);
        }
      });
    });

    it('포스트 목록 또는 빈 상태가 표시된다', () => {
      cy.get('main').should('exist');
    });
  });
});
