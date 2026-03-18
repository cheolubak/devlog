import { Tab, Tabs } from '@devlog/components';
import { mount } from 'cypress/react';
import { useState } from 'react';

const TabsWrapper = ({
  defaultValue = 'tab1',
  onChange,
}: {
  defaultValue?: string;
  onChange?: (value: string) => void;
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab value="tab1">탭 1</Tab>
      <Tab value="tab2">탭 2</Tab>
      <Tab value="tab3">탭 3</Tab>
    </Tabs>
  );
};

describe('Tabs 컴포넌트', () => {
  describe('렌더링', () => {
    it('모든 탭이 표시된다', () => {
      mount(<TabsWrapper />);

      cy.contains('탭 1').should('be.visible');
      cy.contains('탭 2').should('be.visible');
      cy.contains('탭 3').should('be.visible');
    });

    it('선택된 탭이 aria-selected="true"이다', () => {
      mount(<TabsWrapper defaultValue="tab1" />);

      cy.get('[data-value="tab1"]').should(
        'have.attr',
        'aria-selected',
        'true',
      );
      cy.get('[data-value="tab2"]').should(
        'have.attr',
        'aria-selected',
        'false',
      );
    });

    it('tablist role이 있다', () => {
      mount(<TabsWrapper />);
      cy.get('[role="tablist"]').should('exist');
    });
  });

  describe('인터랙션', () => {
    it('탭 클릭 시 해당 탭이 선택된다', () => {
      const onChange = cy.stub().as('changeHandler');
      mount(<TabsWrapper onChange={onChange} />);

      cy.contains('탭 2').click();
      cy.get('@changeHandler').should('have.been.calledWith', 'tab2');
    });

    it('탭 클릭 후 aria-selected가 변경된다', () => {
      mount(<TabsWrapper />);

      cy.contains('탭 2').click();
      cy.get('[data-value="tab2"]').should(
        'have.attr',
        'aria-selected',
        'true',
      );
      cy.get('[data-value="tab1"]').should(
        'have.attr',
        'aria-selected',
        'false',
      );
    });

    it('키보드 ArrowRight로 다음 탭으로 이동한다', () => {
      const onChange = cy.stub().as('changeHandler');
      mount(<TabsWrapper onChange={onChange} />);

      cy.get('[data-value="tab1"]').focus().type('{rightarrow}');
      cy.get('@changeHandler').should('have.been.calledWith', 'tab2');
    });

    it('키보드 ArrowLeft로 이전 탭으로 이동한다', () => {
      const onChange = cy.stub().as('changeHandler');
      mount(<TabsWrapper defaultValue="tab2" onChange={onChange} />);

      cy.get('[data-value="tab2"]').focus().type('{leftarrow}');
      cy.get('@changeHandler').should('have.been.calledWith', 'tab1');
    });
  });

  describe('disabled 탭', () => {
    it('disabled 탭은 클릭해도 선택되지 않는다', () => {
      const onChange = cy.stub().as('changeHandler');

      mount(
        <Tabs value="tab1" onChange={onChange}>
          <Tab value="tab1">탭 1</Tab>
          <Tab value="tab2" disabled>탭 2</Tab>
          <Tab value="tab3">탭 3</Tab>
        </Tabs>,
      );

      cy.contains('탭 2').click({ force: true });
      cy.get('@changeHandler').should('not.have.been.called');
    });
  });
});
