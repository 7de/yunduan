import { LivesModule } from './lives.module';

describe('LivesModule', () => {
  let livesModule: LivesModule;

  beforeEach(() => {
    livesModule = new LivesModule();
  });

  it('should create an instance', () => {
    expect(livesModule).toBeTruthy();
  });
});
