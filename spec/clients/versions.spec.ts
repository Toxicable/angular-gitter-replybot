import { MockHttp } from './../mock-utils';
import { VersionsClient } from '../../src/versions/versions.client';
import { Version } from '../../src/versions/versions.models';
import { MessageBuilder } from '../../src/util/message-builder';
import { Observable } from 'rxjs';

const mockHttp = new MockHttp(
  {
    name: '1.0.0',
    versions: {
      '1.0.0': {
        versions: 'idk',
        homepage: 'hompage',
        bugs: {
          url: 'bug url',
        }
      }
    },
    'dist-tags': {
      latest: '1.0.0',
      next: '1.0.0',
      experimental: '1.0.0',
    }
  });

describe(`Versions`, () => {

  const client = new VersionsClient(mockHttp);

  describe('regex', () => {
    it('should match for version', () => {
      const match = client.commandNode.matcher.test('version');
      expect(match).toEqual(true);
    });

    it('should match for versions', () => {
      const match = client.commandNode.matcher.test('versions');
      expect(match).toEqual(true);
    });

    it('should not match for versionsandpie', () => {
      const match = client.commandNode.matcher.test('versionsandpie');
      expect(match).toEqual(true);
    });
  });

  describe('fn', () => {
    it(`should get latest version`, () => {
      const actual = client.commandNode.commandFn({text: 'version'}).toString();
      expect(actual).toBeDefined();
    });
  });

});

