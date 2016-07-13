import { CooktemPage } from './app.po';

describe('cooktem App', function() {
  let page: CooktemPage;

  beforeEach(() => {
    page = new CooktemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
