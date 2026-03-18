import './commands';

Cypress.on('uncaught:exception', (err) => {
  // React hydration mismatch 에러 무시 (프로덕션 빌드에서 발생)
  if (err.message.includes('Minified React error #418')) {
    return false;
  }
});
