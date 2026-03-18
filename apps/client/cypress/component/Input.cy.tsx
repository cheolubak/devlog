import { Input } from '@devlog/components';
import { mount } from 'cypress/react';

describe('Input 컴포넌트', () => {
  describe('렌더링', () => {
    it('input 요소가 렌더링된다', () => {
      mount(<Input />);
      cy.get('input').should('exist');
    });

    it('placeholder가 표시된다', () => {
      mount(<Input placeholder="검색어를 입력하세요" />);
      cy.get('input').should(
        'have.attr',
        'placeholder',
        '검색어를 입력하세요',
      );
    });

    it('prefix 요소가 렌더링된다', () => {
      mount(<Input prefix={<span data-testid="prefix">P</span>} />);
      cy.get('[data-testid="prefix"]').should('be.visible');
    });

    it('suffix 요소가 렌더링된다', () => {
      mount(<Input suffix={<span data-testid="suffix">S</span>} />);
      cy.get('[data-testid="suffix"]').should('be.visible');
    });
  });

  describe('인터랙션', () => {
    it('텍스트를 입력할 수 있다', () => {
      mount(<Input />);
      cy.get('input').type('Hello World');
      cy.get('input').should('have.value', 'Hello World');
    });

    it('onChange 이벤트가 발생한다', () => {
      const onChange = cy.stub().as('changeHandler');
      mount(<Input onChange={onChange} />);

      cy.get('input').type('a');
      cy.get('@changeHandler').should('have.been.called');
    });

    it('disabled 상태에서 입력이 불가능하다', () => {
      mount(<Input disabled />);
      cy.get('input').should('be.disabled');
    });

    it('기본값이 설정된다', () => {
      mount(<Input defaultValue="기본값" />);
      cy.get('input').should('have.value', '기본값');
    });
  });

  describe('타입', () => {
    it('password 타입이 적용된다', () => {
      mount(<Input type="password" />);
      cy.get('input').should('have.attr', 'type', 'password');
    });

    it('number 타입이 적용된다', () => {
      mount(<Input type="number" />);
      cy.get('input').should('have.attr', 'type', 'number');
    });
  });
});
