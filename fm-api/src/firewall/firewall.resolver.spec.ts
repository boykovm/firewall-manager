import { Test, TestingModule } from '@nestjs/testing';
import { FirewallResolver } from './firewall.resolver';

describe('FirewallResolver', () => {
  let resolver: FirewallResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirewallResolver],
    }).compile();

    resolver = module.get<FirewallResolver>(FirewallResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
