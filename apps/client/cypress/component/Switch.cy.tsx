import { Switch } from '@devlog/components';
import { mount } from 'cypress/react';

describe('Switch 컴포넌트', () => {
  describe('렌더링', () => {
    it('기본 상태(off)로 렌더링된다', () => {
      mount(<Switch />);
      cy.get('input[type="checkbox"]').should('not.be.checked');
    });

    it('defaultChecked로 on 상태로 렌더링된다', () => {
      mount(<Switch defaultChecked />);
      cy.get('input[type="checkbox"]').should('be.checked');
    });

    it('checked prop으로 on 상태가 된다', () => {
      mount(<Switch checked />);
      cy.get('input[type="checkbox"]').should('be.checked');
    });
  });

  describe('인터랙션', () => {
    it('클릭 시 토글된다', () => {
      const onChange = cy.stub().as('changeHandler');
      mount(<Switch onChange={onChange} />);

      cy.get('label').click();
      cy.get('@changeHandler').should('have.been.calledWith', true);
    });

    it('on 상태에서 클릭 시 off로 변경된다', () => {
      const onChange = cy.stub().as('changeHandler');
      mount(<Switch defaultChecked onChange={onChange} />);

      cy.get('label').click();
      cy.get('@changeHandler').should('have.been.calledWith', false);
    });

    it('on 상태에서 배경색이 변경된다', () => {
      mount(<Switch checked />);
      cy.get('label').should('have.class', 'bg-indigo-500');
    });

    it('off 상태에서 기본 배경색이다', () => {
      mount(<Switch />);
      cy.get('label').should('have.class', 'bg-gray-400');
    });
  });
});
