import { Button } from '@devlog/components';
import { mount } from 'cypress/react';

describe('Button 컴포넌트', () => {
  describe('렌더링', () => {
    it('children 텍스트가 표시된다', () => {
      mount(<Button>클릭</Button>);
      cy.contains('클릭').should('be.visible');
    });

    it('기본 variant는 filled이다', () => {
      mount(<Button>버튼</Button>);
      cy.get('button').should('have.class', 'bg-gray-900');
    });

    it('outline variant가 적용된다', () => {
      mount(<Button variant="outline">버튼</Button>);
      cy.get('button').should('have.class', 'bg-transparent');
    });

    it('text variant가 적용된다', () => {
      mount(<Button variant="text">버튼</Button>);
      cy.get('button')
        .should('have.class', 'bg-transparent')
        .and('have.class', 'border-transparent');
    });
  });

  describe('색상', () => {
    it('secondary 색상이 적용된다', () => {
      mount(<Button color="secondary">버튼</Button>);
      cy.get('button').should('have.class', 'bg-purple-500');
    });

    it('success 색상이 적용된다', () => {
      mount(<Button color="success">버튼</Button>);
      cy.get('button').should('have.class', 'bg-cyan-500');
    });

    it('danger 색상이 적용된다', () => {
      mount(<Button color="danger">버튼</Button>);
      cy.get('button').should('have.class', 'bg-red-500');
    });
  });

  describe('사이즈', () => {
    it('sm 사이즈가 적용된다', () => {
      mount(<Button size="sm">버튼</Button>);
      cy.get('button').should('have.class', 'h-9');
    });

    it('xl 사이즈가 적용된다', () => {
      mount(<Button size="xl">버튼</Button>);
      cy.get('button').should('have.class', 'h-14');
    });
  });

  describe('인터랙션', () => {
    it('클릭 이벤트가 발생한다', () => {
      const onClick = cy.stub().as('clickHandler');
      mount(<Button onClick={onClick}>클릭</Button>);

      cy.get('button').click();
      cy.get('@clickHandler').should('have.been.calledOnce');
    });

    it('disabled 상태에서 클릭이 방지된다', () => {
      const onClick = cy.stub().as('clickHandler');
      mount(
        <Button disabled onClick={onClick}>
          버튼
        </Button>,
      );

      cy.get('button').should('be.disabled');
    });
  });
});
