import { Checkbox } from '@devlog/components';
import { mount } from 'cypress/react';

describe('Checkbox 컴포넌트', () => {
  describe('렌더링', () => {
    it('체크박스가 렌더링된다', () => {
      mount(<Checkbox />);
      cy.get('input[type="checkbox"]').should('exist');
    });

    it('라벨 텍스트가 표시된다', () => {
      mount(<Checkbox>동의합니다</Checkbox>);
      cy.contains('동의합니다').should('be.visible');
    });

    it('defaultChecked로 체크 상태로 렌더링된다', () => {
      mount(<Checkbox defaultChecked />);
      cy.get('input[type="checkbox"]').should('be.checked');
    });

    it('checked prop으로 체크 상태가 된다', () => {
      mount(<Checkbox checked />);
      cy.get('input[type="checkbox"]').should('be.checked');
    });
  });

  describe('인터랙션', () => {
    it('클릭 시 체크 상태가 변경된다', () => {
      const onChange = cy.stub().as('changeHandler');
      mount(<Checkbox onChange={onChange}>체크박스</Checkbox>);

      cy.get('label').click();
      cy.get('@changeHandler').should('have.been.calledWith', true);
    });

    it('체크된 상태에서 클릭 시 해제된다', () => {
      const onChange = cy.stub().as('changeHandler');
      mount(
        <Checkbox defaultChecked onChange={onChange}>
          체크박스
        </Checkbox>,
      );

      cy.get('label').click();
      cy.get('@changeHandler').should('have.been.calledWith', false);
    });

    it('체크 시 체크 아이콘이 표시된다', () => {
      mount(<Checkbox defaultChecked />);
      cy.get('svg').should('exist');
    });

    it('미체크 시 체크 아이콘이 없다', () => {
      mount(<Checkbox />);
      cy.get('label span svg').should('not.exist');
    });
  });
});
