import { CompanyPage } from './app.po';

describe('company App', () => {
  let page: CompanyPage;

  beforeEach(() => {
    page = new CompanyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
