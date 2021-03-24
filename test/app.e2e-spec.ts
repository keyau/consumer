import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accountId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /accounts', () => {
    let data = {
      'nbCredits': 10
    };

    return request(app.getHttpServer())
      .post('/accounts')
      .send(data) 
      .expect(201)
      .then((response) => {
        expect(response.body.nbCredits).toBe(data.nbCredits);
        accountId = response.body._id;
      });
  });

  it('GET /accounts/:id', () => {
    return request(app.getHttpServer())
      .get('/accounts/' + accountId) 
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(accountId);
        expect(response.body.nbCredits).toBe(10);
      });
  });

  it('POST /selections', () => {
    let data = {
      'accountId': accountId
    };

    return request(app.getHttpServer())
      .post('/selections')
      .send(data) 
      .expect(201)
      .then((response) => {
        expect(response.body.accountId).toBe(data.accountId);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
