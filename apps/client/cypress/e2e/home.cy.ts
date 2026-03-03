describe('홈페이지', () => {
  beforeEach(() => {
    cy.fixture('posts').then((posts) => {
      cy.intercept('GET', '/api/posts/0*', posts.page0).as('getPage0');
      cy.intercept('GET', '/api/posts/1*', posts.page1).as('getPage1');
    });
  });

  describe('렌더링', () => {
    it('Header에 DEVLOG 텍스트가 표시된다', () => {
      cy.visit('/');
      cy.get('header').should('exist');
      cy.get('header h1').should('contain.text', 'DEVLOG');
    });

    it('포스트 목록이 렌더링된다', () => {
      cy.visit('/');
      cy.get('article').should('exist');
      cy.get('article a').should('have.length.at.least', 1);
    });

    it('각 포스트에 제목, 설명, 소스명이 표시된다', () => {
      cy.visit('/');
      cy.get('article a')
        .first()
        .within(() => {
          cy.get('h2').should('exist').and('not.be.empty');
          cy.get('p').should('exist').and('not.be.empty');
          cy.get('h3').should('exist').and('not.be.empty');
        });
    });
  });

  describe('포스트 링크', () => {
    it('포스트 링크가 target="_blank"로 설정되어 있다', () => {
      cy.visit('/');
      cy.get('article a').first().should('have.attr', 'target', '_blank');
    });

    it('포스트 링크의 href가 올바른 URL이다', () => {
      cy.visit('/');
      cy.get('article a')
        .first()
        .should('have.attr', 'href')
        .and('match', /^https?:\/\//);
    });
  });

  describe('무한 스크롤', () => {
    it('스크롤 시 다음 페이지 API 호출이 발생한다', () => {
      cy.visit('/');
      cy.wait('@getPage0');

      cy.scrollTo('bottom');
      cy.wait('@getPage1');
    });

    it('새로운 포스트가 추가로 렌더링된다', () => {
      cy.visit('/');
      cy.wait('@getPage0');

      cy.get('article a').then(($initialPosts) => {
        const initialCount = $initialPosts.length;

        cy.scrollTo('bottom');
        cy.wait('@getPage1');

        cy.get('article a').should(
          'have.length.greaterThan',
          initialCount,
        );
      });
    });

    it('hasMore가 false이면 추가 요청이 발생하지 않는다', () => {
      cy.visit('/');
      cy.wait('@getPage0');

      cy.scrollTo('bottom');
      cy.wait('@getPage1');

      cy.intercept('GET', '/api/posts/2*').as('getPage2');
      cy.scrollTo('bottom');

      // page2 요청이 발생하지 않는지 확인
      cy.wait(1000);
      cy.get('@getPage2.all').should('have.length', 0);
    });
  });

  describe('API 에러 처리', () => {
    it('API 500 응답 시 에러 메시지가 표시된다', () => {
      cy.intercept('GET', '/api/posts/0*', {
        body: { message: 'Error!!' },
        statusCode: 500,
      }).as('getPage0Error');

      cy.visit('/');

      cy.contains('오류가 발생했습니다.').should('be.visible');
    });
  });
});
