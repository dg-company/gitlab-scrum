import { GitlabScrumPage } from './app.po';

describe('gitlab-scrum App', () => {
  let page: GitlabScrumPage;

  beforeEach(() => {
    page = new GitlabScrumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
