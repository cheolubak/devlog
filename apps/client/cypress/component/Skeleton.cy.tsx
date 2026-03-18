import { Skeleton } from '@devlog/components';
import { mount } from 'cypress/react';

describe('Skeleton 컴포넌트', () => {
  describe('렌더링', () => {
    it('기본(text) variant로 렌더링된다', () => {
      mount(<Skeleton />);
      cy.get('div').should('have.class', 'animate-shimmer');
    });

    it('circular variant가 적용된다', () => {
      mount(<Skeleton variant="circular" width={48} height={48} />);
      cy.get('div').should('have.class', 'rounded-full');
    });

    it('rectangular variant가 적용된다', () => {
      mount(<Skeleton variant="rectangular" width={200} height={100} />);
      cy.get('div').should('have.class', 'rounded-lg');
    });
  });

  describe('크기', () => {
    it('width가 적용된다', () => {
      mount(<Skeleton width={300} />);
      cy.get('div').should('have.css', 'width', '300px');
    });

    it('height가 적용된다', () => {
      mount(<Skeleton height={50} />);
      cy.get('div').should('have.css', 'height', '50px');
    });

    it('커스텀 className이 적용된다', () => {
      mount(<Skeleton className="my-custom-class" />);
      cy.get('div').should('have.class', 'my-custom-class');
    });
  });
});
